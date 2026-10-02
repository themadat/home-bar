// Classic-script function declarations; shared state is initialized in app.js.
function isGitHubNetworkError(error) {
	          return navigator.onLine === false
	            || error instanceof TypeError
	            || /failed to fetch|network request failed|networkerror|load failed/i.test(String(error?.message || error || ''));
	        }

function parseStoredJson(key) {
	          try { return JSON.parse(localStorage.getItem(key) || '{}'); }
	          catch (error) { return {}; }
	        }

function storedGitHubSyncSettings() {
	          const saved = parseStoredJson(GITHUB_SYNC_SETTINGS_KEY);
	          return {
	            autoSync: saved.autoSync !== false,
	            owner: typeof saved.owner === 'string' && saved.owner.trim() ? saved.owner : 'themadat',
	            repo: typeof saved.repo === 'string' && saved.repo.trim() ? saved.repo : 'app-data',
	            branch: typeof saved.branch === 'string' && saved.branch.trim() ? saved.branch : 'main',
	            path: typeof saved.path === 'string' && saved.path.trim() ? saved.path : 'data/home-bar.json'
	          };
	        }

function storedGitHubSyncToken() {
	          return localStorage.getItem(GITHUB_SYNC_TOKEN_KEY) || sessionStorage.getItem(GITHUB_SYNC_TOKEN_KEY) || '';
	        }

function gitHubSyncTarget(settings) {
	          return [settings.owner, settings.repo, settings.branch, settings.path].join('/');
	        }

function githubSyncConfigured() {
	          const settings = storedGitHubSyncSettings();
	          return Boolean(settings.owner && settings.repo && storedGitHubSyncToken());
	        }

function hasPersistedHomeBarData() {
	          return HOME_BAR_STORAGE_KEYS.some((key) => localStorage.getItem(key) !== null);
	        }

function syncComparableData(data) {
	          // Compare both copies after the same startup migrations, without mutating either.
	          const source = data && typeof data === 'object' ? JSON.parse(JSON.stringify(data)) : {};
	          return {
	            customTypes: source.customTypes || [],
	            typeAssignments: source.typeAssignments || source.assignments || {},
	            notes: source.notes || {},
	            ratings: source.ratings || {},
	            guides: source.guides || {},
	            ...(source.friendRatings && Object.keys(source.friendRatings).length ? {friendRatings: source.friendRatings} : {}),
	            bookmarks: source.bookmarks || {},
	            bar: (source.bar || []).map(migrateBarItem),
	            ...(source.archivedBar?.length ? {archivedBar: source.archivedBar.map(migrateBarItem)} : {}),
	            customCocktails: (source.customCocktails || []).map(refreshBundledCocktailSources).map(normalizeSpecialtyLiqueurIngredients),
	            appNotes: source.appNotes || '',
	            glassware: source.glassware || []
	          };
	        }

function stableJson(value) {
	          if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
	          if (value && typeof value === 'object') {
	            return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
	          }
	          return JSON.stringify(value);
	        }

function syncDataFingerprint(data = userDataSnapshot()) {
	          const serializable = JSON.parse(JSON.stringify(syncComparableData(data)));
	          const text = stableJson(serializable);
	          let hash = 2166136261;
	          for (let index = 0; index < text.length; index += 1) {
	            hash ^= text.charCodeAt(index);
	            hash = Math.imul(hash, 16777619);
	          }
	          return (hash >>> 0).toString(16).padStart(8, '0');
	        }

function relativeSyncTime(timestamp) {
	          const time = Date.parse(timestamp || '');
	          if (!isFinite(time)) return 'never';
	          const seconds = Math.max(0, Math.round((Date.now() - time) / 1000));
	          if (seconds < 45) return 'just now';
	          const minutes = Math.round(seconds / 60);
	          if (minutes < 60) return `${minutes} min ago`;
	          const hours = Math.round(minutes / 60);
	          if (hours < 24) return `${hours} hr ago`;
	          const days = Math.round(hours / 24);
	          return `${days} day${days === 1 ? '' : 's'} ago`;
	        }

function gitHubSyncStateInfo() {
	          const settings = storedGitHubSyncSettings();
	          const configured = githubSyncConfigured();
	          if (!configured) {
	            return {state: 'setup', mark: '?', title: 'Set up GitHub Sync', meta: 'Keep the same Home Bar data on every device.', status: 'Enter your private repository and token to begin.', kind: ''};
	          }
	          if (navigator.onLine === false || githubSyncRuntime.offline) {
	            return {state: 'offline', mark: '/', title: 'No internet connection', meta: 'GitHub Sync will be available when this device reconnects.', status: 'This device is offline. Reconnect to the internet, then sync again.', kind: 'error'};
	          }
	          const storedMeta = parseStoredJson(GITHUB_SYNC_META_KEY);
	          const meta = storedMeta.target === gitHubSyncTarget(settings) ? storedMeta : {};
	          const localHash = syncDataFingerprint();
	          const baselineHash = meta.dataHash || githubSyncRuntime.remoteHash;
	          const localDirty = Boolean(baselineHash && baselineHash !== localHash);
	          const remoteChanged = Boolean(githubSyncRuntime.remoteSha && meta.sha && githubSyncRuntime.remoteSha !== meta.sha);
	          const synced = meta.syncedAt ? relativeSyncTime(meta.syncedAt) : 'never';
	          const checkedAt = githubSyncRuntime.checkedAt || meta.checkedAt;
	          const checked = checkedAt ? relativeSyncTime(checkedAt) : 'not checked yet';
	          if (githubSyncRuntime.checking) {
	            return {state: 'checking', mark: '…', title: 'Checking GitHub', meta: `Last synced ${synced}.`, status: 'Checking whether another device has newer Home Bar data.', kind: ''};
	          }
	          if (githubSyncRuntime.error) {
	            return {state: 'error', mark: '!', title: 'Could not check GitHub', meta: `Last synced ${synced}.`, status: githubSyncRuntime.error, kind: 'error'};
	          }
	          if (!meta.sha) {
	            if (githubSyncRuntime.remoteSha) {
	              if (!hasPersistedHomeBarData()) {
	                return {state: 'download', mark: '↓', title: 'Download existing data', meta: `GitHub checked ${checked}.`, status: 'This is a new device. Sync to download your existing Home Bar data from GitHub.', kind: ''};
	              }
	              return {state: 'conflict', mark: '!', title: 'Choose the first sync copy', meta: `GitHub checked ${checked}.`, status: 'This device has local data and has not synced with this GitHub file. Sync to choose which copy to keep.', kind: 'error'};
	            }
	            return {state: 'checking', mark: '…', title: 'Checking GitHub first', meta: 'No successful sync is recorded yet.', status: 'Checking GitHub before deciding whether to download or upload.', kind: ''};
	          }
	          if (localDirty && remoteChanged) {
	            return {state: 'conflict', mark: '!', title: 'Changes on both copies', meta: `Last synced ${synced}.`, status: 'This device and GitHub both changed. Sync to choose which copy to keep.', kind: 'error'};
	          }
	          if (localDirty) {
	            return {state: 'upload', mark: '↑', title: 'Upload changes', meta: `This device changed since syncing ${synced}.`, status: 'You have Home Bar changes on this device that have not been uploaded.', kind: ''};
	          }
	          if (remoteChanged) {
	            return {state: 'download', mark: '↓', title: 'Download newer data', meta: `GitHub checked ${checked}.`, status: 'A newer Home Bar copy is available from GitHub.', kind: ''};
	          }
	          return {state: 'clean', mark: '✓', title: 'Up to date', meta: `Synced ${synced} · checked ${checked}.`, status: 'This device matches the latest Home Bar copy on GitHub.', kind: 'success'};
	        }

function cloudButtonPresentation(info) {
          const key = (navigator.onLine === false || githubSyncRuntime.offline) ? 'offline' : githubSyncBusy ? (githubSyncOperation || 'syncing') : ({
            setup: 'authenticationRequired', clean: 'upToDate', checking: 'syncing',
            upload: 'pending', download: 'pending', offline: 'offline', conflict: 'warning', error: 'failed'
          }[info.state] || 'failed');
          return TEMPLATE_CLOUD_STATES[key];
        }

function updateGitHubSyncButton() {
          const info = gitHubSyncStateInfo();
          const visual = cloudButtonPresentation(info);
          const button = $('#githubSyncButton');
          const busy = githubSyncBusy || githubSyncRuntime.checking;
          let localAvailable = true;
          try { localStorage.getItem('cocktailAppNotes'); } catch { localAvailable = false; }
          const localLabel = localAvailable ? 'Saved locally' : 'Storage unavailable';
          button.dataset.syncState = info.state;
          button.dataset.kind = visual.kind;
          button.dataset.animation = visual.animation;
          button.dataset.localStorage = localAvailable ? 'available' : 'unavailable';
          button.setAttribute('aria-disabled', String(busy));
          button.title = `${localLabel}. ${visual.title}. ${info.status}${busy ? '' : ' Open Sync Settings.'}`;
          button.setAttribute('aria-label', button.title);
          $('#githubSyncLabel').textContent = localLabel;
          $('#githubSyncMessage').textContent = `GitHub · ${visual.title}`;
          const glyph = $('#githubSyncGlyph');
          if (glyph.dataset.symbol !== visual.symbol) {
            glyph.innerHTML = TEMPLATE_CLOUD_ICONS[visual.symbol];
            glyph.dataset.symbol = visual.symbol;
          }
          updateGitHubSyncInterface(false);
        }

function updateGitHubSyncInterface(updateStatus = false) {
	          const info = gitHubSyncStateInfo();
	          $('#githubSyncOverviewIcon').dataset.syncState = info.state;
	          $('#githubSyncOverviewGlyph').innerHTML = GITHUB_SYNC_ICONS[info.state] || GITHUB_SYNC_ICONS.error;
	          $('#githubSyncOverviewTitle').textContent = info.title;
	          $('#githubSyncOverviewMeta').textContent = info.meta;
	          if (updateStatus && !githubSyncBusy) setGitHubSyncStatus(info.status, info.kind);
	          $('#githubSyncSeeChanges').hidden = info.state !== 'conflict' || githubSyncBusy;
	          if (info.state !== 'conflict' || githubSyncBusy) $('#githubSyncChangesPanel').hidden = true;
	        }

function setGitHubSyncStatus(message, kind = '') {
	          const status = $('#githubSyncStatus');
	          $('#githubSyncStatusText').textContent = message;
	          status.className = `sync-status${kind ? ` ${kind}` : ''}`;
	        }

function syncChangeItemLabel(key, value) {
	          if (value && typeof value === 'object' && !Array.isArray(value) && (value.name || value.type || value.id)) return value.name || value.type || value.id;
	          return COCKTAILS.find((cocktail) => cocktail.id === key)?.name || key;
	        }

function syncFieldLabel(key) {
	          const labels = {
	            abv: 'ABV', id: 'ID', url: 'URL', totalWineUrl: 'Total Wine URL', totalWineLocation: 'Location',
	            useInCocktails: 'Mix Use', neatPour: 'Neat Pour', smallSizeAvailable: '375 ml Available',
	            baseLiquor: 'Base Liquor', ingredientNames: 'Ingredients', sourceNote: 'Source Note',
	            dateAdded: 'Date Added', dateRemoved: 'Date Removed', image: 'Picture', shoppingList: 'Grocery List'
	          };
	          if (labels[key]) return labels[key];
	          return String(key).replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
	        }

function syncDisplayValue(value, field = '') {
	          if (value === undefined) return 'Not present';
	          if (value === null || value === '') return 'None';
	          if (typeof value === 'boolean') return value ? 'Yes' : 'No';
	          if (field === 'image' && typeof value === 'string') {
	            if (/^data:image\//i.test(value)) return `Attached image (${Math.max(1, Math.round(value.length / 1024))} KB)`;
	            return value;
	          }
	          if (Array.isArray(value)) {
	            if (!value.length) return 'None';
	            return value.map((item) => {
	              if (!item || typeof item !== 'object') return String(item);
	              if (item.name && item.rating) return `${item.name}: ${item.rating}`;
	              return item.name || item.type || JSON.stringify(item);
	            }).join(', ');
	          }
	          if (value && typeof value === 'object') return JSON.stringify(value, null, 2);
	          return String(value);
	        }

function syncCollection(value) {
	          if (Array.isArray(value)) {
	            return {
	              count: value.length,
	              map: new Map(value.map((item, index) => [item && typeof item === 'object' ? String(item.id || item.name || item.type || index) : String(item), item]))
	            };
	          }
	          if (value && typeof value === 'object') return {count: Object.keys(value).length, map: new Map(Object.entries(value))};
	          if (value === undefined || value === null || value === '') return {count: 0, map: new Map()};
	          return {count: 1, map: new Map([['value', value]])};
	        }

function syncChangedFields(deviceValue, githubValue, includeAll = false) {
	          const deviceObject = deviceValue && typeof deviceValue === 'object' && !Array.isArray(deviceValue);
	          const githubObject = githubValue && typeof githubValue === 'object' && !Array.isArray(githubValue);
	          if (deviceObject || githubObject) {
	            const device = deviceObject ? deviceValue : {};
	            const github = githubObject ? githubValue : {};
	            return [...new Set([...Object.keys(device), ...Object.keys(github)])]
	              .filter((key) => includeAll || stableJson(device[key]) !== stableJson(github[key]))
	              .sort((a, b) => syncFieldLabel(a).localeCompare(syncFieldLabel(b)))
	              .map((key) => ({label: syncFieldLabel(key), field: key, device: device[key], github: github[key]}));
	          }
	          return [{label: 'Value', field: '', device: deviceValue, github: githubValue}];
	        }

function syncCategoryComparison(key, label, deviceValue, githubValue) {
	          const device = syncCollection(deviceValue);
	          const github = syncCollection(githubValue);
	          const keys = [...new Set([...device.map.keys(), ...github.map.keys()])];
	          const items = keys.flatMap((itemKey) => {
	            const hasDevice = device.map.has(itemKey);
	            const hasGithub = github.map.has(itemKey);
	            const deviceItem = device.map.get(itemKey);
	            const githubItem = github.map.get(itemKey);
	            if (hasDevice && hasGithub && stableJson(deviceItem) === stableJson(githubItem)) return [];
	            const kind = !hasGithub ? 'device-only' : !hasDevice ? 'github-only' : 'changed';
	            const labelValue = hasDevice ? deviceItem : githubItem;
	            return [{
	              kind,
	              name: itemKey === 'value' ? label : syncChangeItemLabel(itemKey, labelValue),
	              fields: syncChangedFields(deviceItem, githubItem, kind !== 'changed')
	            }];
	          }).sort((a, b) => a.name.localeCompare(b.name));
	          const totals = {
	            deviceOnly: items.filter((item) => item.kind === 'device-only').length,
	            githubOnly: items.filter((item) => item.kind === 'github-only').length,
	            changed: items.filter((item) => item.kind === 'changed').length
	          };
	          return {key, label, deviceCount: device.count, githubCount: github.count, items, totals};
	        }

function syncChangeRows(localData, remoteData) {
	          const local = syncComparableData(localData);
	          const remote = syncComparableData(remoteData);
	          return SYNC_CHANGE_DESCRIPTORS.flatMap(([key, label]) => {
	            if (stableJson(local[key]) === stableJson(remote[key])) return [];
	            return [syncCategoryComparison(key, label, local[key], remote[key])];
	          });
	        }

function syncDiffBadge(kind, count) {
	          if (!count) return '';
	          const labels = { 'device-only': 'Device only', 'github-only': 'GitHub only', changed: 'Changed' };
	          return `<span class="sync-diff-badge ${kind}">${escapeHtml(labels[kind])} ${count}</span>`;
	        }

function syncDiffValueMarkup(value, field, side) {
	          const missing = value === undefined;
	          return `<div class="sync-diff-value ${side}${missing ? ' missing' : ''}">${escapeHtml(syncDisplayValue(value, field))}</div>`;
	        }

function syncDiffItemMarkup(item) {
	          const kindLabels = { 'device-only': 'Device only', 'github-only': 'GitHub only', changed: 'Changed' };
	          return `<article class="sync-diff-item">
	            <div class="sync-diff-item-head"><span class="sync-diff-item-name">${escapeHtml(item.name)}</span><span class="sync-diff-badge ${item.kind}">${escapeHtml(kindLabels[item.kind])}</span></div>
	            <div class="sync-diff-fields">${item.fields.map((field) => `<div class="sync-diff-field"><span class="sync-diff-field-label">${escapeHtml(field.label)}</span>${syncDiffValueMarkup(field.device, field.field, 'device')}${syncDiffValueMarkup(field.github, field.field, 'github')}</div>`).join('')}</div>
	          </article>`;
	        }

function syncDiffSectionMarkup(category) {
	          const totalChanges = category.items.length;
	          return `<details class="sync-diff-section" open>
	            <summary><span class="sync-diff-section-title">${escapeHtml(category.label)}</span><span class="sync-diff-section-badges">${syncDiffBadge('device-only', category.totals.deviceOnly)}${syncDiffBadge('github-only', category.totals.githubOnly)}${syncDiffBadge('changed', category.totals.changed)}</span><span class="sync-diff-section-count">Device ${category.deviceCount} · GitHub ${category.githubCount} · ${totalChanges} difference${totalChanges === 1 ? '' : 's'}</span></summary>
	            <div class="sync-diff-items">${category.items.map(syncDiffItemMarkup).join('')}</div>
	          </details>`;
	        }

function syncSnapshotSummary(data, side) {
	          const comparable = syncComparableData(data);
	          const build = data?.buildVersion ? `v${data.buildVersion}` : 'Version unknown';
	          const saved = side === 'github' && data?.exportedAt && !Number.isNaN(Date.parse(data.exportedAt)) ? ` · saved ${new Date(data.exportedAt).toLocaleString()}` : '';
	          return `${escapeHtml(build + saved)}<br>${comparable.bar.length} bottles · ${comparable.customCocktails.length} custom cocktails · ${comparable.glassware.length} drinkware`;
	        }

async function showGitHubSyncChanges() {
	          const panel = $('#githubSyncChangesPanel');
	          const list = $('#githubSyncChangesList');
	          panel.hidden = false;
	          list.innerHTML = '<span class="empty">Comparing this device with GitHub…</span>';
	          try {
	            let remoteData = githubSyncRuntime.remoteData;
	            if (!remoteData) {
	              const {settings, token} = gitHubSyncFormValues();
	              const remote = await readGitHubDataFile(settings, token);
	              remoteData = remote.data;
	              Object.assign(githubSyncRuntime, {remoteSha: remote.sha, remoteHash: syncDataFingerprint(remote.data), remoteData: remote.data});
	            }
	            const localData = userDataSnapshot();
	            const rows = syncChangeRows(localData, remoteData);
	            const totals = rows.reduce((sum, row) => ({
	              deviceOnly: sum.deviceOnly + row.totals.deviceOnly,
	              githubOnly: sum.githubOnly + row.totals.githubOnly,
	              changed: sum.changed + row.totals.changed
	            }), {deviceOnly: 0, githubOnly: 0, changed: 0});
	            const meta = parseStoredJson(GITHUB_SYNC_META_KEY);
	            const baseline = meta.syncedAt ? `The copies last matched ${new Date(meta.syncedAt).toLocaleString()}. ` : '';
	            list.innerHTML = `<div class="sync-diff-intro">
	              <p>${escapeHtml(baseline)}Only differences are listed below; expand or collapse any category.</p>
	              <div class="sync-diff-snapshots">
	                <div class="sync-diff-snapshot"><strong>This Device</strong><span>${syncSnapshotSummary(localData, 'device')}</span></div>
	                <div class="sync-diff-snapshot"><strong>GitHub</strong><span>${syncSnapshotSummary(remoteData, 'github')}</span></div>
	              </div>
	              <div class="sync-diff-total">${syncDiffBadge('device-only', totals.deviceOnly)}${syncDiffBadge('github-only', totals.githubOnly)}${syncDiffBadge('changed', totals.changed)}</div>
	              <p class="sync-diff-direction"><strong>Download Latest</strong> replaces this device with GitHub. <strong>Sync Now</strong> will ask whether to keep this device or GitHub.</p>
	            </div>${rows.length ? rows.map(syncDiffSectionMarkup).join('') : '<span class="empty">The saved categories currently contain the same data.</span>'}`;
	          } catch (error) {
	            list.innerHTML = `<span class="empty">${escapeHtml(error.message || 'Could not compare the two copies.')}</span>`;
	          }
	        }

function populateGitHubSyncForm() {
	          const settings = storedGitHubSyncSettings();
	          $('#githubSyncAutoSync').checked = settings.autoSync;
	          $('#githubSyncOwner').value = settings.owner;
	          $('#githubSyncRepo').value = settings.repo;
	          $('#githubSyncBranch').value = settings.branch;
	          $('#githubSyncPath').value = settings.path;
	          $('#githubSyncToken').value = storedGitHubSyncToken();
	          $('#githubSyncRememberToken').checked = Boolean(localStorage.getItem(GITHUB_SYNC_TOKEN_KEY)) || !storedGitHubSyncToken();
	          updateGitHubSyncInterface(true);
	        }

function gitHubSyncFormValues() {
	          const settings = {
	            autoSync: $('#githubSyncAutoSync').checked,
	            owner: $('#githubSyncOwner').value.trim(),
	            repo: $('#githubSyncRepo').value.trim().replace(/\.git$/i, ''),
	            branch: $('#githubSyncBranch').value.trim() || 'main',
	            path: $('#githubSyncPath').value.trim().replace(/^\/+/, '')
	          };
	          const token = $('#githubSyncToken').value.trim();
	          if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(settings.owner)) throw new Error('Enter a valid GitHub username or organization.');
	          if (!/^[A-Za-z0-9._-]+$/.test(settings.repo)) throw new Error('Enter a valid repository name.');
	          if (!settings.path || settings.path.split('/').some((part) => !part || part === '.' || part === '..')) throw new Error('Enter a valid data file path.');
	          if (!token) throw new Error('Enter your fine-grained GitHub access token.');
	          return {settings, token};
	        }

function saveGitHubSyncCredentials(settings, token) {
	          localStorage.setItem(GITHUB_SYNC_SETTINGS_KEY, JSON.stringify(settings));
	          if ($('#githubSyncRememberToken').checked) {
	            localStorage.setItem(GITHUB_SYNC_TOKEN_KEY, token);
	            sessionStorage.removeItem(GITHUB_SYNC_TOKEN_KEY);
	          } else {
	            sessionStorage.setItem(GITHUB_SYNC_TOKEN_KEY, token);
	            localStorage.removeItem(GITHUB_SYNC_TOKEN_KEY);
	          }
	          updateGitHubSyncButton();
	        }

function saveGitHubSyncSettingsOnly() {
	          try {
	            const {settings, token} = gitHubSyncFormValues();
	            saveGitHubSyncCredentials(settings, token);
	            setGitHubSyncStatus(`Settings saved for ${settings.owner}/${settings.repo}.`, 'success');
	            updateGitHubSyncButton();
	            checkGitHubSyncStatus(true);
	          } catch (error) {
	            setGitHubSyncStatus(error.message || 'Could not save GitHub settings.', 'error');
	          }
	        }

function githubContentsUrl(settings) {
	          const owner = encodeURIComponent(settings.owner);
	          const repo = encodeURIComponent(settings.repo);
	          const path = settings.path.split('/').map(encodeURIComponent).join('/');
	          return `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
	        }

function githubRepositoryUrl(settings) {
	          return `https://api.github.com/repos/${encodeURIComponent(settings.owner)}/${encodeURIComponent(settings.repo)}`;
	        }

function githubHeaders(token) {
	          return {
	            Accept: 'application/vnd.github+json',
	            Authorization: `Bearer ${token}`,
	            'X-GitHub-Api-Version': '2022-11-28'
	          };
	        }

async function githubResponseError(response) {
	          let detail = '';
	          try { detail = (await response.json()).message || ''; }
	          catch (error) { detail = ''; }
	          if (response.status === 401) return new Error('GitHub rejected the token. Create a new token and try again.');
	          if (response.status === 403) return new Error('GitHub denied access. Check that the token has Contents read and write permission.');
	          if (response.status === 404) return new Error('GitHub could not find this item, or the token does not have access to it.');
	          if (response.status === 409) return new Error('The GitHub copy changed while syncing. Sync again to reconcile it.');
	          return new Error(detail ? `GitHub: ${detail}` : `GitHub request failed (${response.status}).`);
	        }

async function verifyGitHubSyncTarget(settings, token) {
	          const repositoryUrl = githubRepositoryUrl(settings);
	          const repositoryResponse = await fetch(repositoryUrl, {headers: githubHeaders(token)});
	          if (repositoryResponse.status === 404) {
	            throw new Error(`GitHub cannot access ${settings.owner}/${settings.repo}. Confirm the repository name and give this token access to that repository.`);
	          }
	          if (!repositoryResponse.ok) throw await githubResponseError(repositoryResponse);
	          const branchResponse = await fetch(`${repositoryUrl}/branches/${encodeURIComponent(settings.branch)}`, {headers: githubHeaders(token)});
	          if (branchResponse.status === 404) {
	            throw new Error(`Branch "${settings.branch}" does not exist. If the repository is empty, add a README on GitHub to create the branch.`);
	          }
	          if (!branchResponse.ok) throw await githubResponseError(branchResponse);
	        }

async function readGitHubDataFile(settings, token, allowMissing = false) {
	          const response = await fetch(`${githubContentsUrl(settings)}?ref=${encodeURIComponent(settings.branch)}`, {headers: githubHeaders(token)});
	          if (response.status === 404) {
	            if (allowMissing) return null;
	            throw new Error(`No Home Bar data file exists at "${settings.path}" yet. Choose Sync to create it.`);
	          }
	          if (!response.ok) throw await githubResponseError(response);
	          const file = await response.json();
	          if (!file || file.type !== 'file' || typeof file.content !== 'string') throw new Error('The GitHub path does not point to a readable JSON file.');
	          const binary = atob(file.content.replace(/\s/g, ''));
	          const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
	          let data;
	          try { data = JSON.parse(new TextDecoder().decode(bytes)); }
	          catch (error) { throw new Error('The GitHub data file is not valid JSON.'); }
	          return {data, sha: file.sha};
	        }

function utf8ToBase64(value) {
	          const bytes = new TextEncoder().encode(value);
	          let binary = '';
	          for (let offset = 0; offset < bytes.length; offset += 32768) {
	            binary += String.fromCharCode(...bytes.subarray(offset, offset + 32768));
	          }
	          return btoa(binary);
	        }

function setGitHubSyncBusy(busy) {
	          githubSyncBusy = busy;
              githubSyncOperation = '';
	          ['githubSyncForget', 'githubSyncSaveSettings', 'githubSyncNow', 'githubDownloadLatest', 'githubSyncSeeChanges', 'githubSyncModalClose', 'githubSyncCloseAction'].forEach((id) => { $(`#${id}`).disabled = busy; });
	          updateGitHubSyncButton();
	        }

function resetSyncCloseAction() {
	          cancelSyncAutoClose();
	          $('#githubSyncNow').classList.add('primary');
	          $('#githubSyncCloseAction').hidden = true;
	        }

function showSyncCloseAction() {
	          $('#githubSyncNow').classList.remove('primary');
	          $('#githubSyncCloseAction').hidden = false;
	        }

function cancelSyncAutoClose() {
	          if (githubSyncAutoCloseTimer) clearTimeout(githubSyncAutoCloseTimer);
	          if (githubSyncAutoCloseInterval) clearInterval(githubSyncAutoCloseInterval);
	          githubSyncAutoCloseTimer = 0;
	          githubSyncAutoCloseInterval = 0;
	          $('#githubSyncAutoClose').hidden = true;
	          $('#githubSyncAutoCloseProgress').style.animation = 'none';
	        }

function startSyncAutoClose(delay = 4000) {
	          cancelSyncAutoClose();
	          const autoClose = $('#githubSyncAutoClose');
	          const progress = $('#githubSyncAutoCloseProgress');
	          let seconds = Math.ceil(delay / 1000);
	          $('#githubSyncAutoCloseText').textContent = `Closing automatically in ${seconds} seconds`;
	          autoClose.hidden = false;
	          void progress.offsetWidth;
	          progress.style.animation = `sync-auto-close-countdown ${delay}ms linear forwards`;
	          githubSyncAutoCloseInterval = setInterval(() => {
	            seconds -= 1;
	            if (seconds > 0) $('#githubSyncAutoCloseText').textContent = `Closing automatically in ${seconds} second${seconds === 1 ? '' : 's'}`;
	          }, 1000);
	          githubSyncAutoCloseTimer = setTimeout(() => {
	            githubSyncAutoCloseTimer = 0;
	            closeGitHubSyncModal();
	          }, delay);
	        }

function rememberGitHubSync(settings, sha, exportedAt, data) {
	          const now = new Date().toISOString();
	          const dataHash = syncDataFingerprint(data);
	          localStorage.setItem(GITHUB_SYNC_META_KEY, JSON.stringify({
	            target: gitHubSyncTarget(settings), sha, dataHash, exportedAt: exportedAt || '', syncedAt: now, checkedAt: now
	          }));
	          Object.assign(githubSyncRuntime, {checking: false, remoteSha: sha, remoteHash: dataHash, remoteData: data, checkedAt: now, error: '', offline: false});
	          updateGitHubSyncButton();
	        }

function scheduleGitHubAutoSync() {
          clearTimeout(githubSyncRuntime.autoTimer);
          githubSyncRuntime.autoTimer = 0;
          const settings = storedGitHubSyncSettings();
          const meta = parseStoredJson(GITHUB_SYNC_META_KEY);
          if (!settings.autoSync || !githubSyncConfigured() || meta.target !== gitHubSyncTarget(settings) || !meta.sha || !meta.dataHash) return;
          githubSyncRuntime.autoTimer = setTimeout(() => {
            githubSyncRuntime.autoTimer = 0;
            const run = () => autoSyncGitHubData();
            if (navigator.locks?.request) {
              navigator.locks.request('home-bar-sync-' + gitHubSyncTarget(settings), run).catch(() => {});
            } else run();
          }, Math.min(60000, 1200 * 2 ** githubSyncRuntime.autoFailures));
        }

function gitHubAutoSyncReady() {
          return document.visibilityState !== 'hidden' && navigator.onLine !== false
            && !githubSyncBusy && !githubSyncRuntime.checking
            && !document.querySelector('.modal-overlay:not([hidden])')
            && !document.activeElement?.matches('input, textarea, select, [contenteditable="true"]');
        }

async function autoSyncGitHubData() {
          if (!gitHubAutoSyncReady()) return;
          const settings = storedGitHubSyncSettings();
          const token = storedGitHubSyncToken();
          const target = gitHubSyncTarget(settings);
          const meta = parseStoredJson(GITHUB_SYNC_META_KEY);
          if (!settings.autoSync || !token || meta.target !== target || !meta.sha || !meta.dataHash) return;
          const stillCurrent = () => storedGitHubSyncSettings().autoSync
            && gitHubSyncTarget(storedGitHubSyncSettings()) === target && storedGitHubSyncToken() === token;
          setGitHubSyncBusy(true);
          githubSyncRuntime.error = '';
          try {
            // Never create a missing shared file silently. First sync remains manual.
            const remote = await readGitHubDataFile(settings, token);
            if (!stillCurrent()) return;
            const data = userDataSnapshot();
            const localHash = syncDataFingerprint(data);
            const remoteHash = syncDataFingerprint(remote.data);
            Object.assign(githubSyncRuntime, {remoteSha: remote.sha, remoteHash, remoteData: remote.data, checkedAt: new Date().toISOString(), offline: false});
            const plan = gitHubSyncPlan({remoteExists: true, hasBaseline: true,
              localHasSavedData: true, localHash, remoteHash,
              baselineHash: meta.dataHash, remoteSha: remote.sha, baselineSha: meta.sha});
            if (plan === 'choose') throw new Error('Both copies changed. Open GitHub Sync to review them; automatic sync is paused.');
            if (plan === 'download') {
              // Editing may have started while the request was in flight.
              if (document.visibilityState === 'hidden' || document.querySelector('.modal-overlay:not([hidden])')
                || document.activeElement?.matches('input, textarea, select, [contenteditable="true"]')) return;
              applyGitHubData(settings, remote);
            } else if (plan === 'upload') {
              const sha = await uploadGitHubData(settings, token, remote, data);
              if (!stillCurrent()) return;
              // Remember exactly what was uploaded; edits made during PUT stay dirty.
              rememberGitHubSync(settings, sha, data.exportedAt, data);
            } else rememberGitHubSync(settings, remote.sha, remote.data.exportedAt, data);
            githubSyncRuntime.autoFailures = 0;
          } catch (error) {
            if (stillCurrent()) {
              githubSyncRuntime.error = error.message || 'Automatic sync failed. Your edits remain on this device.';
              githubSyncRuntime.offline = isGitHubNetworkError(error);
              githubSyncRuntime.autoFailures = Math.min(6, githubSyncRuntime.autoFailures + 1);
            }
          } finally {
            setGitHubSyncBusy(false);
          }
        }

async function checkGitHubSyncStatus(force = false) {
          scheduleGitHubAutoSync();
	          if (!githubSyncConfigured() || githubSyncRuntime.checking || githubSyncBusy) return;
	          const settings = storedGitHubSyncSettings();
	          const token = storedGitHubSyncToken();
	          const storedMeta = parseStoredJson(GITHUB_SYNC_META_KEY);
	          // A page reload clears githubSyncRuntime, so remoteSha/remoteHash are gone even though
	          // storedMeta.checkedAt (persisted) may still look recent. Only skip the network check when
	          // THIS session already has a fresh in-memory result to fall back on -- otherwise the status
	          // UI reasons from a stale/empty remote read and can misreport "upload" when GitHub actually
	          // has newer data (or is the very first check on this device).
	          const lastCheck = Date.parse(githubSyncRuntime.checkedAt || '');
	          const hasFreshRuntimeCheck = Boolean(githubSyncRuntime.remoteSha) && isFinite(lastCheck);
	          if (!force && hasFreshRuntimeCheck && Date.now() - lastCheck < GITHUB_SYNC_CHECK_INTERVAL) {
	            updateGitHubSyncButton();
	            return;
	          }
	          githubSyncRuntime.checking = true;
	          githubSyncRuntime.error = '';
	          updateGitHubSyncButton();
	          try {
	            const remote = await readGitHubDataFile(settings, token);
	            const checkedAt = new Date().toISOString();
	            const remoteHash = syncDataFingerprint(remote.data);
	            Object.assign(githubSyncRuntime, {remoteSha: remote.sha, remoteHash, remoteData: remote.data, checkedAt, error: '', offline: false});
	            const nextMeta = {...storedMeta, checkedAt};
	            // An older build's baseline can differ even when the actual copies now match.
	            if (remoteHash === syncDataFingerprint()) {
	              nextMeta.target = gitHubSyncTarget(settings);
	              nextMeta.dataHash = remoteHash;
	              nextMeta.sha = remote.sha;
	              nextMeta.syncedAt = storedMeta.syncedAt || remote.data.exportedAt || checkedAt;
	            }
	            localStorage.setItem(GITHUB_SYNC_META_KEY, JSON.stringify(nextMeta));
	          } catch (error) {
	            githubSyncRuntime.error = error.message || 'Could not check GitHub.';
	            githubSyncRuntime.offline = isGitHubNetworkError(error);
	            githubSyncRuntime.checkedAt = new Date().toISOString();
	          } finally {
	            githubSyncRuntime.checking = false;
	            updateGitHubSyncButton();
	            if (!$('#githubSyncModalOverlay').hidden && !githubSyncBusy) updateGitHubSyncInterface(true);
	          }
	        }

function gitHubSyncPlan({remoteExists, hasBaseline, localHasSavedData, localHash, remoteHash, baselineHash, remoteSha, baselineSha}) {
	          if (!remoteExists) return 'upload';
	          if (localHash === remoteHash) return 'clean';
	          if (!hasBaseline) return localHasSavedData ? 'choose' : 'download';
	          const localChanged = localHash !== baselineHash;
	          const remoteChanged = remoteSha !== baselineSha;
	          if (localChanged && remoteChanged) return 'choose';
	          if (remoteChanged) return 'download';
	          if (localChanged) return 'upload';
	          return 'choose';
	        }

async function uploadGitHubData(settings, token, remote, data) {
              githubSyncOperation = 'uploading';
              updateGitHubSyncButton();
	          const body = {
	            message: `Update Home Bar data (${BUILD_VERSION})`,
	            content: utf8ToBase64(JSON.stringify(data, null, 2)),
	            branch: settings.branch
	          };
	          if (remote?.sha) body.sha = remote.sha;
	          const response = await fetch(githubContentsUrl(settings), {
	            method: 'PUT', headers: {...githubHeaders(token), 'Content-Type': 'application/json'}, body: JSON.stringify(body)
	          });
	          if (!response.ok) throw await githubResponseError(response);
	          const saved = await response.json();
	          return saved.content?.sha || remote?.sha || '';
	        }

function applyGitHubData(settings, remote) {
              githubSyncOperation = 'downloading';
              updateGitHubSyncButton();
	          importUserData(remote.data, {notify: false});
	          const localData = userDataSnapshot();
	          rememberGitHubSync(settings, remote.sha, remote.data.exportedAt, localData);
	          return localData;
	        }

async function synchronizeGitHubData() {
          if (githubSyncBusy || githubSyncRuntime.checking) return;
	          try {
	            const {settings, token} = gitHubSyncFormValues();
	            saveGitHubSyncCredentials(settings, token);
	            setGitHubSyncBusy(true);
	            resetSyncCloseAction();
	            setGitHubSyncStatus('Checking GitHub…');
	            await verifyGitHubSyncTarget(settings, token);
	            const remote = await readGitHubDataFile(settings, token, true);
	            const data = userDataSnapshot();
	            const localHash = syncDataFingerprint(data);
	            const remoteHash = remote ? syncDataFingerprint(remote.data) : '';
	            const meta = parseStoredJson(GITHUB_SYNC_META_KEY);
	            const target = gitHubSyncTarget(settings);
	            const hasBaseline = meta.target === target && Boolean(meta.sha && meta.dataHash);
	            let plan = gitHubSyncPlan({
	              remoteExists: Boolean(remote),
	              hasBaseline,
	              localHasSavedData: hasPersistedHomeBarData(),
	              localHash,
	              remoteHash,
	              baselineHash: meta.dataHash || '',
	              remoteSha: remote?.sha || '',
	              baselineSha: meta.sha || ''
	            });
	            if (plan === 'choose') {
	              const message = hasBaseline
	                ? 'This device and GitHub both changed. Choose OK to use the GitHub copy, or Cancel to keep this device.'
	                : 'This device has not synced with this file before. Choose OK to use the GitHub copy, or Cancel to keep this device.';
	              if (confirm(message)) {
	                plan = 'download';
	              } else if (confirm('Upload this device to GitHub instead?')) {
	                plan = 'upload';
	              } else {
	                setGitHubSyncStatus('Sync canceled. Neither copy was changed.');
	                return;
	              }
	            }
	            if (plan === 'download') {
	              setGitHubSyncStatus('Updating this device from GitHub…');
	              applyGitHubData(settings, remote);
	              setGitHubSyncStatus('Synced. This device now has the latest GitHub data.', 'success');
	              showSyncCloseAction();
	              startSyncAutoClose();
	              return;
	            }
	            if (plan === 'upload') {
	              setGitHubSyncStatus('Updating GitHub from this device…');
	              const sha = await uploadGitHubData(settings, token, remote, data);
	              rememberGitHubSync(settings, sha, data.exportedAt, data);
	              setGitHubSyncStatus('Synced. GitHub now has this device’s latest data.', 'success');
	              showSyncCloseAction();
	              startSyncAutoClose();
	              return;
	            }
	            rememberGitHubSync(settings, remote.sha, remote.data.exportedAt, data);
	            setGitHubSyncStatus('Already up to date.', 'success');
	            showSyncCloseAction();
	            startSyncAutoClose();
	          } catch (error) {
	            githubSyncRuntime.error = error.message || 'Could not sync with GitHub.';
	            githubSyncRuntime.offline = isGitHubNetworkError(error);
	            setGitHubSyncStatus(
	              githubSyncRuntime.offline ? 'This device is offline. Reconnect to the internet, then sync again.' : githubSyncRuntime.error,
	              'error'
	            );
	            updateGitHubSyncButton();
	          } finally {
	            setGitHubSyncBusy(false);
	            updateGitHubSyncInterface(false);
	          }
	        }

async function downloadLatestGitHubData() {
	          if (!confirm('Replace all Home Bar data on this device with the latest GitHub copy? Any changes that have not been uploaded will be lost.')) return;
	          try {
	            const {settings, token} = gitHubSyncFormValues();
	            saveGitHubSyncCredentials(settings, token);
	            setGitHubSyncBusy(true);
	            resetSyncCloseAction();
	            setGitHubSyncStatus('Downloading the latest GitHub data…');
	            await verifyGitHubSyncTarget(settings, token);
	            const remote = await readGitHubDataFile(settings, token);
	            applyGitHubData(settings, remote);
	            setGitHubSyncStatus('Downloaded. This device now matches the latest GitHub data.', 'success');
	            showSyncCloseAction();
	          } catch (error) {
	            githubSyncRuntime.error = error.message || 'Could not download from GitHub.';
	            githubSyncRuntime.offline = isGitHubNetworkError(error);
	            setGitHubSyncStatus(
	              githubSyncRuntime.offline ? 'This device is offline. Reconnect to the internet, then try again.' : githubSyncRuntime.error,
	              'error'
	            );
	            updateGitHubSyncButton();
	          } finally {
	            setGitHubSyncBusy(false);
	            updateGitHubSyncInterface(false);
	          }
	        }

function forgetGitHubSync() {
	          localStorage.removeItem(GITHUB_SYNC_SETTINGS_KEY);
	          localStorage.removeItem(GITHUB_SYNC_TOKEN_KEY);
	          localStorage.removeItem(GITHUB_SYNC_META_KEY);
	          sessionStorage.removeItem(GITHUB_SYNC_TOKEN_KEY);
	          Object.assign(githubSyncRuntime, {checking: false, remoteSha: '', remoteHash: '', remoteData: null, checkedAt: '', error: '', offline: false});
	          populateGitHubSyncForm();
	          $('#githubSyncSettingsPanel').hidden = false;
	          updateGitHubSyncButton();
	          setGitHubSyncStatus('GitHub settings were removed from this device.');
	        }

function plainObject(value) {
	          return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
	        }

function sanitizeStringMap(value) {
	          return Object.fromEntries(Object.entries(plainObject(value)).filter(([key, val]) => key && typeof val === 'string'));
	        }

function sanitizeNumberMap(value) {
	          return Object.fromEntries(Object.entries(plainObject(value)).filter(([key, val]) => key && typeof val === 'number' && isFinite(val) && val > 0));
	        }

function sanitizeBookmarks(value) {
	          return Object.fromEntries(Object.entries(plainObject(value)).flatMap(([key, val]) => {
	            if (!key || (val !== true && !(Number.isInteger(val) && val >= 1 && val <= 3))) return [];
	            return [[key, val]];
	          }));
	        }

function sanitizeBar(value) {
	          if (!Array.isArray(value)) return null;
	          const usedIds = new Set();
	          return value.map((item, index) => {
	            if (!item || typeof item !== 'object') return null;
	            const kind = item.kind === 'ingredient' ? 'ingredient' : 'spirit';
	            const rawName = typeof item.name === 'string' ? item.name.trim() : '';
	            const name = kind === 'ingredient' ? normalizePantryIngredientName(rawName) : rawName;
	            if (!name) return null;
	            let id = typeof item.id === 'string' && /^[a-z0-9_-]+$/i.test(item.id) ? item.id : `imported-bar-${index + 1}`;
	            while (usedIds.has(id)) id = `${id}-${index + 1}`;
	            usedIds.add(id);
	            const archivedAt = Number.isFinite(item.archivedAt) ? item.archivedAt : undefined;
	            if (kind === 'ingredient') {
	              const flavoringSubtype = flavoringSubtypeForName(name);
	              if (!flavoringSubtype || flavoringSubtype.startsWith('Bitter,')) return {id, kind, name, ...(archivedAt !== undefined && {archivedAt})};
	              return {id, kind: 'spirit', name: canonicalFlavoringBottleName(name, flavoringSubtype), base: 'Flavorings', subtype: flavoringSubtype, purpose: 'mixing', useInCocktails: false, notes: '', favorite: false, shoppingList: false, recommended: false, price: '', totalWineLocation: '', totalWineUrl: '', country: '', abv: 0, taste: defaultBottleTaste('Flavorings', flavoringSubtype), storage: defaultBottleStorage('Flavorings', flavoringSubtype, name), expirationMonths: defaultExpirationMonths('Flavorings', flavoringSubtype, name), has375ml: false, ...(archivedAt !== undefined && {archivedAt})};
	            }
	            const importedBase = typeof item.base === 'string' ? normalizeBottleBase(item.base) : '';
	            const base = BAR_BASE_ORDER.includes(importedBase) ? importedBase : '';
	            if (!base) return null;
	            const subtype = normalizeBottleSubtype(base, typeof item.subtype === 'string' ? item.subtype.trim() : '', name);
	            const purpose = item.purpose === 'sipping' ? 'sipping' : 'mixing';
	            const useInCocktails = item.useInCocktails === true;
	            const notes = typeof item.notes === 'string' ? item.notes : '';
	            const favorite = item.favorite === true;
	            const shoppingList = item.shoppingList === true;
	            const recommended = item.recommended === true;
	            const recommendationSourceId = typeof item.recommendationSourceId === 'string' ? item.recommendationSourceId : '';
	            const price = normalizeBottlePrice(item.price);
            const price375 = normalizeBottlePrice(item.price375);
	            const totalWineLocation = typeof item.totalWineLocation === 'string' ? item.totalWineLocation : '';
	            const totalWineUrl = typeof item.totalWineUrl === 'string' ? item.totalWineUrl : '';
	            const country = typeof item.country === 'string' ? item.country.trim() : '';
	            const abv = defaultBottleAbv(base, subtype, item.abv);
	            const taste = defaultBottleTaste(base, subtype, item.taste);
	            const savedStorage = normalizeBottleStorage(item.storage);
	            const standardStorage = defaultBottleStorage(base, subtype, name);
	            const storage = base === 'Flavorings' && standardStorage === 'fridge' ? standardStorage : savedStorage || standardStorage;
	            const savedExpiration = normalizeExpirationMonths(item.expirationMonths);
	            const standardExpiration = defaultExpirationMonths(base, subtype, name);
	            const expirationMonths = base === 'Flavorings' && standardExpiration !== '' ? standardExpiration : savedExpiration || standardExpiration;
	            const has375ml = migrateBottleHas375mlOption(name, item.has375ml);
	            return {id, kind, name, base, subtype, purpose, useInCocktails, notes, favorite, shoppingList, recommended, recommendationSourceId, price, price375, totalWineLocation, totalWineUrl, country, abv, taste, storage, expirationMonths, has375ml, ...(archivedAt !== undefined && {archivedAt})};
	          }).filter(Boolean);
	        }

function sanitizeGlassware(value) {
	          if (!Array.isArray(value)) return null;
	          const usedIds = new Set();
	          return value.map((item, index) => {
	            if (!item || typeof item !== 'object') return null;
	            const type = typeof item.type === 'string' ? item.type.trim() : '';
	            if (!type) return null;
	            let id = typeof item.id === 'string' && /^[a-z0-9_-]+$/i.test(item.id) ? item.id : `glass-${Date.now()}-${index}`;
	            while (usedIds.has(id)) id = `${id}-${index + 1}`;
	            usedIds.add(id);
	            const count = Number(item.count);
	            return {
	              id, type,
	              descriptors: typeof item.descriptors === 'string' ? item.descriptors.trim() : '',
	              brand: typeof item.brand === 'string' ? item.brand.trim() : '',
	              image: typeof item.image === 'string' ? item.image.trim() : '',
	              cost: normalizeBottlePrice(item.cost),
	              ounces: normalizeBottlePrice(item.ounces),
	              count: Number.isFinite(count) && count > 0 ? Math.round(count) : 1,
	              url: typeof item.url === 'string' ? item.url.trim() : ''
	            };
	          }).filter(Boolean);
	        }

function importUserData(data, options = {}) {
	          if (!data || typeof data !== 'object') throw new Error('Import file was not valid cocktail data.');
	          const notesFromCocktails = {};
	          const ratingsFromCocktails = {};
	          const guidesFromCocktails = {};
	          const bookmarksFromCocktails = {};
	          if (Array.isArray(data.cocktails)) {
	            data.cocktails.forEach((cocktail) => {
	              if (cocktail && typeof cocktail.id === 'string' && typeof cocktail.userNotes === 'string' && cocktail.userNotes.trim()) {
	                notesFromCocktails[cocktail.id] = cocktail.userNotes;
	              }
	              if (cocktail && typeof cocktail.id === 'string' && typeof cocktail.rating === 'number' && cocktail.rating > 0) {
	                ratingsFromCocktails[cocktail.id] = cocktail.rating;
	              }
	              if (cocktail && typeof cocktail.id === 'string' && cocktail.guide && typeof cocktail.guide === 'object') {
	                Object.assign(guidesFromCocktails, sanitizeCocktailGuides({[cocktail.id]: cocktail.guide}));
	              }
	              if (cocktail && typeof cocktail.id === 'string' && cocktail.toTry === true) {
	                const priority = Number(cocktail.tryPriority);
	                bookmarksFromCocktails[cocktail.id] = Number.isInteger(priority) && priority >= 1 && priority <= 3 ? priority : true;
	              }
	            });
	          }
	          const importedAssignments = sanitizeStringMap(data.typeAssignments || data.assignments);
	          const importedNotes = sanitizeStringMap({...notesFromCocktails, ...plainObject(data.notes)});
	          const importedRatings = sanitizeNumberMap({...ratingsFromCocktails, ...plainObject(data.ratings)});
	          const importedGuides = data.guides && typeof data.guides === 'object'
	            ? sanitizeCocktailGuides({...guidesFromCocktails, ...plainObject(data.guides)})
	            : (Object.keys(guidesFromCocktails).length ? guidesFromCocktails : null);
	          const importedFriendRatings = data.friendRatings && typeof data.friendRatings === 'object' ? sanitizeFriendRatings(data.friendRatings) : null;
	          const importedRatingView = ['mine', 'friends'].includes(data.ratingView) ? data.ratingView : null;
	          const importedBookmarks = data.bookmarks && typeof data.bookmarks === 'object'
	            ? sanitizeBookmarks({...bookmarksFromCocktails, ...plainObject(data.bookmarks)})
	            : (Object.keys(bookmarksFromCocktails).length ? bookmarksFromCocktails : null);
	          const importedBar = sanitizeBar(data.bar);
	          const importedArchivedBar = sanitizeBar(data.archivedBar);
	          const importedGlassware = sanitizeGlassware(data.glassware);
	          const importedAppNotes = typeof data.appNotes === 'string' ? data.appNotes : null;
	          const importedCustomTypes = Array.isArray(data.customTypes) ? unique(data.customTypes.map((type) => String(type || '').trim())) : [];
	          const importedFavoriteGenres = Array.isArray(data.favoriteGenreFilters)
	            ? unique(data.favoriteGenreFilters.filter((id) => GENRE_FILTER_IDS.has(id)))
	            : null;
	          const hasImportedCocktails = Array.isArray(data.customCocktails);
	          const importedCocktails = hasImportedCocktails
	            ? data.customCocktails
	              .filter((c) => c && typeof c.id === 'string' && typeof c.name === 'string' && Array.isArray(c.ingredientNames))
	              .map(refreshBundledCocktailSources)
	              .map(normalizeSpecialtyLiqueurIngredients)
	              .map(normalizeCocktailAlternateNames)
	            : [];
	          if (!importedCustomTypes.length && !Object.keys(importedAssignments).length && !Object.keys(importedNotes).length && !Object.keys(importedRatings).length && importedGuides === null && importedFriendRatings === null && !importedCocktails.length && importedFavoriteGenres === null && importedBookmarks === null && importedBar === null && importedArchivedBar === null && importedGlassware === null && importedAppNotes === null) {
	            throw new Error('Import file did not include Home Bar user data.');
	          }
	          store.assignments = importedAssignments;
	          store.notes = importedNotes;
	          store.ratings = importedRatings;
	          if (importedGuides !== null) store.guides = importedGuides;
	          if (importedFriendRatings !== null) {
	            store.friendRatings = importedFriendRatings;
	            store.friendRatingsUnlocked = Object.keys(importedFriendRatings).length > 0;
	          }
	          if (importedRatingView !== null) {
	            store.ratingView = importedRatingView;
	            if (importedRatingView === 'friends') store.friendRatingsUnlocked = true;
	          }
	          if (importedBookmarks !== null) store.bookmarks = importedBookmarks;
	          if (importedBar !== null) store.bar = importedBar;
	          if (importedArchivedBar !== null) store.archivedBar = importedArchivedBar;
	          if (importedGlassware !== null) store.glassware = importedGlassware;
	          if (importedAppNotes !== null) store.appNotes = importedAppNotes;
	          if (importedFavoriteGenres !== null) store.favoriteGenreFilters = importedFavoriteGenres;
	          store.customTypes = unique([
	            ...importedCustomTypes,
	            ...Object.values(importedAssignments).filter((type) => type && !DEFAULT_TYPES.includes(type))
	          ]);
	          if (hasImportedCocktails) {
	            const currentCustomIds = new Set(store.customCocktails.map((cocktail) => cocktail.id));
	            for (let index = COCKTAILS.length - 1; index >= 0; index -= 1) {
	              if (currentCustomIds.has(COCKTAILS[index].id)) COCKTAILS.splice(index, 1);
	            }
	            store.customCocktails = [];
	          }
	          importedCocktails.forEach((cocktail) => {
	            const existingIdx = COCKTAILS.findIndex((c) => c.id === cocktail.id);
	            const existing = existingIdx !== -1 ? COCKTAILS[existingIdx] : null;
	            const mergedCocktail = existing ? {
	              ...cocktail,
	              lnlSource: cocktail.lnlSource || existing.lnlSource,
	              diffordsSource: existing.diffordsSource || cocktail.diffordsSource,
	              liquorSource: existing.liquorSource || cocktail.liquorSource,
	              classicSource: existing.classicSource || cocktail.classicSource
	            } : cocktail;
	            if (existingIdx !== -1) COCKTAILS[existingIdx] = mergedCocktail;
	            else COCKTAILS.unshift(mergedCocktail);
	            const storeIdx = store.customCocktails.findIndex((c) => c.id === cocktail.id);
	            if (storeIdx !== -1) store.customCocktails[storeIdx] = mergedCocktail;
	            else store.customCocktails.unshift(mergedCocktail);
	          });
	          // Keep all bundled Classic recipes when an older snapshot omits their drinks.
	          CLASSIC_BUNDLED_COCKTAILS.forEach((cocktail) => {
	            if (!COCKTAILS.some((item) => item.id === cocktail.id)) COCKTAILS.push(cocktail);
	          });
	          refreshRelatedFrequencies();
	          saveCustom();
	          render();
	          if (!$('#barModalOverlay').hidden) refreshBarModal();
	          if (!$('#glasswareModalOverlay').hidden) renderGlasswareList();
	          if (!$('#archiveModalOverlay').hidden) renderArchiveList();
	          const friendRatingCount = Object.values(store.friendRatings).reduce((sum, entries) => sum + entries.length, 0);
	          const summary = `Imported ${store.bar.length} My Bar items, ${store.archivedBar.length} archived, ${store.glassware.length} glassware, ${Object.keys(store.bookmarks).length} To Try cocktails, ${Object.keys(store.notes).length} notes, ${Object.keys(store.guides).length} strength and taste guides, ${Object.keys(store.ratings).length} personal ratings, ${friendRatingCount} friend ratings, ${importedCocktails.length} custom cocktails, ${Object.keys(store.assignments).length} type assignments, and ${store.favoriteGenreFilters.length} favorite genre filters.`;
	          if (options.notify !== false) alert(summary);
	          return summary;
	        }

function importUserDataFile(file) {
	          if (!file) return;
	          const input = $('#importFile');
	          const reader = new FileReader();
	          reader.onload = () => {
	            try {
	              importUserData(JSON.parse(String(reader.result || '{}')));
	            } catch (error) {
	              alert(error.message || 'Could not import that file.');
	            } finally {
	              input.value = '';
	            }
	          };
	          reader.onerror = () => {
	            alert('Could not read that import file.');
	            input.value = '';
	          };
	          reader.readAsText(file);
	        }
