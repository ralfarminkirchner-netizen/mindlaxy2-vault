/**
 * MiNDLAXY Shared Core — kiNTEGRiTY Profile
 *
 * Jede App nutzt denselben kiNTEGRiTY-Kern, aber mit eigenem Profil.
 * Profile steuern, wie die 6 Layers gewichtet werden.
 *
 * Gleicher Kern, aber unterschiedliche App-Profile und Darstellungen.
 */

/** @type {Record<string, import('../types.js').KIntegrityProfile>} */
export const KINTEGRITY_PROFILES = {
  brainstorm: {
    id: 'brainstorm',
    compressionLevel: 'medium',
    reformulationMode: 'moderate',
    originalLanguagePreserve: 0.6,
    redundancyThreshold: 0.70,
    mustKeepSensitivity: 'high',
    differencePreservation: 'high',
    conflictRendering: 'separate',
    outputFormat: 'editable_blocks',
  },

  experten_tisch: {
    id: 'experten_tisch',
    compressionLevel: 'low',
    reformulationMode: 'conservative',
    originalLanguagePreserve: 0.8,
    redundancyThreshold: 0.85,
    mustKeepSensitivity: 'very_high',
    differencePreservation: 'very_high',
    conflictRendering: 'structured_debate',
    outputFormat: 'perspective_matrix',
  },

  moonfingers: {
    id: 'moonfingers',
    compressionLevel: 'low',
    reformulationMode: 'minimal',
    originalLanguagePreserve: 0.9,
    redundancyThreshold: 0.90,
    mustKeepSensitivity: 'absolute',
    differencePreservation: 'absolute',
    conflictRendering: 'layered',
    outputFormat: 'tradition_sensitive',
  },

  denk_tief: {
    id: 'denk_tief',
    compressionLevel: 'medium',
    reformulationMode: 'moderate',
    originalLanguagePreserve: 0.7,
    redundancyThreshold: 0.75,
    mustKeepSensitivity: 'high',
    differencePreservation: 'very_high',
    conflictRendering: 'tension_map',
    outputFormat: 'depth_blocks',
  },

  heil_sein: {
    id: 'heil_sein',
    compressionLevel: 'low',
    reformulationMode: 'minimal',
    originalLanguagePreserve: 0.95,
    redundancyThreshold: 0.90,
    mustKeepSensitivity: 'absolute',
    differencePreservation: 'high',
    conflictRendering: 'gentle',
    outputFormat: 'personal_blocks',
  },

  dein_sein: {
    id: 'dein_sein',
    compressionLevel: 'low',
    reformulationMode: 'minimal',
    originalLanguagePreserve: 0.95,
    redundancyThreshold: 0.90,
    mustKeepSensitivity: 'absolute',
    differencePreservation: 'very_high',
    conflictRendering: 'reflective',
    outputFormat: 'identity_blocks',
  },
};

/**
 * Profil abrufen (mit Fallback auf brainstorm)
 * @param {string} profileId
 * @returns {import('../types.js').KIntegrityProfile}
 */
export function getProfile(profileId) {
  return KINTEGRITY_PROFILES[profileId] || KINTEGRITY_PROFILES.brainstorm;
}
