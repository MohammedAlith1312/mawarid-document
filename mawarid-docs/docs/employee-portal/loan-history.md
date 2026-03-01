---
sidebar_position: 9
---

# Loan History

The **Loan History** page shows the employee's loan list from ERP.

## Functionality

- Displays a list of all loans associated with the logged-in employee.
- Each loan entry can be expanded to show [Loan History Lines](./loan-history-lines).

## APIs

| Method | URL | Params |
|---|---|---|
| GET | `erp/getEmployeeLoanDetails` | `{personnelNumber, projId, legalEntity}` |
