// Classic-script function declarations; shared state is initialized in app.js.
function bottleStyleNote(bottle) {
	          return subtypeInfo(bottle.base, bottle.subtype) || BASE_INFO[bottle.base] || 'A bottle reserved for sipping neat rather than cocktail mixing.';
	        }

function bottleStyleName(bottle) {
	          return bottle.subtype ? subtypeLabel(bottle.base, bottle.subtype) : displayBaseLabel(bottle.base);
	        }

function bottlePreparationInfo(bottle) {
	          if (bottle.base === 'Flavorings' && bottle.subtype === 'Syrup, Honey') return INGREDIENT_INFO['Honey Syrup'] || '';
	          if (bottle.base === 'Flavorings' && bottle.subtype === 'Syrup, Sugar' && /(?:\brich\b|2\s*:\s*1)/i.test(String(bottle.name || ''))) return INGREDIENT_INFO['Sugar Syrup [Rich]'] || '';
	          return INGREDIENT_INFO[bottle.name] || '';
	        }

function bottleStorageValue(bottle) {
	          return normalizeBottleStorage(bottle.storage) || defaultBottleStorage(bottle.base, bottle.subtype, bottle.name);
	        }

function bottleExpirationValue(bottle) {
	          return normalizeExpirationMonths(bottle.expirationMonths) || defaultExpirationMonths(bottle.base, bottle.subtype, bottle.name);
	        }

function bottleExpirationText(bottle, compact = false) {
	          if (bottle.base === 'Flavorings' && String(bottle.subtype || '').startsWith('Bitter,')) return '3–5+ years';
	          const months = bottleExpirationValue(bottle);
	          if (months === '') return '';
	          if (months < 1) {
	            const weeks = Math.max(1, Math.round(months * 4));
	            return compact ? `${weeks} wk` : `${weeks} week${weeks === 1 ? '' : 's'}`;
	          }
	          return compact ? `${months} mo` : `${months} month${months === 1 ? '' : 's'}`;
	        }

function bottleStorageHtml(bottle) {
	          const storage = bottleStorageValue(bottle);
	          const expiration = bottleExpirationText(bottle);
	          const storageIcon = storage === 'freezer' || storage === 'fridge'
	            ? `<span class="bar-storage-icon ${storage}" title="Store in ${storage}" aria-label="Store in ${storage}">${__SNOWFLAKE}</span>`
	            : '';
	          const expirationLabel = expiration ? `<span class="bar-expiration" title="Shelf life: ${escapeHtml(expiration)}">${escapeHtml(bottleExpirationText(bottle, true))}</span>` : '';
	          return `${storageIcon}${expirationLabel}`;
	        }

function missingBottleInfo(bottle) {
	          const hasText = (value) => typeof value === 'string' && value.trim().length > 0;
	          return [
	            ['Name', hasText(bottle.name)], ['Base', hasText(bottle.base)], ['Type', hasText(bottle.subtype)],
	            ['Price', normalizeBottlePrice(bottle.price) !== ''], ['Location', hasText(bottle.totalWineLocation)],
	            ['Country', hasText(bottle.country)], ['ABV', normalizeBottleAbv(bottle.abv) !== ''], ['Taste', hasText(defaultBottleTaste(bottle.base, bottle.subtype, bottle.taste))]
	          ].filter(([, complete]) => !complete).map(([label]) => label);
	        }

function syncBottleCompletenessIndicator(bottle) {
	          const row = document.querySelector(`[data-bottle-row="${CSS.escape(bottle.id)}"]`);
	          if (!row) return;
	          const missing = missingBottleInfo(bottle);
	          const complete = missing.length === 0;
	          row.classList.toggle('complete', complete);
	          row.classList.toggle('incomplete', !complete);
	          const indicator = row.querySelector('.bar-bottle-indicator');
	          if (!indicator) return;
	          indicator.textContent = complete ? '✓' : '?';
	          indicator.setAttribute('aria-label', complete ? 'Bottle information complete' : `Missing ${missing.join(', ')}`);
	          indicator.title = complete ? 'Bottle information complete' : `Missing: ${missing.join(', ')}`;
	        }

function formatBottlePrice(price) {
	          if (price === '' || price === null || price === undefined) return '';
	          const amount = Number(price);
	          return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
	        }

function totalWineSearchUrl(name) {
	          return `https://www.totalwine.com/search/all?text=${encodeURIComponent(name)}`;
	        }

function whiskyExchangeSearchUrl(name) {
	          return `https://www.thewhiskyexchange.com/search?q=${encodeURIComponent(name)}`;
	        }

function bottleTasteTags(bottle, catalog) {
	          const savedTastes = String(defaultBottleTaste(bottle.base, bottle.subtype, bottle.taste)).split(/[,;|]/).map((taste) => taste.trim()).filter(Boolean);
	          if (savedTastes.length) return unique(savedTastes).slice(0, 6);
	          if (catalog?.tastes?.length) return catalog.tastes;
	          const description = norm(`${bottleStyleName(bottle)} ${bottleStyleNote(bottle)}`);
	          const rules = [
	            [['smoke', 'smoky', 'smokey'], 'Smoke'], [['peat', 'peated', 'peaty'], 'Peat'],
	            [['maritime', 'sea salt', 'brine'], 'Briny'], [['sherry'], 'Sherry'], [['juniper'], 'Juniper'],
	            [['citrus', 'orange', 'lemon'], 'Citrus'], [['floral'], 'Floral'], [['fruit', 'apple', 'pear'], 'Fruity'],
	            [['herb', 'botanical'], 'Herbal'], [['vanilla'], 'Vanilla'], [['caramel', 'toffee'], 'Caramel'],
	            [['oak', 'barrel'], 'Oak'], [['spice', 'spicy', 'pepper'], 'Spiced'], [['sweet'], 'Sweet'],
	            [['dry', 'crisp'], 'Dry'], [['agave'], 'Agave'], [['earthy', 'mineral'], 'Earthy'],
	            [['chocolate', 'cocoa'], 'Cocoa'], [['coffee'], 'Coffee'], [['malt', 'malty'], 'Malt'], [['molasses'], 'Molasses']
	          ];
	          const tastes = rules.filter(([needles]) => needles.some((needle) => description.includes(needle))).map(([, label]) => label);
	          const visibleTastes = unique(tastes).slice(0, 5);
	          return visibleTastes.length ? visibleTastes : [displayBaseLabel(bottle.base)];
	        }

function neatPourCatalogEntry(bottle) {
	          const bottleName = norm(bottle.name);
	          return NEAT_POUR_CATALOG.find((product) => product.aliases.some((alias) => {
	            const normalizedAlias = norm(alias);
	            return bottleName === normalizedAlias || (normalizedAlias.length >= 10 && bottleName.includes(normalizedAlias));
	          })) || null;
	        }

function neatPourData(bottle) {
	          const catalog = neatPourCatalogEntry(bottle);
	          return {
	            totalWineUrl: totalWineSearchUrl(bottle.name),
	            whiskyExchangeUrl: whiskyExchangeSearchUrl(bottle.name),
	            notes: catalog?.notes || null,
	            tastes: bottleTasteTags(bottle, catalog)
	          };
	        }

function renderNeatPours() {
	          const bottles = neatPourBottles();
	          const section = $('#neatPoursSection');
	          const selected = state.statFilter === 'neat';
	          section.hidden = (!selected && state.statFilter !== 'all') || (!selected && bottles.length === 0);
	          $('#neatPoursCount').textContent = `${bottles.length} bottle${bottles.length === 1 ? '' : 's'}`;
	          const bottleHtml = (bottle) => {
	            const product = neatPourData(bottle);
	            const expanded = state.neatExpandedBottle === bottle.id;
	            const facts = [
	              formatBottlePrice(bottle.price),
	              bottle.country || '',
	              bottle.abv !== '' && bottle.abv !== undefined ? `${bottle.abv}% ABV` : '',
	              bottle.totalWineLocation ? `Total Wine: ${bottle.totalWineLocation}` : '',
	              bottleStorageValue(bottle) === 'bar' ? '' : `Store in ${titleWords(bottleStorageValue(bottle))}`,
	              bottleExpirationText(bottle) ? `Shelf life: ${bottleExpirationText(bottle)}` : ''
	            ].filter(Boolean);
	            return `<article class="neat-library-card" data-neat-bottle-row="${escapeHtml(bottle.id)}" tabindex="0" aria-expanded="${expanded}" aria-label="${expanded ? 'Close' : 'Open'} notes for ${escapeHtml(bottle.name)}">
	              <div class="neat-library-name"><h3 title="${escapeHtml(bottle.name)}">${escapeHtml(bottle.name)}</h3></div>
	              <span class="neat-library-style" title="${escapeHtml(bottleStyleName(bottle))}">${escapeHtml(bottleStyleName(bottle))}</span>
	              <span class="neat-library-tastes" title="${escapeHtml(product.tastes.join(', '))}">${escapeHtml(product.tastes.join(', '))}</span>
	              <div class="neat-library-actions">
	                <button type="button" class="neat-shopping-button" data-toggle-bottle-shopping="${escapeHtml(bottle.id)}" aria-label="Mark ${escapeHtml(bottle.name)} finished and move to Shopping List" title="Bottle finished">${__BAG_FILL}</button>
	                <button type="button" class="neat-favorite-button${bottle.favorite ? ' active' : ''}" data-favorite-bottle="${escapeHtml(bottle.id)}" aria-pressed="${bottle.favorite}" aria-label="${bottle.favorite ? 'Remove' : 'Mark'} ${escapeHtml(bottle.name)} as a favorite" title="${bottle.favorite ? 'Remove favorite' : 'Favorite'}">${bottle.favorite ? '★' : '☆'}</button>
	                <button class="neat-notes-toggle" type="button" data-toggle-neat-details="${escapeHtml(bottle.id)}" aria-expanded="${expanded}" aria-label="${expanded ? 'Close' : 'Open'} notes for ${escapeHtml(bottle.name)}" title="${expanded ? 'Close notes' : 'Open notes'}">${expanded ? '−' : '+'}</button>
	              </div>
	              ${expanded ? `<div class="neat-library-notes">
	                <div class="neat-resource-links">
	                  <a class="neat-search-link" href="${escapeHtml(product.totalWineUrl)}" target="_blank" rel="noopener noreferrer">Search Total Wine &amp; More</a>
	                  <a class="neat-search-link" href="${escapeHtml(product.whiskyExchangeUrl)}" target="_blank" rel="noopener noreferrer">Search The Whisky Exchange</a>
	                </div>
	                ${product.notes ? `<div class="neat-tasting-notes">
	                  <p class="neat-tasting-overview">${escapeHtml(product.notes.overview)}</p>
	                  <div class="neat-tasting-grid">
	                    <section class="neat-tasting-section"><h4>Nose</h4><p>${escapeHtml(product.notes.nose)}</p></section>
	                    <section class="neat-tasting-section"><h4>Palate</h4><p>${escapeHtml(product.notes.palate)}</p></section>
	                    <section class="neat-tasting-section"><h4>Finish</h4><p>${escapeHtml(product.notes.finish)}</p></section>
	                  </div>
	                </div>` : ''}
	                ${facts.length ? `<div class="neat-library-facts">${facts.map((fact) => `<span>${escapeHtml(fact)}</span>`).join('')}</div>` : ''}
	                <label class="neat-personal-notes"><span class="form-label">My Notes</span><textarea class="text-area" data-bottle-note="${escapeHtml(bottle.id)}" placeholder="Add tasting notes, favorite pours, or a special occasion">${escapeHtml(bottle.notes || '')}</textarea></label>
	              </div>` : ''}
	            </article>`;
	          };
	          const categories = unique(bottles.map((bottle) => bottle.base)).sort((a, b) => {
	            const aIndex = BAR_BASE_ORDER.indexOf(a);
	            const bIndex = BAR_BASE_ORDER.indexOf(b);
	            if (aIndex !== bIndex) return (aIndex < 0 ? Number.MAX_SAFE_INTEGER : aIndex) - (bIndex < 0 ? Number.MAX_SAFE_INTEGER : bIndex);
	            return displayBaseLabel(a).localeCompare(displayBaseLabel(b));
	          });
	          $('#neatPoursGrid').innerHTML = categories.map((base) => {
	            const categoryBottles = bottles.filter((bottle) => bottle.base === base).sort((a, b) => compareBarSubtypes(base, a.subtype, b.subtype) || a.name.localeCompare(b.name));
	            const countLabel = `${categoryBottles.length} bottle${categoryBottles.length === 1 ? '' : 's'}`;
	            return `<section class="neat-library-category" aria-label="${escapeHtml(displayBaseLabel(base))} neat pours">
	              <div class="neat-library-category-header"><h3>${escapeHtml(displayBaseLabel(base))}</h3><span>${escapeHtml(countLabel)}</span></div>
	              <div class="neat-library-category-list">${categoryBottles.map(bottleHtml).join('')}</div>
	            </section>`;
	          }).join('') || '<p class="my-bar-results-empty">No neat pours are currently available in My Bar.</p>';
	        }

function bottleBaseOptionsHtml(selectedBase) {
	          return BAR_BASE_ORDER.map((base) => `<option value="${escapeHtml(base)}"${base === selectedBase ? ' selected' : ''}>${escapeHtml(displayBaseLabel(base))}</option>`).join('');
	        }

function bottleSubtypeOptionsHtml(base, selectedSubtype) {
	          const available = barSubtypeOptionsFor(base);
	          const options = selectedSubtype && !available.includes(selectedSubtype) ? [selectedSubtype, ...available] : available;
	          return options.length
	            ? options.map((subtype) => `<option value="${escapeHtml(subtype)}"${subtype === selectedSubtype ? ' selected' : ''}>${escapeHtml(subtypeLabel(base, subtype))}</option>`).join('')
	            : '<option value="">No specific sub-type</option>';
	        }

function editableBottleDetailHtml(bottle) {
	          const fixedTaste = fixedFlavoringTaste(bottle.base, bottle.subtype);
	          const fixedExpiration = bottle.base === 'Flavorings' && String(bottle.subtype || '').startsWith('Bitter,') ? bottleExpirationText(bottle) : '';
	          const subtypeDisabled = barSubtypeOptionsFor(bottle.base).length === 0 && !bottle.subtype;
	          return `<div class="bar-bottle-detail">
	            <div class="bar-bottle-fields">
	              <div class="bar-bottle-field-row bar-bottle-identity-row">
	                <label class="form-field bar-bottle-name-field"><span class="form-label">Name</span><input class="text-input" type="text" data-bottle-name="${escapeHtml(bottle.id)}" value="${escapeHtml(bottle.name)}" autocomplete="off" title="Edit the name or paste commercial bottle details"></label>
	                <label class="form-field"><span class="form-label">Type</span><select class="text-input" data-bottle-base="${escapeHtml(bottle.id)}">${bottleBaseOptionsHtml(bottle.base)}</select></label>
	                <label class="form-field"><span class="form-label">Sub-type</span><select class="text-input" data-bottle-subtype="${escapeHtml(bottle.id)}"${subtypeDisabled ? ' disabled' : ''}>${bottleSubtypeOptionsHtml(bottle.base, bottle.subtype || '')}</select></label>
	              </div>
	              <div class="bar-bottle-field-row bar-bottle-purchase-row">
	                <label class="form-field"><span class="form-label">Price</span><span class="bar-price-input"><input class="text-input" type="number" min="0" step="0.01" inputmode="decimal" data-bottle-price="${escapeHtml(bottle.id)}" value="${escapeHtml(bottle.price ?? '')}" placeholder="0.00"></span></label>
	                <label class="form-field"><span class="form-label">Location</span><input class="text-input" type="text" data-bottle-location="${escapeHtml(bottle.id)}" value="${escapeHtml(bottle.totalWineLocation || '')}" placeholder="Aisle, side, bay, shelf, or Backwall"></label>
	                <label class="form-field bar-bottle-product-url"><span class="form-label">URL</span><input class="text-input" type="url" data-bottle-url="${escapeHtml(bottle.id)}" value="${escapeHtml(bottle.totalWineUrl || '')}" placeholder="https://www.totalwine.com/.../p/..."></label>
	              </div>
	              <div class="bar-bottle-field-row bar-bottle-profile-row">
	                <label class="form-field"><span class="form-label">ABV</span><input class="text-input" type="number" min="0" max="100" step="0.1" inputmode="decimal" data-bottle-abv="${escapeHtml(bottle.id)}" value="${escapeHtml(bottle.abv ?? '')}" placeholder="40"></label>
	                <label class="form-field"><span class="form-label">Country</span><input class="text-input" type="text" data-bottle-country="${escapeHtml(bottle.id)}" value="${escapeHtml(bottle.country || '')}" placeholder="Country of origin"></label>
	                <label class="form-field bar-bottle-taste"><span class="form-label">Taste</span><input class="text-input" type="text" data-bottle-taste="${escapeHtml(bottle.id)}" value="${escapeHtml(defaultBottleTaste(bottle.base, bottle.subtype, bottle.taste))}" placeholder="Oak, woody, herb"${fixedTaste ? ' readonly title="Taste is set by this Flavorings type"' : ''}></label>
	                <label class="form-field"><span class="form-label">Storage</span><select class="text-input" data-bottle-storage="${escapeHtml(bottle.id)}"><option value="bar"${bottleStorageValue(bottle) === 'bar' ? ' selected' : ''}>Bar</option><option value="freezer"${bottleStorageValue(bottle) === 'freezer' ? ' selected' : ''}>Freezer</option><option value="fridge"${bottleStorageValue(bottle) === 'fridge' ? ' selected' : ''}>Fridge</option></select></label>
	                ${fixedExpiration
	                  ? `<label class="form-field"><span class="form-label">Shelf life</span><input class="text-input" type="text" value="${escapeHtml(fixedExpiration)}" readonly title="Shelf life for cocktail bitters"></label>`
	                  : `<label class="form-field"><span class="form-label">Expiration (months)</span><input class="text-input" type="number" min="0.25" step="0.25" inputmode="decimal" data-bottle-expiration="${escapeHtml(bottle.id)}" value="${escapeHtml(bottleExpirationValue(bottle))}" placeholder="No set expiration"></label>`}
	              </div>
	            </div>
	            <label class="form-field"><span class="form-label">Notes</span><textarea class="text-area" data-bottle-note="${escapeHtml(bottle.id)}" placeholder="Add tasting notes, favorite pours, or a special occasion">${escapeHtml(bottle.notes || '')}</textarea></label>
	          </div>`;
	        }

function bottleHeaderPasteHtml(bottle) {
	          return `<label class="bar-bottle-header-paste"><span class="visually-hidden">Paste bottle details for ${escapeHtml(bottle.name)}</span><textarea class="text-area bar-bottle-paste-box" data-bottle-paste="${escapeHtml(bottle.id)}" placeholder="Paste bottle details here to autofill the fields below"></textarea></label>`;
	        }

function ownedBottleHtml(bottle, exactRecommendation = null) {
	          const subtype = bottleStyleName(bottle);
	          const missingInfo = missingBottleInfo(bottle);
	          const complete = missingInfo.length === 0;
	          const isSipping = bottle.purpose === 'sipping';
	          const mixConfigured = bottleAllowsCocktailUse(bottle);
	          const mixAvailable = isMixingBottle(bottle);
	          const cocktailCount = mixAvailable ? COCKTAILS.filter((cocktail) => cocktailUsesBottle(cocktail, bottle)).length : 0;
	          const expanded = state.barExpandedBottle === bottle.id;
	          const outOfStock = bottle.shoppingList === true;
	          const futureAvailable = outOfStock && state.futureBarPreview;
	          const preparationInfo = bottlePreparationInfo(bottle);
	          const preparationInfoButton = preparationInfo ? `<button class="info-button bottle-info-button" type="button" data-info-title="${escapeHtml(bottle.name)}" data-info="${escapeHtml(preparationInfo)}" aria-label="How to make ${escapeHtml(bottle.name)}" aria-expanded="false" aria-controls="infoPopover">i</button>` : '';
	          const purchaseLabel = `[${formatBottlePrice(bottle.price) || 'Price'}: ${bottle.totalWineLocation || 'Location'}]`;
	          const purchaseUrl = /^https?:\/\//i.test(bottle.totalWineUrl || '') ? bottle.totalWineUrl : totalWineSearchUrl(bottle.name);
	          const copy = `<div class="bar-bottle-copy">
	            <span class="bar-bottle-title-line">
	              <span class="bar-bottle-name">${escapeHtml(bottle.name)}</span>
	              ${preparationInfoButton}
	            </span>
	            <span class="bar-bottle-type-line">
	              <button type="button" class="bar-bottle-subtype bar-bottle-type-edit" data-edit-bottle="${escapeHtml(bottle.id)}" title="Change bottle type" aria-label="Change base or type for ${escapeHtml(bottle.name)}">${escapeHtml(subtype)}</button>
	              ${bottleStorageHtml(bottle)}
	            </span>
	            <a class="bar-bottle-purchase bar-bottle-purchase-line" href="${escapeHtml(purchaseUrl)}" target="_blank" rel="noopener noreferrer" title="Open at Total Wine &amp; More">${escapeHtml(purchaseLabel)}</a>
	          </div>`;
	          const headerPaste = expanded ? bottleHeaderPasteHtml(bottle) : '';
	          const detail = expanded ? editableBottleDetailHtml(bottle) : '';
	          return `<article class="bar-bottle-row owned ${complete ? 'complete' : 'incomplete'}${outOfStock ? ' out-of-stock' : ''}${futureAvailable ? ' future-available' : ''}${expanded ? ' expanded' : ''}" data-bottle-row="${escapeHtml(bottle.id)}" aria-expanded="${expanded}">
	            <span class="bar-bottle-left">
	              <span class="bar-bottle-indicator" aria-label="${complete ? 'Bottle information complete' : `Missing ${escapeHtml(missingInfo.join(', '))}`}" title="${complete ? 'Bottle information complete' : `Missing: ${escapeHtml(missingInfo.join(', '))}`}">${complete ? '✓' : '?'}</span>
	            </span>
	            ${copy}
	            ${headerPaste}
	            <span class="bar-bottle-actions">
	              <span class="bar-bottle-action-row">
	                <span class="bar-purpose-control" aria-label="Bottle use">
	                  <label class="bar-purpose-option neat" title="Include in Neat Pours"><input type="checkbox" data-bottle-purpose="${escapeHtml(bottle.id)}" ${isSipping ? 'checked' : ''}><span>Neat</span></label>
	                  <label class="bar-purpose-option mix" title="Allow in cocktails"><input type="checkbox" data-bottle-cocktail-use="${escapeHtml(bottle.id)}" ${mixConfigured ? 'checked' : ''}><span>Mix</span></label>
	                </span>
	                <button type="button" data-remove-bottle="${escapeHtml(bottle.id)}" aria-label="Permanently delete ${escapeHtml(bottle.name)}" title="Delete permanently">×</button>
	              </span>
	              <span class="bar-bottle-action-row">
	                <button type="button" class="${bottle.favorite ? 'active' : ''}" data-favorite-bottle="${escapeHtml(bottle.id)}" aria-pressed="${bottle.favorite}" aria-label="${bottle.favorite ? 'Remove' : 'Mark'} ${escapeHtml(bottle.name)} as a favorite" title="${bottle.favorite ? 'Remove favorite' : 'Favorite'}">${bottle.favorite ? '★' : '☆'}</button>
	                <span class="bar-recommendation-marker${exactRecommendation ? ' active' : ''}" role="img" aria-label="${exactRecommendation ? 'Recommended bottle' : 'Not a recommended bottle'}" title="${exactRecommendation ? 'Recommended bottle' : 'Not on the recommended list'}">${__LIGHTBULB_MAX_FILL}</span>
	                <button type="button" class="${mixAvailable ? 'active' : ''}" data-filter-bottle-cocktails="${escapeHtml(bottle.id)}" aria-label="${mixAvailable ? `Show ${cocktailCount} cocktail${cocktailCount === 1 ? '' : 's'} using ${escapeHtml(bottle.name)}` : outOfStock && mixConfigured ? `${escapeHtml(bottle.name)} is out of stock` : `Mark ${escapeHtml(bottle.name)} as Mix to show its cocktails`}" title="${mixAvailable ? `Show cocktails using this bottle (${cocktailCount})` : outOfStock && mixConfigured ? 'Restock to show cocktails' : 'Available for Mix bottles'}"${mixAvailable ? '' : ' disabled'}>${__MUG_FILL}</button>
	              </span>
	              <span class="bar-bottle-action-row">
	                ${outOfStock ? `<span class="bar-availability">${futureAvailable ? 'Future' : 'Out'}</span>` : '<span class="bar-action-spacer" aria-hidden="true"></span>'}
	                <button type="button" class="${outOfStock ? 'active' : ''}" data-toggle-bottle-shopping="${escapeHtml(bottle.id)}" aria-pressed="${outOfStock}" aria-label="Mark ${escapeHtml(bottle.name)} ${outOfStock ? 'restocked' : 'ran out and add to Shopping List'}" title="${outOfStock ? 'Mark restocked' : 'Ran out - add to Shopping List'}">${__BAG_FILL}</button>
	                <button type="button" class="${bottleHas375mlOption(bottle.name, bottle.has375ml) ? 'active' : ''}" data-bottle-small-size="${escapeHtml(bottle.id)}" aria-pressed="${bottleHas375mlOption(bottle.name, bottle.has375ml)}" aria-label="${bottleHas375mlOption(bottle.name, bottle.has375ml) ? '375ml size available' : 'Mark 375ml size as available'} for ${escapeHtml(bottle.name)}" title="${bottleHas375mlOption(bottle.name, bottle.has375ml) ? '375ml option available in Aisle 08' : 'Mark 375ml option available'}">${__ALIGN_VERTICAL_BOTTOM_FILL}</button>
	                <span class="bar-action-spacer" aria-hidden="true"></span>
	              </span>
	            </span>
	            ${detail}
	          </article>`;
	        }

function recommendationCoverage(recommendation) {
	          const recommendationName = norm(recommendation.name);
	          return store.bar.find((bottle) => {
	            if (recommendation.sourceBottleId && bottle.id === recommendation.sourceBottleId) return false;
	            if (!isMixingBottle(bottle) || bottle.base !== recommendation.base) return false;
	            const bottleName = norm(bottle.name);
	            const namedMatch = bottleName.length >= 5 && (recommendationName.includes(bottleName) || bottleName.includes(recommendationName));
	            if (namedMatch) return true;
	            return recommendation.comparable === null || recommendation.comparable.includes(bottle.subtype);
	          }) || null;
	        }

function customRecommendationModel(bottle) {
	          return {
	            ...bottle,
	            id: `saved-${bottle.id}`,
	            sourceBottleId: bottle.id,
	            type: bottleStyleName(bottle),
	            url: /^https?:\/\//i.test(bottle.totalWineUrl || '') ? bottle.totalWineUrl : totalWineSearchUrl(bottle.name),
	            location: bottle.totalWineLocation || '',
	            comparable: bottle.subtype ? [bottle.subtype] : null,
	            badge: 'Rec',
	            order: 1000
	          };
	        }

function allRecommendedBottles() {
	          const saved = store.bar.filter((bottle) => bottle.kind !== 'ingredient' && bottle.recommended === true).map(customRecommendationModel);
	          const savedNames = new Set(saved.map((bottle) => norm(bottle.name)));
	          const savedSourceIds = new Set(saved.map((bottle) => bottle.recommendationSourceId).filter(Boolean));
	          return [...RECOMMENDED_BOTTLES.filter((bottle) => !savedNames.has(norm(bottle.name)) && !savedSourceIds.has(bottle.id)), ...saved];
	        }

function ensureSavedRecommendation(recommendationId) {
	          const recommendation = allRecommendedBottles().find((item) => item.id === recommendationId);
	          if (!recommendation) return null;
	          if (recommendation.sourceBottleId) return store.bar.find((bottle) => bottle.id === recommendation.sourceBottleId) || null;
	          const saved = {
	            id: `bar-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
	            kind: 'spirit', name: recommendation.name, base: recommendation.base, subtype: recommendation.subtype || '',
	            purpose: recommendation.purpose === 'sipping' ? 'sipping' : 'mixing', useInCocktails: recommendation.useInCocktails === true,
	            notes: recommendation.notes || '', favorite: recommendation.favorite === true, shoppingList: recommendation.shoppingList === true, recommended: true,
	            recommendationSourceId: recommendation.recommendationSourceId || recommendation.id,
	            price: normalizeBottlePrice(recommendation.price), totalWineLocation: recommendation.location || '', totalWineUrl: recommendation.url || '',
	            country: recommendation.country || '', abv: defaultBottleAbv(recommendation.base, recommendation.subtype, recommendation.abv), taste: defaultBottleTaste(recommendation.base, recommendation.subtype, recommendation.taste),
	            storage: normalizeBottleStorage(recommendation.storage) || defaultBottleStorage(recommendation.base, recommendation.subtype, recommendation.name),
	            expirationMonths: normalizeExpirationMonths(recommendation.expirationMonths) || defaultExpirationMonths(recommendation.base, recommendation.subtype, recommendation.name),
	            has375ml: bottleHas375mlOption(recommendation.name, recommendation.has375ml)
	          };
	          store.bar.push(saved);
	          if (state.barExpandedRecommendation === recommendationId) state.barExpandedRecommendation = `saved-${saved.id}`;
	          return saved;
	        }

function shoppingBottleHtml(bottle) {
	          const purchaseUrl = /^https?:\/\//i.test(bottle.totalWineUrl || '') ? bottle.totalWineUrl : totalWineSearchUrl(bottle.name);
	          const price = formatBottlePrice(bottle.price) || 'Price not set';
	          const location = bottle.totalWineLocation || 'Location not set';
	          const extraDetails = [bottleHas375mlOption(bottle.name, bottle.has375ml) ? '375ml option: Aisle 08' : '', 'Restock'].filter(Boolean);
	          const details = [price, location, ...extraDetails].join(' · ');
	          return `<article class="bar-bottle-row shopping-item shopping-restock">
	            <button type="button" class="recommended-left-action" data-toggle-bottle-shopping="${escapeHtml(bottle.id)}" aria-label="Mark ${escapeHtml(bottle.name)} restocked" title="Mark restocked">+</button>
	            <span class="shopping-item-copy">
	              <span class="shopping-item-primary"><button type="button" class="bar-bottle-name" data-shopping-bottle-cocktails="${escapeHtml(bottle.id)}" aria-label="Show cocktails using ${escapeHtml(bottle.name)}" title="Show cocktails using this bottle">${escapeHtml(bottle.name)}</button><span class="shopping-item-type">${escapeHtml(bottleStyleName(bottle))}</span></span>
	              <span class="shopping-item-secondary" title="${escapeHtml(details)}"><span>${escapeHtml(price)}</span><span aria-hidden="true">·</span><a class="shopping-location-link" href="${escapeHtml(purchaseUrl)}" target="_blank" rel="noopener noreferrer" title="Open ${escapeHtml(bottle.name)} at Total Wine &amp; More">${escapeHtml(location)}</a>${extraDetails.map((detail) => `<span aria-hidden="true">·</span><span>${escapeHtml(detail)}</span>`).join('')}</span>
	            </span>
	            <span class="bar-bottle-actions"><span class="bar-bottle-action-row">
	              <button type="button" class="${bottleHas375mlOption(bottle.name, bottle.has375ml) ? 'active' : ''}" data-bottle-small-size="${escapeHtml(bottle.id)}" aria-pressed="${bottleHas375mlOption(bottle.name, bottle.has375ml)}" aria-label="${bottleHas375mlOption(bottle.name, bottle.has375ml) ? '375ml size available' : 'Mark 375ml size as available'} for ${escapeHtml(bottle.name)}" title="${bottleHas375mlOption(bottle.name, bottle.has375ml) ? '375ml option available in Aisle 08' : 'Mark 375ml option available'}">${__ALIGN_VERTICAL_BOTTOM_FILL}</button>
	              <button type="button" class="shopping-remove-button" data-toggle-bottle-shopping="${escapeHtml(bottle.id)}" aria-label="Remove ${escapeHtml(bottle.name)} from Shopping List" title="Remove from Shopping List">×</button>
	            </span></span>
	          </article>`;
	        }

function shoppingRecommendationHtml(recommendation) {
	          const type = subtypeLabel(recommendation.base, recommendation.subtype || '') || recommendation.type || displayBaseLabel(recommendation.base);
	          const purchaseUrl = /^https?:\/\//i.test(recommendation.url || '') ? recommendation.url : totalWineSearchUrl(recommendation.name);
	          const price = formatBottlePrice(recommendation.price) || 'Price not set';
	          const location = recommendation.location || 'Location not set';
	          const extraDetails = [bottleHas375mlOption(recommendation.name, recommendation.has375ml) ? '375ml option: Aisle 08' : '', 'Recommended'].filter(Boolean);
	          const details = [price, location, ...extraDetails].join(' · ');
	          return `<article class="bar-bottle-row shopping-item recommended">
	            <span class="bar-bottle-left">
	              <button class="recommended-left-action" type="button" data-add-recommended="${escapeHtml(recommendation.id)}" aria-label="Add ${escapeHtml(recommendation.name)} to My Bar" title="Add to My Bar">+</button>
	            </span>
	            <span class="shopping-item-copy">
	              <span class="shopping-item-primary"><button type="button" class="bar-bottle-name" data-shopping-recommendation-cocktails="${escapeHtml(recommendation.id)}" aria-label="Show cocktails using ${escapeHtml(recommendation.name)}" title="Show cocktails using this bottle">${escapeHtml(recommendation.name)}</button><span class="shopping-item-type">${escapeHtml(type)}</span></span>
	              <span class="shopping-item-secondary" title="${escapeHtml(details)}"><span>${escapeHtml(price)}</span><span aria-hidden="true">·</span><a class="shopping-location-link" href="${escapeHtml(purchaseUrl)}" target="_blank" rel="noopener noreferrer" title="Open ${escapeHtml(recommendation.name)} at Total Wine &amp; More">${escapeHtml(location)}</a>${extraDetails.map((detail) => `<span aria-hidden="true">·</span><span>${escapeHtml(detail)}</span>`).join('')}</span>
	            </span>
	            <span class="bar-bottle-actions"><span class="bar-bottle-action-row">
	              <button type="button" class="${bottleHas375mlOption(recommendation.name, recommendation.has375ml) ? 'active' : ''}" data-recommendation-small-size="${escapeHtml(recommendation.id)}" aria-pressed="${bottleHas375mlOption(recommendation.name, recommendation.has375ml)}" aria-label="${bottleHas375mlOption(recommendation.name, recommendation.has375ml) ? '375ml size available' : 'Mark 375ml size as available'} for ${escapeHtml(recommendation.name)}" title="${bottleHas375mlOption(recommendation.name, recommendation.has375ml) ? '375ml option available in Aisle 08' : 'Mark 375ml option available'}">${__ALIGN_VERTICAL_BOTTOM_FILL}</button>
	              <button type="button" class="shopping-remove-button" data-toggle-recommended-shopping="${escapeHtml(recommendation.id)}" aria-label="Remove ${escapeHtml(recommendation.name)} from Shopping List" title="Remove from Shopping List">×</button>
	            </span></span>
	          </article>`;
	        }

function recommendationDetailHtml(recommendation) {
	          const price = formatBottlePrice(recommendation.price) || 'Not set';
	          const location = recommendation.location || 'Not set';
	          const url = /^https?:\/\//i.test(recommendation.url || '') ? recommendation.url : totalWineSearchUrl(recommendation.name);
	          const abv = defaultBottleAbv(recommendation.base, recommendation.subtype || '', recommendation.abv);
	          const taste = defaultBottleTaste(recommendation.base, recommendation.subtype || '', recommendation.taste);
	          const storage = titleWords(bottleStorageValue(recommendation) || 'bar');
	          const expiration = bottleExpirationText(recommendation);
	          const notes = recommendation.notes || subtypeInfo(recommendation.base, recommendation.subtype || '') || BASE_INFO[recommendation.base] || '';
	          const field = (label, value, href = '') => `<span class="bar-recommendation-field"><span class="form-label">${escapeHtml(label)}</span>${href
	            ? `<a class="bar-recommendation-value" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(value)}</a>`
	            : `<span class="bar-recommendation-value" title="${escapeHtml(value)}">${escapeHtml(value)}</span>`}</span>`;
	          return `<div class="bar-bottle-detail">
	            <div class="bar-bottle-fields">
	              <div class="bar-bottle-field-row bar-bottle-purchase-row">
	                ${field('Price', price)}
	                ${field('Location', location)}
	                ${field('URL', 'Total Wine & More', url)}
	              </div>
	              <div class="bar-bottle-field-row bar-bottle-profile-row">
	                ${field('ABV', abv === '' ? 'Not set' : `${abv}%`)}
	                ${field('Country', recommendation.country || 'Not set')}
	                ${field('Taste', taste || 'Not set')}
	                ${field('Storage', storage)}
	                ${field('Shelf life', expiration || 'No set expiration')}
	              </div>
	            </div>
	            ${notes ? `<p class="bar-recommendation-notes">${escapeHtml(notes)}</p>` : ''}
	          </div>`;
	        }

function recommendationMissingInfo(recommendation, sourceBottle = null) {
	          const infoBottle = sourceBottle || {
	            name: recommendation.name,
	            base: recommendation.base,
	            subtype: recommendation.subtype || '',
	            price: recommendation.price,
	            totalWineLocation: recommendation.location || '',
	            country: recommendation.country || '',
	            abv: defaultBottleAbv(recommendation.base, recommendation.subtype || '', recommendation.abv),
	            taste: defaultBottleTaste(recommendation.base, recommendation.subtype || '', recommendation.taste)
	          };
	          return missingBottleInfo(infoBottle);
	        }

function recommendedBottleHtml(recommendation) {
	          const coverage = recommendationCoverage(recommendation);
	          const sourceBottle = recommendation.sourceBottleId ? store.bar.find((bottle) => bottle.id === recommendation.sourceBottleId) : null;
	          const preferenceBottle = sourceBottle || {...recommendation, kind: 'spirit', purpose: 'mixing', useInCocktails: false, favorite: false, recommended: true};
	          const isSipping = preferenceBottle.purpose === 'sipping';
	          const mixEnabled = bottleAllowsCocktailUse(preferenceBottle);
	          const lookupBottle = cocktailLookupBottle(preferenceBottle);
	          const cocktailCount = lookupBottle ? COCKTAILS.filter((cocktail) => cocktailUsesBottle(cocktail, lookupBottle)).length : 0;
	          const inShoppingList = sourceBottle?.shoppingList === true;
	          const futureIncluded = state.futureBarPreview && inShoppingList;
	          const covered = Boolean(coverage) || futureIncluded;
	          const type = subtypeLabel(recommendation.base, recommendation.subtype || '') || recommendation.type || displayBaseLabel(recommendation.base);
	          const purchaseLabel = `[${formatBottlePrice(recommendation.price) || 'Price'}: ${recommendation.location || 'Location'}]`;
	          const status = futureIncluded ? 'In future bar' : coverage ? `Covered by ${coverage.name}` : 'Recommended';
	          const expanded = state.barExpandedRecommendation === recommendation.id;
	          const missingInfo = recommendationMissingInfo(recommendation, sourceBottle);
	          const complete = missingInfo.length === 0;
	          const name = `<button type="button" class="bar-bottle-name bar-tag-name" data-edit-recommendation="${escapeHtml(recommendation.id)}" aria-label="Edit ${escapeHtml(recommendation.name)} recommendation" title="Edit recommendation">${escapeHtml(recommendation.name)}</button>`;
	          const headerPaste = expanded && sourceBottle ? bottleHeaderPasteHtml(sourceBottle) : '';
	          return `<article class="bar-bottle-row recommended${covered ? ' covered' : ''}${expanded ? ' expanded' : ''}" data-recommendation-row="${escapeHtml(recommendation.id)}" aria-expanded="${expanded}">
	            <span class="bar-bottle-left">
	              <span class="recommended-left-state ${complete ? 'complete' : 'incomplete'}" aria-label="${complete ? 'Bottle information complete' : `Missing ${escapeHtml(missingInfo.join(', '))}`}" title="${complete ? 'Bottle information complete' : `Missing: ${escapeHtml(missingInfo.join(', '))}`}">${complete ? '✓' : '?'}</span>
	            </span>
	            <span class="bar-bottle-copy">
	              <span class="bar-bottle-title-line">${name}</span>
	              <span class="bar-bottle-type-line"><button type="button" class="bar-bottle-subtype bar-bottle-type-edit" data-edit-recommendation="${escapeHtml(recommendation.id)}" title="Edit recommendation type" aria-label="Edit type for ${escapeHtml(recommendation.name)}">${escapeHtml(type)}</button><span class="recommended-dot" aria-hidden="true">·</span><span class="bar-bottle-meta"><span class="bar-bottle-meta-text">${escapeHtml(status)}</span></span>${bottleStorageHtml(recommendation)}</span>
	              <a class="bar-bottle-purchase bar-bottle-purchase-line" href="${escapeHtml(recommendation.url)}" target="_blank" rel="noopener noreferrer" title="Open at Total Wine &amp; More">${escapeHtml(purchaseLabel)}</a>
	            </span>
	            ${headerPaste}
	            <span class="bar-bottle-actions">
	              <span class="bar-bottle-action-row">
	                <span class="bar-purpose-control" aria-label="Recommended bottle use">
	                  <label class="bar-purpose-option neat" title="Plan for Neat Pours"><input type="checkbox" data-recommendation-purpose="${escapeHtml(recommendation.id)}" ${isSipping ? 'checked' : ''}><span>Neat</span></label>
	                  <label class="bar-purpose-option mix" title="Plan for cocktails"><input type="checkbox" data-recommendation-cocktail-use="${escapeHtml(recommendation.id)}" ${mixEnabled ? 'checked' : ''}><span>Mix</span></label>
	                </span>
	                ${recommendation.sourceBottleId ? `<button type="button" data-remove-bottle="${escapeHtml(recommendation.sourceBottleId)}" aria-label="Remove ${escapeHtml(recommendation.name)} recommendation" title="Remove recommendation">×</button>` : '<span class="bar-action-spacer" aria-hidden="true"></span>'}
	              </span>
	              <span class="bar-bottle-action-row">
	                <button type="button" class="${preferenceBottle.favorite ? 'active' : ''}" data-favorite-recommendation="${escapeHtml(recommendation.id)}" aria-pressed="${preferenceBottle.favorite === true}" aria-label="${preferenceBottle.favorite ? 'Remove' : 'Mark'} ${escapeHtml(recommendation.name)} as a favorite" title="${preferenceBottle.favorite ? 'Remove favorite' : 'Favorite'}">${preferenceBottle.favorite ? '★' : '☆'}</button>
	                <span class="bar-recommendation-marker active" role="img" aria-label="Recommended bottle" title="Recommended bottle">${__LIGHTBULB_MAX_FILL}</span>
	                <button type="button" class="${mixEnabled ? 'active' : ''}" data-filter-recommendation-cocktails="${escapeHtml(recommendation.id)}" aria-label="${mixEnabled ? `Show ${cocktailCount} cocktail${cocktailCount === 1 ? '' : 's'} using ${escapeHtml(recommendation.name)}` : `Mark ${escapeHtml(recommendation.name)} as Mix to show its cocktails`}" title="${mixEnabled ? `Show cocktails using this bottle (${cocktailCount})` : 'Available for Mix bottles'}"${mixEnabled ? '' : ' disabled'}>${__MUG_FILL}</button>
	              </span>
	              <span class="bar-bottle-action-row">
	                <span class="bar-action-spacer" aria-hidden="true"></span>
	                <button type="button" class="${inShoppingList ? 'active' : ''}" data-toggle-recommended-shopping="${escapeHtml(recommendation.id)}" aria-pressed="${inShoppingList}" aria-label="${inShoppingList ? 'Remove' : 'Add'} ${escapeHtml(recommendation.name)} ${inShoppingList ? 'from' : 'to'} Shopping List" title="${inShoppingList ? 'Remove from' : 'Add to'} Shopping List">${__BAG_FILL}</button>
	                <button type="button" class="${bottleHas375mlOption(preferenceBottle.name, preferenceBottle.has375ml) ? 'active' : ''}" data-recommendation-small-size="${escapeHtml(recommendation.id)}" aria-pressed="${bottleHas375mlOption(preferenceBottle.name, preferenceBottle.has375ml)}" aria-label="${bottleHas375mlOption(preferenceBottle.name, preferenceBottle.has375ml) ? '375ml size available' : 'Mark 375ml size as available'} for ${escapeHtml(recommendation.name)}" title="${bottleHas375mlOption(preferenceBottle.name, preferenceBottle.has375ml) ? '375ml option available in Aisle 08' : 'Mark 375ml option available'}">${__ALIGN_VERTICAL_BOTTOM_FILL}</button>
	                <button type="button" class="recommended-quick-add" data-add-recommended="${escapeHtml(recommendation.id)}" aria-label="Quick add ${escapeHtml(recommendation.name)} to My Bar" title="Quick add to My Bar">${__PLUS_SQUARE_FILL}</button>
	              </span>
	            </span>
	            ${expanded ? (sourceBottle ? editableBottleDetailHtml(sourceBottle) : recommendationDetailHtml(recommendation)) : ''}
	          </article>`;
	        }

function renderBarList() {
	          const recommendationView = ['all', 'owned', 'recommended'].includes(state.barRecommendationView) ? state.barRecommendationView : 'all';
	          $('#barBottleList').classList.toggle('grouped-categories', state.barGroupBySubtype);
	          const spirits = recommendationView === 'recommended'
	            ? []
	            : store.bar.filter((bottle) => bottle.kind !== 'ingredient' && bottle.recommended !== true);
	          const restockNames = new Set(store.bar.filter((bottle) => bottle.kind !== 'ingredient' && bottle.shoppingList === true && bottle.recommended !== true).map((bottle) => norm(bottle.name)));
	          const subtypeToggle = $('#barSubtypeGroupToggle');
	          subtypeToggle.innerHTML = __LIST_BULLET_INDENT;
	          subtypeToggle.setAttribute('aria-pressed', String(state.barGroupBySubtype));
	          subtypeToggle.setAttribute('aria-label', state.barGroupBySubtype ? 'Show bottles without subtype groups' : 'Group bottles by subtype');
	          subtypeToggle.title = state.barGroupBySubtype ? 'Ungroup subtypes' : 'Group by subtype';
	          const recommendationsToggle = $('#barRecommendationsToggle');
	          const recommendationViewUi = {
	            all: {icon: __LIGHTBULB_FILL, label: 'Owned and recommended bottles', next: 'hide recommendations'},
	            owned: {icon: __LIGHTBULB, label: 'Recommendations hidden', next: 'show only recommendations'},
	            recommended: {icon: __LIGHTBULB_MAX_FILL, label: 'Only recommended bottles', next: 'show owned and recommended bottles'}
	          }[recommendationView];
	          recommendationsToggle.innerHTML = recommendationViewUi.icon;
	          recommendationsToggle.dataset.recommendationView = recommendationView;
	          recommendationsToggle.setAttribute('aria-label', `${recommendationViewUi.label}. Select to ${recommendationViewUi.next}`);
	          recommendationsToggle.title = `${recommendationViewUi.label} · Next: ${recommendationViewUi.next}`;
	          const barQuery = norm(state.barQ);
	          const matchesBarQuery = (item) => !barQuery || norm([
	            item.name,
	            displayBaseLabel(item.base),
	            subtypeLabel(item.base, item.subtype || ''),
	            item.type,
	            item.totalWineLocation,
	            item.location
	          ].filter(Boolean).join(' ')).includes(barQuery);
	          const categorySections = BAR_BASE_ORDER.map((base) => {
	            const ownedBaseCount = store.bar.filter((bottle) => bottle.kind !== 'ingredient' && bottle.recommended !== true && bottle.base === base).length;
	            const bottles = spirits.filter((bottle) => bottle.base === base && matchesBarQuery(bottle));
	            const outOfStockCount = bottles.filter((bottle) => bottle.shoppingList === true).length;
	            const allRecommendations = allRecommendedBottles().filter((recommendation) => recommendation.base === base)
	              .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
	            const recommendations = recommendationView === 'owned' ? [] : allRecommendations.filter(matchesBarQuery);
	            const exactRecommendationFor = (bottle) => allRecommendations.find((recommendation) => norm(recommendation.name) === norm(bottle.name)) || null;
	            const visibleRecommendations = recommendations.filter((recommendation) => {
	              if (restockNames.has(norm(recommendation.name))) return false;
	              const coverage = recommendationCoverage(recommendation);
	              return !coverage || norm(coverage.name) !== norm(recommendation.name);
	            });
	            const rows = [
	              ...bottles.map((bottle) => ({subtype: bottle.subtype, name: bottle.name, expanded: state.barExpandedBottle === bottle.id, html: ownedBottleHtml(bottle, isMixingBottle(bottle) ? exactRecommendationFor(bottle) : null)})),
	              ...visibleRecommendations.map((recommendation) => ({subtype: recommendation.subtype || '', name: recommendation.name, expanded: state.barExpandedRecommendation === recommendation.id, html: recommendedBottleHtml(recommendation)}))
	            ].sort((a, b) => compareBarSubtypes(base, a.subtype, b.subtype) || a.name.localeCompare(b.name));
	            const hasExpandedBottle = rows.some((item) => item.expanded);
	            const categorySpan = hasExpandedBottle ? 4 : Math.max(1, Math.min(4, rows.length));
	            const categoryCompactSpan = hasExpandedBottle ? 2 : Math.max(1, Math.min(2, rows.length));
	            const bottleRows = state.barGroupBySubtype
	              ? `<div class="bar-subtype-groups">${Array.from(rows.reduce((groups, row) => {
	                  const key = row.subtype || '';
	                  if (!groups.has(key)) groups.set(key, []);
	                  groups.get(key).push(row);
	                  return groups;
	                }, new Map()), ([subtype, subtypeRows]) => {
	                  const hasExpandedBottle = subtypeRows.some((item) => item.expanded);
	                  const subtypeSpan = hasExpandedBottle ? 4 : Math.min(4, subtypeRows.length);
	                  const compactSpan = hasExpandedBottle ? 2 : Math.min(2, subtypeRows.length);
	                  return `<section class="bar-subtype-group${hasExpandedBottle ? ' has-expanded' : ''}" style="--bar-subtype-span:${subtypeSpan};--bar-subtype-span-compact:${compactSpan}">
	                  <div class="bar-subtype-header"><h5>${escapeHtml(subtypeLabel(base, subtype) || displayBaseLabel(base))}</h5><span>${subtypeRows.length}</span></div>
	                  <div class="bar-bottle-stack">${subtypeRows.map((item) => item.html).join('')}</div>
	                </section>`;
	                }).join('')}</div>`
	              : `<div class="bar-bottle-stack">${rows.map((item) => item.html).join('')}</div>`;
	            const categoryMeta = [
	              recommendationView !== 'recommended'
	                ? (state.futureBarPreview && outOfStockCount ? `${bottles.length} future bar · ${outOfStockCount} from list` : outOfStockCount ? `${bottles.length - outOfStockCount} available · ${outOfStockCount} out` : `${bottles.length} in bar`)
	                : '',
	              recommendationView !== 'owned' && visibleRecommendations.length ? `${visibleRecommendations.length} recommended` : ''
	            ].filter(Boolean).join(' · ') || 'No bottles';
	            const baseInfoTable = BASE_INFO_TABLES[base] ? ` data-info-table="${escapeHtml(base)}"` : '';
	            const categoryInfoButton = BASE_INFO[base]
	              ? `<button class="info-button base" type="button" data-info-title="${escapeHtml(displayBaseLabel(base))}" data-info="${escapeHtml(BASE_INFO[base])}"${baseInfoTable} aria-label="About ${escapeHtml(displayBaseLabel(base))}" aria-expanded="false" aria-controls="infoPopover">i</button>`
	              : '';
	            const html = `<section class="bar-category${rows.length ? '' : ' is-empty'}" id="bar-category-${classToken(base)}" style="--bar-category-span:${categorySpan};--bar-category-span-compact:${categoryCompactSpan}">
	              <div class="bar-category-header">
	                <h4>${escapeHtml(displayBaseLabel(base))}</h4>
	                ${categoryInfoButton}
	                <span class="bar-category-meta">${escapeHtml(categoryMeta)}</span>
	              </div>
	              ${bottleRows}
	            </section>`;
	            return {empty: ownedBaseCount === 0, html};
	          }).sort((a, b) => Number(a.empty) - Number(b.empty)).map((category) => category.html).join('');
	          const emptyMessage = state.barQ
	            ? `No bottles match “${escapeHtml(state.barQ)}”.`
	            : recommendationView === 'recommended' ? 'No bottle recommendations to show.' : 'No bottles logged.';
	          $('#barBottleList').innerHTML = categorySections || `<p class="shopping-list-empty">${emptyMessage}</p>`;
	        }

function showBottleCocktails(bottleId) {
	          const bottle = store.bar.find((item) => item.id === bottleId && isMixingBottle(item));
	          if (!bottle) return;
	          resetFilterState();
	          state.bottleUsageId = bottle.id;
	          state.bottleUsageOverride = null;
	          state.expanded.clear();
	          closeBarModal();
	          render();
	          $('.table-wrap')?.scrollIntoView({behavior: 'smooth', block: 'start'});
	        }

function showShoppingBottleCocktails(bottle) {
	          if (!bottle || bottle.kind === 'ingredient') return;
	          resetFilterState();
	          state.bottleUsageOverride = {
	            ...bottle,
	            id: `shopping-${bottle.id}`,
	            kind: 'spirit',
	            purpose: 'mixing',
	            useInCocktails: true,
	            recommended: false,
	            shoppingList: false
	          };
	          state.bottleUsageId = state.bottleUsageOverride.id;
	          state.expanded.clear();
	          closeShoppingListModal();
	          render();
	          $('.table-wrap')?.scrollIntoView({behavior: 'smooth', block: 'start'});
	        }

function showShoppingRecommendationCocktails(recommendationId) {
	          const recommendation = allRecommendedBottles().find((item) => item.id === recommendationId);
	          if (!recommendation) return;
	          showShoppingBottleCocktails({
	            ...recommendation,
	            id: `recommendation-${recommendation.id}`,
	            kind: 'spirit',
	            totalWineLocation: recommendation.location || '',
	            totalWineUrl: recommendation.url || ''
	          });
	        }

function showPantryIngredientCocktails(name) {
	          if (!name) return;
	          resetFilterState();
	          state.ingredients.add(name);
	          state.collapsed.ingredient = false;
	          state.expanded.clear();
	          closeBarModal();
	          render();
	          $('.table-wrap')?.scrollIntoView({behavior: 'smooth', block: 'start'});
	        }

function addRecommendedBottle(recommendationId) {
	          const recommendation = allRecommendedBottles().find((item) => item.id === recommendationId);
	          if (!recommendation) return;
	          if (recommendation.sourceBottleId) {
	            const saved = store.bar.find((bottle) => bottle.id === recommendation.sourceBottleId);
	            if (saved) {
	              saved.recommended = false;
	              saved.shoppingList = false;
	            }
	          } else store.bar.push({
	            id: `bar-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
	            kind: 'spirit', name: recommendation.name, base: recommendation.base, subtype: recommendation.subtype,
	            purpose: 'mixing', useInCocktails: false, notes: '', favorite: false, shoppingList: false, recommended: false,
	            price: normalizeBottlePrice(recommendation.price), totalWineLocation: recommendation.location || '', totalWineUrl: recommendation.url,
	            country: recommendation.country || '', abv: defaultBottleAbv(recommendation.base, recommendation.subtype, recommendation.abv), taste: defaultBottleTaste(recommendation.base, recommendation.subtype, recommendation.taste),
	            storage: normalizeBottleStorage(recommendation.storage) || defaultBottleStorage(recommendation.base, recommendation.subtype, recommendation.name),
	            expirationMonths: normalizeExpirationMonths(recommendation.expirationMonths) || defaultExpirationMonths(recommendation.base, recommendation.subtype, recommendation.name),
	            has375ml: bottleHas375mlOption(recommendation.name, recommendation.has375ml)
	          });
	          saveCustom();
	          refreshBarModal();
	          render();
	          if (!$('#shoppingListModalOverlay').hidden) renderShoppingList();
	        }

function toggleRecommendedShopping(recommendationId) {
	          const saved = ensureSavedRecommendation(recommendationId);
	          if (!saved) return;
	          saved.shoppingList = saved.shoppingList !== true;
	          saveCustom();
	          refreshBarModal();
	          render();
	          if (!$('#shoppingListModalOverlay').hidden) renderShoppingList();
	        }

function setRecommendationPurpose(recommendationId, isSipping) {
	          const saved = ensureSavedRecommendation(recommendationId);
	          if (!saved) return;
	          saved.purpose = isSipping ? 'sipping' : 'mixing';
	          saved.useInCocktails = false;
	          state.barExpandedRecommendation = isSipping ? `saved-${saved.id}` : '';
	          if (state.bottleUsageId === saved.id && !cocktailLookupBottle(saved)) state.bottleUsageId = '';
	          saveCustom();
	          refreshBarModal();
	          render();
	        }

function setRecommendationCocktailUse(recommendationId, useInCocktails) {
	          const saved = ensureSavedRecommendation(recommendationId);
	          if (!saved) return;
	          if (saved.purpose === 'sipping') saved.useInCocktails = useInCocktails;
	          else if (!useInCocktails) {
	            saved.purpose = 'sipping';
	            saved.useInCocktails = false;
	            state.barExpandedRecommendation = `saved-${saved.id}`;
	          }
	          if (state.bottleUsageId === saved.id && !cocktailLookupBottle(saved)) state.bottleUsageId = '';
	          saveCustom();
	          refreshBarModal();
	          render();
	        }

function toggleRecommendationFavorite(recommendationId) {
	          const saved = ensureSavedRecommendation(recommendationId);
	          if (!saved) return;
	          saved.favorite = saved.favorite !== true;
	          saveCustom();
	          refreshBarModal();
	          render();
	        }

function toggleRecommendationSmallSize(recommendationId) {
	          const saved = ensureSavedRecommendation(recommendationId);
	          if (!saved) return;
	          saved.has375ml = !bottleHas375mlOption(saved.name, saved.has375ml);
	          saveCustom();
	          refreshBarModal();
	          render();
	          if (!$('#shoppingListModalOverlay').hidden) renderShoppingList();
	        }

function showRecommendationCocktails(recommendationId) {
	          const saved = ensureSavedRecommendation(recommendationId);
	          if (!saved || !cocktailLookupBottle(saved)) return;
	          saveCustom();
	          resetFilterState();
	          state.bottleUsageId = saved.id;
	          state.bottleUsageOverride = null;
	          state.expanded.clear();
	          closeBarModal();
	          render();
	          $('.table-wrap')?.scrollIntoView({behavior: 'smooth', block: 'start'});
	        }

function labelForMissing(item) {
	          if (item.type === 'ingredient') return item.name;
	          if (item.name) return item.name;
	          return item.subtype ? `${displayBaseLabel(item.base)} · ${subtypeLabel(item.base, item.subtype)}` : displayBaseLabel(item.base);
	        }

function renderFutureBarToggle() {
	          const count = groceryBarBottles().length;
	          if (!count) state.futureBarPreview = false;
	          $('#barFuturePreview').checked = state.futureBarPreview;
	          $('#barFuturePreview').disabled = count === 0;
	          $('#barFuturePreview').setAttribute('aria-label', count ? `Include ${count} Shopping List bottle${count === 1 ? '' : 's'} in My Bar preview` : 'Shopping List is empty');
	          $('#barFutureCount').textContent = count;
	        }

function renderBarSummary() {
	          renderFutureBarToggle();
	          const count = COCKTAILS.filter(canMakeFromBar).length;
	          $('#barMakeLabel').textContent = state.futureBarPreview ? 'Future bar can make' : 'You can make';
	          $('#barMakeCount').textContent = count;
	          $('#barMakeCountPlural').textContent = count === 1 ? '' : 's';
	        }

function openBarModal() {
	          populateBarBaseSelect();
	          $('#barBottleSearch').value = state.barQ;
	          updateBarSubtypeSelect();
	          updateBarAddPurposeControls();
	          updateBarRecommendationControls();
	          renderBarDraftDetails();
	          renderIngredientChecklist();
	          renderBarList();
	          renderBarSummary();
	          $('#barModalOverlay').hidden = false;
	          if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
	          refreshShortcutHints(shortcutHintsActive);
	        }

function closeBarModal() {
	          $('#barModalOverlay').hidden = true;
	          resetBarBottleForm(false);
	          renderNeatPours();
	          refreshShortcutHints(shortcutHintsActive);
	        }

function refreshBarModal() {
	          const catalogScroll = $('#barBottleList').scrollTop;
	          const pantryScroll = $('.bar-pantry-pane').scrollTop;
	          renderIngredientChecklist();
	          renderBarList();
	          renderBarSummary();
	          $('#barBottleList').scrollTop = catalogScroll;
	          $('.bar-pantry-pane').scrollTop = pantryScroll;
	        }

function resetBarBottleForm(focus = true) {
	          $('#barAddForm').reset();
	          state.barDraftDetails = emptyBarDraftDetails();
	          populateBarBaseSelect();
	          updateBarSubtypeSelect();
	          updateBarAddPurposeControls();
	          updateBarRecommendationControls();
	          renderBarDraftDetails();
	          if (focus) $('#barBottleName').focus();
	        }

function submitBarForm(event) {
	          event.preventDefault();
	          const name = $('#barBottleName').value.trim();
	          if (!name) return;
	          const base = $('#barBottleBase').value;
	          const subtype = $('#barBottleSubtype').value || '';
	          const purpose = $('#barBottleNeat').checked ? 'sipping' : 'mixing';
	          const useInCocktails = purpose === 'sipping' && $('#barBottleCocktailUse').checked;
	          const favorite = $('#barBottleFavorite').checked;
	          const recommended = $('#barBottleRecommended').checked;
	          const bottleId = `bar-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
	          const storage = normalizeBottleStorage(state.barDraftDetails.storage) || defaultBottleStorage(base, subtype, name);
	          const expirationMonths = normalizeExpirationMonths(state.barDraftDetails.expirationMonths) || defaultExpirationMonths(base, subtype, name);
	          const update = {
	            id: bottleId, kind: 'spirit', name, base, subtype, purpose: recommended ? 'mixing' : purpose, useInCocktails: recommended ? false : useInCocktails,
	            notes: state.barDraftDetails.notes || '', favorite: recommended ? false : favorite, shoppingList: false, recommended,
	            price: normalizeBottlePrice(state.barDraftDetails.price),
	            totalWineLocation: state.barDraftDetails.totalWineLocation || '',
	            totalWineUrl: state.barDraftDetails.totalWineUrl || '',
	            country: state.barDraftDetails.country || '',
	            abv: defaultBottleAbv(base, subtype, state.barDraftDetails.abv),
	            taste: defaultBottleTaste(base, subtype, state.barDraftDetails.taste), storage, expirationMonths,
	            has375ml: bottleHas375mlOption(name, state.barDraftDetails.has375ml)
	          };
	          store.bar.push(update);
	          if (!recommended && purpose === 'sipping') state.barExpandedBottle = bottleId;
	          else if (state.neatExpandedBottle === bottleId) state.neatExpandedBottle = '';
	          saveCustom();
	          resetBarBottleForm(false);
	          refreshBarModal();
	          render();
	          $('#barBottleName').focus();
	        }

function setBottlePurpose(bottleId, isSipping) {
	          const bottle = store.bar.find((item) => item.id === bottleId && item.kind !== 'ingredient');
	          if (!bottle) return;
	          bottle.purpose = isSipping ? 'sipping' : 'mixing';
	          bottle.useInCocktails = false;
	          bottle.notes = typeof bottle.notes === 'string' ? bottle.notes : '';
	          bottle.favorite = bottle.favorite === true;
	          bottle.price = normalizeBottlePrice(bottle.price);
	          bottle.totalWineLocation = typeof bottle.totalWineLocation === 'string' ? bottle.totalWineLocation : '';
	          bottle.totalWineUrl = typeof bottle.totalWineUrl === 'string' ? bottle.totalWineUrl : '';
	          state.barExpandedBottle = isSipping ? bottleId : '';
	          if (!isSipping && state.neatExpandedBottle === bottleId) state.neatExpandedBottle = '';
	          if (state.bottleUsageId === bottleId && !isMixingBottle(bottle)) state.bottleUsageId = '';
	          saveCustom();
	          refreshBarModal();
	          render();
	        }

function setBottleCocktailUse(bottleId, useInCocktails) {
	          const bottle = store.bar.find((item) => item.id === bottleId && item.kind !== 'ingredient');
	          if (!bottle) return;
	          if (bottle.purpose === 'sipping') bottle.useInCocktails = useInCocktails;
	          else if (!useInCocktails) {
	            bottle.purpose = 'sipping';
	            bottle.useInCocktails = false;
	            state.barExpandedBottle = bottleId;
	          }
	          if (state.bottleUsageId === bottleId && !isMixingBottle(bottle)) state.bottleUsageId = '';
	          saveCustom();
	          refreshBarModal();
	          render();
	        }

function saveInlineBottleEdit(bottle) {
	          saveCustom();
	          refreshBarModal();
	          render();
	          return bottle;
	        }

function updateInlineBottleName(bottleId, name) {
	          const bottle = store.bar.find((item) => item.id === bottleId && item.kind !== 'ingredient');
	          const nextName = String(name || '').trim();
	          if (!bottle || !nextName || bottle.name === nextName) return bottle;
	          bottle.name = nextName;
	          return saveInlineBottleEdit(bottle);
	        }

function updateInlineBottleClassification(bottleId, nextBase, nextSubtype = null) {
	          const bottle = store.bar.find((item) => item.id === bottleId && item.kind !== 'ingredient');
	          if (!bottle) return null;
	          const oldBase = bottle.base;
	          const oldSubtype = bottle.subtype || '';
	          const oldDefaultStorage = defaultBottleStorage(oldBase, oldSubtype, bottle.name);
	          const oldDefaultExpiration = defaultExpirationMonths(oldBase, oldSubtype, bottle.name);
	          const usedDefaultStorage = bottleStorageValue(bottle) === oldDefaultStorage;
	          const usedDefaultExpiration = bottleExpirationValue(bottle) === oldDefaultExpiration;
	          if (BAR_BASE_ORDER.includes(nextBase)) bottle.base = nextBase;
	          const subtypes = barSubtypeOptionsFor(bottle.base);
	          bottle.subtype = nextSubtype !== null && subtypes.includes(nextSubtype)
	            ? nextSubtype
	            : subtypes.includes(bottle.subtype) ? bottle.subtype : (subtypes[0] || '');
	          if (usedDefaultStorage) bottle.storage = defaultBottleStorage(bottle.base, bottle.subtype, bottle.name);
	          if (usedDefaultExpiration) bottle.expirationMonths = defaultExpirationMonths(bottle.base, bottle.subtype, bottle.name);
	          bottle.taste = defaultBottleTaste(bottle.base, bottle.subtype, bottle.taste);
	          return saveInlineBottleEdit(bottle);
	        }

function applyParsedBottleUpdate(bottle, parsed) {
	          if (!bottle || !parsed) return null;
	          const oldDefaultStorage = defaultBottleStorage(bottle.base, bottle.subtype, bottle.name);
	          const oldDefaultExpiration = defaultExpirationMonths(bottle.base, bottle.subtype, bottle.name);
	          const usedDefaultStorage = bottleStorageValue(bottle) === oldDefaultStorage;
	          const usedDefaultExpiration = bottleExpirationValue(bottle) === oldDefaultExpiration;
	          if (parsed.name) bottle.name = parsed.name;
	          if (BAR_BASE_ORDER.includes(parsed.base)) bottle.base = parsed.base;
	          const subtypes = barSubtypeOptionsFor(bottle.base);
	          if (parsed.subtype && subtypes.includes(parsed.subtype)) bottle.subtype = parsed.subtype;
	          else if (!subtypes.includes(bottle.subtype)) bottle.subtype = subtypes[0] || '';
	          ['price', 'totalWineLocation', 'totalWineUrl', 'country', 'abv', 'taste'].forEach((field) => {
	            if (parsed[field] !== '' && parsed[field] !== undefined) bottle[field] = parsed[field];
	          });
	          if (parsed.has375ml) bottle.has375ml = true;
	          if (usedDefaultStorage) bottle.storage = defaultBottleStorage(bottle.base, bottle.subtype, bottle.name);
	          if (usedDefaultExpiration) bottle.expirationMonths = defaultExpirationMonths(bottle.base, bottle.subtype, bottle.name);
	          bottle.abv = defaultBottleAbv(bottle.base, bottle.subtype, bottle.abv);
	          bottle.taste = defaultBottleTaste(bottle.base, bottle.subtype, bottle.taste);
	          return saveInlineBottleEdit(bottle);
	        }

function toggleBottleFavorite(bottleId) {
	          const bottle = store.bar.find((item) => item.id === bottleId && item.kind !== 'ingredient');
	          if (!bottle) return;
	          bottle.favorite = !bottle.favorite;
	          saveCustom();
	          refreshBarModal();
	          render();
	        }

function toggleBottleSmallSize(bottleId) {
	          const bottle = store.bar.find((item) => item.id === bottleId && item.kind !== 'ingredient');
	          if (!bottle) return;
	          bottle.has375ml = !bottleHas375mlOption(bottle.name, bottle.has375ml);
	          saveCustom();
	          refreshBarModal();
	          render();
	          if (!$('#shoppingListModalOverlay').hidden) renderShoppingList();
	        }

function toggleBottleShopping(bottleId) {
	          const bottle = store.bar.find((item) => item.id === bottleId && item.kind !== 'ingredient');
	          if (!bottle) return;
	          bottle.shoppingList = bottle.shoppingList !== true;
	          if (bottle.shoppingList) {
	            if (state.barExpandedBottle === bottleId) state.barExpandedBottle = '';
	            if (state.neatExpandedBottle === bottleId) state.neatExpandedBottle = '';
	            if (state.bottleUsageId === bottleId) state.bottleUsageId = '';
	          }
	          saveCustom();
	          refreshBarModal();
	          render();
	          if (!$('#shoppingListModalOverlay').hidden) renderShoppingList();
	        }

function toggleBarIngredient(name, present) {
	          if (present) {
	            if (!store.bar.some((b) => b.kind === 'ingredient' && b.name === name)) {
	              store.bar.push({id: `bar-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, kind: 'ingredient', name});
	            }
	          } else {
	            store.bar = store.bar.filter((b) => !(b.kind === 'ingredient' && b.name === name));
	          }
	          saveCustom();
	          refreshBarModal();
	          render();
	        }

function startEditBottle(bottleId) {
	          const bottle = store.bar.find((b) => b.id === bottleId);
	          if (!bottle || bottle.kind === 'ingredient') return;
	          state.barExpandedBottle = bottleId;
	          state.barExpandedRecommendation = '';
	          renderBarList();
	          requestAnimationFrame(() => document.querySelector(`[data-bottle-name="${CSS.escape(bottleId)}"]`)?.focus());
	        }

function startEditRecommendation(recommendationId) {
	          const saved = ensureSavedRecommendation(recommendationId);
	          if (!saved) return;
	          state.barExpandedBottle = '';
	          state.barExpandedRecommendation = `saved-${saved.id}`;
	          saveCustom();
	          renderBarList();
	          requestAnimationFrame(() => document.querySelector(`[data-bottle-name="${CSS.escape(saved.id)}"]`)?.focus());
	        }
