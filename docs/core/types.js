/**
 * MiNDLAXY Shared Core — Typ-Definitionen
 *
 * Kanonische Normalformen für alle MiNDLAXY-Apps.
 * Basiert auf dem Codex Shared Core (types.ts), erweitert um kiNTEGRiTY-Typen.
 *
 * REGEL: Keine App darf eigene Paralleltypen definieren.
 *        Neue Typen nur hier im Shared Core ergänzen.
 */

// ─── Knowledge Source ───────────────────────────────────────────────────────
/** @typedef {'ibv-navigator'|'legacy-einsein'|'local-generated'|'brainstorm-spiral'|'experten-tisch'|'kintegrity-engine'|'moonfingers'|'denk-tief'|'heil-sein'|'dein-sein'} SharedKnowledgeSource */

// ─── Practice Types (Codex) ────────────────────────────────────────────────
/** @typedef {'Z0'|'Z1'|'Z2'|'Z3'|'Z4'} SharedPracticeState */
/** @typedef {'low'|'medium'|'high'} SharedPracticeRiskLevel */

/**
 * @typedef {Object} SharedPracticeTai
 * @property {number} tolerance
 * @property {number} authenticity
 * @property {number} integrity
 * @property {number} average
 */

/**
 * @typedef {Object} SharedPracticeRisks
 * @property {number} overidentification
 * @property {number} bypass
 * @property {number} trauma
 * @property {SharedPracticeRiskLevel} level
 */

/**
 * @typedef {Object} SharedPracticeRecord
 * @property {string} id
 * @property {string} slug
 * @property {SharedKnowledgeSource} source
 * @property {string} sourceId
 * @property {string} title
 * @property {string} summary
 * @property {string} tradition
 * @property {SharedPracticeState[]} states
 * @property {SharedPracticeTai} tai
 * @property {SharedPracticeRisks} risks
 * @property {string} [primaryEffect]
 * @property {string[]} secondaryEffects
 * @property {string[]} practicalSteps
 * @property {number} [typicalDurationMinutes]
 * @property {string} [frequencyRecommendation]
 * @property {string} [preparation]
 * @property {string} [integrationTips]
 * @property {string} [stagesProgression]
 * @property {string} [typicalChallenges]
 * @property {string} [contraindications]
 * @property {string} [contraindicatedCombinations]
 * @property {string} [sideEffects]
 * @property {string} [historicalContext]
 * @property {string} [culturalEmbedding]
 * @property {string} [researchStatus]
 * @property {string} [neuroscientificCorrelates]
 * @property {string} [psychotypeSuitability]
 * @property {number} [culturalAdaptability]
 * @property {string[]} relatedNodeIds
 */

// ─── Media Types (Codex) ───────────────────────────────────────────────────

/**
 * @typedef {Object} SharedMediaAsset
 * @property {string} id
 * @property {SharedKnowledgeSource} source
 * @property {'portrait'|'gallery'|'landmark'|'symbol'} kind
 * @property {string} title
 * @property {string} [subtitle]
 * @property {string} src
 * @property {string} alt
 */

/**
 * @typedef {Object} SharedLandmarkRecord
 * @property {string} id
 * @property {SharedKnowledgeSource} source
 * @property {string} nodeId
 * @property {string} title
 * @property {string} location
 * @property {string} summary
 * @property {'denkmal'|'natur'|'licht'|'fragezeichen'|'weg'} type
 * @property {string} symbol
 * @property {string} accent
 * @property {string} imageUrl
 */

// ─── Bridge Types (Codex) ──────────────────────────────────────────────────

/**
 * @typedef {Object} SharedBridgeRecord
 * @property {string} id
 * @property {SharedKnowledgeSource} source
 * @property {string} label
 * @property {'PARALLEL_TO'|'INFLUENCED_BY'|'DEVELOPS'|'CRITIQUE_OF'|'ROOTED_IN'|'TRANSMITS'|'CONTRASTS_WITH'} relation
 * @property {number} strength
 * @property {number} confidence
 * @property {string} summary
 * @property {string[]} relatedNodeIds
 * @property {string[]} sharedMotifs
 * @property {string[]} sharedQuestions
 * @property {string[]} answerDifferences
 * @property {string[]} translationBridges
 * @property {string[]} tensionPoints
 * @property {string[]} falseEquivalenceWarnings
 */

// ─── Personality Types (Codex) ─────────────────────────────────────────────

/**
 * @typedef {Object} SharedPersonalityRecord
 * @property {string} id
 * @property {SharedKnowledgeSource} source
 * @property {string} name
 * @property {string} years
 * @property {string} role
 * @property {string} bio
 * @property {string} tradition
 * @property {string[]} relatedNodeIds
 * @property {string} portraitUrl
 * @property {string} accent
 * @property {string} symbol
 * @property {string} [wikiTerm]
 */

// ─── kiNTEGRiTY Types (NEU) ───────────────────────────────────────────────

/**
 * Must-Keep-Block — geschützte Nutzer-Formulierung
 * @typedef {Object} MustKeepBlock
 * @property {string} text
 * @property {'wörtlich'|'glätten'|'inhaltlich'} mode
 * @property {'notizen'|'manual'|'pane-drag'} origin
 */

/**
 * Herkunfts-Nachvollzug für jeden Verdichtungsblock
 * @typedef {Object} TraceEntry
 * @property {'llm-response'|'user-note'|'must-keep'|'bridge'|'existing-synthesis'} sourceType
 * @property {string} sourceId
 * @property {string} sourceLabel
 * @property {string} timestamp
 */

/**
 * Synthese-Ergebnis — editierbarer Verdichtungsblock
 * @typedef {Object} SharedSynthesisRecord
 * @property {string} id
 * @property {SharedKnowledgeSource} source
 * @property {string} topic
 * @property {string} synthesisText
 * @property {string[]} inputSources
 * @property {MustKeepBlock[]} mustKeepBlocks
 * @property {string[]} redundancyClusters
 * @property {string} profile
 * @property {string[]} relatedNodeIds
 * @property {TraceEntry[]} provenance
 * @property {string} createdAt
 */

/**
 * DAS GROßE ABER — unaufgelöste Spannungen
 * @typedef {Object} SharedAberRecord
 * @property {string} id
 * @property {SharedKnowledgeSource} source
 * @property {string} label
 * @property {string} description
 * @property {'low'|'medium'|'high'} severity
 * @property {'incommensurability'|'contradiction'|'tension'|'unresolved_difference'|'open_divergence'} type
 * @property {string} sourceSection
 * @property {string[]} relatedNodeIds
 * @property {string[]} relatedBridgeIds
 */

/**
 * Term-Cluster für Cross-Pane Begriffsmarkierung
 * @typedef {Object} SharedTermCluster
 * @property {string} id
 * @property {string} canonical
 * @property {string[]} variants
 * @property {string} color
 * @property {string[]} relatedNodeIds
 */

// ─── kiNTEGRiTY Profile ───────────────────────────────────────────────────

/**
 * @typedef {Object} KIntegrityProfile
 * @property {string} id
 * @property {'low'|'medium'|'high'} compressionLevel
 * @property {'minimal'|'conservative'|'moderate'|'free'} reformulationMode
 * @property {number} originalLanguagePreserve — 0.0 bis 1.0
 * @property {number} redundancyThreshold — 0.0 bis 1.0
 * @property {'high'|'very_high'|'absolute'} mustKeepSensitivity
 * @property {'high'|'very_high'|'absolute'} differencePreservation
 * @property {'separate'|'structured_debate'|'layered'|'tension_map'|'gentle'|'reflective'} conflictRendering
 * @property {string} outputFormat
 */

/**
 * kiNTEGRiTY Prozess-Input
 * @typedef {Object} KIntegrityInput
 * @property {{source: string, content: string, meta?: Object}[]} texts
 * @property {string} [notizen]
 * @property {MustKeepBlock[]} [mustKeep]
 * @property {string} [existingSynthesis]
 * @property {string} [topic]
 */

/**
 * kiNTEGRiTY Prozess-Output (3 Ergebniszonen + Meta)
 * @typedef {Object} KIntegrityResult
 * @property {SharedSynthesisRecord} synthesis — Zone 1: Verdichtung
 * @property {SharedAberRecord[]} dasGrosseAber — Zone 2: Spannungen
 * @property {{id: string, claim: string, issue: string, source: string}[]} fraglichFehlerhaft — Zone 3
 * @property {string[]} redundancyClusters
 * @property {SharedTermCluster[]} termClusters
 * @property {TraceEntry[]} provenance
 */

// Export marker (ES Module)
export const SHARED_CORE_VERSION = '1.0.0';
export const SHARED_CORE_NAME = 'MiNDLAXY Shared Core';
