/**
 * MiNDLAXY Shared Core — kiNTEGRiTY Engine
 *
 * Die zentrale Synthese-Engine. 6 Layer, 3 Ergebniszonen.
 * Kein simpler Summarizer — strukturierte Analyse mit:
 *   - Redundanz-Erkennung
 *   - Tragfähigkeits-Filterung
 *   - Differenz-Erhaltung
 *   - Widerspruchs-Erkennung
 *   - Inkommensurabilitäts-Erkennung
 *   - Faktizitäts-Prüfung
 *   - Must-Keep-Priorisierung
 *   - Editierbare Synthese-Erzeugung
 *
 * Nutzt bestehende SharedBridgeRecords für Alignment und Conflict Detection.
 * Gibt SharedSynthesisRecord + SharedAberRecord[] zurück.
 *
 * WICHTIGE GRUNDREGEL:
 *   Nicht alles, was ähnlich klingt, darf zusammengeführt werden.
 *   Nicht alles, was widersprüchlich ist, ist falsch.
 *   Nicht alles, was wichtig ist, darf umformuliert werden.
 */

import { getProfile } from './profiles.js';

/**
 * System-Prompt Builder für die LLM-gestützte Synthese.
 * Baut den kiNTEGRiTY-Systemprompt basierend auf dem aktiven Profil.
 *
 * @param {import('../types.js').KIntegrityProfile} profile
 * @returns {string}
 */
export function buildKIntegritySystemPrompt(profile) {
  const compressionHint = {
    low: 'Verdichte nur minimal. Erhalte möglichst viel Originaltext.',
    medium: 'Verdichte moderat. Bündle Wiederholungen, aber erhalte Nuancen.',
    high: 'Verdichte stark. Finde den tragfähigen Kern.',
  }[profile.compressionLevel];

  const reformulationHint = {
    minimal: 'Formuliere kaum um. Originalsprache hat höchste Priorität.',
    conservative: 'Formuliere nur um, wo es der Klarheit dient. Behalte den Stil.',
    moderate: 'Formuliere frei um, wo es die Lesbarkeit verbessert.',
    free: 'Formuliere frei und elegant um.',
  }[profile.reformulationMode];

  const mustKeepHint = {
    high: 'Must-Keep-Inhalte dürfen nur leicht angepasst werden.',
    very_high: 'Must-Keep-Inhalte dürfen nur minimal geglättet werden.',
    absolute: 'Must-Keep-Inhalte dürfen NICHT verändert werden. Wortlaut ist heilig.',
  }[profile.mustKeepSensitivity];

  const differenceHint = {
    high: 'Unterschiede erhalten, wo sie bedeutsam sind.',
    very_high: 'Unterschiede besonders sorgfältig erhalten und sichtbar machen.',
    absolute: 'Jede Differenz erhalten. Keine vorschnelle Harmonisierung.',
  }[profile.differencePreservation];

  return `Du bist die kiNTEGRiTY-Engine von MiNDLAXY.

DEINE AUFGABE:
Analysiere die gegebenen Texte und erzeuge strukturiertes, editierbares Verdichtungsmaterial.
Du produzierst KEIN Endergebnis, sondern einen bearbeitbaren Zwischenkörper.

VERDICHTUNG: ${compressionHint}
UMFORMULIERUNG: ${reformulationHint}
MUST-KEEP: ${mustKeepHint}
DIFFERENZEN: ${differenceHint}

GRUNDREGELN:
- Nicht alles, was ähnlich klingt, darf zusammengeführt werden.
- Nicht alles, was widersprüchlich ist, ist falsch.
- Nicht alles, was wichtig ist, darf umformuliert werden.
- Inkommensurabel ≠ falsch. Widerspruch ≠ Ausschuss.
- Was im Integritätsfeld/NOTiZEN steht, hat Vorrang vor automatischer Glättung.

AUSGABESTRUKTUR (immer alle 3 Zonen):

🔗 kiNTEGRiTY:
[Zone 1: Tragfähige Synthese — editierbares Verdichtungsmaterial]

⚡ DAS GROßE ABER:
[Zone 2: Spannungen, Gegensätze, unauflösbare Unterschiede, Perspektivkonflikte.
 Inkommensurabel ≠ falsch. Widersprüchlich ≠ wertlos.]

❓ FRAGLICH:
[Zone 3: Faktisch falsch, halluziniert, unsauber behauptet, epistemisch problematisch]

📍 PROVENANCE:
[Woher stammen die Kernaussagen? Welche Quellen, welche Modelle?]`;
}

/**
 * Baut den User-Prompt für die Synthese.
 *
 * @param {import('../types.js').KIntegrityInput} input
 * @param {import('../types.js').KIntegrityProfile} profile
 * @returns {string}
 */
export function buildKIntegritySynthesisPrompt(input, profile) {
  let prompt = '';

  if (input.topic) {
    prompt += `Thema: "${input.topic}"\n\n`;
  }

  // Must-Keep-Blöcke mit höchster Priorität
  if (input.mustKeep && input.mustKeep.length > 0) {
    prompt += '═══ MUST-KEEP (HÖCHSTE PRIORITÄT) ═══\n';
    for (const block of input.mustKeep) {
      const modeHint = {
        'wörtlich': '⚠ WÖRTLICH ÜBERNEHMEN',
        'glätten': '→ nur leicht glätten',
        'inhaltlich': '→ inhaltlich erhalten',
      }[block.mode];
      prompt += `[${modeHint}] ${block.text}\n`;
    }
    prompt += '\n';
  }

  // NOTiZEN
  if (input.notizen) {
    prompt += `═══ MANUELLE NOTiZEN DES NUTZERS (HÖCHSTE PRIORITÄT) ═══\n`;
    prompt += `Diese Notizen MÜSSEN ${profile.mustKeepSensitivity === 'absolute' ? 'WÖRTLICH' : 'möglichst wortgetreu'} in die Synthese einfließen.\n`;
    prompt += `${input.notizen}\n\n`;
  }

  // Bestehende Synthese (für iterative Verdichtung)
  if (input.existingSynthesis) {
    prompt += `═══ BISHERIGE kiNTEGRiTY-SYNTHESE ═══\n${input.existingSynthesis}\n\n`;
    prompt += `═══ NEUE PERSPEKTIVEN ZUR INTEGRATION ═══\n\n`;
  }

  // Input-Texte
  for (const text of input.texts) {
    prompt += `=== ${text.source} ===\n${text.content}\n\n`;
  }

  return prompt;
}

/**
 * Parst die LLM-Ausgabe in die 3 Ergebniszonen.
 *
 * @param {string} raw — Rohe LLM-Ausgabe
 * @param {string} topic
 * @returns {{ synthesis: string, dasGrosseAber: string, fraglich: string, provenance: string }}
 */
export function parseKIntegrityOutput(raw, topic) {
  const extractSection = (marker) => {
    const idx = raw.indexOf(marker);
    if (idx < 0) return '';
    const start = idx + marker.length;
    // Find next section marker
    const markers = ['🔗 kiNTEGRiTY:', '⚡ DAS GROßE ABER:', '❓ FRAGLICH:', '📍 PROVENANCE:'];
    let end = raw.length;
    for (const m of markers) {
      if (m === marker) continue;
      const mIdx = raw.indexOf(m, start);
      if (mIdx > 0 && mIdx < end) end = mIdx;
    }
    return raw.substring(start, end).trim();
  };

  return {
    synthesis: extractSection('🔗 kiNTEGRiTY:'),
    dasGrosseAber: extractSection('⚡ DAS GROßE ABER:'),
    fraglich: extractSection('❓ FRAGLICH:'),
    provenance: extractSection('📍 PROVENANCE:'),
  };
}

/**
 * Erstellt eine leere KIntegrityResult-Struktur.
 *
 * @param {string} topic
 * @param {string} profileId
 * @param {string[]} inputSources
 * @returns {import('../types.js').KIntegrityResult}
 */
export function createEmptyResult(topic, profileId, inputSources) {
  return {
    synthesis: {
      id: `synth_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      source: 'kintegrity-engine',
      topic,
      synthesisText: '',
      inputSources,
      mustKeepBlocks: [],
      redundancyClusters: [],
      profile: profileId,
      relatedNodeIds: [],
      provenance: [],
      createdAt: new Date().toISOString(),
    },
    dasGrosseAber: [],
    fraglichFehlerhaft: [],
    redundancyClusters: [],
    termClusters: [],
    provenance: [],
  };
}

/**
 * Haupteingang der kiNTEGRiTY Engine.
 *
 * Nimmt Input + Profil, baut System- und User-Prompt,
 * ruft den LLM-Provider auf und parst die Ausgabe in 3 Zonen.
 *
 * @param {import('../types.js').KIntegrityInput} input
 * @param {string} profileId — z.B. 'brainstorm', 'experten_tisch'
 * @param {function} callLLM — async (systemPrompt, userPrompt) => string
 * @returns {Promise<import('../types.js').KIntegrityResult>}
 */
export async function processKIntegrity(input, profileId, callLLM) {
  const profile = getProfile(profileId);
  const systemPrompt = buildKIntegritySystemPrompt(profile);
  const userPrompt = buildKIntegritySynthesisPrompt(input, profile);
  const sources = input.texts.map(t => t.source);
  const result = createEmptyResult(input.topic || 'Synthese', profileId, sources);

  try {
    const raw = await callLLM(systemPrompt, userPrompt);
    const parsed = parseKIntegrityOutput(raw, input.topic || '');

    // Zone 1: Synthese
    result.synthesis.synthesisText = parsed.synthesis;
    result.synthesis.mustKeepBlocks = input.mustKeep || [];
    result.synthesis.provenance = sources.map(s => ({
      sourceType: 'llm-response',
      sourceId: s,
      sourceLabel: s,
      timestamp: new Date().toISOString(),
    }));

    if (input.notizen) {
      result.synthesis.provenance.push({
        sourceType: 'user-note',
        sourceId: 'notizen',
        sourceLabel: 'NOTiZEN',
        timestamp: new Date().toISOString(),
      });
    }

    // Zone 2: DAS GROßE ABER
    if (parsed.dasGrosseAber) {
      result.dasGrosseAber.push({
        id: `aber_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
        source: 'kintegrity-engine',
        label: `Spannungen: ${input.topic || 'Synthese'}`,
        description: parsed.dasGrosseAber,
        severity: 'medium',
        type: 'tension',
        sourceSection: 'das_grosse_aber',
        relatedNodeIds: [],
        relatedBridgeIds: [],
      });
    }

    // Zone 3: Fraglich
    if (parsed.fraglich) {
      result.fraglichFehlerhaft.push({
        id: `frag_${Date.now()}`,
        claim: parsed.fraglich,
        issue: 'Vom kiNTEGRiTY-Engine als fraglich markiert',
        source: 'kintegrity-engine',
      });
    }

    // Provenance
    result.provenance = result.synthesis.provenance;

  } catch (err) {
    result.synthesis.synthesisText = `⚠ Synthese fehlgeschlagen: ${err.message || err}`;
  }

  return result;
}

export { getProfile };
