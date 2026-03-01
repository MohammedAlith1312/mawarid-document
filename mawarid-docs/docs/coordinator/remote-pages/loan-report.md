---
sidebar_position: 10
---

# Loan Report

The **Loan Report** page shows a detailed list of employee loan records for the selected project.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v1/erp/getEmployeeLoanDetailsList?_projId=BR0002204&legalEntity=MWD
```

## Query Parameters

| Parameter | Description |
|---|---|
| `_projId` | ERP Project ID from the top nav bar |
| `legalEntity` | Legal entity code (e.g., `MWD`) |

## Notes

- Shows all loan records for employees assigned to the selected project.
- Loan details include amount, installments, and repayment status.
