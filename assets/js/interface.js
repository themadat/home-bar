// Classic-script function declarations; shared state is initialized in app.js.
function updateStickyTop() {
      syncStickyHeaderHeight();
    }

function fitResponsiveQuickFilters() {
      const row = $('#quickFilterScroll .quick-filter-primary');
      const extra = $$('[data-responsive-quick]', row);
      if (!extra.length) return;
      const focused = document.activeElement;
      extra.forEach((chip) => { chip.hidden = false; });
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const fixed = Array.from(row.children).filter((chip) => !chip.hasAttribute('data-responsive-quick') && getComputedStyle(chip).display !== 'none');
      let available = $('#quickFilterScroll').clientWidth - fixed.reduce((sum, chip) => sum + chip.getBoundingClientRect().width, 0) - gap * Math.max(0, fixed.length - 1);
      let full = false;
      extra.forEach((chip) => {
        const needed = chip.getBoundingClientRect().width + gap;
        chip.hidden = full || needed + 2 > available;
        if (chip.hidden) full = true;
        else available -= needed;
      });
      const promoted = new Set(extra.filter((chip) => !chip.hidden).map((chip) => chip.dataset.quick));
      $$('#genreMenuItems [data-quick]').forEach((chip) => { chip.closest('.genre-menu-item').hidden = promoted.has(chip.dataset.quick); });
      const hiddenActive = $$('#genreMenuItems [data-quick]').filter((chip) => !chip.closest('.genre-menu-item').hidden && state.quick.has(chip.dataset.quick)).length
        + $$('#genreMenuItems [data-stat-filter]').filter((chip) => state.statFilter === chip.dataset.statFilter).length;
      $('#genreMoreCount').textContent = hiddenActive ? ` ${hiddenActive}` : '';
      $('#genreMoreButton').classList.toggle('active', hiddenActive > 0);
      if (extra.includes(focused) && focused.hidden) $('#genreMoreButton').focus();
    }

function renderGenreFilters() {
      store.favoriteGenreFilters = unique(store.favoriteGenreFilters).filter((id) => GENRE_FILTER_IDS.has(id));
	      const statFilterMarkup = (id, className) => {
	        const filter = MORE_STAT_FILTERS.find((item) => item.id === id);
	        return `<div class="genre-menu-item core-filter"><button class="quick-chip genre-menu-filter stat-filter ${className}" type="button" data-stat-filter="${escapeHtml(filter.id)}" aria-pressed="false">${escapeHtml(filter.label)}</button></div>`;
	      };
	      const primaryFilters = [
	        statFilterMarkup('current', 'filter-current'),
	        statFilterMarkup('legacy', 'filter-legacy')
	      ].join('');
	      const promotedQuickIds = new Set(['lnl', 'iba', 'diffords', 'classic']);
      const quickFilters = ALL_MORE_QUICK_FILTERS.filter((filter) => !promotedQuickIds.has(filter.id)).map((filter) => `<div class="genre-menu-item core-filter">
        <button class="quick-chip genre-menu-filter${filter.className ? ` ${escapeHtml(filter.className)}` : ''}" type="button" data-quick="${escapeHtml(filter.id)}">${escapeHtml(filter.label)}</button>
      </div>`).join('');
      const genreFilters = GENRE_FILTERS.map((filter) => `<div class="genre-menu-item core-filter">
        <button class="quick-chip genre-menu-filter" type="button" data-quick="${escapeHtml(filter.id)}">${escapeHtml(filter.label)}</button>
      </div>`).join('');
	      const eraFilters = LNL_ERA_FILTERS.map((filter) => `<div class="genre-menu-item core-filter">
	        <button class="quick-chip genre-menu-filter source-era era-${classToken(filter.era)}" type="button" data-quick="${escapeHtml(filter.id)}">${escapeHtml(filter.label)}</button>
	      </div>`).join('');
      const tagFilters = allCocktailTags().filter((tag) => !LNL_ERA_HASHTAG_KEYS.has(norm(tag))).map((tag) => `<div class="genre-menu-item core-filter">
        <button class="quick-chip genre-menu-filter" type="button" data-quick="${escapeHtml(tagFilterId(tag))}">#${escapeHtml(tag)}</button>
      </div>`).join('');
	      $('#genreMenuItems').innerHTML = primaryFilters + quickFilters + genreFilters
	        + `<div class="genre-menu-section-label">Letters &amp; Liquor</div>${eraFilters}${tagFilters}`;
      const hiddenActiveCount =
	        MORE_STAT_FILTERS.filter((filter) => filter.id !== 'custom' && state.statFilter === filter.id).length
        + ALL_MORE_QUICK_FILTERS.filter((filter) => !promotedQuickIds.has(filter.id) && state.quick.has(filter.id)).length
	        + LNL_ERA_FILTERS.filter((filter) => state.quick.has(filter.id)).length
        + GENRE_FILTERS.filter((filter) => state.quick.has(filter.id)).length
        + Array.from(state.quick).filter(isTagFilterId).length;
      $('#genreMoreCount').textContent = hiddenActiveCount ? ` ${hiddenActiveCount}` : '';
      $('#genreMoreButton').classList.toggle('active', hiddenActiveCount > 0);
    }

function quickFilterCount(id) {
	      if (isTagFilterId(id)) {
	        const selectedTag = norm(tagFromFilterId(id));
	        return COCKTAILS.filter((cocktail) => cocktailTags(cocktail).some((tag) => norm(tag) === selectedTag)).length;
	      }
	      if (id === 'toTry') return COCKTAILS.filter((c) => store.bookmarks[c.id]).length;
	      if (id === 'favs') return COCKTAILS.filter((c) => getRating(c) >= 4).length;
	      if (id === 'myBar') return COCKTAILS.filter(canMakeFromBar).length;
	      if (id === 'lnl') return COCKTAILS.filter((c) => c.lnlSource).length;
	      if (id === 'iba') return COCKTAILS.filter((c) => ['Current IBA', 'Former IBA'].includes(c.status)).length;
	      if (id === 'diffords') return COCKTAILS.filter((c) => c.diffordsSource).length;
	      if (id === 'liquor') return COCKTAILS.filter((c) => c.liquorSource).length;
	      if (id === 'classic') return COCKTAILS.filter((c) => c.classicSource).length;
	      const diffordsGuideFilter = DIFFORDS_GUIDE_FILTERS.find((filter) => filter.id === id);
	      if (diffordsGuideFilter) return COCKTAILS.filter((cocktail) => {
	        const value = Number(cocktail.diffordsSource?.guide?.[diffordsGuideFilter.guideKey]);
	        if (!Number.isFinite(value)) return false;
	        return diffordsGuideFilter.comparison === 'max' ? value <= diffordsGuideFilter.threshold : value >= diffordsGuideFilter.threshold;
	      }).length;
	      const eraFilter = LNL_ERA_FILTERS.find((filter) => filter.id === id);
	      if (eraFilter) return COCKTAILS.filter((c) => c.lnlSource?.era === eraFilter.era).length;
	      const ibaTypeFilter = IBA_TYPE_FILTERS.find((filter) => filter.id === id);
	      if (ibaTypeFilter) return COCKTAILS.filter((c) => c.status === 'Current IBA' && displayType(c) === ibaTypeFilter.type).length;
	      if (id === 'allSpirit') return COCKTAILS.filter(isAllSpirit).length;
	      if (id === 'spiritForward') return COCKTAILS.filter(isSpiritForward).length;
	      if (id === 'hof') return COCKTAILS.filter((c) => getRating(c) >= 5).length;
	      if (GENRE_FILTER_IDS.has(id)) return COCKTAILS.filter((c) => matchesGenre(c, id)).length;
	      return 0;
	    }

function statFilterCount(id) {
	      if (id === 'neat') return neatPourBottles().length;
	      if (id === 'current') return COCKTAILS.filter((c) => c.status === 'Current IBA').length;
	      if (id === 'legacy') return COCKTAILS.filter((c) => c.status === 'Former IBA').length;
	      if (id === 'custom') return COCKTAILS.filter(isCustomCocktail).length;
	      return COCKTAILS.length;
	    }

function updateQuickFilters() {
	      $$('[data-quick]').forEach((chip) => {
	        const id = chip.dataset.quick;
	        const active = state.quick.has(id);
	        chip.classList.toggle('active', active);
	        chip.setAttribute('aria-pressed', String(active));
	        const label = chip.dataset.shortLabel || (isTagFilterId(id) ? `#${tagFromFilterId(id)}` : QUICK_FILTER_LABEL_MAP.get(id));
	        if (label) {
	          const count = quickFilterCount(id);
	          chip.innerHTML = id === 'myBar'
	            ? `<span class="bar-supported-indicator" aria-hidden="true"></span><span>${escapeHtml(label)} (${count})</span>`
	            : `${escapeHtml(label)} (${count})`;
	          if (id === 'myBar') chip.setAttribute('aria-label', `${label}: ${count} cocktails ready to make`);
	        }
	      });
	      $$('[data-stat-filter]').forEach((chip) => {
	        const label = STAT_FILTER_LABEL_MAP.get(chip.dataset.statFilter);
	        if (label) chip.textContent = `${label} (${statFilterCount(chip.dataset.statFilter)})`;
	      });
	      fitResponsiveQuickFilters();
    }

function setMobileAdvancedFiltersExpanded(expanded) {
	      $('#pillFilters').classList.toggle('mobile-expanded', expanded);
	      $('#mobileAdvancedFiltersToggle').setAttribute('aria-expanded', String(expanded));
	      $('#mobileAdvancedFiltersToggle').setAttribute('aria-label', `${expanded ? 'Hide' : 'Show'} Base, Garnish, Glassware, and Type filters`);
	    }

function render() {
      renderPills(); renderGenreFilters(); renderNeatPours(); renderTable(); renderStats(); updateQuickFilters(); updateGitHubSyncButton(); updateStickyTop();
    }

function toggleSet(set, value) { set.has(value) ? set.delete(value) : set.add(value); }

function toggleCocktailExpansion(id) { state.expanded.has(id) ? state.expanded.delete(id) : state.expanded.add(id); }

function cancelTryPriorityPress() {
      if (tryPriorityPress?.timer) clearTimeout(tryPriorityPress.timer);
      tryPriorityPress = null;
    }

function cancelFriendRatingPress() {
      if (friendRatingPress?.timer) clearTimeout(friendRatingPress.timer);
      friendRatingPress = null;
    }

function hideHoverHint() {
      if (hintTarget && !hintTarget.hasAttribute('title')) hintTarget.setAttribute('title', hintTitle);
      hintTarget = null; hoverHint.hidden = true;
    }

function showHoverHint(event) {
      const target = event.target.closest('[title]');
      if (!target || !target.title || target.disabled) return;
      hideHoverHint(); hintTarget = target; hintTitle = target.title;
      hoverHint.textContent = hintTitle; target.removeAttribute('title'); hoverHint.hidden = false;
      const rect = target.getBoundingClientRect();
      hoverHint.style.left = Math.max(12, Math.min(rect.left, innerWidth - hoverHint.offsetWidth - 12)) + 'px';
      hoverHint.style.top = Math.max(12, rect.bottom + hoverHint.offsetHeight + 8 < innerHeight ? rect.bottom + 8 : rect.top - hoverHint.offsetHeight - 8) + 'px';
    }

function anyModalOpen() {
      return $$('.modal-overlay').some((overlay) => !overlay.hidden);
    }

function shortcutModifiersHeld(event) {
      return event.shiftKey && event.ctrlKey && event.altKey && !event.metaKey;
    }

function refreshShortcutHints(visible) {
      shortcutHintsActive = visible;
      document.documentElement.classList.toggle('shortcut-hints-visible', visible);
      $$('[data-shortcut]').forEach((control) => {
        const overlay = control.closest('.modal-overlay');
        const eligible = visible && !control.disabled && (overlay ? !overlay.hidden : !anyModalOpen());
        control.classList.toggle('shortcut-eligible', eligible);
      });
    }

function runKeyboardShortcut(event) {
      if (!shortcutModifiersHeld(event) || event.repeat) return false;
      const barOpen = !$('#barModalOverlay').hidden;
      const syncModalOpen = !$('#githubSyncModalOverlay').hidden;
      const glasswareOpen = !$('#glasswareModalOverlay').hidden;
      const shoppingListOpen = !$('#shoppingListModalOverlay').hidden;
      const cocktailFormOpen = !$('#cocktailFormModalOverlay').hidden;
      const noModalOpen = !anyModalOpen();
      let control = null;

      if (event.code === 'KeyC' && noModalOpen) control = $('#resetFilters');
      else if (event.code === 'KeyR' && noModalOpen) control = $('#updateAppButton');
      else if (event.code === 'KeyS' && syncModalOpen) control = $('#githubSyncNow');
      else if (event.code === 'KeyS' && cocktailFormOpen) control = $('#cocktailFormSave');
      else if (event.code === 'KeyS' && noModalOpen) {
        event.preventDefault();
        if (!githubSyncBusy && !githubSyncRuntime.checking) {
          openGitHubSyncModal('sync');
          if (githubSyncConfigured()) $('#githubSyncNow').click();
        }
        return true;
      }
      else if (event.code === 'KeyB' && shoppingListOpen) control = $('#shoppingListBarButton');
      else if (event.code === 'KeyB' && noModalOpen) control = $('#manageBarButton');
      else if (event.code === 'KeyA' && noModalOpen) control = $('#addCocktailButton');
      else if (event.code === 'KeyG' && barOpen) control = $('#barShoppingListButton');
      else if (event.code === 'KeyG' && noModalOpen) control = $('#lettersLiquorGalleryButton');
      else if (event.code === 'Comma' && noModalOpen) control = $('#settingsButton');
      else if (event.code === 'KeyV' && barOpen) control = $('#barRecommendationsToggle');
      else if (event.code === 'KeyV' && noModalOpen) control = $('#versionPill');
      else if (event.code === 'KeyN' && noModalOpen) control = $('#notesButton');
      else if (event.code === 'KeyD' && noModalOpen) control = $('#glasswareButton');
      else if (event.code === 'KeyA' && glasswareOpen) control = $('#glasswareAddToggle');
      else if (event.code === 'KeyE' && glasswareOpen) control = $('#glasswareExpandButton');
      else if (event.code === 'KeyC' && glasswareOpen) control = $('#glasswareCondenseButton');
      else if (event.code === 'KeyA' && barOpen) control = $('[data-pantry-sort="alpha"]');
      else if (event.code === 'Digit1' && barOpen) control = $('[data-pantry-sort="usage"]');

      if (!control || control.disabled) return false;
      event.preventDefault();
      control.click();
      refreshShortcutHints(true);
      return true;
    }

function updateRatingFilterVisibility() {
	      const mode = state.rating.mode;
	      $('#ratingValueInput').hidden = !(mode === 'above' || mode === 'below');
	      $('#ratingRangeInputs').hidden = mode !== 'within';
	    }

function resetFilterState() {
	          state.q = ''; state.ingredientQ = ''; state.bottleUsageId = ''; state.bottleUsageOverride = null;
	          state.statFilter = 'all';
	          state.types.clear(); state.bases.clear(); state.subtypes.clear(); state.glasses.clear(); state.garnishes.clear(); state.ingredients.clear(); state.quick.clear();
	          state.rating = { mode: 'any', value: 3, min: 2, max: 4 };
	          $('#searchInput').value = ''; $('#ingredientSearch').value = '';
	          $('#ratingModeSelect').value = 'any'; $('#ratingValueInput').value = 3; $('#ratingMinInput').value = 2; $('#ratingMaxInput').value = 4;
	          updateRatingFilterVisibility();
	        }

function resetSortAndFilters() {
	          resetFilterState();
	          state.sort = 'name';
	          state.sortDirection = 'default';
	          state.expanded.clear();
	          state.recipeSingle.clear();
	          render();
	        }

function jumpToCocktail(id) {
	          const target = COCKTAILS.find((cocktail) => cocktail.id === id);
	          if (!target) return;
	          if (!isMatch(target)) resetFilterState();
	          state.expanded.add(id);
	          render();
	          const row = $$('.summary-row').find((tr) => tr.dataset.id === id);
	          if (row) {
	            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
	            row.classList.add('jump-flash');
	            setTimeout(() => row.classList.remove('jump-flash'), 1600);
	          }
	        }

function refreshGitHubNetworkState() {
	      const offline = navigator.onLine === false;
	      const wasOffline = githubSyncRuntime.offline;
	      githubSyncRuntime.offline = offline;
	      if (!offline && wasOffline) githubSyncRuntime.error = '';
	      updateGitHubSyncButton();
	      if (!$('#githubSyncModalOverlay').hidden) updateGitHubSyncInterface(true);
	      if (!offline && wasOffline) checkGitHubSyncStatus(true);
	    }

function measurePriorityColumnNeeds() {
      const table = $('.table-wrap table');
      const tbody = $('#cocktailBody');
      if (!table || !tbody) return null;
      const probeRow = document.createElement('tr');
      probeRow.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;';
      probeRow.innerHTML = `
	    <td></td>
	    <td></td>
	    <td><div class="name-cell"><div class="cocktail-name" data-probe="name"></div><div class="cocktail-row-markers" data-probe="markers"></div></div></td>
	    <td></td><td></td><td></td><td></td>
        <td><div class="tagline" data-probe="base"></div></td>
        <td><span class="garnish-cell" data-probe="garnish"></span></td>
        <td></td><td></td>
        <td data-probe="glass"></td>
        <td></td>
      `;
      tbody.appendChild(probeRow);
      const nameEl = probeRow.querySelector('[data-probe="name"]');
      const markerEl = probeRow.querySelector('[data-probe="markers"]');
      const baseEl = probeRow.querySelector('[data-probe="base"]');
      const garnishEl = probeRow.querySelector('[data-probe="garnish"]');
      const glassEl = probeRow.querySelector('[data-probe="glass"]');
      let maxName = 0, maxBase = 0, maxGarnish = 0, maxGlass = 0;
      COCKTAILS.forEach((c) => {
        nameEl.innerHTML = cocktailNameMarkup(c);
        markerEl.innerHTML = `${cocktailDataFlagsMarkup(c)}<span class="cocktail-marker-tags">${compactTypeTag(c)}${cocktailRowSourceFlag(c)}</span>`;
        maxName = Math.max(maxName, nameEl.closest('.name-cell').scrollWidth);
        baseEl.innerHTML = c.baseLiquor.map((base) => `<span class="mini-tag base-tag base-${classToken(base)}">${escapeHtml(displayBaseLabel(base))}</span>`).join('');
        maxBase = Math.max(maxBase, baseEl.scrollWidth);
        garnishEl.textContent = rowGarnish(c);
        maxGarnish = Math.max(maxGarnish, garnishEl.scrollWidth);
        glassEl.textContent = displayGlass(c.glassware);
        maxGlass = Math.max(maxGlass, glassEl.scrollWidth);
      });
      tbody.removeChild(probeRow);
      const PAD = 24;
      return {
        cocktail: maxName + PAD,
        base: maxBase + PAD,
        garnish: maxGarnish + PAD,
        glass: maxGlass + PAD
      };
    }

function applyColumnWidths() {
      const table = $('.table-wrap table');
      if (!table) return;
      const need = measurePriorityColumnNeeds();
      if (!need) return;
      Object.keys(FIXED_COL_WIDTH).forEach((col) => {
        const th = table.querySelector(`th[data-col="${col}"]`);
        const tableCol = table.querySelector(`col[data-table-col="${col}"]`);
        const width = `${FIXED_COL_WIDTH[col]}px`;
        if (th) th.style.width = width;
        if (tableCol) tableCol.style.width = width;
      });
      const fixedTotal = Object.values(FIXED_COL_WIDTH).reduce((sum, w) => sum + w, 0);
      const tableWidth = $('.table-wrap').clientWidth;
      const recipeWidth = FIXED_COL_WIDTH.recipe || 0;
      let remaining = Math.max(0, tableWidth - fixedTotal + recipeWidth);
      const widths = {};
      PRIORITY_COLS.forEach((col) => {
        widths[col] = Math.min(PRIORITY_FLOOR[col], remaining);
        remaining -= widths[col];
      });
      PRIORITY_COLS.forEach((col) => {
        const extraNeeded = Math.max(0, need[col] - widths[col]);
        const give = Math.min(extraNeeded, remaining);
        widths[col] += give;
        remaining -= give;
      });
      if (widths.base > 250) {
        const shift = widths.base - 250;
        widths.base -= shift;
        widths.cocktail += shift;
      }
      if (remaining > 0) {
        const unassigned = remaining;
        const totalWeight = PRIORITY_COLS.reduce((sum, col) => sum + PRIORITY_GROW_WEIGHT[col], 0);
        let assigned = 0;
        PRIORITY_COLS.forEach((col, index) => {
          const give = index === PRIORITY_COLS.length - 1
            ? unassigned - assigned
            : Math.floor(unassigned * PRIORITY_GROW_WEIGHT[col] / totalWeight);
          widths[col] += give;
          assigned += give;
        });
        remaining = 0;
      }
      widths.cocktail = Math.max(90, widths.cocktail - recipeWidth);
      PRIORITY_COLS.forEach((col) => {
        const th = table.querySelector(`th[data-col="${col}"]`);
        const tableCol = table.querySelector(`col[data-table-col="${col}"]`);
        const width = `${Math.round(widths[col])}px`;
        if (th) th.style.width = width;
        if (tableCol) tableCol.style.width = width;
      });
	  table.classList.add('type-labels-full');
    }

function scheduleColumnWidthUpdate() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyColumnWidths, 120);
    }
