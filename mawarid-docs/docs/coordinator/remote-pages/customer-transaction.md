---
sidebar_position: 11
---

# Customer Transaction

The **Customer Transaction** page shows all financial transactions for a specific customer and project from ERP.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v1/erp/getAllCustomerTransactions?_custAccount=CBN0002248&_projId=BR0002204&legalEntity=mwd
```

## Query Parameters

| Parameter | Description |
|---|---|
| `_custAccount` | Customer account number from ERP |
| `_projId` | ERP Project ID |
| `legalEntity` | Legal entity code (e.g., `mwd`) |

## Notes

- Includes all transaction types: invoices, payments, credit notes, etc.
- Values are pulled live from ERP for the selected customer/project combination.
