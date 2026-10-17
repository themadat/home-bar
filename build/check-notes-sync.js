// Runs after dialogs.js and sync.js in an isolated JS process. No real network or storage.
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const GITHUB_SYNC_SETTINGS_KEY = 'settings', GITHUB_SYNC_TOKEN_KEY = 'token', GITHUB_SYNC_META_KEY = 'meta';
const GITHUB_SYNC_CHECK_INTERVAL = 300000, BUILD_VERSION = 'test';
const HOME_BAR_STORAGE_KEYS = ['notes'];
const migrateBarItem = (item) => item;
const refreshBundledCocktailSources = (item) => item;
const normalizeSpecialtyLiqueurIngredients = (item) => item;
const storage = new Map(), timers = new Map();
const localStorage = {getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, String(value))};
const sessionStorage = {getItem: () => null};
let timerId = 0;
const setTimeout = (callback, delay) => { timers.set(++timerId, {callback, delay}); return timerId; };
const clearTimeout = (id) => timers.delete(id);
let modalOpen = false, fieldFocused = false;
const document = {visibilityState: 'visible', querySelector: () => modalOpen ? {} : null, activeElement: {matches: () => fieldFocused}};
const $ = () => ({hidden: true});
const navigator = {onLine: true};
const githubSyncRuntime = {autoTimer: 0, autoFailures: 0, lastLocalEditAt: 0, error: '', offline: false, checking: false};
let githubSyncBusy = false, githubSyncOperation = '';
let local = {appNotes: 'baseline', notes: {drink: 'baseline'}, bar: [], exportedAt: 'old'};
const userDataSnapshot = () => ({...local}); // Deliberately preserves live maps, like the app.
updateGitHubSyncButton = () => {};
updateGitHubSyncInterface = () => {};
setGitHubSyncBusy = (busy) => { githubSyncBusy = busy; };
// Transport-only encoding stand-ins keep these tests portable to JavaScriptCore.
utf8ToBase64 = (value) => value;
globalThis.atob = (value) => value;
globalThis.TextDecoder = class { decode(bytes) { return String.fromCharCode(...bytes); } };
let fetch;
const settings = {owner: 'test', repo: 'data', branch: 'main', path: 'notes.json', autoSync: true};
localStorage.setItem(GITHUB_SYNC_SETTINGS_KEY, JSON.stringify(settings));
localStorage.setItem(GITHUB_SYNC_TOKEN_KEY, 'fake-test-token');
const clone = (value) => JSON.parse(JSON.stringify(value));
const baseline = clone(local);
const response = (status, data) => ({ok: status >= 200 && status < 300, status, json: async () => data});
const remoteResponse = (data, sha) => response(200, {type: 'file', content: JSON.stringify(data), sha});
const reset = () => {
  local = clone(baseline); modalOpen = false; fieldFocused = false;
  githubSyncBusy = false; timers.clear();
  Object.assign(githubSyncRuntime, {autoFailures: 0, lastLocalEditAt: 0, checking: false, error: '', offline: false});
  rememberGitHubSync(settings, 'baseline-sha', '', clone(baseline));
};

(async () => {
  const inline = notesInlineMarkup('**bold** *italic* `code` [link](https://example.com) <img src=x onerror=alert(1)>');
  assert(inline.includes('<strong>bold</strong>') && inline.includes('<em>italic</em>') && inline.includes('<code>code</code>'), 'Inline formatting');
  assert(!inline.includes('<img') && inline.includes('&lt;img'), 'Raw HTML must remain text');
  assert(!notesInlineMarkup('[unsafe](javascript:alert)').includes('<a'), 'Unsafe link protocol');
  assert(notesInlineMarkup('[safe](https://example.com/"onclick="bad)').includes('&quot;'), 'Link attribute escaping');
  const withoutSources = (html) => html.replace(/<span data-note-start="\d+">|<\/span>/g, '');
  const markdown = withoutSources(notesMarkdownMarkup('# Parent\nintro\n## Child\n- [ ] task\n- [x] done\n# Next\n1. First\n2. Second\n> quote\n```\n# code heading\n```'));
  assert((markdown.match(/<details /g) || []).length === 3, 'Only actual headings become sections');
  assert(markdown.includes('</div></details></div></details><details'), 'Nested headings close before next peer');
  assert(markdown.includes('data-note-task="3"') && markdown.includes(' checked'), 'Checklist source lines and states');
  assert(markdown.includes('<ol start="1">') && markdown.includes('<blockquote>quote</blockquote>'), 'Lists and quotes');
  assert(withoutSources(notesMarkdownMarkup('# C#')).includes('C#</h1>'), 'Keep literal hashes in headings');
  assert(!notesMarkdownMarkup('# Parent', [JSON.stringify([['Parent', 1]])]).includes(' open'), 'Restore collapsed heading');
  const nested = withoutSources(notesMarkdownMarkup('- Parent\n  1. Child\n    - [ ] Grandchild\n  2. Sibling\n- Next'));
  assert(nested.includes('<li>Parent<ol start="1"><li>Child<ul><li class="notes-task">'), 'Mixed list levels nest inside parent items');
  assert(nested.includes('</ul></li><li>Sibling</li></ol></li><li>Next'), 'Nested lists close at each dedent');
  assert(notesMarkdownMarkup('**bold** and `code`').includes('data-note-start="2">bold') && notesMarkdownMarkup('**bold** and `code`').includes('data-note-start="14">code'), 'Formatted text retains exact Markdown source offsets');
  const indented = notesIndentEdit('- one\n- two\nplain', 0, 12, false);
  assert(indented.replacement === '  - one\n  - two' && indented.start === 2 && indented.end === 16, 'Indent selected list lines without the next line');
  const outdented = notesIndentEdit('  - one', 7, 7, true);
  assert(outdented.replacement === '- one' && outdented.start === 5 && outdented.end === 5, 'Outdent preserves cursor');
  assert(notesIndentEdit('plain', 0, 0, false) === null && notesIndentEdit('', 0, 0, false) === null, 'Tab remains navigation outside lists');

  const plan = (localHash, remoteHash, extra = {}) => gitHubSyncPlan({remoteExists: true, hasBaseline: true, localHasSavedData: true, baselineHash: 'base', localHash, remoteHash, ...extra});
  assert(plan('edit', 'base', {remoteSha: 'new-sha', baselineSha: 'old-sha'}) === 'upload', 'SHA-only remote change must not conflict');
  assert(plan('base', 'edit') === 'download' && plan('left', 'right') === 'choose', 'Real remote edits and conflicts');
  assert(plan('same', 'same') === 'clean', 'Equal copies');

  // A device may restore collections in a different order without editing any records.
  const ordered = {...clone(baseline),
    customTypes: ['Zed', 'Alpha'],
    bar: [{id: 'b', name: 'BottleB', price: 20}, {id: 'a', name: 'BottleA', price: 10}],
    archivedBar: [{id: 'old-b'}, {id: 'old-a'}],
    customCocktails: [{id: 'b', name: 'DrinkB', ingredients: ['Gin', 'Vermouth'], method: ['Stir', 'Strain']}, {id: 'a', name: 'DrinkA'}],
    glassware: [{id: 'glass-b'}, {id: 'glass-a'}]
  };
  const reordered = clone(ordered);
  for (const key of ['customTypes', 'bar', 'archivedBar', 'customCocktails', 'glassware']) reordered[key].reverse();
  reordered.buildVersion = 'new build'; reordered.exportedAt = 'new export';
  assert(syncDataFingerprint(ordered, {sortCollections: false}) !== syncDataFingerprint(reordered, {sortCollections: false}), 'Fixture reproduces legacy order-sensitive hashes');
  assert(syncDataFingerprint(ordered) === syncDataFingerprint(reordered), 'Collection ordering is not an edit');
  assert(syncChangeRows(ordered, reordered).length === 0, 'Equal records must not show a zero-difference category');
  assert(ordered.customCocktails[0].id === 'b' && reordered.customCocktails[0].id === 'a', 'Comparison leaves actual display order unchanged');
  for (const field of ['ingredients', 'method']) {
    const edited = clone(ordered); edited.customCocktails[0][field].reverse();
    assert(syncDataFingerprint(ordered) !== syncDataFingerprint(edited), 'Recipe ' + field + ' order remains meaningful');
    assert(syncChangeRows(ordered, edited).some((row) => row.key === 'customCocktails' && row.totals.changed === 1), 'Real recipe edits remain visible');
  }
  const priceEdit = clone(ordered); priceEdit.bar[0].price = 25;
  assert(syncDataFingerprint(ordered) !== syncDataFingerprint(priceEdit), 'Actual bottle edits remain dirty');

  reset(); local = clone(ordered);
  const legacyMeta = {...parseStoredJson(GITHUB_SYNC_META_KEY), dataHash: syncDataFingerprint(ordered, {sortCollections: false})};
  delete legacyMeta.fingerprintVersion;
  localStorage.setItem(GITHUB_SYNC_META_KEY, JSON.stringify(legacyMeta));
  const upgraded = upgradeGitHubSyncFingerprint(settings, legacyMeta, ordered, reordered);
  assert(upgraded.fingerprintVersion === 2 && upgraded.dataHash === syncDataFingerprint(ordered), 'Known legacy baseline upgrades locally');
  assert(gitHubSyncPlan({remoteExists: true, hasBaseline: true, localHasSavedData: true, localHash: syncDataFingerprint(ordered), remoteHash: syncDataFingerprint(priceEdit), baselineHash: upgraded.dataHash}) === 'download', 'A real remote edit after baseline migration remains a download');
  const localEdit = {...clone(ordered), appNotes: 'edited here'};
  const unknown = upgradeGitHubSyncFingerprint(settings, legacyMeta, localEdit, priceEdit);
  assert(unknown.dataHash === legacyMeta.dataHash && !unknown.fingerprintVersion, 'Do not guess the baseline when both copies really changed');
  Object.assign(githubSyncRuntime, {remoteSha: 'matching-sha', remoteHash: syncDataFingerprint(reordered)});
  localStorage.setItem(GITHUB_SYNC_META_KEY, JSON.stringify({...legacyMeta, dataHash: 'old hash'}));
  assert(gitHubSyncStateInfo().state === 'clean', 'Matching current copies override a stale baseline warning');

  reset(); local = clone(ordered);
  let orderOnlyRequests = 0;
  fetch = async (url, options) => {
    orderOnlyRequests += 1;
    assert(options.method !== 'PUT', 'Reordering must not upload or overwrite GitHub');
    return remoteResponse(reordered, 'reordered-sha');
  };
  await autoSyncGitHubData();
  assert(orderOnlyRequests === 1 && !githubSyncRuntime.error, 'Order-only auto sync finishes cleanly without writes');
  assert(parseStoredJson(GITHUB_SYNC_META_KEY).dataHash === syncDataFingerprint(ordered), 'Order-only auto sync repairs the local baseline');
  assert(local.customCocktails[0].id === 'b', 'Order-only auto sync does not replace the device copy');

  reset(); local = clone(ordered);
  localStorage.setItem(GITHUB_SYNC_META_KEY, JSON.stringify(legacyMeta));
  fetch = async () => remoteResponse(reordered, 'matching-sha');
  await checkGitHubSyncStatus(true);
  assert(gitHubSyncStateInfo().state === 'clean' && parseStoredJson(GITHUB_SYNC_META_KEY).fingerprintVersion === 2, 'Status check clears the legacy false conflict');

  reset(); local = clone(ordered);
  rememberGitHubSync(settings, 'baseline-sha', '', ordered);
  local.appNotes = 'edited-here';
  fetch = async (url, options) => {
    assert(options.method !== 'PUT', 'Real conflicts must not overwrite GitHub automatically');
    return remoteResponse(priceEdit, 'changed-sha');
  };
  await autoSyncGitHubData();
  assert(local.appNotes === 'edited-here' && /Both copies changed/.test(githubSyncRuntime.error), 'Genuine conflicts keep local edits and require review');

  // A stale SHA can retry once only when the remote content is still identical.
  reset();
  local.appNotes = 'edited';
  let calls = [];
  fetch = async (url, options) => {
    calls.push(options);
    if (options.method === 'PUT') return calls.length === 1 ? response(409, {}) : response(200, {content: {sha: 'saved'}});
    return remoteResponse(baseline, 'fresh-sha');
  };
  assert(await uploadGitHubData(settings, 'fake', {data: baseline, sha: 'old-sha'}, clone(local)) === 'saved', 'Stale SHA retry');
  assert(calls.length === 3 && calls[1].cache === 'no-store' && JSON.parse(calls[2].body).sha === 'fresh-sha', 'Retry uses fresh uncached SHA');

  // A genuine competing edit must never be overwritten by a retry.
  calls = [];
  fetch = async (url, options) => {
    calls.push(options);
    return options.method === 'PUT' ? response(409, {}) : remoteResponse({...baseline, appNotes: 'other device'}, 'other-sha');
  };
  let rejected = false;
  try { await uploadGitHubData(settings, 'fake', {data: baseline, sha: 'old-sha'}, clone(local)); }
  catch (error) { rejected = /review both copies/.test(error.message); }
  assert(rejected && calls.length === 2 && local.appNotes === 'edited', 'Competing edit remains protected');

  // If another request already saved this exact data, no duplicate PUT is needed.
  calls = [];
  fetch = async (url, options) => {
    calls.push(options);
    return options.method === 'PUT' ? response(422, {}) : remoteResponse(clone(local), 'already-saved');
  };
  assert(await uploadGitHubData(settings, 'fake', {data: baseline, sha: 'old'}, clone(local)) === 'already-saved' && calls.length === 2, 'Already-completed upload');

  // Editing while PUT is pending must leave the newer note and collection edits dirty.
  reset(); local.appNotes = 'first edit';
  let sent;
  fetch = async (url, options) => {
    if (options.method !== 'PUT') return remoteResponse(baseline, 'baseline-sha');
    sent = JSON.parse(JSON.parse(options.body).content);
    local.appNotes = 'typed during upload'; local.notes.drink = 'collection edit during upload';
    return response(200, {content: {sha: 'uploaded-sha'}});
  };
  await autoSyncGitHubData();
  assert(sent.appNotes === 'first edit' && sent.notes.drink === 'baseline', 'Sent snapshot stays immutable');
  assert(parseStoredJson(GITHUB_SYNC_META_KEY).dataHash === syncDataFingerprint(sent), 'Baseline describes exactly the sent copy');
  assert(syncDataFingerprint() !== parseStoredJson(GITHUB_SYNC_META_KEY).dataHash && githubSyncRuntime.autoTimer, 'Newer edits remain queued');

  // Notes opened during GET defer both uploads and downloads.
  for (const remoteChanged of [false, true]) {
    reset(); if (!remoteChanged) local.appNotes = 'local edit';
    calls = [];
    fetch = async (url, options) => {
      calls.push(options); modalOpen = true;
      return remoteResponse(remoteChanged ? {...baseline, appNotes: 'remote edit'} : baseline, 'remote-sha');
    };
    await autoSyncGitHubData();
    assert(calls.length === 1 && local.appNotes === (remoteChanged ? 'baseline' : 'local edit'), 'Opening notes during GET defers sync');
  }
  reset(); modalOpen = true; fetch = async () => { throw new Error('Must not fetch while editing'); };
  await autoSyncGitHubData(); assert(!githubSyncRuntime.error, 'Open modal pauses sync');
  modalOpen = false; githubSyncRuntime.lastLocalEditAt = Date.now();
  assert(!gitHubAutoSyncReady(), 'Wait for typing to settle');

  // Transient failures keep local edits and schedule bounded exponential retry.
  reset(); local.appNotes = 'unsent'; fetch = async () => { throw new TypeError('Failed to fetch'); };
  await autoSyncGitHubData();
  assert(local.appNotes === 'unsent' && githubSyncRuntime.autoFailures === 1 && timers.get(githubSyncRuntime.autoTimer).delay === 5000, 'Offline edits and retry backoff');

  // Manual sync, download, status checks, and auto sync all use the same lock.
  reset(); const lockNames = [];
  navigator.locks = {request: async (name) => { lockNames.push(name); }};
  await autoSyncGitHubData(); await checkGitHubSyncStatus(); await synchronizeGitHubData(); await downloadLatestGitHubData();
  assert(lockNames.length === 4 && lockNames.every((name) => name === lockNames[0]), 'Shared GitHub operation lock');
  const report = typeof print === 'function' ? print : console.log;
  report('NOTES/SYNC OK');
})().catch((error) => {
  const report = typeof print === 'function' ? print : console.error;
  report(String(error) + (error.stack ? "\n" + error.stack : ""));
  throw error;
});
