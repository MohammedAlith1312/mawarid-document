---
sidebar_position: 5
---

# All Invoice

The **All Invoice** page displays the customer invoice journal from ERP, filtered by customer account and project.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v1/erp/getCustInvoiceJour?_custAccount=CBN0002248&_projId=BR0002204&legalEntity=MWD
```

## Query Parameters

| Parameter | Description |
|---|---|
| `_custAccount` | Customer account number from ERP |
| `_projId` | Project ID from ERP |
| `legalEntity` | Legal entity code (e.g., `MWD`) |

## Notes

- The customer account and project values are populated from the top nav bar selection.
- Displays all invoice records posted against the selected customer and project.
