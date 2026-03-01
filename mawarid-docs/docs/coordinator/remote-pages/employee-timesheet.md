---
sidebar_position: 14
---

# Employee Timesheet

The **Employee Timesheet** page shows the timesheet records for employees of a project, filtered by timesheet period.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v1/erp/GetTimeSheetTableList?_projId=BR0002204&_timesheetPeriod=
```

## Query Parameters

| Parameter | Description |
|---|---|
| `_projId` | ERP Project ID from the top nav bar |
| `_timesheetPeriod` | Timesheet period (e.g., month/year) |

## Notes

- The timesheet period must be selected before loading data.
- Records include daily hours, task codes, and approval status per employee.
