---
typ: Planet
titel: <% tp.file.title %>
stern: "[[]]"
erstellt: <% tp.date.now("YYYY-MM-DD") %>
masse: 1
status: aktiv
tags: [planet, mindlaxy]
---

# <% tp.file.title %>

## Zugehöriger Stern
→ [[]]

## Kerninhalt

## Monde
```dataview
LIST FROM "Monde" WHERE contains(planet, this.file.name)
```

## Verbindungen
-

---
*Planet — starkes Unterthema eines Sterns*
