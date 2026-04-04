/**
 * MiNDLAXY Shared Core — Settings
 *
 * Zentrale Settings-Verwaltung für alle MiNDLAXY-Apps.
 * localStorage-basiert, geteilt über alle Apps auf derselben Domain.
 *
 * Einmal API-Key eingeben → alle Apps nutzen ihn.
 */

const SETTINGS_KEY = 'mindlaxy_settings';
const LEGACY_KEY = 'bsConfig'; // BRaiNSTORM SPiRAL legacy key

/**
 * Alle Settings laden
 * @returns {Object}
 */
export function getSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
    // Fallback: Legacy BRaiNSTORM SPiRAL config migrieren
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy);
      const migrated = migrateLegacy(parsed);
      saveSettings(migrated);
      return migrated;
    }
  } catch (e) {}
  return {};
}

/**
 * Settings speichern
 * @param {Object} settings
 */
export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

/**
 * Einzelnen Wert setzen
 * @param {string} key
 * @param {*} value
 */
export function setSetting(key, value) {
  const s = getSettings();
  s[key] = value;
  saveSettings(s);
}

/**
 * Einzelnen Wert lesen
 * @param {string} key
 * @param {*} [fallback]
 * @returns {*}
 */
export function getSetting(key, fallback = undefined) {
  return getSettings()[key] ?? fallback;
}

// ─── API Key Management ─────────────────────────────────────────────────────

/**
 * API-Key für einen Provider lesen
 * @param {'openai'|'anthropic'|'gemini'|'deepseek'|'grok'} provider
 * @returns {string|undefined}
 */
export function getApiKey(provider) {
  const s = getSettings();
  return s.apiKeys?.[provider] || s[provider]; // legacy fallback
}

/**
 * API-Key für einen Provider setzen
 * @param {'openai'|'anthropic'|'gemini'|'deepseek'|'grok'} provider
 * @param {string} key
 */
export function setApiKey(provider, key) {
  const s = getSettings();
  if (!s.apiKeys) s.apiKeys = {};
  s.apiKeys[provider] = key;
  saveSettings(s);
}

/**
 * Alle verfügbaren Provider (die einen Key haben)
 * @returns {string[]}
 */
export function availableProviders() {
  const providers = ['openai', 'gemini', 'deepseek', 'grok', 'anthropic'];
  return providers.filter(p => !!getApiKey(p));
}

// ─── Vault Config ───────────────────────────────────────────────────────────

/**
 * GitHub Token für Vault-Zugriff
 * @returns {string|undefined}
 */
export function getGhToken() {
  return getSetting('ghToken');
}

/**
 * Vault Repo Slug (z.B. 'user/mindlaxy2-vault')
 * @returns {string|undefined}
 */
export function getVaultRepo() {
  return getSetting('vault') || getSetting('vaultRepo');
}

// ─── Model Config ───────────────────────────────────────────────────────────

/** Default-Modelle pro Provider */
const DEFAULT_MODELS = {
  openai: 'gpt-4o',
  anthropic: 'claude-sonnet-4-6',
  gemini: 'gemini-2.0-flash',
  deepseek: 'deepseek-chat',
  grok: 'grok-3-mini',
};

/**
 * Modell für einen Provider lesen
 * @param {string} provider
 * @returns {string}
 */
export function getModel(provider) {
  return getSetting(`model_${provider}`) || DEFAULT_MODELS[provider] || provider;
}

/**
 * Synthese-Provider (für kiNTEGRiTY Engine)
 * @returns {string}
 */
export function getSynthProvider() {
  return getSetting('synthProvider') || 'anthropic';
}

// ─── Migration ──────────────────────────────────────────────────────────────

/**
 * Legacy BRaiNSTORM SPiRAL config → neue Struktur
 * @param {Object} legacy
 * @returns {Object}
 */
function migrateLegacy(legacy) {
  return {
    apiKeys: {
      openai: legacy.openai,
      gemini: legacy.gemini,
      deepseek: legacy.deepseek,
      grok: legacy.grok,
      anthropic: legacy.anthropic,
    },
    ghToken: legacy.ghToken,
    vault: legacy.vault,
    synthProvider: legacy.synthProvider || 'anthropic',
    _migratedFrom: 'bsConfig',
    _migratedAt: new Date().toISOString(),
  };
}
