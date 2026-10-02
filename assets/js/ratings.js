// Classic-script function declarations; shared state is initialized in app.js.
function diffordsFriendRating(cocktail) {
      const source = cocktail?.diffordsSource?.discerningDrinkers;
      const rating = sanitizeFriendRatingValue(source?.rating);
      if (!rating) return null;
      return {name: DIFFORDS_FRIEND_NAME, rating, ratingCount: Math.max(0, Number(source?.ratingCount) || 0), source: 'diffords'};
    }

function friendRatingEntries(cocktail) {
      const imported = diffordsFriendRating(cocktail);
      const entries = [...(store.friendRatings[cocktail.id] || [])]
        .filter((entry) => !imported || bottleSearchText(entry.name) !== bottleSearchText(imported.name));
      if (imported) entries.push(imported);
      return entries.sort((a, b) => a.name.localeCompare(b.name));
    }

function getFriendAverage(cocktail) {
      const entries = friendRatingEntries(cocktail);
      return entries.length ? entries.reduce((sum, entry) => sum + entry.rating, 0) / entries.length : 0;
    }

function ratingStars(id, value, extraClass = '') {
      const stars = Array.from({length: 5}, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i)) * 100;
        return `<span class="star" data-star-index="${i + 1}"><span class="star-bg">★</span><span class="star-fg" style="width:${fill}%">★</span></span>`;
      }).join('');
      return `<span class="stars${extraClass ? ` ${extraClass}` : ''}" data-rating-id="${escapeHtml(id)}">${stars}</span>`;
    }

function ratingLabel(value) {
      return value ? String(value).replace(/\.0$/, '') : '—';
    }

function ratingValueLabel(value) {
      return value ? value.toFixed(1) : '—';
    }

function allFriendRatingNames() {
      return unique(Object.values(store.friendRatings).flat().map((entry) => entry.name)).sort((a, b) => a.localeCompare(b));
    }

function updateRatingAudienceUi() {
      document.body.dataset.ratingView = store.ratingView;
      const toggle = $('#ratingAudienceToggle');
      const pill = $('#ratingViewPill');
      toggle.closest('.rating-header-group').classList.toggle('friend-ratings-enabled', store.friendRatingsUnlocked);
      pill.hidden = !store.friendRatingsUnlocked;
      pill.dataset.view = store.ratingView;
      toggle.dataset.view = store.ratingView;
      toggle.textContent = store.ratingView === 'friends' ? 'Average' : 'Mine';
      toggle.title = store.ratingView === 'friends' ? 'Show my ratings' : 'Show friends average';
      toggle.setAttribute('aria-label', toggle.title);
      $$('.rating-view-option').forEach((button) => {
        const active = button.dataset.ratingView === store.ratingView;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
    }

function setRatingView(view) {
      if (!['mine', 'friends'].includes(view)) return;
      store.ratingView = view;
      store.friendRatingsUnlocked = true;
      saveCustom();
      render();
      if (!$('#friendRatingsOverlay').hidden) renderFriendRatingManager();
    }

function renderFriendRatingManager() {
      const cocktail = COCKTAILS.find((item) => item.id === friendRatingCocktailId);
      if (!cocktail) return;
      const entries = friendRatingEntries(cocktail);
      const average = getFriendAverage(cocktail);
      $('#friendRatingCocktail').textContent = cocktailDisplayName(cocktail);
      $('#friendRatingAverage').innerHTML = average
        ? `<strong>${escapeHtml(ratingValueLabel(average))}</strong><span>${entries.length} rating${entries.length === 1 ? '' : 's'}</span>`
        : '<span>Not rated</span>';
      $('#friendRatingNames').innerHTML = allFriendRatingNames().map((name) => `<option value="${escapeHtml(name)}"></option>`).join('');
      $('#friendRatingList').innerHTML = entries.length
        ? entries.map((entry) => {
          const sourceEntry = entry.source === 'diffords';
          const name = sourceEntry
            ? `<span class="friend-rating-name is-source" title="Imported from Difford's Guide"><span>${escapeHtml(entry.name)}</span>${entry.ratingCount ? `<span class="friend-rating-source-count">${escapeHtml(entry.ratingCount.toLocaleString())} ratings</span>` : ''}</span>`
            : `<button class="friend-rating-name" type="button" data-edit-friend-rating="${escapeHtml(entry.name)}">${escapeHtml(entry.name)}</button>`;
          const remove = sourceEntry
            ? '<span aria-hidden="true"></span>'
            : `<button class="button icon friend-rating-remove" type="button" data-remove-friend-rating="${escapeHtml(entry.name)}" aria-label="Remove ${escapeHtml(entry.name)}'s rating">×</button>`;
          return `<div class="friend-rating-row">${name}<span class="friend-rating-score">${ratingStars('', entry.rating, 'readonly')}<span class="friend-rating-score-value">${escapeHtml(ratingValueLabel(entry.rating))}</span></span>${remove}</div>`;
        }).join('')
        : '<span class="empty">No friend ratings yet.</span>';
      updateRatingAudienceUi();
    }

function openFriendRatings(cocktailId) {
      if (!COCKTAILS.some((cocktail) => cocktail.id === cocktailId)) return;
      friendRatingCocktailId = cocktailId;
      store.friendRatingsUnlocked = true;
      saveCustom();
      $('#friendRatingName').value = '';
      $('#friendRatingValue').value = 3;
      editingFriendRatingName = '';
      renderFriendRatingManager();
      $('#friendRatingsOverlay').hidden = false;
    }

function closeFriendRatings() {
      $('#friendRatingsOverlay').hidden = true;
      friendRatingCocktailId = '';
    }

function saveFriendRating(event) {
      event.preventDefault();
      const name = $('#friendRatingName').value.trim();
      const rating = sanitizeFriendRatingValue($('#friendRatingValue').value);
      if (!name || !rating || !friendRatingCocktailId) return;
      const entries = [...(store.friendRatings[friendRatingCocktailId] || [])].filter((entry) => !editingFriendRatingName || bottleSearchText(entry.name) !== bottleSearchText(editingFriendRatingName));
      const existing = entries.findIndex((entry) => bottleSearchText(entry.name) === bottleSearchText(name));
      const next = {name, rating};
      if (existing >= 0) entries[existing] = next;
      else entries.push(next);
      store.friendRatings[friendRatingCocktailId] = entries.sort((a, b) => a.name.localeCompare(b.name));
      store.friendRatingsUnlocked = true;
      saveCustom();
      $('#friendRatingName').value = '';
      editingFriendRatingName = '';
      render();
      renderFriendRatingManager();
      $('#friendRatingName').focus();
    }

function removeFriendRating(name) {
      if (!friendRatingCocktailId) return;
      const entries = (store.friendRatings[friendRatingCocktailId] || []).filter((entry) => bottleSearchText(entry.name) !== bottleSearchText(name));
      if (entries.length) store.friendRatings[friendRatingCocktailId] = entries;
      else delete store.friendRatings[friendRatingCocktailId];
      saveCustom();
      render();
      renderFriendRatingManager();
    }

function statusLabel(c) {
	      const parts = [];
	      if (c.dateAdded) parts.push(`+${c.dateAdded}`);
	      if (c.dateRemoved) parts.push(`-${c.dateRemoved}`);
	      return parts.length ? parts.join(' | ') : '—';
	    }

function cocktailPhotos(cocktail) {
	      return unique([
	        cocktail?.image,
	        cocktail?.lnlSource?.artwork?.drink,
	        cocktail?.lnlSource?.artwork?.tabletop,
	        cocktail?.lnlSource?.artwork?.lettering
	      ].filter(Boolean));
	    }

function cocktailPhoto(cocktail) {
	      return cocktailPhotos(cocktail)[0] || '';
	    }

function thumbCell(c) {
	      const photos = cocktailPhotos(c);
	      const photo = photos[0] || '';
	      const multiplePhotos = photos.length > 1
	        ? `<span class="thumb-multi-photo" aria-hidden="true">${__PHOTO}</span>`
	        : '';
	      return photo
	        ? `<button class="thumb-button" type="button" data-popout-note="${escapeHtml(c.id)}" aria-label="Open ${photos.length > 1 ? `${photos.length} photos` : 'photo'} and notes for ${escapeHtml(cocktailDisplayName(c))}"><img class="thumb" src="${escapeHtml(photo)}" alt="" loading="lazy">${multiplePhotos}</button>`
	        : `<button class="thumb-button" type="button" data-popout-note="${escapeHtml(c.id)}" aria-label="Open notes for ${escapeHtml(cocktailDisplayName(c))}"><span class="thumb thumb-fallback" aria-hidden="true">${escapeHtml(c.name.slice(0, 1))}</span></button>`;
	    }

function tryPriority(id) {
      const value = store.bookmarks[id];
      return Number.isInteger(value) && value >= 1 && value <= 3 ? value : 0;
    }

function trySortRank(id) {
      if (!store.bookmarks[id]) return 0;
      const priority = tryPriority(id);
      return priority ? 5 - priority : 1;
    }

function setTryPriority(id, value) {
      if (value === 'remove') delete store.bookmarks[id];
      else if (value === 'none') store.bookmarks[id] = true;
      else store.bookmarks[id] = Math.max(1, Math.min(3, Number(value) || 1));
    }

function cycleTryPriority(id) {
      const current = store.bookmarks[id];
      if (!current) store.bookmarks[id] = true;
      else if (current === true) store.bookmarks[id] = 1;
      else if (current === 1) store.bookmarks[id] = 2;
      else if (current === 2) store.bookmarks[id] = 3;
      else delete store.bookmarks[id];
    }

function bookmarkToggle(c) {
      const active = Boolean(store.bookmarks[c.id]);
      const priority = tryPriority(c.id);
      const priorityLabel = priority ? ` priority ${priority}` : active ? ', no priority' : '';
      const nextLabel = !active ? 'add without priority' : !priority ? 'set priority 1' : priority < 3 ? `set priority ${priority + 1}` : 'remove from Try';
      const badge = priority ? `<span class="try-priority-level" aria-hidden="true">${priority}</span>` : '';
      return `<button class="bookmark-toggle${active ? ' active' : ''}${priority ? ` priority-${priority}` : ''}" type="button" data-bookmark-id="${escapeHtml(c.id)}" aria-pressed="${active}" aria-haspopup="dialog" aria-expanded="false" aria-label="Try${priorityLabel}. Tap to ${nextLabel}; hold to choose directly." title="Try${priorityLabel}. Tap to cycle; hold to choose.">${active ? __BOOKMARK_FILL : __BOOKMARK}${badge}</button>`;
    }

function normalizedCocktailTags(values) {
      const tags = new Map();
      (Array.isArray(values) ? values : []).forEach((value) => {
        const label = String(value || '').trim().replace(/^#+/, '').replace(/_/g, ' ').replace(/\s+/g, ' ');
        const key = norm(label);
        if (key && !tags.has(key)) tags.set(key, label);
      });
      return Array.from(tags.values());
    }

function cocktailTags(cocktail) {
      return normalizedCocktailTags([
        ...(Array.isArray(cocktail?.tags) ? cocktail.tags : []),
        ...(Array.isArray(cocktail?.lnlSource?.tags) ? cocktail.lnlSource.tags : [])
      ]);
    }

function allCocktailTags() {
      const tags = new Map();
      COCKTAILS.flatMap(cocktailTags).forEach((tag) => {
        const key = norm(tag);
        if (!tags.has(key)) tags.set(key, tag);
      });
      return Array.from(tags.values()).sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
    }

function tagFromFilterId(id) {
      if (!isTagFilterId(id)) return '';
      try { return decodeURIComponent(id.slice(TAG_FILTER_PREFIX.length)); }
      catch (error) { return id.slice(TAG_FILTER_PREFIX.length); }
    }

function cocktailTagMarkup(cocktail) {
      return cocktailTags(cocktail).map((tag) => `<span class="cocktail-hashtag">#${escapeHtml(tag)}</span>`).join('');
    }

function lettersLiquorNoteBody(text) {
	      return String(text || '').split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean)
	        .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`).join('');
	    }

function lettersLiquorNotesMarkup(cocktail) {
	      const notes = cocktail?.lnlSource?.notes;
	      if (!notes) return '';
	      const sections = [
	        ['Story', notes.story],
	        ['The Drink', notes.drink],
	        ['The Lettering', notes.lettering]
	      ].filter(([, content]) => String(content || '').trim());
	      if (!sections.length) return '';
	      return `<div class="lnl-notes-sections" aria-label="Letters &amp; Liquor notes">${sections.map(([label, content]) => `<details class="lnl-note-section"><summary>${escapeHtml(label)}</summary><div class="lnl-note-copy">${lettersLiquorNoteBody(content)}</div></details>`).join('')}</div>`;
	    }

function diffordsNotesMarkup(cocktail) {
	      const notes = cocktail?.diffordsSource?.notes;
	      if (!notes) return '';
	      const sections = [
	        ['Difford\'s Review', notes.review],
	        ['Difford\'s Variants', notes.variant],
	        ['Difford\'s History', notes.history]
	      ].filter(([, content]) => String(content || '').trim());
	      if (!sections.length) return '';
	      return `<div class="lnl-notes-sections diffords-notes-sections" aria-label="Difford's Guide notes">${sections.map(([label, content]) => `<details class="lnl-note-section"><summary>${escapeHtml(label)}</summary><div class="lnl-note-copy">${lettersLiquorNoteBody(content)}</div></details>`).join('')}</div>`;
	    }

function classicNotesMarkup(cocktail) {
      const notes = cloneRecipeLines(cocktail?.classicSource?.notes);
      if (!notes.length) return '';
      return `<div class="lnl-notes-sections" aria-label="Classic recipe notes"><details class="lnl-note-section"><summary>Classic Recipe Notes</summary><div class="lnl-note-copy">${notes.map((note) => `<p>${escapeHtml(note)}</p>`).join('')}</div></details></div>`;
    }

function getCounts(items, getValues) {
      const counts = new Map();
      items.forEach((item) => unique(getValues(item)).forEach((value) => counts.set(value, (counts.get(value) || 0) + 1)));
      return counts;
    }
