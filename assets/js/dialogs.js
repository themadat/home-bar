// Classic-script function declarations; shared state is initialized in app.js.
function lettersLiquorGalleryMarkup() {
	      const filters = [
	        '<button class="quick-chip lnl-all-filter" type="button" data-quick="lnl">L&amp;L</button>',
	        ...LNL_ERA_FILTERS.map((filter) => `<button class="quick-chip source-era era-${classToken(filter.era)}" type="button" data-quick="${escapeHtml(filter.id)}">${escapeHtml(filter.label)}</button>`)
	      ].join('');
	      const eras = LETTERS_LIQUOR_GALLERY.map((entry) => `<section class="lnl-gallery-era"><h3>${escapeHtml(entry.label)}</h3><div class="lnl-gallery-pair"><figure><img class="lnl-gallery-lettering" src="${escapeHtml(entry.lettering)}" loading="lazy" alt="${escapeHtml(entry.label)} lettering"><figcaption>Lettering</figcaption></figure><figure><img class="lnl-gallery-tabletop" src="${escapeHtml(entry.tabletop)}" loading="lazy" alt="${escapeHtml(entry.label)} tabletop"><figcaption>Tabletop</figcaption></figure></div></section>`).join('');
	      return `<img class="lnl-gallery-title" src="${escapeHtml(LETTERS_LIQUOR_TITLE_IMAGE)}" alt="Letters &amp; Liquor title lettering"><div class="lnl-gallery-filters" aria-label="Letters &amp; Liquor filters">${filters}</div>${eras}`;
	    }

function openLettersLiquorGallery() {
	      $('#lnlGalleryBody').innerHTML = lettersLiquorGalleryMarkup();
	      updateQuickFilters();
	      $('#lnlGalleryOverlay').hidden = false;
	    }

function closeLettersLiquorGallery() {
	      $('#lnlGalleryOverlay').hidden = true;
	    }

function renderTable() {
      updateRatingAudienceUi();
      updateResetButton();
      renderTableSortHeaders();
	      renderLettersLiquorTableBanner();
      const rows = filteredCocktails();
      const showingNeatPours = state.statFilter === 'neat';
      $('.table-wrap').hidden = showingNeatPours;
      if (showingNeatPours) {
        $('#myBarReadyHeader').hidden = true;
        $('#myBarResults').hidden = true;
        const count = neatPourBottles().length;
        $('#resultMeta').textContent = `${count} neat pour${count === 1 ? '' : 's'} in My Bar`;
        $('#activeMeta').textContent = activeFilterText();
        return;
      }
      const emptyMessage = state.quick.has('myBar') ? 'No cocktails are ready with the current filters.' : 'No cocktails match the current filters.';
      $('#cocktailBody').innerHTML = rows.length ? rows.map(rowTemplate).join('') : `<tr><td colspan="13"><div class="no-results">${emptyMessage}</div></td></tr>`;
      renderMyBarResults(rows);
      const bottleUsage = activeBottleUsage();
      $('#resultMeta').textContent = bottleUsage
        ? `${rows.length} cocktail${rows.length === 1 ? '' : 's'} using ${bottleUsage.name}`
        : `${state.quick.has('myBar') && state.futureBarPreview ? 'Future bar · ' : ''}${rows.length}/${COCKTAILS.length}`;
      $('#activeMeta').textContent = activeFilterText();
    }

function activeFilterCount() {
          return state.types.size + state.bases.size + state.subtypes.size + state.glasses.size + state.garnishes.size + state.ingredients.size + state.quick.size + (state.q ? 1 : 0) + (state.bottleUsageId ? 1 : 0) + (state.rating.mode !== 'any' ? 1 : 0) + (state.statFilter !== 'all' ? 1 : 0);
        }

function activeFilterText() {
          const total = activeFilterCount();
          return total ? `${total} filter${total === 1 ? '' : 's'}` : 'No filters';
        }

function updateResetButton() {
          $('#resetFilters').disabled = !(activeFilterCount() || state.ingredientQ || state.sort !== 'name' || state.sortDirection !== 'default' || state.expanded.size || state.recipeSingle.size);
        }

function renderStats() {
	          $('#versionPill').textContent = `v${BUILD_VERSION}`;
	          $$('[data-stat-filter]').forEach((button) => {
	            const active = button.dataset.statFilter === state.statFilter;
	            button.setAttribute('aria-pressed', String(active));
	            button.classList.toggle('active', active);
	          });
	        }

function renderVersionModal() {
	          $('#versionModalBuild').textContent = `v${BUILD_VERSION}`;
	          $('#featureList').innerHTML = FEATURES.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
	          $('#wishlistList').innerHTML = WISHLIST.length
	            ? WISHLIST.map((item) => `<li>${escapeHtml(item)}</li>`).join('')
	            : '<li class="empty">Nothing on the wishlist right now</li>';
	          $('#resourceList').innerHTML = RESOURCES.map((item) => `<li><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${escapeHtml(item.label)}</a></li>`).join('');
	        }

function openVersionModal() {
	          renderVersionModal();
	          $('#versionModalOverlay').hidden = false;
	        }

function closeVersionModal() {
	          $('#versionModalOverlay').hidden = true;
	        }

function openNotesModal() {
	          $('#notesTextarea').value = store.appNotes;
	          $('#notesModalOverlay').hidden = false;
	          requestAnimationFrame(() => $('#notesTextarea').focus());
	        }

function closeNotesModal() {
	          $('#notesModalOverlay').hidden = true;
	        }

function renderCocktailNotesIngredients(cocktail) {
	          const servings = servingCount(cocktail.id);
	          const recipeContainer = $('#cocktailNotesIngredients');
	          const sourceCount = RECIPE_SOURCE_OPTIONS.filter((option) => availableRecipeSource(cocktail, option.key)).length;
	          if (sourceCount) {
	            recipeContainer.classList.remove('single-recipe', 'cocktail-notes-module', 'ingredients-card');
	            recipeContainer.innerHTML = recipeComparison(cocktail, servings, false);
	            return;
	          }
	          recipeContainer.classList.add('single-recipe', 'cocktail-notes-module', 'ingredients-card');
	          const servingLabel = `${servings} Serving${servings === 1 ? '' : 's'}`;
	          const {lines: ingredientLines, footnote: ingredientFootnote} = ingredientListDetails(cocktail, servings);
	          recipeContainer.innerHTML = `<div class="cocktail-notes-module-header"><div class="ingredients-tools"><span class="total-volume">${escapeHtml(formatTotalVolume(totalIngredientVolume(cocktail, servings)))} Total</span><div class="serving-stepper" aria-label="Servings"><button type="button" data-serving-step="-1" data-cocktail-id="${escapeHtml(cocktail.id)}" aria-label="Decrease servings" ${servings <= 1 ? 'disabled' : ''}>\u2212</button><span class="serving-count">${escapeHtml(servingLabel)}</span><button type="button" data-serving-step="1" data-cocktail-id="${escapeHtml(cocktail.id)}" aria-label="Increase servings">+</button></div></div><h3>Ingredients</h3></div><ul>${ingredientLines}</ul>${ingredientFootnote}<div class="ingredient-garnish ingredient-inline"><h4>Garnish</h4><p>${cocktail.garnish ? escapeHtml(cocktail.garnish) : '<span class="empty">None listed</span>'}</p></div><div class="ingredient-glassware ingredient-inline"><h4>Glassware</h4><p>${escapeHtml(recipeGlasswareLabel(cocktail))}</p></div><div class="ingredient-method"><div class="detail-method-header"><h4>Method</h4>${servingStyleTag(cocktail)}</div><ol>${cocktail.method.length ? cocktail.method.map((line) => `<li>${escapeHtml(formatMethodLine(line))}</li>`).join('') : '<li class="empty">Not recorded yet</li>'}</ol></div>`;
	        }

function openCocktailNotes(cocktail) {
	          if (!cocktail) return;
	          const hasUserNotes = Object.prototype.hasOwnProperty.call(store.notes, cocktail.id);
	          const noteValue = hasUserNotes ? store.notes[cocktail.id] : cocktail.notes.join('\n');
	          $('#cocktailNotesTitle').textContent = `${cocktailDisplayName(cocktail)} Notes`;
	          $('#cocktailNotesActions').innerHTML = '';
	          const artworkGallery = expandedArtworkMarkup(cocktail);
	          const photo = cocktailPhoto(cocktail);
	          const notesDrawer = $('#cocktailNotesOverlay .cocktail-notes-drawer');
	          notesDrawer.classList.toggle('has-artwork-gallery', Boolean(artworkGallery));
	          $('#cocktailNotesArtwork').innerHTML = artworkGallery || (photo
	            ? `<img class="cocktail-notes-image" src="${escapeHtml(photo)}" alt="${escapeHtml(cocktailDisplayName(cocktail))}">`
	            : `<div class="cocktail-notes-image-fallback" aria-hidden="true">${escapeHtml(cocktail.name.slice(0, 1))}</div>`);
	          renderCocktailNotesIngredients(cocktail);
	          $('#cocktailNotesTags').innerHTML = `${compactTypeTag(cocktail, true)}${cocktailSourceBadges(cocktail)}${spiritTags(cocktail)}${cocktailTagMarkup(cocktail)}`;
	          $('#cocktailNotesGuide').innerHTML = cocktailGuideWithFactsMarkup(cocktail);
	          $('#cocktailNotesTextarea').value = noteValue;
	          $('#cocktailNotesTextarea').dataset.noteId = cocktail.id;
	          $('#cocktailNotesLnlSections').innerHTML = sourceNotesMarkup(cocktail);
	          $('#cocktailNotesRelated').innerHTML = relatedCard(cocktail);
	          $('#cocktailNotesOverlay').hidden = false;
	          requestAnimationFrame(() => { $('#cocktailNotesOverlay .modal-body').scrollTop = 0; });
	        }

function closeCocktailNotes() {
	          $('#cocktailNotesOverlay').hidden = true;
	        }

function glasswareSortValue(glass, key) {
	          if (key === 'type') return glass.type;
	          if (key === 'brand') return glass.brand;
	          if (key === 'descriptors') return glass.descriptors;
	          if (key === 'ounces') return glass.ounces === '' ? -Infinity : Number(glass.ounces);
	          if (key === 'count') return glass.count;
	          if (key === 'cost') return glass.cost === '' ? -Infinity : Number(glass.cost);
	          return '';
	        }

function compareGlasswareSortValues(a, b, key) {
	          const av = glasswareSortValue(a, key);
	          const bv = glasswareSortValue(b, key);
	          if (typeof av === 'number' && typeof bv === 'number') return av - bv;
	          return String(av).localeCompare(String(bv), undefined, {numeric: true, sensitivity: 'base'});
	        }

function cycleGlasswareSort(key) {
	          if (state.glasswareSort !== key || state.glasswareSortDirection === 'default') {
	            state.glasswareSort = key;
	            state.glasswareSortDirection = 'descending';
	          } else if (state.glasswareSortDirection === 'descending') {
	            state.glasswareSortDirection = 'ascending';
	          } else {
	            state.glasswareSort = 'source';
	            state.glasswareSortDirection = 'default';
	          }
	        }

function renderGlasswareSortHeaders() {
	          $$('[data-glassware-sort]').forEach((button) => {
	            const key = button.dataset.glasswareSort;
	            const active = state.glasswareSort === key && state.glasswareSortDirection !== 'default';
	            const direction = active ? state.glasswareSortDirection : 'default';
	            const th = button.closest('th');
	            const label = $('.glassware-sort-label', button).textContent;
	            button.classList.toggle('active', active);
	            $('.table-sort-icon', button).innerHTML = TABLE_SORT_ICONS[direction];
	            th.setAttribute('aria-sort', active ? direction : 'none');
	            button.setAttribute('aria-label', active
	              ? `${label}, sorted ${direction}. Activate to ${direction === 'descending' ? 'sort ascending' : 'restore source order'}.`
	              : `${label}, source order. Activate to sort descending.`);
	          });
	        }

function filteredGlassware() {
	          const q = norm(state.glasswareQ);
	          const rows = store.glassware.map((glass, sourceIndex) => ({glass, sourceIndex}))
	            .filter((row) => !q || norm([row.glass.type, row.glass.brand, row.glass.descriptors].filter(Boolean).join(' ')).includes(q));
	          rows.sort((a, b) => {
	            if (state.glasswareSort === 'source' || state.glasswareSortDirection === 'default') return a.sourceIndex - b.sourceIndex;
	            const direction = state.glasswareSortDirection === 'descending' ? -1 : 1;
	            const compared = compareGlasswareSortValues(a.glass, b.glass, state.glasswareSort);
	            if (compared) return compared * direction;
	            return a.glass.type.localeCompare(b.glass.type) || a.sourceIndex - b.sourceIndex;
	          });
	          return rows.map((row) => row.glass);
	        }

function renderGlasswareEditRow(glass) {
	          const id = escapeHtml(glass.id);
	          if (state.glasswareCondensed) {
	            return `<tr class="glassware-row-editing glassware-row-condensed" data-glass-row="${id}">
	                <td><input class="text-input glassware-edit-input" data-field="type" value="${escapeHtml(glass.type)}" required></td>
	                <td><input class="text-input glassware-edit-input" data-field="brand" value="${escapeHtml(glass.brand)}"></td>
	                <td><input class="text-input glassware-edit-input" data-field="descriptors" value="${escapeHtml(glass.descriptors)}"></td>
	                <td><input class="text-input glassware-edit-input" type="number" min="0" step="any" data-field="ounces" value="${escapeHtml(String(glass.ounces))}"></td>
	                <td><input class="text-input glassware-edit-input" type="number" min="1" step="1" data-field="count" value="${escapeHtml(String(glass.count))}"></td>
	                <td><input class="text-input glassware-edit-input" type="number" min="0" step="0.01" data-field="cost" value="${escapeHtml(String(glass.cost))}"></td>
	                <td class="glassware-col-actions"><span class="glassware-row-actions">
	                  <button class="button icon" type="button" data-save-glass="${id}" aria-label="Save">✓</button>
	                  <button class="button icon" type="button" data-cancel-glass-edit="${id}" aria-label="Cancel">×</button>
	                </span></td>
	              </tr>
	              <tr class="glassware-row-editing-extra" data-glass-row-extra="${id}">
	                <td colspan="7">
	                  <div class="glassware-edit-extra-fields">
	                    <label class="form-field"><span class="form-label">Image URL</span><input class="text-input glassware-edit-input" type="url" data-field="image" value="${escapeHtml(glass.image)}"></label>
	                    <label class="form-field"><span class="form-label">Product URL</span><input class="text-input glassware-edit-input" type="url" data-field="url" value="${escapeHtml(glass.url)}"></label>
	                  </div>
	                </td>
	              </tr>`;
	          }
	          const thumb = glass.image ? `<img src="${escapeHtml(glass.image)}" alt="">` : __WINEGLASS_FILL;
	          return `<tr class="glassware-row-editing" data-glass-row="${id}">
	              <td class="glassware-col-thumb"><span class="glassware-thumb">${thumb}</span></td>
	              <td class="glassware-col-type">
	                <input class="text-input glassware-edit-input" data-field="type" value="${escapeHtml(glass.type)}" required>
	                <input class="text-input glassware-edit-input glassware-edit-brand" data-field="brand" placeholder="Brand" value="${escapeHtml(glass.brand)}">
	              </td>
	              <td><input class="text-input glassware-edit-input" data-field="descriptors" value="${escapeHtml(glass.descriptors)}"></td>
	              <td><input class="text-input glassware-edit-input" type="number" min="0" step="any" data-field="ounces" value="${escapeHtml(String(glass.ounces))}"></td>
	              <td><input class="text-input glassware-edit-input" type="number" min="1" step="1" data-field="count" value="${escapeHtml(String(glass.count))}"></td>
	              <td><input class="text-input glassware-edit-input" type="number" min="0" step="0.01" data-field="cost" value="${escapeHtml(String(glass.cost))}"></td>
	              <td class="glassware-col-actions"><span class="glassware-row-actions">
	                <button class="button icon" type="button" data-save-glass="${id}" aria-label="Save">✓</button>
	                <button class="button icon" type="button" data-cancel-glass-edit="${id}" aria-label="Cancel">×</button>
	              </span></td>
	            </tr>
	            <tr class="glassware-row-editing-extra" data-glass-row-extra="${id}">
	              <td class="glassware-col-thumb"></td>
	              <td colspan="6">
	                <div class="glassware-edit-extra-fields">
	                  <label class="form-field"><span class="form-label">Image URL</span><input class="text-input glassware-edit-input" type="url" data-field="image" value="${escapeHtml(glass.image)}"></label>
	                  <label class="form-field"><span class="form-label">Product URL</span><input class="text-input glassware-edit-input" type="url" data-field="url" value="${escapeHtml(glass.url)}"></label>
	                </div>
	              </td>
	            </tr>`;
	        }

function renderGlasswareTableHead() {
	          const theadRow = $('.glassware-table thead tr');
	          const sortHeader = (key, label) => `<th class="sortable-column glassware-col-${key === 'ounces' ? 'oz' : key === 'cost' ? 'cost' : key === 'count' ? 'count' : key}" data-sort-key="${key}" aria-sort="none"><button class="table-sort-button" type="button" data-glassware-sort="${key}"><span class="table-sort-icon" aria-hidden="true"></span><span class="glassware-sort-label">${label}</span></button></th>`;
	          const cells = state.glasswareCondensed
	            ? [sortHeader('type', 'Type'), sortHeader('brand', 'Brand'), sortHeader('descriptors', 'Descriptors'), sortHeader('ounces', 'Oz'), sortHeader('count', '#'), sortHeader('cost', '$'), '<th class="glassware-col-actions"></th>']
	            : ['<th class="glassware-col-thumb"></th>', sortHeader('type', 'Type'), sortHeader('descriptors', 'Descriptors'), sortHeader('ounces', 'Oz'), sortHeader('count', '#'), sortHeader('cost', '$'), '<th class="glassware-col-actions"></th>'];
	          theadRow.innerHTML = cells.join('');
	        }

function renderGlasswareList() {
	          renderGlasswareTableHead();
	          renderGlasswareSortHeaders();
	          const list = $('#glasswareList');
	          const rows = filteredGlassware();
	          if (!rows.length) {
	            const message = store.glassware.length ? `No glassware matches "${escapeHtml(state.glasswareQ)}".` : 'No glassware logged yet.';
	            list.innerHTML = `<tr class="glassware-empty-row"><td colspan="7">${message}</td></tr>`;
	            return;
	          }
	          list.innerHTML = rows.map((glass) => {
	            if (glass.id === glasswareEditingId) return renderGlasswareEditRow(glass);
	            let priceCell;
	            if (glass.cost !== '') {
	              const priceText = escapeHtml(formatBottlePrice(glass.cost));
	              priceCell = glass.url ? `<a class="glassware-row-link" href="${escapeHtml(glass.url)}" target="_blank" rel="noopener" title="Open product link">${priceText} ↗</a>` : priceText;
	            } else {
	              priceCell = glass.url ? `<a class="glassware-row-link" href="${escapeHtml(glass.url)}" target="_blank" rel="noopener" title="Open product link">View ↗</a>` : '';
	            }
	            if (state.glasswareCondensed) {
	              return `<tr class="glassware-row-condensed" data-glass-id="${escapeHtml(glass.id)}">
	                <td class="glassware-col-type"><button type="button" class="glassware-type-cell" data-edit-glass="${escapeHtml(glass.id)}" aria-label="Edit ${escapeHtml(glass.type)}">${escapeHtml(glass.type)}</button></td>
	                <td class="glassware-col-brand">${escapeHtml(glass.brand)}</td>
	                <td class="glassware-col-descriptors">${escapeHtml(glass.descriptors)}</td>
	                <td>${glass.ounces !== '' ? escapeHtml(String(glass.ounces)) : ''}</td>
	                <td>${glass.count}</td>
	                <td>${priceCell}</td>
	                <td class="glassware-col-actions"></td>
	              </tr>`;
	            }
	            const thumb = glass.image ? `<img src="${escapeHtml(glass.image)}" alt="">` : __WINEGLASS_FILL;
	            const brandSub = glass.brand ? `<div class="glassware-brand-sub">${escapeHtml(glass.brand)}</div>` : '';
	            return `<tr data-glass-id="${escapeHtml(glass.id)}">
	              <td class="glassware-col-thumb"><span class="glassware-thumb">${thumb}</span></td>
	              <td class="glassware-col-type"><button type="button" class="glassware-type-cell" data-edit-glass="${escapeHtml(glass.id)}" aria-label="Edit ${escapeHtml(glass.type)}">${escapeHtml(glass.type)}</button>${brandSub}</td>
	              <td class="glassware-col-descriptors">${escapeHtml(glass.descriptors)}</td>
	              <td>${glass.ounces !== '' ? escapeHtml(String(glass.ounces)) : ''}</td>
	              <td>${glass.count}</td>
	              <td>${priceCell}</td>
	              <td class="glassware-col-actions"></td>
	            </tr>`;
	          }).join('');
	        }

function resetGlasswareForm() {
	          $('#glasswareForm').reset();
	        }

function setGlasswareDensity(condensed) {
	          state.glasswareCondensed = condensed;
	          glasswareEditingId = null;
	          $('#glasswareExpandButton').classList.toggle('active', !condensed);
	          $('#glasswareCondenseButton').classList.toggle('active', condensed);
	          renderGlasswareList();
	        }

function openGlasswareModal() {
	          resetGlasswareForm();
	          $('#glasswareForm').hidden = true;
	          glasswareEditingId = null;
	          $('#glasswareSearch').value = state.glasswareQ;
	          $('#glasswareExpandButton').classList.toggle('active', !state.glasswareCondensed);
	          $('#glasswareCondenseButton').classList.toggle('active', state.glasswareCondensed);
	          renderGlasswareList();
	          $('#glasswareModalOverlay').hidden = false;
	        }

function closeGlasswareModal() {
	          $('#glasswareModalOverlay').hidden = true;
	        }

function beginEditGlass(id) {
	          glasswareEditingId = id;
	          renderGlasswareList();
	          requestAnimationFrame(() => {
	            const input = document.querySelector(`[data-glass-row="${id}"] .glassware-edit-input[data-field="type"]`);
	            if (input) input.focus();
	          });
	        }

function cancelEditGlass() {
	          glasswareEditingId = null;
	          renderGlasswareList();
	        }

function saveEditGlass(id) {
	          const row = document.querySelector(`[data-glass-row="${id}"]`);
	          if (!row) return;
	          const extra = document.querySelector(`[data-glass-row-extra="${id}"]`);
	          const fields = {};
	          row.querySelectorAll('.glassware-edit-input').forEach((input) => { fields[input.dataset.field] = input.value; });
	          if (extra) extra.querySelectorAll('.glassware-edit-input').forEach((input) => { fields[input.dataset.field] = input.value; });
	          const type = (fields.type || '').trim();
	          if (!type) return;
	          const [entry] = sanitizeGlassware([{
	            id, type,
	            descriptors: fields.descriptors,
	            brand: fields.brand,
	            ounces: fields.ounces,
	            count: fields.count,
	            cost: fields.cost,
	            image: fields.image,
	            url: fields.url
	          }]);
	          if (!entry) return;
	          const idx = store.glassware.findIndex((g) => g.id === id);
	          if (idx !== -1) store.glassware[idx] = entry;
	          saveCustom();
	          glasswareEditingId = null;
	          renderGlasswareList();
	        }

function deleteGlass(id) {
	          const glass = store.glassware.find((g) => g.id === id);
	          if (!glass || !window.confirm(`Delete “${glass.type}” from your glassware?`)) return;
	          store.glassware = store.glassware.filter((g) => g.id !== id);
	          saveCustom();
	          renderGlasswareList();
	        }

function submitGlasswareForm(event) {
	          event.preventDefault();
	          const type = $('#glasswareType').value.trim();
	          if (!type) return;
	          const [entry] = sanitizeGlassware([{
	            type,
	            descriptors: $('#glasswareDescriptors').value,
	            brand: $('#glasswareBrand').value,
	            ounces: $('#glasswareOunces').value,
	            count: $('#glasswareCount').value,
	            cost: $('#glasswareCost').value,
	            image: $('#glasswareImage').value,
	            url: $('#glasswareUrl').value
	          }]);
	          if (!entry) return;
	          store.glassware.push(entry);
	          saveCustom();
	          renderGlasswareList();
	          resetGlasswareForm();
	          $('#glasswareType').focus();
	        }

function openGitHubSyncModal(mode = 'sync') {
	          githubSyncModalMode = mode;
              $('#appPreferences').hidden = mode !== 'settings';
	          $('#githubSyncForm').hidden = false;
	          if (mode === 'settings') setSettingsTab('info');
	          resetSyncCloseAction();
	          $('#githubSyncChangesPanel').hidden = true;
	          populateGitHubSyncForm();
	          const configured = githubSyncConfigured();
	          $('#githubSyncModalTitle').textContent = mode === 'settings' ? 'Settings' : 'GitHub Sync';
	          $('#githubSyncSettingsPanel').hidden = mode === 'sync' && configured;
	          $('#githubSyncModalOverlay').hidden = false;
	          updateGitHubSyncInterface(true);
	          if (mode === 'settings') {
	            $('#settingsTabInfo').focus();
	          } else if ($('#githubSyncSettingsPanel').hidden) {
	            $('#githubSyncNow').focus();
	          } else {
	            $('#githubSyncOwner').focus();
	          }
	          if (mode === 'sync' && configured) checkGitHubSyncStatus(true);
	        }

function closeGitHubSyncModal() {
	          cancelSyncAutoClose();
	          $('#githubSyncModalOverlay').hidden = true;
	          $('#githubSyncChangesPanel').hidden = true;
	        }

function setSettingsTab(tabName, focus = false) {
	          const tabs = $$('[data-settings-tab]');
	          $('#githubSyncForm').hidden = tabName === 'info';
	          tabs.forEach((tab) => {
	            const selected = tab.dataset.settingsTab === tabName;
	            tab.setAttribute('aria-selected', String(selected));
	            tab.tabIndex = selected ? 0 : -1;
	            const panel = $(`#${tab.getAttribute('aria-controls')}`);
	            if (panel) panel.hidden = !selected;
	            if (selected && focus) tab.focus();
	          });
	        }

function shoppingLocationKey(location) {
	          const text = String(location || '').toLowerCase();
	          if (/\bback\s*wall\b/.test(text)) return [0, 0, 0, 0, 0];
	          const aisle = text.match(/\baisle\s*0*(\d+)/);
	          if (!aisle) return [2, 0, 0, 0, 0];
	          const side = /\bleft\b/.test(text) ? 0 : /\bright\b/.test(text) ? 1 : 2;
	          const bay = Number(text.match(/\bbay\s*0*(\d+)/)?.[1] || 999);
	          const shelf = Number(text.match(/\bshelf\s*0*(\d+)/)?.[1] || 999);
	          return [1, Number(aisle[1]), side, bay, shelf];
	        }

function compareShoppingItems(a, b) {
	          const aKey = shoppingLocationKey(a.location);
	          const bKey = shoppingLocationKey(b.location);
	          for (let index = 0; index < aKey.length; index += 1) {
	            if (aKey[index] !== bKey[index]) return aKey[index] - bKey[index];
	          }
	          return a.name.localeCompare(b.name);
	        }

function renderShoppingList() {
          const owned = state.shoppingView === 'have';
          const matchesCategory = (bottle) => state.shoppingCategory === 'all' || ['Vodka', 'Gin', 'Tequila', 'Whiskey', 'Rum', 'Brandy'].includes(bottle.base) || (state.shoppingCategory === 'spirits' && ['Vermouth', 'Liqueurs'].includes(bottle.base));
          const bottles = store.bar.filter((bottle) => bottle.kind !== 'ingredient' && bottle.recommended !== true && (owned ? bottle.shoppingList !== true : bottle.shoppingList === true) && matchesCategory(bottle));
          const needed = owned ? [] : allRecommendedBottles().filter((recommendation) => {
            const source = recommendation.sourceBottleId && store.bar.find((bottle) => bottle.id === recommendation.sourceBottleId);
            return source?.shoppingList === true && matchesCategory(recommendation);
          });
          const items = [
            ...bottles.map((bottle) => ({name: bottle.name, location: bottle.totalWineLocation, price: bottle.price, html: shoppingBottleHtml(bottle, owned)})),
            ...needed.map((recommendation) => ({name: recommendation.name, location: recommendation.location, price: recommendation.price, html: shoppingRecommendationHtml(recommendation)}))
          ].sort(owned ? compareShoppingPrices : compareShoppingItems);
          const count = items.length;
          const knownPrices = items.map((item) => normalizeBottlePrice(item.price)).filter((price) => price !== '').map(Number);
          const expectedTotal = knownPrices.reduce((total, price) => total + price, 0);
          $('#shoppingListCount').textContent = `${count} Item${count === 1 ? '' : 's'}`;
          $('#shoppingListTotal').textContent = count === 0 ? 'Est. $0' : knownPrices.length === 0 ? 'Est. —' : `Est. ${formatBottlePrice(expectedTotal)}${knownPrices.length < count ? '+' : ''}`;
          $('#shoppingBuyToggle').setAttribute('aria-pressed', !owned);
          $('#shoppingHaveToggle').setAttribute('aria-pressed', owned);
          $('#shoppingAllToggle').setAttribute('aria-pressed', state.shoppingCategory === 'all');
          $('#shoppingSpiritsToggle').setAttribute('aria-pressed', state.shoppingCategory === 'spirits');
          $('#shoppingLiquorToggle').setAttribute('aria-pressed', state.shoppingCategory === 'liquor');
          $('#shoppingPriceSort').hidden = !owned;
          $('#shoppingPriceSort').textContent = state.shoppingPriceDescending ? '750 ml: High to Low ↓' : '750 ml: Low to High ↑';
          $('#shoppingListItems').innerHTML = count ? items.map((item) => item.html).join('') : `<p class="shopping-list-empty">${state.shoppingCategory === 'liquor' ? 'No liquor bottles' : 'No bottles'} ${owned ? 'in your bar' : 'to buy'}.</p>`;
        }

function compareShoppingPrices(a, b) {
          const aPrice = normalizeBottlePrice(a.price);
          const bPrice = normalizeBottlePrice(b.price);
          if (aPrice === '' || bPrice === '') return (aPrice === '') - (bPrice === '') || a.name.localeCompare(b.name);
          return (aPrice - bPrice) * (state.shoppingPriceDescending ? -1 : 1) || a.name.localeCompare(b.name);
        }

function openShoppingListModal() {
	          renderShoppingList();
	          $('#shoppingListModalOverlay').hidden = false;
	          refreshShortcutHints(shortcutHintsActive);
	        }

function closeShoppingListModal() {
	          $('#shoppingListModalOverlay').hidden = true;
	          refreshShortcutHints(shortcutHintsActive);
	        }

function archivedBottleHtml(bottle) {
	          const type = bottle.kind === 'ingredient' ? 'Ingredient' : bottleStyleName(bottle);
	          const archivedLabel = Number.isFinite(bottle.archivedAt)
	            ? `Archived ${new Date(bottle.archivedAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}`
	            : 'Archived';
	          return `<article class="bar-bottle-row shopping-item archive-item">
	            <span class="bar-bottle-left"><span class="bar-bottle-indicator">${__ARCHIVEBOX_FILL}</span></span>
	            <span class="shopping-item-copy">
	              <span class="shopping-item-primary"><span class="bar-bottle-name">${escapeHtml(bottle.name)}</span><span class="shopping-item-type">${escapeHtml(type)}</span></span>
	              <span class="shopping-item-secondary">${escapeHtml(archivedLabel)}</span>
	            </span>
	            <span class="bar-bottle-actions"><span class="bar-bottle-action-row">
	              <button type="button" class="archive-restore-button" data-restore-bottle="${escapeHtml(bottle.id)}">Restore</button>
	              <button type="button" class="shopping-remove-button" data-delete-archived-bottle="${escapeHtml(bottle.id)}" aria-label="Permanently delete ${escapeHtml(bottle.name)}" title="Delete permanently">×</button>
	            </span></span>
	          </article>`;
	        }

function renderArchiveList() {
	          const items = store.archivedBar;
	          $('#archiveCount').textContent = `${items.length} item${items.length === 1 ? '' : 's'}`;
	          $('#archiveItems').innerHTML = items.length
	            ? items.map(archivedBottleHtml).join('')
	            : '<p class="shopping-list-empty">Your archive is empty.</p>';
	        }

function openArchiveModal() {
	          renderArchiveList();
	          $('#archiveModalOverlay').hidden = false;
	          refreshShortcutHints(shortcutHintsActive);
	        }

function closeArchiveModal() {
	          $('#archiveModalOverlay').hidden = true;
	          refreshShortcutHints(shortcutHintsActive);
	        }

function restoreArchivedBottle(bottleId) {
	          const idx = store.archivedBar.findIndex((item) => item.id === bottleId);
	          if (idx === -1) return;
	          const [bottle] = store.archivedBar.splice(idx, 1);
	          delete bottle.archivedAt;
	          store.bar.push(bottle);
	          saveCustom();
	          renderArchiveList();
	          refreshBarModal();
	          render();
	        }

function deleteArchivedBottle(bottleId) {
	          const bottle = store.archivedBar.find((item) => item.id === bottleId);
	          if (!bottle || !window.confirm(`Permanently delete "${bottle.name}" from the archive? This cannot be undone.`)) return;
	          store.archivedBar = store.archivedBar.filter((item) => item.id !== bottleId);
	          saveCustom();
	          renderArchiveList();
	        }

function cleanupBottleStatePointers(bottleId) {
	          if (state.barExpandedBottle === bottleId) state.barExpandedBottle = '';
	          if (state.barExpandedRecommendation === `saved-${bottleId}`) state.barExpandedRecommendation = '';
	          if (state.neatExpandedBottle === bottleId) state.neatExpandedBottle = '';
	          if (state.bottleUsageId === bottleId) state.bottleUsageId = '';
	        }

function requestRemoveBottle(bottleId) {
	          const bottle = store.bar.find((item) => item.id === bottleId);
	          if (!bottle) return;
	          state.pendingRemoveBottleId = bottleId;
	          $('#removeBottleModalText').textContent = `What would you like to do with "${bottle.name}"?`;
	          $('#removeBottleModalOverlay').hidden = false;
	        }

function closeRemoveBottleModal() {
	          $('#removeBottleModalOverlay').hidden = true;
	          state.pendingRemoveBottleId = '';
	        }

function archiveBottle(bottleId) {
	          const idx = store.bar.findIndex((item) => item.id === bottleId);
	          if (idx === -1) return;
	          const [bottle] = store.bar.splice(idx, 1);
	          store.archivedBar.unshift({...bottle, archivedAt: Date.now()});
	          cleanupBottleStatePointers(bottleId);
	          saveCustom();
	          refreshBarModal();
	          render();
	        }

function deleteBottlePermanently(bottleId) {
	          store.bar = store.bar.filter((item) => item.id !== bottleId);
	          cleanupBottleStatePointers(bottleId);
	          saveCustom();
	          refreshBarModal();
	          render();
	        }

function detectInstallPlatform() {
	          const ua = navigator.userAgent || '';
	          if (/iPhone|iPod/.test(ua)) return 'iphone';
	          if (/iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ipad';
	          return 'mac';
	        }

function renderInstallInstructions(platform) {
	          $$('.install-tab').forEach((tab) => {
	            const active = tab.dataset.installPlatform === platform;
	            tab.classList.toggle('active', active);
	            tab.setAttribute('aria-selected', String(active));
	          });
	          const steps = INSTALL_INSTRUCTIONS[platform] || INSTALL_INSTRUCTIONS.mac;
	          $('#installInstructions').innerHTML = `<ol class="install-steps">${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol>`;
	        }

function openInstallModal() {
	          renderInstallInstructions(detectInstallPlatform());
	          $('#installModalOverlay').hidden = false;
	        }

function closeInstallModal() {
	          $('#installModalOverlay').hidden = true;
	        }

function populateCocktailFormTypes(selected) {
	          const allTypes = unique([...DEFAULT_TYPES, ...COCKTAILS.map((c) => c.type), ...store.customTypes]);
	          $('#cocktailFormType').innerHTML = allTypes.map((type) => `<option value="${escapeHtml(type)}"${type === selected ? ' selected' : ''}>${escapeHtml(type)}</option>`).join('');
	        }

function populateCocktailFormBases(selected = []) {
	          $('#cocktailFormBases').innerHTML = BASE_ORDER.filter((base) => base !== 'Other').map((base) => `<label class="form-check"><input type="checkbox" value="${escapeHtml(base)}"${selected.includes(base) ? ' checked' : ''}> ${escapeHtml(displayBaseLabel(base))}</label>`).join('');
	        }

function populateCocktailFormGlassware(selected = '') {
	          const byLabel = new Map();
	          [...COCKTAILS.map((cocktail) => cocktail.glassware), ...store.glassware.map((glass) => glass.type)]
	            .filter((glass) => glass && glass !== 'Unknown')
	            .forEach((glass) => {
	              const label = displayGlass(glass);
	              if (label && !byLabel.has(label)) byLabel.set(label, glass);
	            });
	          if (selected && selected !== 'Unknown') byLabel.set(displayGlass(selected), selected);
	          const options = Array.from(byLabel.entries()).sort(([first], [second]) => first.localeCompare(second));
	          $('#cocktailFormGlass').innerHTML = [
	            '<option value="">Unknown</option>',
	            ...options.map(([label, value]) => `<option value="${escapeHtml(value)}"${value === selected ? ' selected' : ''}>${escapeHtml(label)}</option>`)
	          ].join('');
	        }

function barSubtypeOptionsFor(base) {
          if (base === 'Liqueurs') {
            return unique([...LIQUEUR_BAR_SUBTYPES, ...COCKTAILS.flatMap((cocktail) => cocktail.liqueurs.map((liqueur) => canonicalLiqueurSubtype(liqueur.name, liqueur.subtype)))])
              .sort((a, b) => subtypeLabel('Liqueurs', a).localeCompare(subtypeLabel('Liqueurs', b)));
	          }
	          return BASE_SUBTYPES[base] || [];
	        }

function compareBarSubtypes(base, first, second) {
	          const options = barSubtypeOptionsFor(base);
	          const firstIndex = options.indexOf(first);
	          const secondIndex = options.indexOf(second);
	          const rankedFirst = firstIndex < 0 ? Number.MAX_SAFE_INTEGER : firstIndex;
	          const rankedSecond = secondIndex < 0 ? Number.MAX_SAFE_INTEGER : secondIndex;
	          return rankedFirst - rankedSecond || subtypeLabel(base, first).localeCompare(subtypeLabel(base, second));
	        }

function populateBarBaseSelect() {
	          $('#barBottleBase').innerHTML = BAR_BASE_ORDER.map((base) => `<option value="${escapeHtml(base)}">${escapeHtml(displayBaseLabel(base))}</option>`).join('');
	        }

function updateBarSubtypeSelect() {
	          const base = $('#barBottleBase').value;
	          const subtypes = barSubtypeOptionsFor(base);
	          const select = $('#barBottleSubtype');
	          if (!subtypes.length) {
	            select.innerHTML = '<option value="">No specific type</option>';
	            select.disabled = true;
	          } else {
	            select.disabled = false;
	            select.innerHTML = subtypes.map((subtype) => `<option value="${escapeHtml(subtype)}">${escapeHtml(subtypeLabel(base, subtype))}</option>`).join('');
	          }
	        }

function inferBottleClassification(value) {
	          const name = norm(value);
	          if (!name) return null;
              if (/\bpuree\b/.test(name)) return null;
              if (name.includes('falernum') || name === 'sweet spiced syrup') return {base: 'Flavorings', subtype: 'Syrup, Other'};
	          const recommendation = RECOMMENDED_BOTTLES.find((item) => {
	            const recommendedName = norm(item.name);
	            return name === recommendedName || name.includes(recommendedName) || recommendedName.includes(name);
	          });
	          if (recommendation && name.length >= 5) return {base: recommendation.base, subtype: recommendation.subtype};
	          const has = (...terms) => terms.some((term) => name.includes(norm(term)));
	          const fruitLiqueurSubtype = fruitLiqueurSubtypeForName(name);
	          if (has('ardbeg', 'lagavulin', 'laphroaig', 'caol ila')) return {base: 'Whiskey', subtype: 'Scotch, Islay (Smokey)'};
	          if (has('highland park')) return {base: 'Whiskey', subtype: 'Scotch, Islands (Orkney)'};
	          if (has('talisker')) return {base: 'Whiskey', subtype: 'Scotch, Islands (Skye)'};
	          if (has('campbeltown', 'springbank', 'glen scotia', 'kilkerran')) return {base: 'Whiskey', subtype: 'Scotch, Campbeltown'};
	          if (has('speyside', 'glenfiddich', 'glenlivet', 'macallan', 'balvenie', 'aberlour', 'cragganmore')) return {base: 'Whiskey', subtype: 'Scotch, Speyside'};
	          if (has('lowland scotch', 'auchentoshan', 'glenkinchie', 'bladnoch')) return {base: 'Whiskey', subtype: 'Scotch, Lowlands'};
	          if (has('highland scotch', 'highland single malt', 'dalmore', 'glenmorangie', 'oban', 'dalwhinnie', 'clynelish')) return {base: 'Whiskey', subtype: 'Scotch, Highlands'};
	          if (has('monkey shoulder', 'blended scotch', 'blended malt')) return {base: 'Whiskey', subtype: 'Scotch, Blended'};
	          if (has('old tom gin')) return {base: 'Gin', subtype: 'Old Tom Gin'};
	          if (has('genever', 'jenever')) return {base: 'Gin', subtype: 'Genever (Jenever)'};
	          if (has('new western gin', 'contemporary gin')) return {base: 'Gin', subtype: 'Contemporary/New Western'};
	          if (has('gin')) return {base: 'Gin', subtype: 'London Dry'};
	          if (has('flavored vodka', 'infused vodka', 'vodka citron', 'vanilla vodka')) return {base: 'Vodka', subtype: 'Flavored/Infused'};
	          if (has('vodka')) return {base: 'Vodka', subtype: 'Plain'};
	          if (has('mezcal')) return {base: 'Tequila', subtype: 'Mezcal'};
	          if (has('extra anejo')) return {base: 'Tequila', subtype: 'Extra Añejo (Ultra Aged)'};
	          if (has('anejo')) return {base: 'Tequila', subtype: 'Añejo (Aged)'};
	          if (has('reposado')) return {base: 'Tequila', subtype: 'Reposado (Rested)'};
	          if (has('joven', 'gold tequila')) return {base: 'Tequila', subtype: 'Joven (Gold/Oro)'};
	          if (has('tequila', 'blanco', 'plata', 'silver tequila')) return {base: 'Tequila', subtype: 'Blanco (Silver/Plata)'};
	          if (has('bourbon')) return {base: 'Whiskey', subtype: 'Bourbon'};
	          if (has('rye whiskey', 'rye whisky')) return {base: 'Whiskey', subtype: 'Rye'};
	          if (has('tennessee whiskey', 'tennessee whisky', 'american whiskey', 'american whisky')) return {base: 'Whiskey', subtype: 'American'};
	          if (has('irish whiskey', 'irish whisky', 'jameson')) return {base: 'Whiskey', subtype: 'Irish'};
	          if (has('canadian whiskey', 'canadian whisky')) return {base: 'Whiskey', subtype: 'Canadian'};
	          if (has('japanese whiskey', 'japanese whisky')) return {base: 'Whiskey', subtype: 'Japanese'};
	          if (has('single malt', 'single-malt')) return {base: 'Whiskey', subtype: 'Scotch, Single Malt'};
	          if (has('scotch')) return {base: 'Whiskey', subtype: 'Scotch, Blended'};
	          if (has('whiskey', 'whisky')) return {base: 'Whiskey', subtype: 'American'};
	          if (has('overproof rum')) return {base: 'Rum', subtype: 'Overproof'};
	          if (has('spiced rum')) return {base: 'Rum', subtype: 'Spiced'};
	          if (has('dark rum', 'black rum')) return {base: 'Rum', subtype: 'Dark'};
	          if (has('gold rum')) return {base: 'Rum', subtype: 'Gold'};
	          if (has('aged rum', 'vintage rum')) return {base: 'Rum', subtype: 'Aged/Vintage'};
	          if (has('rum', 'cachaca', 'aguardiente')) return {base: 'Rum', subtype: 'White'};
	          if (has('punt e mes', 'bittersweet vermouth', 'vermouth bittersweet')) return {base: 'Vermouth', subtype: 'Vermouth, Bittersweet'};
	          if (has('extra dry vermouth', 'vermouth extra dry')) return {base: 'Vermouth', subtype: 'Vermouth, Extra Dry'};
	          if (has('ambrato vermouth', 'amber vermouth', 'vermouth ambrato', 'vermouth amber')) return {base: 'Vermouth', subtype: 'Vermouth, Ambrato (Amber)'};
	          if (has('bianco vermouth', 'blanc vermouth', 'vermouth bianco', 'vermouth blanc')) return {base: 'Vermouth', subtype: 'Vermouth, Bianco (Blanc)'};
	          if (has('rose vermouth', 'rosé vermouth', 'vermouth rose', 'vermouth rosé')) return {base: 'Vermouth', subtype: 'Vermouth, Rosé'};
	          if (has('sweet vermouth', 'rosso vermouth', 'red vermouth', 'italian vermouth', 'vermouth sweet')) return {base: 'Vermouth', subtype: 'Vermouth, Sweet (Italian/Rosso)'};
	          if (has('dry vermouth', 'french vermouth', 'vermouth dry')) return {base: 'Vermouth', subtype: 'Vermouth, Dry (French)'};
	          if (has('vermouth')) return {base: 'Vermouth', subtype: 'Vermouth, Dry (French)'};
	          if (has('cognac')) return {base: 'Brandy', subtype: 'Cognac'};
	          if (has('armagnac')) return {base: 'Brandy', subtype: 'Armagnac'};
	          if (has('calvados')) return {base: 'Brandy', subtype: 'Calvados'};
	          if (has('pisco')) return {base: 'Brandy', subtype: 'Pisco'};
	          if (has('grappa')) return {base: 'Brandy', subtype: 'Grappa'};
	          if (fruitLiqueurSubtype || has('fruit liqueur')) return {base: 'Liqueurs', subtype: fruitLiqueurSubtype || 'Fruit, Other'};
	          if (has('brandy')) return {base: 'Brandy', subtype: 'Other Brandy'};
          if (has('pineapple juice')) return {base: 'Flavorings', subtype: 'Juice, Pineapple'};
          if (has('honey syrup')) return {base: 'Flavorings', subtype: 'Syrup, Honey'};
          if (has('grenadine')) return {base: 'Flavorings', subtype: 'Syrup, Grenadine'};
          if (has('agave nectar', 'agave syrup')) return {base: 'Flavorings', subtype: 'Syrup, Agave Nectar'};
          if (has('orgeat')) return {base: 'Flavorings', subtype: 'Syrup, Orgeat'};
          if (has('demerara syrup') || name === 'demerara') return {base: 'Flavorings', subtype: 'Syrup, Demerara'};
          if (has('simple syrup', 'sugar syrup')) return {base: 'Flavorings', subtype: 'Syrup, Sugar'};
          if (has('syrup')) return {base: 'Flavorings', subtype: 'Syrup, Other'};
          if (has('wine aperitif', 'wine-based aperitif', 'lillet', 'dubonnet', 'cocchi americano')) return {base: 'Wine', subtype: 'Aromatized/Aperitif'};
          if (has('b&b', 'b and b')) return {base: 'Liqueurs', subtype: 'Herb, Brandy'};
          if (has('cream liqueur', 'irish cream', 'baileys')) return {base: 'Liqueurs', subtype: 'Cream liqueurs'};
          if (has('mint liqueur', 'creme de menthe', 'crème de menthe')) return {base: 'Liqueurs', subtype: 'Herb, Mint'};
          if (has('pernod', 'absinthe', 'sambuca', 'galliano', 'anise liqueur')) return {base: 'Liqueurs', subtype: 'Herb, Anise'};
          if (has('fernet', 'cynar', 'chartreuse', 'chartruse')) return {base: 'Liqueurs', subtype: 'Herb, Other'};
          if (has('chartreuse', 'chartruse', 'licor 43', 'genepy le chamois', 'genepi le chamois')) return {base: 'Liqueurs', subtype: 'Other, Specialty'};
          if (has('benedictine', 'bénédictine', 'herbal liqueur')) return {base: 'Liqueurs', subtype: 'Herb, Other'};
	          if (has('amaretto')) return {base: 'Liqueurs', subtype: 'Nuts liqueurs'};
	          if (has('coffee liqueur')) return {base: 'Liqueurs', subtype: 'Coffee liqueurs'};
	          if (has('chocolate liqueur', 'creme de cacao', 'crème de cacao')) return {base: 'Liqueurs', subtype: 'Chocolate liqueurs'};
	          if (has('liqueur', 'amaro', 'aperitif', 'apéritif')) return {base: 'Liqueurs', subtype: ''};
	          if (has('orange bitters')) return {base: 'Flavorings', subtype: 'Bitter, Orange'};
	          if (has('angostura', 'peychaud', 'aromatic bitters')) return {base: 'Flavorings', subtype: 'Bitter, Aromatic'};
	          if (has('bitters')) return {base: 'Flavorings', subtype: 'Bitter, Other'};
	          if (has('prosecco', 'champagne', 'sparkling wine')) return {base: 'Wine', subtype: 'Sparkling'};
	          if (has('port', 'sherry', 'madeira', 'dessert wine', 'fortified wine')) return {base: 'Wine', subtype: 'Dessert/Fortified Wine'};
	          if (has('rose wine', 'rosé wine')) return {base: 'Wine', subtype: 'Rosé'};
	          if (has('red wine')) return {base: 'Wine', subtype: 'Red'};
	          if (has('white wine', 'wine')) return {base: 'Wine', subtype: 'White'};
	          if (has('cider', 'mead')) return {base: 'Beer', subtype: 'Cider/Mead'};
	          if (has('lager')) return {base: 'Beer', subtype: 'Lagers'};
	          if (has('beer', 'ale', 'stout')) return {base: 'Beer', subtype: 'Ales'};
	          return null;
	        }

function selectBottleClassification(value) {
	          const classification = inferBottleClassification(value);
	          if (!classification) return;
	          $('#barBottleBase').value = classification.base;
	          updateBarSubtypeSelect();
	          if (classification.subtype && $(`#barBottleSubtype option[value="${CSS.escape(classification.subtype)}"]`)) {
	            $('#barBottleSubtype').value = classification.subtype;
	          }
	        }

function parseBottlePaste(value) {
	          const raw = String(value || '').trim().replace(/^["“”]+|["“”]+$/g, '');
	          const lines = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
	          const name = (lines[0] || raw).replace(/^["“”]+|["“”]+$/g, '').trim();
	          const valueAfter = (label) => {
	            const index = lines.findIndex((line) => norm(line) === norm(label));
	            return index >= 0 && index + 1 < lines.length ? lines[index + 1] : '';
	          };
	          const priceMatch = raw.match(/\$\s*(\d+(?:\.\d{1,2})?)/);
	          const aisleMatch = raw.match(/\bAisle\s+([A-Za-z0-9-]+)(?:\s*,\s*(Left|Right))?/i);
	          const bayMatch = raw.match(/\bBay\s+([A-Za-z0-9-]+)/i);
	          const shelfMatch = raw.match(/\bShelf\s+([A-Za-z0-9-]+)/i);
	          const shelfLocation = [
	            aisleMatch ? `Aisle ${aisleMatch[1]}${aisleMatch[2] ? `, ${titleWords(aisleMatch[2])}` : ''}` : '',
	            bayMatch ? `Bay ${bayMatch[1]}` : '',
	            shelfMatch ? `Shelf ${shelfMatch[1]}` : ''
	          ].filter(Boolean).join(', ');
	          const location = shelfLocation || (/\bBack\s*wall\b/i.test(raw) ? 'Backwall' : '');
	          const country = valueAfter('Country');
	          const abvValue = valueAfter('ABV') || raw.match(/\bABV\s*(\d+(?:\.\d+)?)\s*%/i)?.[1] || '';
	          const taste = valueAfter('Taste');
	          const totalWineUrl = raw.match(/https?:\/\/www\.totalwine\.com\/\S+/i)?.[0] || '';
	          const has375ml = /\b375\s*ml\b/i.test(raw);
	          const classification = inferBottleClassification(name);
	          const parsed = {
	            name,
	            base: classification?.base || '',
	            subtype: classification?.subtype || '',
	            price: priceMatch ? Math.round(Number(priceMatch[1])) : '',
	            totalWineLocation: location,
	            totalWineUrl,
	            country,
	            abv: normalizeBottleAbv(abvValue),
	            taste,
	            has375ml
	          };
	          parsed.previewFields = ['name', 'base', 'subtype', 'price', 'totalWineLocation', 'country', 'abv', 'taste', 'totalWineUrl', 'has375ml']
	            .filter((field) => field === 'name' || field === 'base' || field === 'subtype' || (parsed[field] !== '' && parsed[field] !== undefined));
	          return parsed;
	        }

function emptyBarDraftDetails() {
	          return {price: '', totalWineLocation: '', totalWineUrl: '', country: '', abv: '', taste: '', storage: '', expirationMonths: '', notes: '', has375ml: false, fixedTaste: '', previewFields: []};
	        }

function updateBarFormMode() {
	          const recommended = $('#barBottleRecommended').checked;
	          const submit = $('#barBottleSubmit');
	          const actionLabel = recommended ? 'Add Recommendation' : 'Add Bottle';
	          submit.classList.add('icon-only');
	          submit.innerHTML = __PLUS_SQUARE_FILL;
	          submit.setAttribute('aria-label', actionLabel);
	          submit.title = actionLabel;
	        }

function renderBarDraftDetails() {
	          const meta = $('#barBottlePasteMeta');
	          const details = state.barDraftDetails;
	          const base = $('#barBottleBase').value;
	          const subtype = $('#barBottleSubtype').value || '';
	          $('#barBottleHas375ml').checked = details.has375ml === true;
	          const fixedTaste = fixedFlavoringTaste(base, subtype);
	          if (fixedTaste) details.taste = fixedTaste;
	          else if (details.fixedTaste && details.taste === details.fixedTaste) details.taste = '';
	          details.fixedTaste = fixedTaste;
	          const values = {
	            name: $('#barBottleName').value.trim(),
	            base: displayBaseLabel($('#barBottleBase').value),
	            subtype: subtypeLabel($('#barBottleBase').value, $('#barBottleSubtype').value || ''),
	            price: details.price === '' ? '' : `\$${details.price}`,
	            totalWineLocation: details.totalWineLocation,
	            country: details.country,
	            abv: details.abv === '' ? '' : `${details.abv}%`,
	            taste: details.taste,
	            totalWineUrl: details.totalWineUrl,
	            has375ml: details.has375ml ? 'Yes' : ''
	          };
	          const labels = {name: 'Name', base: 'Base', subtype: 'Type', price: 'Price', totalWineLocation: 'Location', country: 'Country', abv: 'ABV', taste: 'Taste', totalWineUrl: 'Link', has375ml: '375ml'};
	          const fields = details.previewFields.filter((field) => values[field]);
	          meta.innerHTML = fields.length
	            ? `<span class="bar-update-label">Detected</span>${fields.map((field) => `<span class="bar-update-field"><strong>${escapeHtml(labels[field])}</strong>${escapeHtml(values[field])}</span>`).join('')}`
	            : '';
	          meta.hidden = fields.length === 0;
	          updateBarFormMode();
	        }

function updateBarAddPurposeControls(changedControl = null) {
	          const neat = $('#barBottleNeat');
	          const mix = $('#barBottleCocktailUse');
	          if (!neat.checked && !mix.checked) (changedControl || mix).checked = true;
	        }

function updateBarRecommendationControls() {
	          const recommended = $('#barBottleRecommended').checked;
	          const purposeControl = $('.bar-form-purpose');
	          const favoriteControl = $('.bar-form-favorite');
	          purposeControl.classList.toggle('disabled', recommended);
	          favoriteControl.classList.toggle('disabled', recommended);
	          $('#barBottleNeat').disabled = recommended;
	          $('#barBottleCocktailUse').disabled = recommended;
	          $('#barBottleFavorite').disabled = recommended;
	          if (recommended) {
	            $('#barBottleNeat').checked = false;
	            $('#barBottleCocktailUse').checked = true;
	            $('#barBottleFavorite').checked = false;
	          }
	          updateBarFormMode();
	        }

function allNonAlcoholicIngredientNames() {
	          return unique(COCKTAILS.flatMap(pantryIngredientTags)).filter((name) => !flavoringSubtypeForName(name));
	        }

function renderIngredientChecklist() {
	          const owned = new Set(store.bar.filter((b) => b.kind === 'ingredient').map((b) => b.name));
	          const names = allNonAlcoholicIngredientNames();
	          const usageCounts = getCounts(COCKTAILS, pantryIngredientTags);
	          const specificVariants = pantrySpecificVariantsByIngredient();
	          names.sort((a, b) => state.pantrySort === 'usage'
	            ? (usageCounts.get(b) || 0) - (usageCounts.get(a) || 0) || a.localeCompare(b)
	            : a.localeCompare(b));
	          $$('[data-pantry-sort]').forEach((button) => {
	            const active = button.dataset.pantrySort === state.pantrySort;
	            button.classList.toggle('active', active);
	            button.setAttribute('aria-pressed', String(active));
	          });
	          $('#barPantryCount').textContent = `${owned.size}/${names.length}`;
	          $('#barIngredientChecklist').innerHTML = names.map((name) => {
	            const info = pantryIngredientInfo(name, specificVariants);
	            const infoLabel = ['Honey Syrup', "Donn's Mix", 'Lemonade, Sparkling', 'Lime Cordial'].includes(name) ? `How to make ${name}` : `About ${name}`;
	            const infoButton = info ? `<button class="info-button pantry-info-button" type="button" data-info-title="${escapeHtml(name)}" data-info="${escapeHtml(info)}" aria-label="${escapeHtml(infoLabel)}" aria-expanded="false" aria-controls="infoPopover">i</button>` : '';
	            return `<div class="checklist-item">
	              <input type="checkbox" data-ingredient-toggle="${escapeHtml(name)}" aria-label="${owned.has(name) ? 'Remove' : 'Add'} ${escapeHtml(name)} ${owned.has(name) ? 'from' : 'to'} pantry" ${owned.has(name) ? 'checked' : ''}>
	              <span class="pantry-usage">[+${usageCounts.get(name) || 0}]</span>
	              <span class="checklist-label">
	                <span class="checklist-name-group"><button class="checklist-name pantry-ingredient-button" type="button" data-pantry-ingredient="${escapeHtml(name)}" aria-label="Show Cocktails with ${escapeHtml(name)}" title="Show Cocktails with ${escapeHtml(name)}">${escapeHtml(name)}</button>${infoButton}</span>
	              </span>
	            </div>`;
	          }).join('');
	        }
