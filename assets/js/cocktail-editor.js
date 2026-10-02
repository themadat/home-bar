// Classic-script function declarations; shared state is initialized in app.js.
function refreshCocktailIngredientCatalog() {
	          cocktailIngredientAliasCache = new Map();
	          cocktailIngredientSpecificCache = new Map();
	          const bottleNames = new Set();
	          const addAlias = (alias, canonical, specific = '') => {
	            const cleanAlias = String(alias || '').trim();
	            const cleanCanonical = String(canonical || '').trim();
	            if (!cleanAlias || !cleanCanonical) return;
	            cocktailIngredientAliasCache.set(norm(cleanAlias), cleanCanonical);
	            cocktailIngredientAliasCache.set(norm(cleanCanonical), cleanCanonical);
	            if (specific) {
	              cocktailIngredientSpecificCache.set(norm(cleanAlias), specific);
	              bottleNames.add(specific);
	            }
	          };
	          COCKTAILS.forEach((cocktail) => {
	            cocktail.ingredientNames.forEach((rawName, index) => {
	              const parts = ingredientDisplayParts(cocktail, index);
	              addAlias(rawName, parts.generic, parts.specific);
	              addAlias(parts.generic, parts.generic);
	            });
	            cocktail.liqueurs.forEach((liqueur) => bottleNames.add(liqueur.name));
	          });
	          store.bar.filter((bottle) => bottle.kind !== 'ingredient').forEach((bottle) => bottleNames.add(bottle.name));
	          Object.entries(INGREDIENT_LABEL_OVERRIDES).forEach(([alias, canonical]) => addAlias(alias, canonical));
	          Object.entries(INGREDIENT_LINE_LABELS).forEach(([alias, canonical]) => addAlias(alias, canonical));
	          cocktailIngredientCatalogCache = unique([...cocktailIngredientAliasCache.values()]).sort((a, b) => a.localeCompare(b));
	          cocktailBottleCatalogCache = unique([...bottleNames].filter(Boolean)).sort((a, b) => a.localeCompare(b));
	          return cocktailIngredientCatalogCache;
	        }

function cocktailIngredientCatalog() {
	          return cocktailIngredientCatalogCache.length ? cocktailIngredientCatalogCache : refreshCocktailIngredientCatalog();
	        }

function canonicalCocktailIngredientName(value) {
	          const name = String(value || '').trim();
	          if (!name) return '';
	          cocktailIngredientCatalog();
	          return cocktailIngredientAliasCache.get(norm(name)) || name;
	        }

function suggestedCocktailBottle(value) {
	          cocktailIngredientCatalog();
	          return cocktailIngredientSpecificCache.get(norm(value)) || '';
	        }

function syncCocktailBasesFromIngredients() {
	          const inferredBases = new Set();
	          $$('#cocktailFormIngredientRows .cocktail-ingredient-row').forEach((row) => {
	            const generic = $('[data-cocktail-ingredient-name]', row)?.value || '';
	            const specific = $('[data-cocktail-ingredient-specific]', row)?.value || '';
	            const classification = inferBottleClassification(specific) || inferBottleClassification(generic);
	            if (classification && BASE_ORDER.includes(classification.base) && classification.base !== 'Other') inferredBases.add(classification.base);
	          });
	          $$('#cocktailFormBases input').forEach((checkbox) => {
	            if (inferredBases.has(checkbox.value)) checkbox.checked = true;
	            else if (cocktailAutoBases.has(checkbox.value)) checkbox.checked = false;
	          });
	          cocktailAutoBases = inferredBases;
	        }

function updateCocktailIngredientSuggestions() {
	          $('#cocktailIngredientSuggestions').innerHTML = cocktailIngredientCatalog().map((name) => `<option value="${escapeHtml(name)}"></option>`).join('');
	          $('#cocktailBottleSuggestions').innerHTML = cocktailBottleCatalogCache.map((name) => `<option value="${escapeHtml(name)}"></option>`).join('');
	        }

function cocktailIngredientEditorParts(line = '', preferredName = '', preferredSpecific = '') {
	          const originalLine = String(line || '').trim();
	          const measureMatch = originalLine.match(new RegExp(`^((?:(?:${AMOUNT_VALUE_PATTERN})\\s*(?:(?:fl\\s*)?oz|ml|cl|tsp|tbsp|teaspoons?|tablespoons?|bar\\s*spoons?|dash(?:es)?|drops?|cups?|parts?|pinch(?:es)?)?|(?:a\\s+)?splash(?:\\s+of)?|(?:a\\s+)?pinch(?:es)?(?:\\s+of)?|(?:a\\s+)?dash(?:es)?(?:\\s+of)?|(?:a\\s+)?few\\s+drops(?:\\s+of)?|top\\s+with))\\s+(.+)$`, 'i'));
	          const amount = measureMatch ? measureMatch[1].trim() : '';
	          const parsedName = measureMatch ? measureMatch[2].trim() : parseIngredientLine(originalLine).name;
	          const name = String(preferredName || parsedName || originalLine).trim();
	          const specific = String(preferredSpecific || '').trim();
	          return {amount, name, specific, originalLine, originalAmount: amount, originalName: name, originalSpecific: specific};
	        }

function addCocktailIngredientRow(parts = {}, focus = false, refreshSuggestions = true) {
	          const row = document.createElement('div');
	          row.className = 'cocktail-ingredient-row';
	          row.dataset.originalLine = parts.originalLine || '';
	          row.dataset.originalAmount = parts.originalAmount || '';
	          row.dataset.originalName = parts.originalName || '';
	          row.dataset.originalSpecific = parts.originalSpecific || '';
	          row.innerHTML = `
	            <input class="text-input" type="text" data-cocktail-ingredient-amount value="${escapeHtml(parts.amount || '')}" placeholder="2 oz" aria-label="Ingredient amount" autocomplete="off">
	            <input class="text-input" type="text" data-cocktail-ingredient-name value="${escapeHtml(parts.name || '')}" placeholder="Ingredient" aria-label="Ingredient name" list="cocktailIngredientSuggestions" autocomplete="off">
	            <input class="text-input" type="text" data-cocktail-ingredient-specific value="${escapeHtml(parts.specific || '')}" placeholder="Specific bottle" aria-label="Specific bottle name" list="cocktailBottleSuggestions" autocomplete="off">
	            <button class="button cocktail-ingredient-remove" type="button" tabindex="-1" data-remove-cocktail-ingredient aria-label="Remove ingredient" title="Remove ingredient">×</button>`;
	          $('#cocktailFormIngredientRows').append(row);
	          if (refreshSuggestions) updateCocktailIngredientSuggestions();
	          if (focus) $('[data-cocktail-ingredient-amount]', row).focus();
	          return row;
	        }

function renderCocktailIngredientRows(cocktail = null) {
	          $('#cocktailFormIngredientRows').innerHTML = '';
	          if (cocktail?.ingredients?.length) {
	            cocktail.ingredients.forEach((line, index) => {
	              const parts = ingredientDisplayParts(cocktail, index);
	              addCocktailIngredientRow(cocktailIngredientEditorParts(line, parts.generic, parts.specific), false, false);
	            });
	          } else {
	            addCocktailIngredientRow({}, false, false);
	          }
	          updateCocktailIngredientSuggestions();
	        }

function cocktailIngredientEntries() {
	          const entries = [];
	          const rows = $$('#cocktailFormIngredientRows .cocktail-ingredient-row');
	          for (const row of rows) {
	            const amountInput = $('[data-cocktail-ingredient-amount]', row);
	            const nameInput = $('[data-cocktail-ingredient-name]', row);
	            const specificInput = $('[data-cocktail-ingredient-specific]', row);
	            const enteredAmount = amountInput.value.trim();
	            const rawName = nameInput.value.trim();
	            const specific = specificInput.value.trim();
	            nameInput.setCustomValidity('');
	            if (!rawName) {
	              if (!enteredAmount) continue;
	              nameInput.setCustomValidity('Add an ingredient name.');
	              nameInput.reportValidity();
	              nameInput.focus();
	              return null;
	            }
	            const name = canonicalCocktailIngredientName(rawName);
	            const amount = normalizeCocktailIngredientAmount(enteredAmount);
	            amountInput.value = amount;
	            nameInput.value = name;
	            const unchanged = row.dataset.originalLine
	              && amount === row.dataset.originalAmount
	              && norm(name) === norm(row.dataset.originalName)
	              && norm(specific) === norm(row.dataset.originalSpecific);
	            entries.push({
	              line: unchanged ? row.dataset.originalLine : [amount, specific || name].filter(Boolean).join(' '),
	              name,
	              specific
	            });
	          }
	          if (!entries.length) {
	            const firstName = $('#cocktailFormIngredientRows [data-cocktail-ingredient-name]') || addCocktailIngredientRow({}, true).querySelector('[data-cocktail-ingredient-name]');
	            firstName.setCustomValidity('Add at least one ingredient.');
	            firstName.reportValidity();
	            firstName.focus();
	            return null;
	          }
	          return entries;
	        }

function liqueurSubtypeFromIngredient(generic, specific = '') {
	          const genericSubtype = Object.entries(LIQUEUR_SUBTYPE_LABELS).find(([, label]) => norm(label) === norm(generic))?.[0]
	            || (/^(?:almond|nut) liqueur$/i.test(generic) ? 'Nuts liqueurs' : '');
	          const classification = inferBottleClassification(specific) || inferBottleClassification(generic);
	          if (classification?.base === 'Liqueurs') return canonicalLiqueurSubtype(specific || generic, classification.subtype) || genericSubtype;
	          return canonicalLiqueurSubtype(specific || generic, genericSubtype) || genericSubtype;
	        }

function liqueursFromIngredientEntries(entries) {
	          return entries.flatMap((entry) => {
	            const subtype = liqueurSubtypeFromIngredient(entry.name, entry.specific);
	            if (!subtype) return [];
	            return [{name: entry.specific || entry.name, subtype, flavor: entry.name.replace(/\s+liqueur$/i, ''), genericOnly: !entry.specific}];
	          });
	        }

function cocktailLinkLabelFromUrl(value) {
	          const raw = String(value || '').trim();
	          if (!raw) return '';
	          try {
	            const parsed = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`);
	            const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
	            const knownSites = [
	              ['diffordsguide.com', "Difford's Guide"],
	              ['iba-world.com', 'IBA'],
	              ['wikipedia.org', 'Wikipedia'],
	              ['liquor.com', 'Liquor.com'],
	              ['thefestivefoodies.com', 'The Festive Foodies'],
	              ['theeducatedbarfly.com', 'The Educated Barfly'],
	              ['imbibemagazine.com', 'Imbibe'],
	              ['punchdrink.com', 'Punch'],
	              ['foodandwine.com', 'Food & Wine'],
	              ['seriouseats.com', 'Serious Eats'],
	              ['vinepair.com', 'VinePair'],
	              ['cocktail-society.com', 'Cocktail Society']
	            ];
	            const known = knownSites.find(([domain]) => hostname === domain || hostname.endsWith(`.${domain}`));
	            if (known) return known[1];
	            const siteName = hostname.split('.')[0].replace(/[-_]+/g, ' ').trim();
	            return siteName.replace(/\b\w/g, (letter) => letter.toUpperCase());
	          } catch {
	            return '';
	          }
	        }

function addCocktailLinkRow(link = {}, focus = false) {
	          const row = document.createElement('div');
	          row.className = 'cocktail-link-row';
	          const label = link.label || cocktailLinkLabelFromUrl(link.url);
	          row.dataset.autoLinkLabel = String(!link.label && Boolean(label));
	          row.innerHTML = `<input class="text-input" type="text" data-cocktail-link-label placeholder="Link name" value="${escapeHtml(label)}" aria-label="Link name"><input class="text-input" type="url" data-cocktail-link-url placeholder="https://…" value="${escapeHtml(link.url || '')}" inputmode="url" aria-label="Link URL"><button class="button cocktail-link-remove" type="button" data-remove-cocktail-link aria-label="Remove link" title="Remove link">×</button>`;
	          $('#cocktailFormLinkRows').appendChild(row);
	          if (focus) $('[data-cocktail-link-url]', row).focus();
	          return row;
	        }

function renderCocktailLinkRows(cocktail = null) {
	          const container = $('#cocktailFormLinkRows');
	          container.innerHTML = '';
	          const links = cocktail ? cocktailLinks(cocktail) : [];
	          (links.length ? links : [{label: '', url: ''}]).forEach((link) => addCocktailLinkRow(link));
	        }

function cocktailLinkEntries() {
	          const links = [];
	          for (const row of $$('#cocktailFormLinkRows .cocktail-link-row')) {
	            const labelInput = $('[data-cocktail-link-label]', row);
	            const urlInput = $('[data-cocktail-link-url]', row);
	            const label = labelInput.value.trim();
	            const url = urlInput.value.trim();
	            urlInput.setCustomValidity('');
	            if (!label && !url) continue;
	            if (!url) {
	              urlInput.setCustomValidity('Add a URL or remove this link.');
	              urlInput.reportValidity();
	              urlInput.focus();
	              return null;
	            }
	            links.push({label: label || cocktailLinkLabelFromUrl(url) || `Link ${links.length + 1}`, url});
	          }
	          return links;
	        }

function openCocktailForm(cocktail = null) {
	          $('#cocktailForm').reset();
	          refreshCocktailIngredientCatalog();
	          cocktailAutoBases = new Set();
	          $('#cocktailFormId').value = cocktail ? cocktail.id : '';
	          $('#cocktailFormTitle').textContent = cocktail ? 'Edit cocktail' : 'Add cocktail';
	          $('#cocktailFormName').value = cocktail ? cocktail.name : '';
	          $('#cocktailFormAlternateNames').value = cocktail ? cocktailAlternateNames(cocktail).join(', ') : '';
	          $('#cocktailFormImage').value = cocktail ? cocktail.image || '' : '';
	          renderCocktailLinkRows(cocktail);
	          populateCocktailFormTypes(cocktail ? displayType(cocktail) : 'Custom');
	          populateCocktailFormBases(cocktail ? cocktail.baseLiquor : []);
	          renderCocktailFormGuide(cocktail);
	          populateCocktailFormGlassware(cocktail && cocktail.glassware !== 'Unknown' ? cocktail.glassware : '');
	          $('#cocktailFormTime').value = cocktail ? cocktail.makeTime : 5;
	          renderCocktailIngredientRows(cocktail);
	          syncCocktailBasesFromIngredients();
	          $('#cocktailFormMethod').value = cocktail ? cocktail.method.join('\n') : '';
	          $('#cocktailFormGarnish').value = cocktail ? cocktail.garnish : '';
	          const hasUserNotes = cocktail && Object.prototype.hasOwnProperty.call(store.notes, cocktail.id);
	          $('#cocktailFormNotes').value = cocktail ? (hasUserNotes ? store.notes[cocktail.id] : cocktail.notes.join('\n')) : '';
	          $('#cocktailFormRawInfo').value = cocktailRawInfoValue(cocktail);
	          $('#cocktailFormRawInfo').dataset.smartAddFields = '';
	          renderCocktailRawPreview();
	          $('#cocktailFormModalOverlay').hidden = false;
	          $('#cocktailFormName').focus();
	        }

function closeCocktailForm() {
	          $('#cocktailFormModalOverlay').hidden = true;
	        }

function submitCocktailForm(event) {
	          event.preventDefault();
	          const name = $('#cocktailFormName').value.trim();
	          const alternateNames = parseCocktailAlternateNames($('#cocktailFormAlternateNames').value, name);
	          const ingredientEntries = cocktailIngredientEntries();
	          if (!name || !ingredientEntries) return;
	          const type = $('#cocktailFormType').value || 'Custom';
	          const bases = $$('#cocktailFormBases input:checked').map((el) => el.value);
	          const glassware = $('#cocktailFormGlass').value.trim() || 'Unknown';
	          const makeTime = Number($('#cocktailFormTime').value) || 0;
	          const methodLines = $('#cocktailFormMethod').value.split('\n').map((line) => line.trim()).filter(Boolean);
	          const garnish = $('#cocktailFormGarnish').value.trim();
	          const noteText = $('#cocktailFormNotes').value.trim();
	          const nutrition = parseCocktailRawInfo($('#cocktailFormRawInfo').value);
	          const guide = cocktailFormGuideEntries();
	          const image = $('#cocktailFormImage').value.trim();
	          const links = cocktailLinkEntries();
	          if (!links) return;
	          const editingId = $('#cocktailFormId').value;
	          const existing = editingId ? COCKTAILS.find((c) => c.id === editingId) : null;
	          const hadUserNotes = Boolean(editingId && Object.prototype.hasOwnProperty.call(store.notes, editingId));
	          const cocktail = {
	            id: editingId || uniqueCocktailId(name),
	            name,
	            alternateNames,
	            type,
	            originalType: type,
	            status: existing ? existing.status : 'Custom',
	            url: links[0]?.url || '',
	            links,
	            image,
	            glassware,
	            baseLiquor: bases,
	            ingredientCount: ingredientEntries.length,
	            makeTime,
	            dateAdded: existing ? existing.dateAdded : new Date().getFullYear(),
	            dateRemoved: existing ? existing.dateRemoved : null,
	            addedRemoved: existing ? existing.addedRemoved : undefined,
	            ingredients: ingredientEntries.map((entry) => entry.line),
	            ingredientNames: ingredientEntries.map((entry) => entry.name),
	            ingredientBottles: ingredientEntries.map((entry) => entry.specific),
	            method: methodLines,
	            garnish,
	            notes: noteText ? [noteText] : [],
	            nutrition,
	            liqueurs: liqueursFromIngredientEntries(ingredientEntries),
	            sourceNote: existing ? existing.sourceNote : 'Logged in the field — details pending.',
	            lnlSource: existing?.lnlSource || null,
	            diffordsSource: existing?.diffordsSource || null,
	            liquorSource: existing?.liquorSource || null,
	            classicSource: existing?.classicSource || null
	          };
	          if (Object.keys(guide).length) store.guides[cocktail.id] = guide;
	          else delete store.guides[cocktail.id];
	          if (hadUserNotes) {
	            if (noteText) store.notes[cocktail.id] = noteText;
	            else delete store.notes[cocktail.id];
	          }
	          if (existing) {
	            const idx = COCKTAILS.findIndex((c) => c.id === editingId);
	            if (idx !== -1) COCKTAILS[idx] = cocktail;
	            const storeIdx = store.customCocktails.findIndex((c) => c.id === editingId);
	            if (storeIdx !== -1) store.customCocktails[storeIdx] = cocktail;
	            else store.customCocktails.unshift(cocktail);
	          } else {
	            COCKTAILS.unshift(cocktail);
	            store.customCocktails.unshift(cocktail);
	          }
	          if (!DEFAULT_TYPES.includes(type) && !store.customTypes.includes(type)) store.customTypes.push(type);
	          refreshCocktailIngredientCatalog();
	          refreshRelatedFrequencies();
	          saveCustom();
	          closeCocktailForm();
	          jumpToCocktail(cocktail.id);
	        }

function userDataSnapshot() {
	          return {
	            dataVersion: 1,
	            buildVersion: BUILD_VERSION,
	            exportedAt: new Date().toISOString(),
	            customTypes: store.customTypes,
	            typeAssignments: store.assignments,
	            notes: store.notes,
	            ratings: store.ratings,
	            guides: store.guides,
	            friendRatings: store.friendRatings,
	            ratingView: store.ratingView,
	            bookmarks: store.bookmarks,
	            bar: store.bar,
	            archivedBar: store.archivedBar,
	            favoriteGenreFilters: store.favoriteGenreFilters,
	            customCocktails: store.customCocktails,
	            appNotes: store.appNotes,
	            glassware: store.glassware,
	            cocktails: COCKTAILS.map((cocktail) => ({
	              id: cocktail.id,
	              name: cocktail.name,
	              alternateNames: cocktailAlternateNames(cocktail),
	              links: cocktailLinks(cocktail),
	              nutrition: cocktail.nutrition || null,
	              type: displayType(cocktail),
	              originalType: cocktail.originalType,
	              status: cocktail.status,
	              glassware: displayGlass(cocktail.glassware),
	              baseLiquor: cocktail.baseLiquor.map(displayBaseLabel),
	              garnish: rowGarnish(cocktail),
	              ingredients: cocktail.ingredients.map((line) => formatIngredientLine(line, cocktail, 1)),
	              totalVolume: formatTotalVolume(totalIngredientVolume(cocktail, 1)),
	              method: cocktail.method.map((line) => formatMethodLine(line)),
	              userNotes: store.notes[cocktail.id] || '',
	              rating: getMyRating(cocktail) || null,
	              guide: store.guides[cocktail.id] || null,
	              friendRatingAverage: getFriendAverage(cocktail) || null,
	              toTry: Boolean(store.bookmarks[cocktail.id]),
	              tryPriority: tryPriority(cocktail.id) || null
	            }))
	          };
	        }

function exportUserData() {
	          const data = userDataSnapshot();
	          const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
	          const url = URL.createObjectURL(blob);
	          const link = document.createElement('a');
	          link.href = url;
	          link.download = `home-bar-data-${BUILD_VERSION}.json`;
	          document.body.appendChild(link);
	          link.click();
	          link.remove();
	          URL.revokeObjectURL(url);
	        }
