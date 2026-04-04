/**
 * MiNDLAXY Shared Core — NOTiZBUCH
 *
 * Persistentes Notizbuch, ausklappbar in jeder App.
 * Der Nutzer erarbeitet sich eigene Ergebnisse, recherchiert, integriert.
 * Notizen bleiben gespeichert, können exportiert und geteilt werden.
 *
 * Nutzung in jeder App:
 *   import { initNotizbuch } from '../core/ui/notizbuch.js';
 *   initNotizbuch();
 *
 * Das ist alles. CSS wird injiziert, UI wird erzeugt, Daten persistieren.
 */

// ─── Storage ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'mindlaxy_notizbuch';

/** @typedef {{ id: string, title: string, content: string, createdAt: string, updatedAt: string, tags: string[] }} NotizbuchEntry */

/**
 * Alle Einträge laden
 * @returns {NotizbuchEntry[]}
 */
function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

/**
 * Alle Einträge speichern
 * @param {NotizbuchEntry[]} entries
 */
function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function generateId() {
  return 'nb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
}

// ─── CSS Injection ──────────────────────────────────────────────────────────

function injectStyles() {
  if (document.getElementById('notizbuch-styles')) return;
  const style = document.createElement('style');
  style.id = 'notizbuch-styles';
  style.textContent = `
    /* ── NOTiZBUCH Toggle Button ── */
    #notizbuch-toggle {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9000;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(180,140,60,0.9), rgba(220,180,80,0.85));
      border: 1px solid rgba(240,220,120,0.35);
      color: #fff;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 6px 28px rgba(0,0,0,0.4), 0 0 40px rgba(180,140,60,0.15);
      transition: all 0.3s cubic-bezier(0.25,0.46,0.45,0.94);
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      -webkit-user-select: none;
    }
    #notizbuch-toggle:hover {
      transform: translateY(-3px) scale(1.08);
      box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 60px rgba(180,140,60,0.25);
    }
    #notizbuch-toggle.open {
      background: linear-gradient(135deg, rgba(100,80,40,0.9), rgba(140,110,50,0.85));
      border-color: rgba(180,160,80,0.5);
    }
    #notizbuch-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #e05050;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      min-width: 20px;
      height: 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }

    /* ── NOTiZBUCH Panel ── */
    #notizbuch-panel {
      position: fixed;
      top: 0;
      right: -420px;
      z-index: 8999;
      width: 400px;
      height: 100vh;
      background: rgba(16,14,32,0.96);
      backdrop-filter: blur(32px);
      -webkit-backdrop-filter: blur(32px);
      border-left: 1px solid rgba(180,140,60,0.25);
      box-shadow: -12px 0 48px rgba(0,0,0,0.5);
      transition: right 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    #notizbuch-panel.open {
      right: 0;
    }

    /* Header */
    .nb-header {
      padding: 1rem 1.2rem;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.02);
      display: flex;
      align-items: center;
      gap: 0.6rem;
      flex-shrink: 0;
    }
    .nb-header-title {
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: #c8a040;
      text-transform: uppercase;
      flex: 1;
    }
    .nb-header-btn {
      font-size: 0.65rem;
      padding: 0.25rem 0.5rem;
      background: rgba(180,140,60,0.15);
      border: 1px solid rgba(180,140,60,0.25);
      color: #c8a040;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.25s ease;
      white-space: nowrap;
    }
    .nb-header-btn:hover { background: rgba(180,140,60,0.3); }
    .nb-header-btn.danger {
      background: rgba(200,60,60,0.12);
      border-color: rgba(200,60,60,0.25);
      color: #e06060;
    }
    .nb-header-btn.danger:hover { background: rgba(200,60,60,0.25); }

    /* Search */
    .nb-search {
      padding: 0.5rem 1.2rem;
      border-bottom: 1px solid rgba(255,255,255,0.04);
      flex-shrink: 0;
    }
    .nb-search input {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px;
      padding: 0.45rem 0.8rem;
      color: #e0dcd0;
      font-size: 0.82rem;
      outline: none;
      transition: border-color 0.25s;
    }
    .nb-search input:focus {
      border-color: rgba(180,140,60,0.4);
    }
    .nb-search input::placeholder {
      color: rgba(200,190,170,0.4);
    }

    /* Entry List */
    .nb-list {
      flex: 1;
      overflow-y: auto;
      padding: 0.5rem 0;
    }
    .nb-entry-item {
      padding: 0.7rem 1.2rem;
      border-bottom: 1px solid rgba(255,255,255,0.03);
      cursor: pointer;
      transition: background 0.2s;
    }
    .nb-entry-item:hover { background: rgba(180,140,60,0.08); }
    .nb-entry-item.active { background: rgba(180,140,60,0.15); border-left: 3px solid #c8a040; }
    .nb-entry-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: #e0dcd0;
      margin-bottom: 0.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .nb-entry-preview {
      font-size: 0.72rem;
      color: rgba(200,190,170,0.5);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .nb-entry-meta {
      font-size: 0.6rem;
      color: rgba(200,190,170,0.35);
      margin-top: 0.15rem;
    }

    /* Editor View */
    .nb-editor {
      display: none;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
    }
    .nb-editor.active { display: flex; }
    .nb-editor-toolbar {
      padding: 0.6rem 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      flex-shrink: 0;
    }
    .nb-editor-title {
      flex: 1;
      background: transparent;
      border: none;
      color: #e0dcd0;
      font-size: 0.95rem;
      font-weight: 700;
      outline: none;
      padding: 0.3rem 0;
    }
    .nb-editor-title::placeholder { color: rgba(200,190,170,0.35); }
    .nb-editor-body {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 1.2rem;
      font-size: 0.88rem;
      line-height: 1.8;
      color: #e0dcd0;
      white-space: pre-wrap;
      word-wrap: break-word;
      outline: none;
      cursor: text;
    }
    .nb-editor-body:empty::before {
      content: 'Hier schreiben, recherchieren, Ergebnisse festhalten…';
      color: rgba(200,190,170,0.3);
      font-style: italic;
      pointer-events: none;
    }
    .nb-editor-body ::selection {
      background: rgba(180,140,60,0.35);
      color: #fff;
    }
    .nb-editor-footer {
      padding: 0.5rem 1rem;
      border-top: 1px solid rgba(255,255,255,0.06);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      flex-shrink: 0;
    }
    .nb-editor-footer .nb-char-count {
      font-size: 0.58rem;
      color: rgba(200,190,170,0.35);
      margin-left: auto;
    }

    /* Empty State */
    .nb-empty {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0.8rem;
      color: rgba(200,190,170,0.35);
      font-size: 0.85rem;
      padding: 2rem;
      text-align: center;
    }
    .nb-empty-icon { font-size: 2.5rem; opacity: 0.4; }

    /* Mobile */
    @media (max-width: 600px) {
      #notizbuch-panel { width: 100vw; right: -100vw; }
      #notizbuch-toggle { bottom: 16px; right: 16px; width: 48px; height: 48px; font-size: 20px; }
    }
  `;
  document.head.appendChild(style);
}

// ─── UI Construction ────────────────────────────────────────────────────────

let _entries = [];
let _activeEntryId = null;
let _searchQuery = '';
let _isOpen = false;
let _view = 'list'; // 'list' | 'editor'

function buildUI() {
  // Toggle Button
  const toggle = document.createElement('button');
  toggle.id = 'notizbuch-toggle';
  toggle.title = 'NOTiZBUCH öffnen/schließen';
  toggle.innerHTML = '📓<span id="notizbuch-badge" style="display:none">0</span>';
  toggle.addEventListener('click', togglePanel);
  document.body.appendChild(toggle);

  // Panel
  const panel = document.createElement('div');
  panel.id = 'notizbuch-panel';
  panel.innerHTML = `
    <div class="nb-header">
      <span class="nb-header-title">📓 NOTiZBUCH</span>
      <button class="nb-header-btn" id="nb-new-btn" title="Neue Notiz">+ Neu</button>
      <button class="nb-header-btn" id="nb-export-all-btn" title="Alles exportieren">⬇ Export</button>
      <button class="nb-header-btn" id="nb-close-btn" title="Schließen">✕</button>
    </div>
    <div class="nb-search">
      <input type="text" id="nb-search-input" placeholder="Notizen durchsuchen…" />
    </div>
    <div class="nb-list" id="nb-list"></div>
    <div class="nb-editor" id="nb-editor">
      <div class="nb-editor-toolbar">
        <button class="nb-header-btn" id="nb-back-btn" title="Zurück zur Liste">← Liste</button>
        <input type="text" class="nb-editor-title" id="nb-editor-title" placeholder="Titel…" />
        <button class="nb-header-btn" id="nb-copy-btn" title="Kopieren">📋</button>
        <button class="nb-header-btn" id="nb-share-btn" title="Exportieren">⬇ MD</button>
        <button class="nb-header-btn danger" id="nb-delete-btn" title="Löschen">🗑</button>
      </div>
      <div class="nb-editor-body" id="nb-editor-body" contenteditable="true" spellcheck="true"></div>
      <div class="nb-editor-footer">
        <span class="nb-char-count" id="nb-char-count">0 Zeichen</span>
      </div>
    </div>
    <div class="nb-empty" id="nb-empty" style="display:none">
      <div class="nb-empty-icon">📓</div>
      <div>Noch keine Notizen.</div>
      <div style="font-size:0.75rem">Erstelle eine neue Notiz, um Ergebnisse<br>festzuhalten, zu recherchieren und zu integrieren.</div>
    </div>
  `;
  document.body.appendChild(panel);

  // Event Listeners
  document.getElementById('nb-close-btn').addEventListener('click', togglePanel);
  document.getElementById('nb-new-btn').addEventListener('click', createNewEntry);
  document.getElementById('nb-export-all-btn').addEventListener('click', exportAll);
  document.getElementById('nb-back-btn').addEventListener('click', showList);
  document.getElementById('nb-copy-btn').addEventListener('click', copyCurrentEntry);
  document.getElementById('nb-share-btn').addEventListener('click', exportCurrentEntry);
  document.getElementById('nb-delete-btn').addEventListener('click', deleteCurrentEntry);

  const searchInput = document.getElementById('nb-search-input');
  searchInput.addEventListener('input', () => {
    _searchQuery = searchInput.value.trim().toLowerCase();
    renderList();
  });

  const editorBody = document.getElementById('nb-editor-body');
  editorBody.addEventListener('input', () => {
    saveCurrentEntry();
    updateCharCount();
  });

  const editorTitle = document.getElementById('nb-editor-title');
  editorTitle.addEventListener('input', () => {
    saveCurrentEntry();
  });

  // Keyboard shortcut: Cmd/Ctrl+Shift+N → toggle
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'n') {
      e.preventDefault();
      togglePanel();
    }
  });
}

// ─── Panel Control ──────────────────────────────────────────────────────────

function togglePanel() {
  _isOpen = !_isOpen;
  const panel = document.getElementById('notizbuch-panel');
  const toggle = document.getElementById('notizbuch-toggle');
  if (_isOpen) {
    panel.classList.add('open');
    toggle.classList.add('open');
    _view = 'list';
    renderList();
    showList();
  } else {
    panel.classList.remove('open');
    toggle.classList.remove('open');
  }
}

function updateBadge() {
  const badge = document.getElementById('notizbuch-badge');
  if (!badge) return;
  const count = _entries.length;
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

// ─── List View ──────────────────────────────────────────────────────────────

function showList() {
  _view = 'list';
  _activeEntryId = null;
  document.getElementById('nb-editor').classList.remove('active');
  document.getElementById('nb-list').style.display = '';
  document.getElementById('nb-search').style.display = '';
  renderList();
}

function renderList() {
  const list = document.getElementById('nb-list');
  const empty = document.getElementById('nb-empty');
  const searchWrap = document.querySelector('.nb-search');

  let filtered = _entries;
  if (_searchQuery) {
    filtered = _entries.filter(e =>
      e.title.toLowerCase().includes(_searchQuery) ||
      e.content.toLowerCase().includes(_searchQuery)
    );
  }

  if (_entries.length === 0) {
    list.style.display = 'none';
    if (searchWrap) searchWrap.style.display = 'none';
    empty.style.display = 'flex';
    return;
  }

  list.style.display = '';
  if (searchWrap) searchWrap.style.display = '';
  empty.style.display = 'none';

  // Sort by updatedAt desc
  const sorted = [...filtered].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  list.innerHTML = sorted.map(entry => {
    const preview = entry.content.substring(0, 80).replace(/\n/g, ' ') || '(leer)';
    const date = new Date(entry.updatedAt).toLocaleDateString('de-DE', {
      day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
    });
    return `<div class="nb-entry-item" data-id="${entry.id}">
      <div class="nb-entry-title">${escHtml(entry.title || 'Ohne Titel')}</div>
      <div class="nb-entry-preview">${escHtml(preview)}</div>
      <div class="nb-entry-meta">${date} · ${entry.content.length} Zeichen</div>
    </div>`;
  }).join('');

  // Click handlers
  list.querySelectorAll('.nb-entry-item').forEach(el => {
    el.addEventListener('click', () => openEntry(el.dataset.id));
  });
}

// ─── Editor View ────────────────────────────────────────────────────────────

function openEntry(id) {
  const entry = _entries.find(e => e.id === id);
  if (!entry) return;

  _activeEntryId = id;
  _view = 'editor';

  document.getElementById('nb-list').style.display = 'none';
  document.querySelector('.nb-search').style.display = 'none';
  document.getElementById('nb-empty').style.display = 'none';

  const editor = document.getElementById('nb-editor');
  editor.classList.add('active');

  document.getElementById('nb-editor-title').value = entry.title;
  document.getElementById('nb-editor-body').textContent = entry.content;
  updateCharCount();
}

function saveCurrentEntry() {
  if (!_activeEntryId) return;
  const entry = _entries.find(e => e.id === _activeEntryId);
  if (!entry) return;

  const titleEl = document.getElementById('nb-editor-title');
  const bodyEl = document.getElementById('nb-editor-body');

  entry.title = titleEl.value.trim();
  entry.content = bodyEl.textContent;
  entry.updatedAt = new Date().toISOString();

  // Auto-title from first line if empty
  if (!entry.title && entry.content) {
    const firstLine = entry.content.split('\n')[0].substring(0, 50).trim();
    if (firstLine) {
      entry.title = firstLine;
      titleEl.value = firstLine;
    }
  }

  saveEntries(_entries);
}

function updateCharCount() {
  const bodyEl = document.getElementById('nb-editor-body');
  const countEl = document.getElementById('nb-char-count');
  if (bodyEl && countEl) {
    countEl.textContent = (bodyEl.textContent?.length || 0) + ' Zeichen';
  }
}

// ─── CRUD ───────────────────────────────────────────────────────────────────

function createNewEntry() {
  const entry = {
    id: generateId(),
    title: '',
    content: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: [],
  };
  _entries.unshift(entry);
  saveEntries(_entries);
  updateBadge();
  openEntry(entry.id);
}

function deleteCurrentEntry() {
  if (!_activeEntryId) return;
  const entry = _entries.find(e => e.id === _activeEntryId);
  if (!entry) return;
  if (!confirm(`"${entry.title || 'Ohne Titel'}" wirklich löschen?`)) return;

  _entries = _entries.filter(e => e.id !== _activeEntryId);
  saveEntries(_entries);
  updateBadge();
  showList();
}

// ─── Export ─────────────────────────────────────────────────────────────────

function entryToMarkdown(entry) {
  const date = new Date(entry.updatedAt).toISOString().split('T')[0];
  return `---
title: "${entry.title.replace(/"/g, "'")}"
created: ${entry.createdAt}
updated: ${entry.updatedAt}
tags: [notizbuch${entry.tags.length ? ', ' + entry.tags.join(', ') : ''}]
---

# ${entry.title || 'Ohne Titel'}

${entry.content}

---
*NOTiZBUCH · ${date}*
`;
}

function copyCurrentEntry() {
  if (!_activeEntryId) return;
  const entry = _entries.find(e => e.id === _activeEntryId);
  if (!entry || !entry.content.trim()) {
    showNbToast('⚠ Kein Text zum Kopieren');
    return;
  }
  navigator.clipboard.writeText(entry.content).then(() => showNbToast('✓ Kopiert'));
}

function exportCurrentEntry() {
  if (!_activeEntryId) return;
  const entry = _entries.find(e => e.id === _activeEntryId);
  if (!entry) return;

  const md = entryToMarkdown(entry);
  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const slug = (entry.title || 'notiz').replace(/[^a-zA-ZäöüÄÖÜß0-9\s-]/g, '').trim().replace(/\s+/g, '_').substring(0, 40);
  const date = new Date().toISOString().split('T')[0];
  a.download = `${date}_${slug}.md`;
  a.click();
  URL.revokeObjectURL(url);
  showNbToast('✓ Exportiert als Markdown');
}

function exportAll() {
  if (_entries.length === 0) {
    showNbToast('⚠ Keine Notizen zum Exportieren');
    return;
  }

  const allMd = _entries
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map(e => entryToMarkdown(e))
    .join('\n\n---\n\n');

  const blob = new Blob([allMd], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `NOTiZBUCH_${new Date().toISOString().split('T')[0]}.md`;
  a.click();
  URL.revokeObjectURL(url);
  showNbToast(`✓ ${_entries.length} Notizen exportiert`);
}

// ─── Toast ──────────────────────────────────────────────────────────────────

function showNbToast(msg) {
  // Use app's toast if available, otherwise create our own
  if (typeof window.showToast === 'function') {
    window.showToast(msg);
    return;
  }
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:90px;right:24px;z-index:9999;background:rgba(16,14,32,0.92);color:#c8a040;padding:0.6rem 1.2rem;border-radius:12px;font-size:0.82rem;border:1px solid rgba(180,140,60,0.3);box-shadow:0 4px 20px rgba(0,0,0,0.4);backdrop-filter:blur(20px);transition:opacity 0.4s;';
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 500); }, 2500);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * NOTiZBUCH initialisieren — einmal pro App aufrufen.
 * Injiziert CSS, baut UI, lädt gespeicherte Notizen.
 */
export function initNotizbuch() {
  if (document.getElementById('notizbuch-toggle')) return; // Already initialized
  _entries = loadEntries();
  injectStyles();
  buildUI();
  updateBadge();
}

/**
 * NOTiZBUCH öffnen (programmatisch)
 */
export function openNotizbuch() {
  if (!_isOpen) togglePanel();
}

/**
 * NOTiZBUCH schließen (programmatisch)
 */
export function closeNotizbuch() {
  if (_isOpen) togglePanel();
}

/**
 * Neue Notiz programmatisch anlegen (z.B. aus einer App heraus)
 * @param {string} title
 * @param {string} content
 * @returns {string} Entry ID
 */
export function addNote(title, content) {
  const entry = {
    id: generateId(),
    title: title || '',
    content: content || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: [],
  };
  _entries = loadEntries(); // Refresh
  _entries.unshift(entry);
  saveEntries(_entries);
  updateBadge();
  return entry.id;
}

/**
 * Alle Notizen als Array zurückgeben (für Integration in andere Core-Module)
 * @returns {NotizbuchEntry[]}
 */
export function getAllNotes() {
  return loadEntries();
}

/**
 * Notizen als Markdown-String exportieren
 * @returns {string}
 */
export function exportAllAsMarkdown() {
  return loadEntries()
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map(e => entryToMarkdown(e))
    .join('\n\n---\n\n');
}
