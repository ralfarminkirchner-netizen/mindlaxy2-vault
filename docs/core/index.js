/**
 * MiNDLAXY Shared Core — Entry Point
 *
 * Alle Apps importieren von hier:
 *   import { callProvider, processKIntegrity, sharedBridges, ... } from '../core/index.js';
 *
 * Ein gemeinsamer Kern, mehrere Consumer, keine strukturelle Doppelung.
 */

// ─── Typ-Definitionen (nur JSDoc, keine Runtime-Exports) ───────────────────
// Typen sind in types.js als JSDoc @typedef definiert.
// Import: /** @type {import('./core/types.js').SharedBridgeRecord} */
export { SHARED_CORE_VERSION, SHARED_CORE_NAME } from './types.js';

// ─── Registries (Codex-Basis) ──────────────────────────────────────────────
export {
  sharedPersonalities,
  getSharedPersonalitiesForNode,
} from './registries/personalities.js';

export {
  sharedBridges,
  getSharedBridgesForNode,
} from './registries/bridges.js';

export {
  sharedPractices,
  ibvSharedPractices,
} from './registries/practices.js';

// ─── Media & Landmarks ─────────────────────────────────────────────────────
export {
  getSharedNodeMedia,
  getLocalNodeImage,
  createPersonalityPortrait,
} from './media.js';

// ─── kiNTEGRiTY Engine ─────────────────────────────────────────────────────
export {
  processKIntegrity,
  buildKIntegritySystemPrompt,
  buildKIntegritySynthesisPrompt,
  parseKIntegrityOutput,
  createEmptyResult,
} from './kintegrity/engine.js';

export {
  KINTEGRITY_PROFILES,
  getProfile,
} from './kintegrity/profiles.js';

// ─── LLM Providers ─────────────────────────────────────────────────────────
export {
  callProvider,
  callAllProviders,
} from './llm/providers.js';

// ─── Config / Settings ─────────────────────────────────────────────────────
export {
  getSettings,
  saveSettings,
  setSetting,
  getSetting,
  getApiKey,
  setApiKey,
  availableProviders,
  getGhToken,
  getVaultRepo,
  getModel,
  getSynthProvider,
} from './config/settings.js';

// ─── Convenience: Practice Lookup ──────────────────────────────────────────
import { sharedPractices } from './registries/practices.js';

/** @type {Map<string, import('./types.js').SharedPracticeRecord>} */
export const sharedPracticeById = new Map(
  sharedPractices.map(p => [p.id, p])
);

/**
 * Practices für einen Atlas-Node finden
 * @param {string} nodeId
 * @returns {import('./types.js').SharedPracticeRecord[]}
 */
export function getSharedPracticesForNode(nodeId) {
  return sharedPractices.filter(p => p.relatedNodeIds.includes(nodeId));
}
