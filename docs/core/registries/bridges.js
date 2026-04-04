/**
 * Utility function to deduplicate and filter array values
 * @param {string[]} values - Array of string values to process
 * @returns {string[]} Deduplicated array with falsy values removed
 */
function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

/**
 * Factory function to create a SharedBridgeRecord with required defaults
 * @param {Object} seed - Base bridge data
 * @param {string} seed.id - Unique identifier for the bridge
 * @param {string} seed.label - Human-readable label
 * @param {string} seed.relation - Type of relation (INFLUENCED_BY, DEVELOPS, PARALLEL_TO, TRANSMITS)
 * @param {number} seed.strength - Strength rating (1-10)
 * @param {number} seed.confidence - Confidence level (1-10)
 * @param {string} seed.summary - Detailed summary of the bridge
 * @param {string[]} seed.relatedNodeIds - Array of related node IDs
 * @param {string[]} seed.sharedMotifs - Shared concepts between traditions
 * @param {string[]} seed.sharedQuestions - Common questions across traditions
 * @param {string[]} seed.answerDifferences - How answers differ
 * @param {string[]} seed.translationBridges - How to translate between concepts
 * @param {string[]} seed.tensionPoints - Key tensions and paradoxes
 * @param {string[]} seed.falseEquivalenceWarnings - Warnings about false equivalences
 * @returns {Object} Complete SharedBridgeRecord with source and deduplicated relatedNodeIds
 */
function createBridge(seed) {
  return {
    ...seed,
    source: 'ibv-navigator',
    relatedNodeIds: unique(seed.relatedNodeIds),
  };
}

/**
 * Collection of shared bridges mapping across philosophical and spiritual traditions.
 * Each bridge represents a meaningful connection between different intellectual and spiritual systems.
 * @type {Object[]}
 */
export const sharedBridges = [
  createBridge({
    id: 'shared-bridge-vedic-buddhist',
    label: 'Buddhismus antwortet auf vedische Fragen',
    relation: 'INFLUENCED_BY',
    strength: 9,
    confidence: 9,
    summary:
      'Zwischen Upanishaden und Buddhismus bleibt die Frage nach Selbst, Befreiung und Übung gemeinsam, die Antwort auf das Selbst aber kippt radikal.',
    relatedNodeIds: [
      'tradition_upanishadic',
      'text_upanishads',
      'shankara',
      'tradition_buddhism',
      'text_dhammapada',
      'buddha',
    ],
    sharedMotifs: ['Bewusstseinsschulung', 'Befreiung', 'Meditation als Weg'],
    sharedQuestions: ['Was ist das Selbst?', 'Wie endet Leiden?'],
    answerDifferences: [
      'Upanishadisch: Atman ist tragender Grund.',
      'Buddhistisch: Kein dauerhaftes Selbst, sondern Nicht-Selbst und Vergänglichkeit.',
    ],
    translationBridges: ['Dharma taucht in beiden Welten auf, meint aber nicht dasselbe.'],
    tensionPoints: ['Atman vs. Anatta bleibt die Grundspannung dieser Brücke.'],
    falseEquivalenceWarnings: ['Ähnliche Meditationsformen bedeuten nicht dieselbe Metaphysik.'],
  }),
  createBridge({
    id: 'shared-bridge-daoist-zen',
    label: 'Zen integriert daoistische Natürlichkeit',
    relation: 'INFLUENCED_BY',
    strength: 7,
    confidence: 7,
    summary:
      'Daoistische Natürlichkeit und buddhistische Disziplin berühren sich in Zen, ohne einfach identisch zu werden.',
    relatedNodeIds: [
      'tradition_daoism',
      'text_daodejing',
      'laozi',
      'tradition_buddhism',
      'buddha',
      'cluster_becoming',
      'cluster_detachment',
    ],
    sharedMotifs: ['Natürlichkeit', 'Jenseits der Worte', 'Spontaneität'],
    sharedQuestions: ['Wie lebt man jenseits starrer Kategorien?'],
    answerDifferences: [
      'Daoismus: Mit dem Fluss gehen.',
      'Zen-nahe Lesart: Strenge Praxis als Weg in diese Natürlichkeit.',
    ],
    translationBridges: ['Wu Wei und nicht-anhafte Präsenz berühren sich strukturell.'],
    tensionPoints: ['Zen bleibt disziplinierter und formgebundener als Daoismus.'],
    falseEquivalenceWarnings: ['Spontaneität in Zen ist geübt, nicht bloß locker.'],
  }),
  createBridge({
    id: 'shared-bridge-greek-stoic',
    label: 'Griechische Philosophie wird Lebenspraxis',
    relation: 'DEVELOPS',
    strength: 9,
    confidence: 10,
    summary:
      'Die Stoa verschiebt griechische Theoria in tägliche Übung, Affektarbeit und Selbstregierung.',
    relatedNodeIds: [
      'school_presocratics',
      'school_platonism',
      'school_aristotelianism',
      'sokrates',
      'platon',
      'aristoteles',
      'seneca',
      'aurelius',
      'epikur',
      'cluster_critique',
    ],
    sharedMotifs: ['Logos', 'Tugend', 'Selbstprüfung'],
    sharedQuestions: ['Wie wird Denken zur Lebensform?'],
    answerDifferences: [
      'Klassisch griechisch: Erkenntnis als Schau und Ordnung.',
      'Stoisch: Erkenntnis als tägliche Praxis der Haltung.',
    ],
    translationBridges: ['Sokratische Prüfung lebt in der stoischen Abendreflexion weiter.'],
    tensionPoints: ['Die Stoiker verdichten Philosophie stärker in Disziplin und Affektregulation.'],
    falseEquivalenceWarnings: ['Nicht jede griechische Tugendlehre ist bereits stoische Lebenskunst.'],
  }),
  createBridge({
    id: 'shared-bridge-stoic-buddhist',
    label: 'Innere Freiheit ohne historischen Kontakt',
    relation: 'PARALLEL_TO',
    strength: 7,
    confidence: 5,
    summary:
      'Stoische und buddhistische Praxis suchen beide innere Freiheit, aber aus gegensätzlichen Anthropologien heraus.',
    relatedNodeIds: [
      'seneca',
      'aurelius',
      'epikur',
      'tradition_buddhism',
      'buddha',
      'cluster_critique',
      'cluster_detachment',
    ],
    sharedMotifs: ['Nicht-Anhaften', 'Übung', 'Affektarbeit'],
    sharedQuestions: ['Wie wird der Mensch innerlich frei?'],
    answerDifferences: [
      'Stoa: Ein festes Selbst urteilt und übt.',
      'Buddhismus: Das Selbst wird gerade in seiner Festigkeit durchschaut.',
    ],
    translationBridges: ['Gelassenheit und Gleichmut lassen sich phänomenologisch vergleichen.'],
    tensionPoints: ['Selbstbeherrschung und Nicht-Selbst stehen quer zueinander.'],
    falseEquivalenceWarnings: ['Ähnliche Resultate verdecken unterschiedliche metaphysische Tiefenstrukturen.'],
  }),
  createBridge({
    id: 'shared-bridge-vedic-christian',
    label: 'Einheitserfahrung in verschiedenen Rahmen',
    relation: 'PARALLEL_TO',
    strength: 6,
    confidence: 4,
    summary:
      'Upanishadische Einheitserfahrung und christliche Innerlichkeit treffen sich in der Sprache des Grundes, nicht in derselben Ontologie.',
    relatedNodeIds: [
      'tradition_upanishadic',
      'text_upanishads',
      'shankara',
      'tradition_christian_theology',
      'augustinus',
      'cluster_innerness',
      'cluster_unity',
    ],
    sharedMotifs: ['Stille', 'Rückkehr nach innen', 'Nähe zum Absoluten'],
    sharedQuestions: ['Ist das Innerste identisch mit dem Göttlichen?'],
    answerDifferences: [
      'Advaita: Atman und Brahman sind nicht zwei.',
      'Christlich: Vereinigung ja, Identität von Geschöpf und Schöpfer nein.',
    ],
    translationBridges: ['Sprache der Sammlung und Rückkehr kann beide Felder annähern.'],
    tensionPoints: ['Unio und Nicht-Zweiheit dürfen nicht kurzgeschlossen werden.'],
    falseEquivalenceWarnings: ['Ähnliche Worte für Leere und Einheit meinen nicht dieselbe Lehre.'],
  }),
  createBridge({
    id: 'shared-bridge-greek-confucian',
    label: 'Bildung und Tugend als Selbstkultivierung',
    relation: 'PARALLEL_TO',
    strength: 6,
    confidence: 4,
    summary:
      'Griechische Tugendethik und konfuzianische Kultivierung treffen sich in der Selbstformung, aber nicht in denselben sozialen und metaphysischen Akzenten.',
    relatedNodeIds: [
      'school_presocratics',
      'school_platonism',
      'school_aristotelianism',
      'sokrates',
      'platon',
      'aristoteles',
      'tradition_confucianism',
      'konfuzios',
    ],
    sharedMotifs: ['Bildung', 'Tugend', 'Selbstarbeit'],
    sharedQuestions: ['Wie wird ein Mensch gut?'],
    answerDifferences: [
      'Griechisch: Einsicht ins Gute und vernünftige Form.',
      'Konfuzianisch: Beziehung, Ritual und Kultivierung im sozialen Gewebe.',
    ],
    translationBridges: ['Paideia und Li können als unterschiedliche Formen geübter Ordnung gelesen werden.'],
    tensionPoints: ['Konfuzianische Ethik ist relationaler und ritueller als die klassische griechische Fassung.'],
    falseEquivalenceWarnings: ['Tugend ist nicht automatisch dieselbe Praxis in beiden Welten.'],
  }),
  createBridge({
    id: 'shared-bridge-buddhist-contemplative',
    label: 'Buddhistische Praxis wird Forschungsgegenstand',
    relation: 'TRANSMITS',
    strength: 8,
    confidence: 9,
    summary:
      'Meditative Verfahren wandern aus buddhistischen Kontexten in säkulare Forschung, Therapie und Bewusstseinswissenschaft.',
    relatedNodeIds: [
      'tradition_buddhism',
      'buddha',
      'text_dhammapada',
      'cluster_detachment',
      'cluster_critique',
    ],
    sharedMotifs: ['Achtsamkeit', 'Trainierbarkeit des Geistes', 'Beobachtung'],
    sharedQuestions: ['Wie lässt sich Kontemplation wissenschaftlich beschreiben?'],
    answerDifferences: [
      'Buddhistisch: Befreiung steht im Mittelpunkt.',
      'Säkular: Messbarkeit, Regulation und Gesundheit rücken nach vorn.',
    ],
    translationBridges: ['MBSR übersetzt Vipassana in klinische und psychologische Sprache.'],
    tensionPoints: ['Die säkulare Form verliert oft Pfad, Ethik und metaphysische Einbettung.'],
    falseEquivalenceWarnings: ['Achtsamkeit im Labor ist nicht identisch mit dem buddhistischen Gesamtweg.'],
  }),
];

/**
 * Get all shared bridges that reference a specific node
 * @param {string} nodeId - The node ID to search for
 * @returns {Object[]} Array of bridge records that include the node ID
 */
export function getSharedBridgesForNode(nodeId) {
  return sharedBridges.filter((bridge) => bridge.relatedNodeIds.includes(nodeId));
}
