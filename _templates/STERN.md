---
typ: Stern
titel: <% tp.file.title %>
erstellt: <% tp.date.now("YYYY-MM-DD") %>
masse: 1
schwerkraft: niedrig
status: aktiv
tags: [stern, mindlaxy]
---

# <% tp.file.title %>

## Kernaussage
> Was ist das Zentrum dieses Themas in einem Satz?

## Hauptgedanken

## Planeten
```dataview
LIST FROM "Planeten" WHERE contains(stern, this.file.name)
```

## Entwicklung

---
*Stern — primäres Themenzentrum im SPiRAL MiND GALAXY*
