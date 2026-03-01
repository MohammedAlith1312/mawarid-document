---
sidebar_position: 16
---

# FAQ Admin

The **FAQ Admin** page is used for FAQ CRUD (Create, Read, Update, Delete) management. It is accessible to admins only.

## Functionality

1. **View** all FAQ entries.
2. **Create** a new FAQ entry.
3. **Update** an existing FAQ entry.
4. **Delete** an FAQ entry.

## APIs

| Action | Method | URL | Params |
|---|---|---|---|
| List all FAQs | GET | `security/faq` | — |
| Create FAQ | POST | `security/faq/add` | `{ModuleId, Question, Answer, Language, OrderId}` |
| Update FAQ | PUT | `security/faq/update` | `{RecId, ModuleId, Question, Answer, Language, OrderId}` |
| Delete FAQ | DELETE | `security/faq` | `{recIds}` |
