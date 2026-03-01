---
sidebar_position: 10
---

# Loan History Lines

The **Loan History Lines** page shows the detailed installment lines of a specific employee loan.

## Functionality

- Displays the breakdown of a selected loan from [Loan History](./loan-history).
- Shows each installment/payment line within the loan.

## APIs

| Method | URL | Params |
|---|---|---|
| GET | `/erp/getEmployeeLoanDetailsLineList` | `{loanId, legalEntity}` |
