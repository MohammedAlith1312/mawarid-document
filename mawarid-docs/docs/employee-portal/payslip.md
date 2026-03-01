---
sidebar_position: 11
---

# Payslip

The **Payslip** page shows the employee's last 3 months of payslip details with the option to download.

## Functionality

1. Displays a **list of payslips** for the last 3 months.
2. Employee can select and **download** a specific payslip.

## APIs

| Step | Method | URL | Params |
|---|---|---|---|
| List payslips | GET | `erp/getEmployeePaySlipDetails` | `{_employeeId, legalEntity}` |
| Download payslip | GET | `erp/getEmployeePaySlip` | `{_payGroupID, _employeeId, _periodId, legalEntity}` |
