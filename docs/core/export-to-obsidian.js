/**
 * MiNDLAXY Shared Core → Obsidian Vault Export
 *
 * Generiert Markdown-Dateien aus den Shared Registries,
 * die direkt in den Obsidian Vault geschrieben werden können.
 *
 * Nutzung: node export-to-obsidian.js [vault-pfad]
 * Default: ./obsidian-export/
 */

import { sharedPersonalities } from './registries/personalities.js';
import { sharedBridges } from './registries/bridges.js';
import { sharedPractices } from './registries/practices.js';

/**
 * Generiert Markdown für eine Persönlichkeit
 * @param {Object} p - SharedPersonalityRecord
 * @returns {string}
 */
export function personalityToMarkdown(p) {
  return `---
id: "${p.id}"
source: "${p.source}"
tradition: "${p.tradition}"
years: "${p.years}"
role: "${p.role}"
accent: "${p.accent}"
symbol: "${p.symbol}"
${p.wikiTerm ? `wikiTerm: "${p.wikiTerm}"` : ''}
tags: [shared-core, personality, ${p.tradition.toLowerCase().replace(/\s+/g, '-')}]
---

# ${p.name}

**${p.role}** · ${p.years}

${p.bio}

## Tradition
${p.tradition}

## Atlas-Verknüpfungen
${p.relatedNodeIds.map(id => `- [[${id}]]`).join('\n')}

---
*Shared Core · ${p.source} · ${p.id}*
`;
}

/**
 * Generiert Markdown für eine Brücke
 * @param {Object} b - SharedBridgeRecord
 * @returns {string}
 */
export function bridgeToMarkdown(b) {
  return `---
id: "${b.id}"
source: "${b.source}"
relation: "${b.relation}"
strength: ${b.strength}
confidence: ${b.confidence}
tags: [shared-core, bridge, ${b.relation.toLowerCase().replace(/_/g, '-')}]
---

# ${b.label}

**Relation:** ${b.relation} · Stärke: ${b.strength}/10 · Konfidenz: ${b.confidence}/10

${b.summary}

## Gemeinsame Motive
${b.sharedMotifs.map(m => `- ${m}`).join('\n')}

## Gemeinsame Fragen
${b.sharedQuestions.map(q => `- ${q}`).join('\n')}

## Antwort-Unterschiede
${b.answerDifferences.map(d => `- ${d}`).join('\n')}

## Übersetzungsbrücken
${b.translationBridges.map(t => `- ${t}`).join('\n')}

## ⚡ Spannungspunkte
${b.tensionPoints.map(t => `- ${t}`).join('\n')}

## ⚠ Falsche Äquivalenz-Warnungen
${b.falseEquivalenceWarnings.map(w => `- ${w}`).join('\n')}

## Atlas-Verknüpfungen
${b.relatedNodeIds.map(id => `- [[${id}]]`).join('\n')}

---
*Shared Core · ${b.source} · ${b.id}*
`;
}

/**
 * Generiert Markdown für eine Praxisform
 * @param {Object} p - SharedPracticeRecord
 * @returns {string}
 */
export function practiceToMarkdown(p) {
  const riskEmoji = { low: '🟢', medium: '🟡', high: '🔴' }[p.risks.level];

  return `---
id: "${p.id}"
slug: "${p.slug}"
source: "${p.source}"
tradition: "${p.tradition}"
states: [${p.states.join(', ')}]
tai_average: ${p.tai.average}
risk_level: "${p.risks.level}"
tags: [shared-core, practice, ${p.tradition.toLowerCase().replace(/[\s/]+/g, '-')}]
---

# ${p.title}

${p.summary}

## Tradition
${p.tradition}

## Bewusstseinsstufen
${p.states.join(' → ')}

## TAI-Score
| Toleranz | Authentizität | Integrität | Ø |
|---|---|---|---|
| ${p.tai.tolerance} | ${p.tai.authenticity} | ${p.tai.integrity} | **${p.tai.average}** |

## Risiken ${riskEmoji}
| Überidentifikation | Bypass | Trauma | Level |
|---|---|---|---|
| ${p.risks.overidentification} | ${p.risks.bypass} | ${p.risks.trauma} | **${p.risks.level}** |

${p.primaryEffect ? `## Primärer Effekt\n${p.primaryEffect}\n` : ''}
${p.secondaryEffects?.length ? `## Sekundäre Effekte\n${p.secondaryEffects.map(e => `- ${e}`).join('\n')}\n` : ''}
${p.practicalSteps?.length ? `## Praktische Schritte\n${p.practicalSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n` : ''}
${p.typicalDurationMinutes ? `## Dauer\n${p.typicalDurationMinutes} Minuten · ${p.frequencyRecommendation || ''}\n` : ''}
${p.contraindications ? `## ⚠ Kontraindikationen\n${p.contraindications}\n` : ''}
${p.historicalContext ? `## Historischer Kontext\n${p.historicalContext}\n` : ''}
${p.researchStatus ? `## Forschungsstand\n${p.researchStatus}\n` : ''}

## Atlas-Verknüpfungen
${p.relatedNodeIds.map(id => `- [[${id}]]`).join('\n')}

---
*Shared Core · ${p.source} · ${p.id}*
`;
}

/**
 * Generiert alle Markdown-Dateien als Object { filename: content }
 * @returns {{ personalities: Object, bridges: Object, practices: Object }}
 */
export function generateAllMarkdown() {
  const result = { personalities: {}, bridges: {}, practices: {} };

  for (const p of sharedPersonalities) {
    const filename = `${p.name.replace(/[/\\:*?"<>|]/g, '')}.md`;
    result.personalities[filename] = personalityToMarkdown(p);
  }

  for (const b of sharedBridges) {
    const filename = `${b.label.replace(/[/\\:*?"<>|]/g, '')}.md`;
    result.bridges[filename] = bridgeToMarkdown(b);
  }

  for (const p of sharedPractices) {
    const filename = `${p.title.replace(/[/\\:*?"<>|]/g, '')}.md`;
    result.practices[filename] = practiceToMarkdown(p);
  }

  return result;
}
