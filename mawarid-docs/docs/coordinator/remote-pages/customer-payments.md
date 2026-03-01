---
sidebar_position: 12
---

# Customer Payments

The **Customer Payments** page shows all payment records made by a customer against a specific project.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v1/erp/getAllCustomerPayments?_custAccount=CBN0002248&_projId=BR0002204&legalEntity=mwd
```

## Query Parameters

| Parameter | Description |
|---|---|
| `_custAccount` | Customer account number from ERP |
| `_projId` | ERP Project ID |
| `legalEntity` | Legal entity code (e.g., `mwd`) |

## Notes

- Only payment-type transactions are returned (not invoices or adjustments).
- Useful for reconciling customer balances.
