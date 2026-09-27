// Classic-script function declarations; shared state is initialized in app.js.
function pill(label, count, active, cls, value, info = '') {
      const infoText = String(info || '').trim();
      const infoTableKey = BASE_INFO_TABLES[value] ? value : label;
      const infoTable = BASE_INFO_TABLES[infoTableKey] ? ` data-info-table="${escapeHtml(infoTableKey)}"` : '';
      const infoButton = infoText ? `<button class="info-button ${cls}" type="button" data-info-title="${escapeHtml(label)}" data-info="${escapeHtml(infoText)}"${infoTable} aria-label="${escapeHtml(`About ${label}`)}" aria-expanded="false" aria-controls="infoPopover">i</button>` : '';
      return `<span class="pill-wrap"><button class="pill ${cls} ${active ? 'active' : ''}" type="button" data-value="${escapeHtml(value || label)}"><span>${escapeHtml(label)}</span><span class="count">${count}</span></button>${infoButton}</span>`;
    }

function hideInfoPopover() {
      const popover = $('#infoPopover');
      if (!popover || popover.hidden) return;
      popover.hidden = true;
      $$('[data-info][aria-expanded="true"]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
    }

function showInfoPopover(button) {
      const popover = $('#infoPopover');
      const title = button.dataset.infoTitle || 'Info';
      const text = button.dataset.info || '';
      const infoTable = BASE_INFO_TABLES[button.dataset.infoTable] || null;
      const infoGrid = infoTable
        ? `<div class="vermouth-info-scroll"><div class="vermouth-info-grid" role="table" aria-label="${escapeHtml(infoTable.ariaLabel)}">${infoTable.headings.map((heading) => `<span class="info-grid-heading" role="columnheader">${escapeHtml(heading)}</span>`).join('')}${infoTable.rows.map((row) => row.map((cell, index) => `<span${index === 0 ? ' class="info-grid-type"' : ''} role="cell">${escapeHtml(cell)}</span>`).join('')).join('')}</div></div>`
        : '';
      popover.classList.toggle('has-info-grid', Boolean(infoGrid));
      popover.innerHTML = `<strong>${escapeHtml(title)}</strong><div>${escapeHtml(text)}</div>${infoGrid}`;
      popover.hidden = false;
      $$('[data-info][aria-expanded="true"]').forEach((item) => {
        if (item !== button) item.setAttribute('aria-expanded', 'false');
      });
      button.setAttribute('aria-expanded', 'true');
      const rect = button.getBoundingClientRect();
      const popRect = popover.getBoundingClientRect();
      const left = Math.min(Math.max(12, rect.left + rect.width / 2 - popRect.width / 2), window.innerWidth - popRect.width - 12);
      const top = rect.bottom + popRect.height + 10 > window.innerHeight ? Math.max(12, rect.top - popRect.height - 8) : rect.bottom + 8;
      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
    }

function hideTryPriorityPopover() {
      const popover = $('#tryPriorityPopover');
      if (!popover || popover.hidden) return;
      popover.hidden = true;
      popover.innerHTML = '';
      $$('[data-bookmark-id][aria-expanded="true"]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
    }

function showTryPriorityPopover(button) {
      const id = button.dataset.bookmarkId;
      const active = store.bookmarks[id];
      const priority = tryPriority(id);
      const options = [
        {value: 'none', label: 'No priority', selected: active === true},
        ...[1, 2, 3].map((value) => ({value: String(value), label: String(value), selected: priority === value})),
        {value: 'remove', label: 'Remove', selected: !active, remove: true}
      ];
      const popover = $('#tryPriorityPopover');
      popover.dataset.bookmarkId = id;
      popover.innerHTML = options.map((option) => `<button class="try-priority-option${option.selected ? ' active' : ''}${option.remove ? ' remove' : ''}" type="button" data-set-try-priority="${option.value}" aria-pressed="${option.selected}">${option.label}</button>`).join('');
      popover.hidden = false;
      $$('[data-bookmark-id][aria-expanded="true"]').forEach((item) => {
        if (item !== button) item.setAttribute('aria-expanded', 'false');
      });
      button.setAttribute('aria-expanded', 'true');
      const rect = button.getBoundingClientRect();
      const popRect = popover.getBoundingClientRect();
      const left = Math.min(Math.max(12, rect.left + rect.width / 2 - popRect.width / 2), window.innerWidth - popRect.width - 12);
      const top = rect.bottom + popRect.height + 10 > window.innerHeight ? Math.max(12, rect.top - popRect.height - 8) : rect.bottom + 8;
      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
    }

function hideCocktailLinkPopover() {
      const popover = $('#cocktailLinkPopover');
      if (!popover || popover.hidden) return;
      popover.hidden = true;
      popover.innerHTML = '';
      $$('[data-cocktail-links][aria-expanded="true"]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
    }

function showCocktailLinkPopover(button) {
      const cocktail = COCKTAILS.find((item) => item.id === button.dataset.cocktailLinks);
      const links = cocktailLinks(cocktail);
      if (!links.length) return;
      const popover = $('#cocktailLinkPopover');
      popover.innerHTML = links.map((link) => `<a class="cocktail-link-option" href="${escapeHtml(link.url)}" target="_blank" rel="noopener">${__LINK}<span>${escapeHtml(link.label)}</span></a>`).join('');
      popover.hidden = false;
      $$('[data-cocktail-links][aria-expanded="true"]').forEach((item) => {
        if (item !== button) item.setAttribute('aria-expanded', 'false');
      });
      button.setAttribute('aria-expanded', 'true');
      const rect = button.getBoundingClientRect();
      const popRect = popover.getBoundingClientRect();
      const left = Math.min(Math.max(12, rect.left + rect.width / 2 - popRect.width / 2), window.innerWidth - popRect.width - 12);
      const top = rect.bottom + popRect.height + 10 > window.innerHeight ? Math.max(12, rect.top - popRect.height - 8) : rect.bottom + 8;
      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
    }

function setCollapseSummary(section, optionCount, selectedCount) {
	      const body = $(`#${section}FilterBody`) || $(`#${section}Pills`);
	      const summary = $(`#${section}Summary`);
	      const toggle = $(`[data-collapse-toggle="${section}"]`);
      const card = $(`[data-filter-section="${section}"]`);
      if (!body || !summary || !toggle) return;
      const isCollapsed = state.collapsed[section];
      body.hidden = isCollapsed;
      card?.classList.toggle('expanded', !isCollapsed);
	      toggle.setAttribute('aria-expanded', String(!isCollapsed));
	      $('.collapse-icon', toggle).textContent = isCollapsed ? '+' : '-';
	      summary.textContent = selectedCount ? `${selectedCount} selected` : `${optionCount} options`;
	      const mobileCount = $(`#${section}ToggleCount`);
	      if (mobileCount) mobileCount.textContent = selectedCount ? `(${selectedCount}/${optionCount})` : `(${optionCount})`;
		    }

function updateCollapsibleSections() {
	      setCollapseSummary('type', $('#typePills').children.length, state.types.size);
	      setCollapseSummary('base', $('#basePills').children.length, state.bases.size + state.subtypes.size);
	      setCollapseSummary('glass', $('#glassPills').children.length, state.glasses.size);
	      setCollapseSummary('garnish', $('#garnishPills').children.length, state.garnishes.size);
	      setCollapseSummary('ingredient', $('#ingredientPills').children.length, state.ingredients.size);
    }

function renderPills() {
          syncSubtypeFilters();
          const typeCounts = getCounts(COCKTAILS, (c) => [displayType(c)]);
          const allTypes = unique([...DEFAULT_TYPES, ...COCKTAILS.map((c) => c.type), ...store.customTypes]).filter((type) => typeCounts.has(type) || store.customTypes.includes(type));
          $('#typePills').innerHTML = allTypes.map((type) => pill(type, typeCounts.get(type) || 0, state.types.has(type), 'type', type)).join('');
          const baseCounts = getCounts(COCKTAILS, (c) => c.baseLiquor);
          const bases = [...BASE_ORDER.filter((base) => base !== 'Other' || baseCounts.has(base)), ...Array.from(baseCounts.keys()).filter((base) => !BASE_ORDER.includes(base)).sort()];
          $('#basePills').innerHTML = bases.map((base) => pill(displayBaseLabel(base), baseCounts.get(base) || 0, state.bases.has(base), `base base-${classToken(base)}`, base, BASE_INFO[base])).join('');
          const subtypeWrap = $('#baseSubtypeWrap');
          const subtypeOptions = baseSubtypeOptions();
          if (subtypeOptions.length) {
            const subtypeCounts = getCounts(COCKTAILS, (c) => baseSubtypeTags(c).map((tag) => tag.value));
            subtypeWrap.hidden = false;
            $('#baseSubtypePills').innerHTML = subtypeOptions.map((option) => {
              const label = subtypeLabel(option.base, option.subtype);
              return pill(label, subtypeCounts.get(option.value) || 0, state.subtypes.has(option.value), `subtype base-${classToken(option.base)}`, option.value, subtypeInfo(option.base, option.subtype));
            }).join('');
          } else {
            subtypeWrap.hidden = true;
            $('#baseSubtypePills').innerHTML = '';
          }
          const glassCounts = getCounts(COCKTAILS, (c) => [c.glassware]);
          const glasses = Array.from(glassCounts.keys()).sort((a,b) => (glassCounts.get(b) - glassCounts.get(a)) || a.localeCompare(b));
          $('#glassPills').innerHTML = glasses.map((glass) => pill(displayGlass(glass), glassCounts.get(glass), state.glasses.has(glass), 'glass', glass)).join('');
          const garnishCounts = getCounts(COCKTAILS, garnishTags);
          const garnishes = Array.from(garnishCounts.keys()).sort((a,b) => (garnishCounts.get(b) - garnishCounts.get(a)) || a.localeCompare(b));
          $('#garnishPills').innerHTML = garnishes.map((garnish) => pill(garnish, garnishCounts.get(garnish), state.garnishes.has(garnish), 'garnish', garnish)).join('');
          const ingredientCounts = getCounts(COCKTAILS, cocktailIngredientFilterTags);
          const iq = norm(state.ingredientQ);
          const ingredients = Array.from(ingredientCounts.keys())
            .filter((ingredient) => !iq || norm(ingredient).includes(iq))
            .sort((a,b) => (ingredientCounts.get(b) - ingredientCounts.get(a)) || a.localeCompare(b));
      $('#ingredientPills').innerHTML = ingredients.map((ingredient) => pill(ingredient, ingredientCounts.get(ingredient), state.ingredients.has(ingredient), 'ingredient', ingredient, INGREDIENT_INFO[ingredient])).join('');
	      setCollapseSummary('type', allTypes.length, state.types.size);
	      setCollapseSummary('base', bases.length, state.bases.size + state.subtypes.size);
	      setCollapseSummary('glass', glasses.length, state.glasses.size);
	      setCollapseSummary('garnish', garnishes.length, state.garnishes.size);
	      setCollapseSummary('ingredient', ingredients.length, state.ingredients.size);
    }

function refreshRelatedFrequencies() {
	      BASE_DOC_FREQ = getCounts(COCKTAILS, (cocktail) => cocktail.baseLiquor);
	      INGREDIENT_DOC_FREQ = getCounts(COCKTAILS, ingredientTags);
	    }

function relatedGroups(c) {
	      const cTags = new Set(ingredientTags(c));
	      const parents = [], children = [], cousins = [], rest = [];
	      COCKTAILS.forEach((o) => {
	        if (o.id === c.id) return;
	        const oTags = ingredientTags(o);
	        const oSet = new Set(oTags);
	        const onlyC = [...cTags].filter((tag) => !oSet.has(tag));
	        const onlyO = oTags.filter((tag) => !cTags.has(tag));
	        if (onlyO.length === 0 && onlyC.length >= 1) {
	          parents.push({cocktail: o, note: `Base recipe — this drink adds ${onlyC.join(', ')}`});
	        } else if (onlyC.length === 0 && onlyO.length >= 1) {
	          children.push({cocktail: o, note: `Adds ${onlyO.join(', ')}`});
	        } else if ((onlyC.length === 1 && onlyO.length === 1) || (onlyC.length === 0 && onlyO.length === 0)) {
	          const note = onlyC.length === 0 ? 'Same ingredients' : `Swaps ${onlyC[0]} for ${onlyO[0]}`;
	          cousins.push({cocktail: o, note});
	        } else {
	          const sharedLiqueurSubtypes = unique(c.liqueurs.map((l) => l.subtype).filter((subtype) => o.liqueurs.some((ol) => ol.subtype === subtype)));
	          const sharedBase = o.baseLiquor.filter((base) => {
	            if (!c.baseLiquor.includes(base)) return false;
	            if (base === 'Liqueurs') return sharedLiqueurSubtypes.length > 0;
	            return true;
	          });
	          const sharedIngredients = oTags.filter((tag) => cTags.has(tag));
	          const score =
	            sharedBase.reduce((sum, base) => sum + RELATED_BASE_WEIGHT / (BASE_DOC_FREQ.get(base) || 1), 0) +
	            sharedIngredients.reduce((sum, tag) => sum + 1 / (INGREDIENT_DOC_FREQ.get(tag) || 1), 0);
	          if (score > 0) rest.push({cocktail: o, sharedBase, sharedIngredients, sharedLiqueurSubtypes, score});
	        }
	      });
	      const byName = (a, b) => a.cocktail.name.localeCompare(b.cocktail.name);
	      const similar = rest.sort((a, b) => b.score - a.score || byName(a, b)).slice(0, 4).map((r) => {
	        const byRarity = (freqMap) => (a, b) => (freqMap.get(a) || 1) - (freqMap.get(b) || 1) || a.localeCompare(b);
	        const baseItems = [...r.sharedBase].sort(byRarity(BASE_DOC_FREQ)).flatMap((base) => base === 'Liqueurs'
	          ? unique(r.sharedLiqueurSubtypes.map(liqueurTypeLabel))
	          : [displayBaseLabel(base)]);
	        const items = unique([...baseItems, ...[...r.sharedIngredients].sort(byRarity(INGREDIENT_DOC_FREQ))]);
	        const shown = items.slice(0, 3);
	        const extra = items.length - shown.length;
	        return {cocktail: r.cocktail, note: `Shares ${shown.join(', ')}${extra > 0 ? `, +${extra} more` : ''}`};
	      });
	      return {
	        parents: parents.sort(byName).slice(0, 3),
	        children: children.sort(byName).slice(0, 4),
	        cousins: cousins.sort(byName).slice(0, 3),
	        similar
	      };
	    }

function relatedChip(item) {
	      const muted = item.tag === 'Similar' ? ' related-chip-muted' : '';
	      return `<button type="button" class="related-chip${muted}" data-related-id="${escapeHtml(item.cocktail.id)}"><span class="related-tag related-tag-${item.tagClass}">${escapeHtml(item.tag)}</span><span class="related-copy"><span class="related-name">${cocktailNameMarkup(item.cocktail)}</span><span class="related-note">${escapeHtml(item.note)}</span></span></button>`;
	    }

function relatedCard(c) {
	      const {parents, children, cousins, similar} = relatedGroups(c);
	      const rows = [
	        ...parents.map((item) => ({...item, tag: 'Base', tagClass: 'base'})),
	        ...children.map((item) => ({...item, tag: 'Build', tagClass: 'build'})),
	        ...cousins.map((item) => ({...item, tag: 'Variant', tagClass: 'variant'})),
	        ...similar.map((item) => ({...item, tag: 'Similar', tagClass: 'similar'}))
	      ];
	      const body = rows.length ? `<div class="related-list">${rows.map((item) => relatedChip(item)).join('')}</div>` : '<span class="empty">No closely related cocktails found.</span>';
	      return `<section class="detail-card"><h3>Related Cocktails</h3>${body}</section>`;
	    }

function ibaRecipeSourceClass(cocktail) {
	      const type = displayType(cocktail);
	      if (type === 'The Unforgettables') return ' source-iba iba-type-unforget';
	      if (type === 'Contemporary Classics') return ' source-iba iba-type-classic';
	      return ' source-iba iba-type-new-era';
	    }

function recipeComparisonMeta(cocktail, key, source) {
	      if (key === 'iba') {
	        const years = cocktail.dateRemoved
	          ? `${cocktail.dateAdded || '?'}–${cocktail.dateRemoved}`
	          : cocktail.dateAdded;
	        return [displayType(cocktail), years].filter(Boolean).join(' | ');
	      }
	      if (key === 'lnl') return [source?.era, source?.time].filter(Boolean).join(' | ');
	      return source?.sourceName || '';
	    }

function primaryRecipeSource(cocktail) {
	      if (!/IBA/i.test(cocktail.status || '')) return null;
	      return {
	        key: 'iba', label: 'IBA', time: cocktail.status === 'Former IBA' ? 'Former' : 'Current', available: true,
	        ingredients: cocktail.ingredients, ingredientNames: cocktail.ingredientNames, ingredientBottles: cocktail.ingredientBottles,
	        method: cocktail.method, garnish: cocktail.garnish, glassware: cocktail.glassware
	      };
	    }

function recipeSource(cocktail, key) {
	      if (key === 'iba') return primaryRecipeSource(cocktail);
	      if (key === 'lnl') return cocktail.lnlSource || null;
	      if (key === 'diffords') return cocktail.diffordsSource || null;
	      if (key === 'liquor') return cocktail.liquorSource || null;
	      return null;
	    }

function availableRecipeSource(cocktail, key) {
	      const source = recipeSource(cocktail, key);
	      return source && source.available !== false && Array.isArray(source.ingredients) && source.ingredients.length > 0;
	    }

function recipeSourceIndicators(cocktail) {
	      const hasIba = availableRecipeSource(cocktail, 'iba');
	      const hasLnl = availableRecipeSource(cocktail, 'lnl');
	      const hasDiffords = availableRecipeSource(cocktail, 'diffords');
	      const hasLiquor = availableRecipeSource(cocktail, 'liquor');
	      const hasOther = hasLiquor || (!hasIba && !hasLnl && !hasDiffords && Array.isArray(cocktail.ingredients) && cocktail.ingredients.length > 0);
	      const sources = [
	        ['diffords', "Difford's", hasDiffords],
	        ['iba', 'IBA', hasIba],
	        ['lnl', 'L&L', hasLnl],
	        ['other', 'Other', hasOther]
	      ];
	      const availableLabels = sources.filter(([, , available]) => available).map(([, label]) => label);
	      const slots = sources.map(([key, label, available]) => available
	        ? `<span class="recipe-source-slot"><span class="recipe-source-symbol recipe-source-symbol-${key}" title="${escapeHtml(label)} recipe" aria-hidden="true"><svg viewBox="0 0 24.1846 23.8281" focusable="false"><path fill="currentColor" fill-opacity="0.85" d="${RECIPE_SOURCE_SYMBOL_PATHS[key]}"/></svg></span></span>`
	        : '<span class="recipe-source-slot" aria-hidden="true"></span>'
	      ).join('');
	      return `<div class="recipe-source-slots" role="img" aria-label="Recipes: ${escapeHtml(availableLabels.join(', ') || 'none')}">${slots}</div>`;
	    }

function selectedRecipeSourceKey(cocktail) {
	      const requested = state.recipeSource[cocktail.id];
	      if (requested && availableRecipeSource(cocktail, requested)) return requested;
	      if (availableRecipeSource(cocktail, 'iba')) return 'iba';
	      if (availableRecipeSource(cocktail, 'lnl')) return 'lnl';
	      if (availableRecipeSource(cocktail, 'diffords')) return 'diffords';
	      if (availableRecipeSource(cocktail, 'liquor')) return 'liquor';
	      return '';
	    }

function recipeCocktail(cocktail, key = selectedRecipeSourceKey(cocktail)) {
	      const source = recipeSource(cocktail, key);
	      if (!source || source.available === false) return cocktail;
	      const recipeVariant = pantryRecipeVariant(cocktail, source);
	      return {
	        ...recipeVariant,
	        ingredients: cloneRecipeLines(source.ingredients),
	        ingredientNames: cloneRecipeLines(source.ingredientNames),
	        ingredientBottles: cloneRecipeLines(source.ingredientBottles),
	        method: cloneRecipeLines(source.method),
	        garnish: String(source.garnish || ''),
	        glassware: String(source.glassware || cocktail.glassware || 'Unknown'),
	        ingredientCount: source.ingredients.length
	      };
	    }

function recipeGlasswareLabel(cocktail) {
	      const glassware = String(cocktail?.glassware || 'Unknown')
	        .replace(/^serve in (?:an?\s+)?/i, '')
	        .trim();
	      return displayGlass(glassware) || 'Unknown';
	    }

function recipeSourceControls(cocktail) {
	      if (!cocktail.lnlSource && !cocktail.diffordsSource && !cocktail.liquorSource) return '';
	      const selected = selectedRecipeSourceKey(cocktail);
	      const sourceCount = RECIPE_SOURCE_OPTIONS.filter((source) => availableRecipeSource(cocktail, source.key)).length;
	      const options = RECIPE_SOURCE_OPTIONS.map((source) => {
	        const enabled = availableRecipeSource(cocktail, source.key);
	        const title = enabled ? `Show ${source.label} recipe` : `${source.label} recipe not imported`;
	        const sourceClass = source.key === 'lnl' && cocktail.lnlSource
	          ? ` source-era era-${classToken(cocktail.lnlSource.era)}`
	          : (source.key === 'diffords' ? ' source-diffords' : (source.key === 'liquor' ? ' source-liquor' : ''));
	        return `<button type="button" class="recipe-source-option${sourceClass}${selected === source.key ? ' active' : ''}" data-recipe-source="${source.key}" data-cocktail-id="${escapeHtml(cocktail.id)}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}" aria-pressed="${selected === source.key}"${enabled ? '' : ' disabled'}>${escapeHtml(source.label)}</button>`;
	      }).join('');
	      const comparing = sourceCount > 1 && !state.recipeSingle.has(cocktail.id);
	      const compareToggle = sourceCount > 1
	        ? `<button type="button" class="recipe-compare-toggle${comparing ? ' active' : ''}" data-compare-recipes="${escapeHtml(cocktail.id)}" title="${comparing ? 'Show one recipe' : 'Compare all recipe sources'}" aria-label="${comparing ? 'Show one recipe' : 'Compare all recipe sources'}" aria-pressed="${comparing}">${__RECTANGLE_SPLIT_3X1}</button>`
	        : '';
	      return `<div class="recipe-source-controls" aria-label="Recipe source">${options}${compareToggle}</div>`;
	    }

function cocktailSourceBadges(cocktail) {
	      const badges = [];
	      if (cocktail.lnlSource) badges.push(`<span class="source-meta-tag source-era era-${classToken(cocktail.lnlSource.era)}" title="Letters &amp; Liquor">${escapeHtml(cocktail.lnlSource.era)} | ${escapeHtml(cocktail.lnlSource.time)}</span>`);
	      if (cocktail.diffordsSource) badges.push('<span class="source-meta-tag source-diffords">Difford\'s Guide</span>');
	      if (cocktail.liquorSource) badges.push('<span class="source-meta-tag source-liquor">Liquor.com</span>');
	      return badges.join('');
	    }

function cocktailRowSourceFlag(cocktail) {
	      return cocktail.lnlSource ? `<span class="cocktail-source-flag source-era era-${classToken(cocktail.lnlSource.era)}" title="Letters &amp; Liquor ${escapeHtml(cocktail.lnlSource.era)} recipe available">${escapeHtml(cocktail.lnlSource.era)}</span>` : '';
	    }

function recipeComparisonColumn(cocktail, option, servings) {
	      const source = recipeSource(cocktail, option.key);
	      const available = availableRecipeSource(cocktail, option.key);
	      const sourceClass = option.key === 'iba'
	        ? ibaRecipeSourceClass(cocktail)
	        : option.key === 'lnl' && cocktail.lnlSource
	          ? ` source-era era-${classToken(cocktail.lnlSource.era)}`
	          : (option.key === 'diffords' ? ' source-diffords' : (option.key === 'liquor' ? ' source-liquor' : ''));
	      if (!available) {
	        return `<section class="detail-card recipe-source-column${sourceClass}"><h3><span>${escapeHtml(option.label)}</span></h3><p class="recipe-source-unavailable">Recipe not imported.</p></section>`;
	      }
	      const variant = recipeCocktail(cocktail, option.key);
	      const {lines: ingredients, footnote: ingredientFootnote} = ingredientListDetails(variant, servings);
	      const method = variant.method.length ? variant.method.map((line) => `<li>${escapeHtml(formatMethodLine(line))}</li>`).join('') : '<li class="empty">Not recorded</li>';
	      const meta = recipeComparisonMeta(cocktail, option.key, source);
	      const totalVolume = formatTotalVolume(totalIngredientVolume(variant, servings));
	      const servingLabel = `${servings} Serving${servings === 1 ? '' : 's'}`;
	      const servingStepper = `<div class="serving-stepper" aria-label="Servings"><button type="button" data-serving-step="-1" data-cocktail-id="${escapeHtml(cocktail.id)}" aria-label="Decrease servings" ${servings <= 1 ? 'disabled' : ''}>−</button><span class="serving-count">${escapeHtml(servingLabel)}</span><button type="button" data-serving-step="1" data-cocktail-id="${escapeHtml(cocktail.id)}" aria-label="Increase servings">+</button></div>`;
	      return `<section class="detail-card recipe-source-column${sourceClass}"><h3><span>${escapeHtml(option.label)}</span>${meta ? `<span class="recipe-source-meta"><span class="recipe-source-time">${escapeHtml(meta)}</span></span>` : ''}</h3><div class="recipe-source-section recipe-source-ingredients"><div class="recipe-source-ingredient-tools"><span class="recipe-source-total">${escapeHtml(totalVolume)} Total</span>${servingStepper}</div><h4>Ingredients</h4><ul>${ingredients}</ul>${ingredientFootnote}</div><div class="recipe-source-section recipe-source-inline"><h4>Garnish</h4><p>${variant.garnish ? escapeHtml(variant.garnish) : '<span class="empty">None listed</span>'}</p></div><div class="recipe-source-section recipe-source-inline"><h4>Glassware</h4><p>${escapeHtml(recipeGlasswareLabel(variant))}</p></div><div class="recipe-source-section"><h4>Method</h4><ol>${method}</ol></div></section>`;
	    }

function recipeComparison(cocktail, servings, includeControls = true) {
	      const availableOptions = RECIPE_SOURCE_OPTIONS.filter((option) => availableRecipeSource(cocktail, option.key));
	      const sourceCount = availableOptions.length;
	      const sourceControls = includeControls ? recipeSourceControls(cocktail) : '';
	      return `<div class="recipe-compare-header"><h3>Recipes</h3><div class="recipe-compare-tools"><span class="recipe-source-count">${sourceCount} Source${sourceCount === 1 ? '' : 's'}</span>${sourceControls}</div></div><div class="recipe-source-comparison" style="--recipe-source-count:${Math.max(1, sourceCount)}">${availableOptions.map((option) => recipeComparisonColumn(cocktail, option, servings)).join('')}</div>`;
	    }

function expandedArtworkMarkup(cocktail) {
	      const artwork = cocktail.lnlSource?.artwork;
	      const diffordsImage = String(cocktail.diffordsSource?.image || '');
	      const diffordsUrl = String(cocktail.diffordsSource?.url || '');
	      const diffordsGallery = artwork ? [] : cloneRecipeLines(cocktail.diffordsSource?.galleryImages).slice(0, 3);
	      if (!artwork && !diffordsImage) return '';
	      const primaryUrl = cocktailLinks(cocktail).find((link) => link.url !== diffordsUrl)?.url || diffordsUrl;
	      const lettersLiquorUrl = String(cocktail.lnlSource?.url || primaryUrl || diffordsUrl);
	      const items = [
	        ...(cocktail.image && cocktail.image !== diffordsImage ? [['Source Drink', cocktail.image, 'source', primaryUrl]] : []),
	        ...(artwork ? [
	          ['Drink', artwork.drink, 'drink', lettersLiquorUrl],
	          ['Tabletop', artwork.tabletop, 'tabletop', lettersLiquorUrl],
	          ['Lettering', artwork.lettering, 'lettering', lettersLiquorUrl]
	        ] : []),
	        ...(diffordsImage ? [["Difford's Guide", diffordsImage, 'diffords', diffordsUrl]] : []),
	        ...diffordsGallery.map((image, index) => [`Difford's Gallery ${index + 1}`, image, 'diffords-gallery', diffordsUrl])
	      ];
	      const availableItems = items.filter(([, src]) => src);
	      const columns = availableItems.map(([, , type]) => type === 'tabletop'
	        ? 'calc(var(--artwork-height) * 1.87)'
	        : type === 'diffords-gallery' ? 'calc(var(--artwork-height) * 1.5)' : 'var(--artwork-height)').join(' ');
	      const mobileColumns = availableItems.map(([, , type]) => type === 'tabletop'
	        ? 'min(79vw, 300px)'
	        : type === 'diffords-gallery' ? 'min(63vw, 240px)' : 'min(42vw, 160px)').join(' ');
	      return `<section class="lnl-cocktail-artwork" style="--artwork-columns:${columns};--artwork-mobile-columns:${mobileColumns}" aria-label="Cocktail artwork for ${escapeHtml(cocktailDisplayName(cocktail))}">${availableItems.map(([label, src, type, url]) => {
	        const image = `<img class="lnl-artwork-${type}" src="${escapeHtml(src)}" alt="${escapeHtml(`${cocktailDisplayName(cocktail)} ${label.toLowerCase()}`)}" loading="lazy">`;
	        const linkedImage = url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener" aria-label="Open ${escapeHtml(label)} website for ${escapeHtml(cocktailDisplayName(cocktail))}">${image}</a>` : image;
	        return `<figure>${linkedImage}<figcaption>${escapeHtml(label)}</figcaption></figure>`;
	      }).join('')}</section>`;
	    }

function ingredientListDetails(c, servings = 1) {
	      const missingIngredients = missingRequirementsFor(c);
	      const lines = c.ingredients.map((line, index) => {
	        const parts = ingredientDisplayParts(c, index);
	        const combinedLabel = parts.specific ? `${parts.generic} [${parts.specific}]` : parts.generic;
	        const info = INGREDIENT_INFO[combinedLabel] || INGREDIENT_INFO[parts.generic] || INGREDIENT_INFO[parts.specific] || '';
	        const infoTitle = INGREDIENT_INFO[combinedLabel] ? combinedLabel : (INGREDIENT_INFO[parts.generic] ? parts.generic : parts.specific);
	        const infoButton = info ? `<button class="info-button detail-ingredient-info" type="button" data-info-title="${escapeHtml(infoTitle)}" data-info="${escapeHtml(info)}" aria-label="How to make ${escapeHtml(infoTitle)}" aria-expanded="false" aria-controls="infoPopover">i</button>` : '';
	        const substituteName = ingredientSubstituteFromBar(c, index, missingIngredients);
	        const availabilityClass = substituteName ? ' substituted-from-bar' : (ingredientMissingFromBar(c, index, missingIngredients) ? ' missing-from-bar' : '');
	        return `<li class="detail-ingredient-line${availabilityClass}"><div class="detail-ingredient-button">${ingredientLineMarkup(formatIngredientLine(line, c, servings), parts.generic, parts.specific, infoButton, substituteName)}</div></li>`;
	      }).join('');
	      const footnote = recipeAllowsBandBSubstitute(c)
	        ? '<p class="ingredient-footnote">* B&amp;B may replace Bénédictine when the recipe calls for 1/4 oz or less.</p>'
	        : '';
	      return {lines, footnote};
	    }

function detailTemplate(c) {
	      const hasUserNotes = Object.prototype.hasOwnProperty.call(store.notes, c.id);
	      const noteValue = hasUserNotes ? store.notes[c.id] : c.notes.join('\n');
	      const servings = servingCount(c.id);
	      const servingLabel = `${servings} Serving${servings === 1 ? '' : 's'}`;
	      const selectedSource = selectedRecipeSourceKey(c);
	      const recipeView = recipeCocktail(c, selectedSource);
	      const totalVolume = formatTotalVolume(totalIngredientVolume(recipeView, servings));
	      const detailBases = c.baseLiquor.length ? c.baseLiquor.map(displayBaseLabel).join(', ') : 'NONE';
	      const editButton = `<button type="button" class="button icon edit-cocktail-btn" data-edit-cocktail-id="${escapeHtml(c.id)}" title="Edit cocktail" aria-label="Edit ${escapeHtml(cocktailDisplayName(c))}">${__PENCIL}</button>`;
	      const links = cocktailLinks(c);
	      const linkButton = `<button type="button" class="button icon cocktail-link-button" data-cocktail-links="${escapeHtml(c.id)}" title="Open cocktail links" aria-label="Open links for ${escapeHtml(cocktailDisplayName(c))}" aria-expanded="false" aria-controls="cocktailLinkPopover"${links.length ? '' : ' disabled'}>${__LINK}</button>`;
	      const {lines: ingredientLines, footnote: ingredientFootnote} = ingredientListDetails(recipeView, servings);
	      const recipeSourceCount = RECIPE_SOURCE_OPTIONS.filter((source) => availableRecipeSource(c, source.key)).length;
	      const comparingRecipes = recipeSourceCount > 1 && !state.recipeSingle.has(c.id);
	      const recipeDetails = comparingRecipes
	        ? recipeComparison(c, servings)
	        : `<div class="recipe-detail-row">
	            <section class="detail-card ingredients-card">
	              <div class="detail-card-header">
	                <h3>Ingredients</h3>
	                ${recipeSourceControls(c)}
	                <div class="ingredients-tools">
	                  <span class="total-volume">${escapeHtml(totalVolume)} Total</span>
	                  <div class="serving-stepper" aria-label="Servings">
	                    <button type="button" data-serving-step="-1" data-cocktail-id="${escapeHtml(c.id)}" aria-label="Decrease servings" ${servings <= 1 ? 'disabled' : ''}>−</button>
	                    <span class="serving-count">${escapeHtml(servingLabel)}</span>
	                    <button type="button" data-serving-step="1" data-cocktail-id="${escapeHtml(c.id)}" aria-label="Increase servings">+</button>
	                  </div>
	                </div>
	              </div>
	              <ul>${ingredientLines}</ul>${ingredientFootnote}
	              <div class="ingredient-garnish ingredient-inline"><h4>Garnish</h4><p>${recipeView.garnish ? escapeHtml(recipeView.garnish) : '<span class="empty">None listed</span>'}</p></div>
	              <div class="ingredient-glassware ingredient-inline"><h4>Glassware</h4><p>${escapeHtml(recipeGlasswareLabel(recipeView))}</p></div>
	              <div class="ingredient-method"><div class="detail-method-header"><h4>Method</h4>${servingStyleTag(recipeView)}</div><ol>${recipeView.method.length ? recipeView.method.map((x) => `<li>${escapeHtml(formatMethodLine(x))}</li>`).join('') : '<li class="empty">Not recorded yet</li>'}</ol></div>
	            </section>
	          </div>`;
	      return `<tr class="detail-row"><td colspan="13"><div class="detail">
	        <div class="detail-grid${comparingRecipes ? ' has-recipe-comparison' : ''}">
	          <section class="detail-card mobile-detail-facts">
	            <h3>Details</h3>
	            <dl class="detail-facts-list">
	              <div><dt>Base Liquor</dt><dd>${escapeHtml(detailBases)}</dd></div>
	              <div><dt>Ingredients</dt><dd>${escapeHtml(c.ingredientCount)}</dd></div>
	              <div><dt>Make Time</dt><dd>${escapeHtml(c.makeTime)} min</dd></div>
	              <div><dt>Glassware</dt><dd>${escapeHtml(displayGlass(c.glassware))}</dd></div>
	            </dl>
	          </section>
	          ${recipeDetails}
	          <section class="detail-card detail-notes-card"><div class="detail-card-header detail-notes-header"><h3>Notes</h3><div class="detail-meta-tags">${compactTypeTag(c, true)}${cocktailSourceBadges(c)}${spiritTags(c)}${cocktailTagMarkup(c)}</div><div class="detail-card-actions">${editButton}${linkButton}<button class="button icon notes-popout-button" type="button" data-popout-note="${escapeHtml(c.id)}" title="Expand notes" aria-label="Expand notes for ${escapeHtml(cocktailDisplayName(c))}">↗</button></div></div>${cocktailGuideWithFactsMarkup(c)}<textarea class="text-area" data-note-id="${escapeHtml(c.id)}" placeholder="Add a note">${escapeHtml(noteValue)}</textarea>${sourceNotesMarkup(c)}</section>
	          ${relatedCard(c)}
	        </div>
	      </div></td></tr>`;
	    }

function rowTemplate(c) {
      const expanded = state.expanded.has(c.id);
      const availability = barAvailability(c);
      const substitutionTitle = availability.substitutions
        .filter((entry) => entry.substitute)
        .map((entry) => `Use ${entry.substitute} for ${entry.requirement.name}`)
        .join('; ');
      const supportedIndicator = availability.state === 'exact'
        ? '<span class="bar-supported-indicator" role="img" aria-label="My Bar can make this cocktail" title="My Bar can make this cocktail"></span>'
        : availability.state === 'substitute'
          ? `<span class="bar-supported-indicator bar-substituted-indicator" role="img" aria-label="My Bar can make this cocktail with substitutions" title="${escapeHtml(substitutionTitle)}"></span>`
          : '';
      const bases = c.baseLiquor.map((base) => `<span class="mini-tag base-tag base-${classToken(base)}">${escapeHtml(displayBaseLabel(base))}</span>`).join('');
	      const garnish = rowGarnish(c);
	      const rating = getRating(c);
	      const friendCount = friendRatingEntries(c).length;
	      const ratingTitle = rating
	        ? `${store.ratingView === 'friends' ? `Friends average from ${friendCount} rating${friendCount === 1 ? '' : 's'}` : 'My rating'}: ${ratingLabel(rating)} / 5`
	        : (store.ratingView === 'friends' ? 'No friend ratings' : 'Not rated');
	      return `<tr class="summary-row" tabindex="0" role="button" aria-expanded="${expanded}" data-id="${escapeHtml(c.id)}">
	        <td data-label="Photo">${thumbCell(c)}</td>
	        <td data-label="My Bar"><span class="availability-slot">${supportedIndicator}</span></td>
	        <td data-label="Cocktail"><div class="name-cell"><div class="cocktail-name">${cocktailNameMarkup(c)}</div><div class="cocktail-row-markers">${cocktailDataFlagsMarkup(c)}<span class="cocktail-marker-tags">${compactTypeTag(c)}${cocktailRowSourceFlag(c)}</span></div></div></td>
	        <td data-label="Recipe">${recipeSourceIndicators(c)}</td>
	        <td data-label="Try" class="bookmark-cell">${bookmarkToggle(c)}</td>
	        <td data-label="Rating"><div class="rating-cell" title="${escapeHtml(ratingTitle)}">${ratingStars(c.id, rating, store.ratingView === 'friends' ? 'friends-view' : '')}<span class="rating-value">${ratingValueLabel(rating)}</span></div></td>
	        <td data-label="Serve">${servingStyleTag(c)}</td>
	        <td data-label="Base Liquor"><div class="tagline">${bases}</div></td>
	        <td data-label="Garnish"><span class="garnish-cell">${escapeHtml(garnish)}</span></td>
	        <td data-label="Ing.">${c.ingredientCount}</td>
        <td data-label="Time">${c.makeTime} min</td>
        <td data-label="Glassware">${escapeHtml(displayGlass(c.glassware))}</td>
        <td data-label="Status">${escapeHtml(statusLabel(c))}</td>
      </tr>${expanded ? detailTemplate(c) : ''}`;
    }

function barOpportunityThumb(cocktail) {
	      const photo = cocktailPhoto(cocktail);
	      return photo
	        ? `<img class="bar-opportunity-thumb" src="${escapeHtml(photo)}" alt="" loading="lazy">`
	        : `<span class="bar-opportunity-thumb bar-opportunity-fallback" aria-hidden="true">${escapeHtml(cocktail.name.slice(0, 1))}</span>`;
	    }

function barOpportunityCard(cocktail, missing, includeGarnish = false, showBookmark = false) {
      const labels = unique(missing.map(labelForMissing));
      const missingHtml = labels.map((label) => `<span class="bar-missing-tag">${escapeHtml(label)}</span>`).join('');
      const cocktailType = showBookmark ? displayType(cocktail) : '';
      const typeHtml = cocktailType ? `<span class="bar-opportunity-type" title="Cocktail type">${escapeHtml(cocktailType)}</span>` : '';
      const typeAria = cocktailType ? `. Type ${cocktailType}` : '';
      const garnishes = includeGarnish ? garnishTags(cocktail).filter((label) => label !== 'NONE') : [];
      const garnishHtml = garnishes.map((label) => `<span class="bar-missing-tag bar-garnish-tag" title="Garnish">${escapeHtml(label)}</span>`).join('');
      const garnishLabel = garnishes.length ? `. Garnish ${garnishes.join(', ')}` : '';
      const savedRating = showBookmark ? getRating(cocktail) : 0;
      const ratingAria = savedRating ? `. Rated ${ratingLabel(savedRating)} out of 5` : '';
      const ratingHtml = savedRating
        ? `<span class="bar-opportunity-rating" title="Rated ${escapeHtml(ratingLabel(savedRating))} out of 5" aria-hidden="true">★ ${escapeHtml(ratingLabel(savedRating))}</span>`
        : '';
      const isBookmarked = Boolean(store.bookmarks[cocktail.id]);
      const bookmarkLabel = showBookmark ? `. ${isBookmarked ? 'Bookmarked' : 'Not bookmarked'}` : '';
      const bookmarkHtml = showBookmark
        ? `<span class="bar-opportunity-bookmark${isBookmarked ? ' active' : ''}" title="${isBookmarked ? 'Bookmarked' : 'Not bookmarked'}" aria-hidden="true">${isBookmarked ? __BOOKMARK_FILL : __BOOKMARK}</span>`
        : '';
      return `<button class="bar-opportunity-card" type="button" data-jump-cocktail="${escapeHtml(cocktail.id)}" aria-label="Open ${escapeHtml(cocktailDisplayName(cocktail))}${escapeHtml(typeAria)}. Missing ${escapeHtml(labels.join(', '))}${escapeHtml(garnishLabel)}${escapeHtml(ratingAria)}${bookmarkLabel}">
        ${barOpportunityThumb(cocktail)}
        <span class="bar-opportunity-copy">
          <span class="bar-opportunity-heading"><span class="bar-opportunity-name">${cocktailNameMarkup(cocktail)}</span>${typeHtml}${ratingHtml}${bookmarkHtml}</span>
          <span class="bar-missing-list">${missingHtml}${garnishHtml}</span>
        </span>
      </button>`;
    }

function renderMyBarResults(readyRows) {
      const active = state.quick.has('myBar');
      $('#myBarReadyHeader').hidden = !active;
      $('#myBarResults').hidden = !active;
      if (!active) return;
      $('#jumpToNeatPours').hidden = neatPourBottles().length === 0;
      $('#myBarReadyTitle').textContent = state.futureBarPreview ? 'Future Bar: Ready to Make' : 'Ready to Make';
      const evaluated = COCKTAILS
        .filter((cocktail) => isMatch(cocktail, true))
        .map((cocktail) => ({cocktail, missing: missingRequirementsFor(cocktail)}));
      const oneAway = evaluated
        .filter((entry) => entry.missing.length === 1)
        .sort((a, b) => labelForMissing(a.missing[0]).localeCompare(labelForMissing(b.missing[0])) || a.cocktail.name.localeCompare(b.cocktail.name));
      const alcoholicOneAway = oneAway.filter((entry) => entry.missing[0].type !== 'ingredient');
      const nonAlcoholicOneAway = oneAway.filter((entry) => entry.missing[0].type === 'ingredient');
      const pantryNeeded = evaluated
        .filter((entry) => entry.missing.length > 1 && entry.missing.every((item) => item.type === 'ingredient'))
        .sort((a, b) => a.missing.length - b.missing.length || a.cocktail.name.localeCompare(b.cocktail.name));
      const renderOneAwayGroup = (entries, countSelector, summarySelector, listSelector, emptyMessage) => {
        const unlockCounts = getCounts(entries, (entry) => [labelForMissing(entry.missing[0])]);
        const unlockItems = Array.from(unlockCounts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
        $(countSelector).textContent = `${entries.length} cocktail${entries.length === 1 ? '' : 's'}`;
        $(summarySelector).hidden = unlockItems.length === 0;
        $(summarySelector).innerHTML = unlockItems.map(([label, count]) => `<span class="bar-unlock-pill"><span class="bar-unlock-label">${escapeHtml(label)}</span><span class="bar-unlock-count">[+${count}]</span></span>`).join('');
        $(listSelector).innerHTML = entries.length
          ? entries.map((entry) => barOpportunityCard(entry.cocktail, entry.missing, true, true)).join('')
          : `<p class="my-bar-results-empty">${escapeHtml(emptyMessage)}</p>`;
      };
      $('#myBarReadyCount').textContent = `${readyRows.length} cocktail${readyRows.length === 1 ? '' : 's'}`;
      $('#myBarOneAwayCount').textContent = `${oneAway.length} cocktail${oneAway.length === 1 ? '' : 's'}`;
      $('#myBarPantryNeededCount').textContent = `${pantryNeeded.length} cocktail${pantryNeeded.length === 1 ? '' : 's'}`;
      renderOneAwayGroup(alcoholicOneAway, '#myBarOneAwayAlcoholCount', '#myBarOneAwayAlcoholSummary', '#myBarOneAwayAlcoholList', 'No cocktails are one alcoholic item away.');
      renderOneAwayGroup(nonAlcoholicOneAway, '#myBarOneAwayNonAlcoholCount', '#myBarOneAwayNonAlcoholSummary', '#myBarOneAwayNonAlcoholList', 'No cocktails are one non-alcoholic item away.');
      $('#myBarPantryNeededList').innerHTML = pantryNeeded.length
        ? pantryNeeded.map((entry) => barOpportunityCard(entry.cocktail, entry.missing)).join('')
        : '<p class="my-bar-results-empty">No additional cocktails have every bottle covered.</p>';
    }

function renderTableSortHeaders() {
      $$('[data-table-sort]').forEach((button) => {
        const key = button.dataset.tableSort;
        const active = state.sort === key && state.sortDirection !== 'default';
        const direction = active ? state.sortDirection : 'default';
        const th = button.closest('th');
        const label = $('span:first-child', button).textContent;
        button.classList.toggle('active', active);
        $('.table-sort-icon', button).innerHTML = TABLE_SORT_ICONS[direction];
        th.setAttribute('aria-sort', active ? direction : 'none');
        button.setAttribute('aria-label', active
          ? `${label}, sorted ${direction}. Activate to ${direction === 'descending' ? 'sort ascending' : 'restore alphabetical default'}.`
          : `${label}, alphabetical default. Activate to sort descending.`);
      });
    }

function cycleSort(sortState, sortKey, directionKey, key) {
      if (sortState[sortKey] !== key || sortState[directionKey] === 'default') {
        sortState[sortKey] = key;
        sortState[directionKey] = 'descending';
      } else if (sortState[directionKey] === 'descending') {
        sortState[directionKey] = 'ascending';
      } else {
        sortState[sortKey] = 'name';
        sortState[directionKey] = 'default';
      }
    }

function cycleTableSort(key) {
      cycleSort(state, 'sort', 'sortDirection', key);
    }

function renderLettersLiquorTableBanner() {
	      const banner = $('#lettersLiquorTableBanner');
	      const selectedEraFilter = LNL_ERA_FILTERS.find((filter) => state.quick.has(filter.id));
	      const selectedEra = selectedEraFilter && LETTERS_LIQUOR_GALLERY.find((entry) => entry.era === selectedEraFilter.era);
	      if (selectedEra) {
	        banner.hidden = false;
	        banner.classList.remove('is-title', 'is-all-eras');
	        banner.innerHTML = `<img class="lnl-banner-lettering" src="${escapeHtml(selectedEra.lettering)}" alt="${escapeHtml(selectedEra.label)} lettering"><img class="lnl-banner-tabletop" src="${escapeHtml(selectedEra.tabletop)}" alt="${escapeHtml(selectedEra.label)} tabletop">`;
	        return;
	      }
	      if (state.quick.has('lnl')) {
	        banner.hidden = false;
	        banner.classList.remove('is-title');
	        banner.classList.add('is-all-eras');
	        banner.innerHTML = [
	          `<img src="${escapeHtml(LETTERS_LIQUOR_TITLE_IMAGE)}" alt="Letters &amp; Liquor title lettering">`,
	          ...LETTERS_LIQUOR_GALLERY.map((entry) => `<img src="${escapeHtml(entry.lettering)}" alt="${escapeHtml(entry.label)} lettering">`)
	        ].join('');
	        return;
	      }
	      banner.hidden = true;
	      banner.classList.remove('is-title', 'is-all-eras');
	      banner.innerHTML = '';
	    }
