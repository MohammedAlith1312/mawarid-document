---
sidebar_position: 8
---

# Balance

The **Balance** page shows all balances for the current employee, including Visa, Vacation, and Ticket entitlements.

## Functionality

- Displays the current balance for all entitlement types for the logged-in employee.

## APIs

| Method | URL | Params |
|---|---|---|
| GET | `erp/getBalancesOfVisaVacationAndTicket` | `{EmpNum, VacationType, StartDate, VacationDays}` |
