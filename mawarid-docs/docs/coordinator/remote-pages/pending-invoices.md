---
sidebar_position: 6
---

# Pending Invoices

The **Pending Invoices** page shows invoices that are not yet settled for the selected customer and project.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v1/erp/getPendingInvoices?_custAccount=CBN0002248&_projId=BR0002204&legalEntity=MWD
```

## Query Parameters

| Parameter | Description |
|---|---|
| `_custAccount` | Customer account number from ERP |
| `_projId` | Project ID from ERP |
| `legalEntity` | Legal entity code (e.g., `MWD`) |

## Notes

- Only invoices with an open/pending status are returned.
- Data is pulled live from ERP.
