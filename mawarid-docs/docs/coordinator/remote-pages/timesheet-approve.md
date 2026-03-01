---
sidebar_position: 15
---

# Timesheet Approve

The **Timesheet Approve** page allows coordinators to review and approve employee timesheets.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v1/erp/GetTimeSheetTableList?
```

## Notes

- This page uses the same ERP endpoint as [Employee Timesheet](./employee-timesheet) but is scoped for the approval action.
- Coordinators can approve or reject individual timesheet entries.
- Approved timesheets are posted to ERP payroll processing.
