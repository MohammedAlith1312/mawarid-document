---
sidebar_position: 12
---

# Letter Download

The **Letter Download** page allows employees to view and download official HR letters.

## Functionality

1. Shows a **list of available letter types** for the employee.
2. Employee selects a letter type and **downloads** the letter document.

## APIs

| Step | Method | URL | Params |
|---|---|---|---|
| List letter types | GET | `crm/GetDownLoadLetterTypes` | — |
| Download letter | GET | `crm/GetDownLetterWord` | `{LaborId, LetterId, ArabicDest, EnglishDest}` |
