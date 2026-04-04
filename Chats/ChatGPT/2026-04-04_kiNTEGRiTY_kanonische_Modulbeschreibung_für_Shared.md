---
provider: OPENAI · CHATGPT
titel: "# kiNTEGRiTY – kanonische Modulbeschreibung für Shared "
datum: 2026-04-04
---

# # kiNTEGRiTY – kanonische Modulbeschreibung für Shared 

**Du:** # kiNTEGRiTY – kanonische Modulbeschreibung für Shared Core
# Info-Prompt für Claude / Codex

Du arbeitest an einem System namens MiNDLAXY. Innerhalb dieses Systems soll kiNTEGRiTY als eigenständiges Modul im gemeinsamen Shared Core gebaut werden, damit mehrere Apps auf dieselbe Integritäts-, Verdichtungs-, Synthese- und Differenzlogik zugreifen können.

kiNTEGRiTY ist kein einzelnes UI-Feature und keine app-spezifische Komfortfunktion, sondern eine zentrale Shared-Core-Komponente. Sie soll von mehreren Apps genutzt werden können, darunter insbesondere:

- BRaiNSTORM SPiRAL
- EXPERTEN TiSCH
- alle TiSCH-Apps
- MOONFiNGERS
- DENK TiEF
- HEiL SEiN
- DEiN SEiN

## Grundidee

kiNTEGRiTY ist die Integritäts- und Übersetzungsschicht zwischen Rohmaterial, Verdichtung und app-spezifischer Darstellung.

kiNTEGRiTY soll nicht einfach Texte zusammenfassen, sondern:
- Redundanzen erkennen
- tragfähige Inhalte bündeln
- Unterschiede erhalten
- Widersprüche separat ausweisen
- Inkommensurables sichtbar machen
- faktisch Falsches oder fraglich Gewordenes separat behandeln
- manuell gesetzte Must-Keep-Inhalte priorisieren
- editierbares Verdichtungsmaterial erzeugen
- menschliche Kuratierung vor und nach der Synthese ermöglichen

Wichtige Grundregel:
Nicht alles, was ähnlich klingt, darf zusammengeführt werden.
Nicht alles, was widersprüchlich ist, ist falsch.
Nicht alles, was wichtig ist, darf umformuliert werden.

kiNTEGRiTY erzeugt keine starre Endfassung, sondern ein editierbares, nachvollziehbares Verdichtungs- und Synthesematerial.

## Architekturentscheidung

kiNTEGRiTY muss als eigenes Modul im Shared Core sitzen.
Es darf nicht als isolierte Logik nur in einer einzelnen App landen.
Die UI einzelner Apps darf unterschiedlich sein, aber die Kernlogik für Integrität, Verdichtung, Redundanz, Differenzprüfung und kuratierbare Synthese soll zentral sein.

Shared Core = Denken, Struktur, Prüfung, Verdichtung, Differenzierung
App = Rendering, Kontext, Bedienlogik, Sprache, Perspektivprofil, Workflow

Shared Core bedeutet hier ausdrücklich nicht, dass alle Apps gleich wirken sollen.
Gleicher Kern, aber unterschiedliche App-Profile und unterschiedliche Darstellungen.

## Zentrale UI-Idee: horizontaler Integritätsstreifen

Zwischen den Haupttextfeldern soll es ein großes, sehr breites, aber flaches horizontales Feld geben, das sich über den Bildschirm zieht.

Dieses Feld ist kein normales Notizfeld, sondern ein kuratiertes Sicherungs- und Steuerungsfeld vor der eigentlichen Synthese.

Mögliche interne Bezeichnungen:
- Integritätsfeld
- Must-Keep-Feld
- Sicherungsfeld für Synthese
- kuratiertes Verdichtungsfeld

Funktion dieses Feldes:
- Der Nutzer kann Sätze, Halbsätze, Begriffe oder Passagen aus den umliegenden Textfeldern dort hineinziehen.
- Der Nutzer kann dort frei schreiben.
- Der Nutzer kann dort umformulieren, gewichten, umordnen und sprachlich vorbereiten.
- Der Nutzer kann festlegen:
  - muss wörtlich bleiben
  - nur leicht glätten
  - inhaltlich unbedingt erhalten
  - prominent in die Synthese übernehmen
  - nicht umdeuten

Wirkprinzip:
Je mehr der Nutzer dieses Feld manuell bearbeitet, desto stärker soll das spätere Ergebnis an seinen tatsächlichen Intentionen, Prioritäten und Formulierungswünschen ausgerichtet sein.

Wichtige Produktregel:
Was im Integritätsfeld landet, hat Vorrang vor automatischer Glättung.

Das Feld ist eine Anti-Verlust-Schicht gegen KI-bedingtes Verwässern, Überglätten, Wegverdichten oder unangemessene Neuformulierung.

## Farbliche Markierung über mehrere LLM-Felder hinweg

Wenn mehrere LLM-Ausgaben parallel angezeigt werden, zum Beispiel 4 Modelle in 4 Textfeldern, soll es eine durchlaufbezogene Begriffsmarkierung geben.

Ziel:
Gleiche oder klar verwandte Schlüsselbegriffe sollen in allen LLM-Feldern innerhalb desselben Durchlaufs gleich markiert werden.

Beispiel:
Wenn „Bewusstsein“ in diesem Run rot markiert ist, dann soll „Bewusstsein“ in allen vier Feldern rot sein.
Das gilt pro Run konsistent, aber nicht zwingend global über alle zukünftigen Sessions hinweg.

Nutzen:
- Redundanzen schnell erkennen
- zentrale Begriffe sofort sehen
- Modellüberschneidungen sichtbar machen
- Unterschiede und Schwerpunktverschiebungen besser erkennen

Wichtige Einschränkung:
Nicht alles bunt machen.
Nur relevante Schlüsselbegriffe, Cluster oder wiederkehrende Phrasen markieren.
Die Oberfläche darf nicht visuell überladen werden.

Optional:
Nicht nur exakte Wortgleichheit, sondern auch nahe Varianten oder Wortfamilien berücksichtigen, zum Beispiel:
- Bewusstsein
- bewusst
- Bewusstseinsraum

Diese können entweder dieselbe Farbe oder eine gemeinsame Farbfamilie erhalten.

## Kernlogik von kiNTEGRiTY

kiNTEGRiTY soll eingehende Texte nicht bloß mitteln oder weichspülen, sondern strukturiert analysieren und in mehrere Ergebnisarten aufteilen.

Mindestens folgende Prozesse müssen möglich sein:

1. Redundanz-Erkennung
Erkennen, welche Aussagen über mehrere Texte hinweg im Kern dasselbe sagen.

2. Tragfähigkeits-Filterung
Erkennen, welche Inhalte substanziell, belastbar, wiederkehrend, sinnvoll ergänzend oder strukturell tragfähig sind.

3. Differenz-Erhaltung
Unterschiede nicht vorschnell beseitigen, sondern dort erhalten, wo sie bedeutsam sind.

4. Widerspruchs-Erkennung
Markieren, wo Aussagen tatsächlich gegeneinander stehen.

5. Inkommensurabilitäts-Erkennung
Markieren, wo Aussagen nicht einfach widersprüchlich, sondern aus unterschiedlichen Logiken, Ebenen oder Perspektivsystemen stammen und deshalb nicht direkt synthetisierbar sind.

6. Faktizitäts-/Fraglichkeits-Erkennung
Trennen, was faktisch falsch, halluziniert, unsauber behauptet oder fragwürdig ist.

7. Must-Keep-Priorisierung
Alles, was der Nutzer im Integritätsfeld markiert, muss höher gewichtet und besonders geschützt werden.

8. Editierbare Synthese-Erzeugung
Nicht eine starre Endfassung liefern, sondern bearbeitbare Verdichtungsblöcke und kuratierbares Material.

## Ergebniszonen / Ausgabestruktur

kiNTEGRiTY soll idealerweise nicht nur ein einziges Ergebnisfeld erzeugen, sondern mehrere getrennte Ausgabebereiche.

Mindestens diese drei Ergebniszonen sollen unterstützt werden:

1. Synthese-/Verdichtungsfeld
Hier landet das kuratierte, tragfähige, verdichtbare und zusammenführbare Material.

2. DAS GROßE ABER / Inkommensurabilitätsfeld
Hier landen Spannungen, Gegensätze, unauflösbare Unterschiede, Perspektivkonflikte, Strukturbrüche oder Dinge, die nicht sauber fusioniert werden dürfen.

3. Fraglich / Fehlerhaft
Hier landen faktisch falsche, halluzinierte, unsaubere oder epistemisch problematische Inhalte.

Wichtige Unterscheidung:
Inkommensurabel ist nicht dasselbe wie falsch.
Widersprüchlich ist nicht automatisch wertlos.
Abweichung darf nicht automatisch gelöscht werden.

## Zentrale Anforderung: volle Editierbarkeit

Das von kiNTEGRiTY erzeugte Material muss bearbeitbar bleiben.
Das ist ein Kernprinzip, kein Zusatz.

Der Nutzer muss das kuratierte, synthetisierte und verdichtete Material direkt editieren können:
- umformulieren
- neue Passagen einfügen
- hineintippen
- hineinkopieren
- Text aus anderen Quellen einfügen
- vorhandene Verdichtungen überarbeiten
- Abschnitte löschen
- Abschnitte verschieben
- Gewichtungen verändern
- Formulierungen retten
- neue Übergänge bauen

Die KI liefert also kein abgeschlossenes Ergebnis, sondern einen editierbaren Zwischenkörper.

Leitsatz:
Alles, was verdichtet wurde, bleibt beschreibbar.

Oder:
Synthese ist kein Endergebnis, sondern ein bearbeitbarer Zwischenkörper.

## Inputs von Apps an kiNTEGRiTY

kiNTEGRiTY muss Material aus verschiedenen Apps annehmen können. Typische Inputs sind:

- mehrere parallele LLM-Antworten
- Nutzer-Notizen
- Inhalte aus dem horizontalen Integritätsfeld
- markierte Must-Keep-Passagen
- Rohtexte
- Zwischenstände
- manuell kuratierte Textfragmente
- optional Metadaten wie:
  - Quelle
  - Rolle
  - Perspektive
  - Sprache
  - Status
  - Herkunft
  - Priorität
  - Integritätsmarkierung

## Outputs von kiNTEGRiTY

kiNTEGRiTY soll strukturierte Ergebnisse ausgeben, keine bloße Endantwort.
Beispielhafte Output-Struktur:

- synthesis_candidates
- must_keep_blocks
- redundancy_clusters
- term_clusters
- incommensurabilities
- contradictions
- factually_questionable
- open_tensions
- editable_master_blocks
- provenance / trace

Der Provenance-/Trace-Anteil ist wichtig.
Es muss nachvollziehbar bleiben, aus welchen Eingaben, Modellen, Notizen oder Nutzerinterventionen eine Verdichtung entstanden ist.

Keine Black Box, die einfach schön umformuliert, aber ihre Herkunft versteckt.

## Interne Teilmodule von kiNTEGRiTY

kiNTEGRiTY soll intern modular gedacht werden. Zum Beispiel:

### 1. Alignment / Similarity Layer
Erkennt gleiche oder nahe Inhalte über mehrere Texte hinweg.

### 2. Redundancy Compression Layer
Bündelt Wiederholungen, ohne Bedeutungsnuancen zu zerstören.

### 3. Integrity Preservation Layer
Schützt Must-Keep-Inhalte, manuell gesetzte Prioritäten und sprachlich sensible Formulierungen.

### 4. Conflict / Incommensurability Layer
Trennt zwischen:
- produktiv ergänzend
- widersprüchlich
- inkommensurabel
- faktisch problematisch

### 5. Editable Synthesis Layer
Erzeugt bearbeitbare Verdichtungsblöcke statt eines fixen Endtexts.

### 6. Provenance / Trace Layer
Speichert und zeigt nachvollziehbar, woher Inhalte stammen und warum sie wie behandelt wurden.

## App-spezifische Profile

kiNTEGRiTY soll ein Shared-Core-Modul mit mehreren Betriebsmodi bzw. Profilen sein.
Die Apps nutzen denselben Kern, aber mit unterschiedlichen Gewichtungen und Darstellungen.

Beispielhafte Profile:
- brainstorm_profile
- expert_table_profile
- tisch_profile
- moonfingers_profile
- deep_thought_profile
- heilsein_profile
- deinsein_profile

Diese Profile können unter anderem steuern:
- wie stark verdichtet wird
- wie konservativ umformuliert wird
- wie viel Originalsprache erhalten bleibt
- wie aggressiv Redundanzen entfernt werden
- wie sensibel Must-Keep-Sätze behandelt werden
- wie stark Unterschiede separat gezogen werden
- wie Konflikte gerendert werden
- welche Ausgabeformate bevorzugt werden

## App-spezifische Nutzung

BRaiNSTORM SPiRAL:
Schutz von Rohgedanken, Schlüsselsätzen, Verdichtungsentwürfen, Brückenideen und kreativen Clustern.

EXPERTEN TiSCH / TiSCH-Apps:
Perspektivübergreifende Synthese mit sauberer Trennung von Gemeinsamkeiten, Widersprüchen, Spannungen und Inkommensurabilitäten.

MOONFiNGERS:
Schutz feiner begrifflicher und traditionsbezogener Unterschiede; keine vorschnelle Verschmelzung spiritueller, philosophischer oder religiöser Systeme.

DENK TiEF:
Tiefenverdichtung mit Erhalt von Spannungen, Strukturintuitionen und noch nicht voll aufgelösten Denkbewegungen.

HEiL SEiN / DEiN SEiN:
Sprachsensible, personale Verdichtung mit besonderem Schutz individueller Formulierungen, existenzieller Kernsätze und nicht austauschbarer Ausdrucksweisen.

## Nicht-Ziele

kiNTEGRiTY soll ausdrücklich nicht:
- bloß generisch „zusammenfassen“
- Unterschiede weichbügeln
- alles zu einer Einheitsmasse machen
- widersprüchliche Inhalte automatisch löschen
- inkommensurable Perspektiven künstlich harmonisieren
- wichtige Sätze frei umschreiben, wenn der Nutzer sie erhalten wollte
- ein statisches, endgültiges Output-Dokument erzwingen
- app-spezifische UI vollständig bestimmen

kiNTEGRiTY liefert die Logik, nicht die finale UI.
kiNTEGRiTY liefert die Struktur, nicht die app-spezifische Atmosphäre.
kiNTEGRiTY darf nicht mit einer simplen Synthesis Engine verwechselt werden.

## Produkt- und Implementierungsleitsätze

- Manuelle Kuratierung vor Synthese.
- Was im Integritätsfeld landet, hat Vorrang vor automatischer Glättung.
- Die KI produziert keine Endfassung, sondern editierbares Verdichtungsmaterial.
- Unterschiede dürfen sichtbar bleiben.
- Inkommensurables muss nicht falsch sein.
- Widerspruch ist nicht automatisch Ausschuss.
- Must-Keep-Inhalte dürfen nicht wegverdichtet werden.
- Alles, was verdichtet wurde, bleibt bearbeitbar.
- Gleicher Shared Core, aber keine nivellierte Einheitswirkung aller Apps.

## Kanonische Kurzdefinition

kiNTEGRiTY ist das Shared-Core-Modul für integritätswahrende Verdichtung, Synthese, Differenzprüfung und strukturierte Separierung von Redundanz, Widerspruch, Inkommensurabilität und Fehlerhaftigkeit. Es erzeugt kein bloßes Endresultat, sondern editierbares, nachvollziehbares Verdichtungsmaterial für verschiedene Apps und Kontexte.

**OPENAI · CHATGPT:** kiNTEGRiTY ist ein zentrales Modul innerhalb des MiNDLAXY-Systems, das die Grundlage für die Integrität und Wirkung der Inhalte mehrerer Anwendungen bietet. Anstatt einfache Zusammenfassungen zu erstellen, analysiert kiNTEGRiTY Rohinhalte und verarbeitet sie in verschiedene Kategorien, um Unterschiede, Widersprüche und relevante Inhalte strukturiert darzustellen. Dies erfordert eine komplexe Logik, die sicherstellt, dass wichtige Aussagen nicht verwässert oder unsachgemäß umformuliert werden. Der Nutzer erhält die Möglichkeit, Inhalte manuell zu kuratieren und eigene Prioritäten zu setzen, was die Transparenz und Nachvollziehbarkeit der Synthese fördert. Ein zentrales UI-Element ist das horizontale Integritätsfeld, in dem Nutzer aktive Kontrolle über die ausgewählten Inhalte haben und festlegen können, was beibehalten oder verändert werden soll. Durch die modulare Architektur kann kiNTEGRiTY verschiedene Anforderungen der Apps flexibel bedienen, während die Kernlogik und -struktur einheitlich bleibt. Insgesamt zielt kiNTEGRiTY darauf ab, die Qualität und Integrität der Informationen über verschiedene Plattformen hinweg zu sichern und gleichzeitig die Nutzer in die Gestaltung und Entwicklung ihrer Inhalte aktiv einzubeziehen.

---

*OPENAI · CHATGPT · 2026-04-04*
