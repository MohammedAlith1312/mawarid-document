---
sidebar_position: 4
---

# Leave & Termination

The **Leave & Termination** page displays return/exit requests submitted by employees under a specific project.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v2/crm/GetReturnRequestByProject?ProjectID=
```

## Query Parameters

| Parameter | Description |
|---|---|
| `ProjectID` | The ID of the selected project from the top nav bar |

## Notes

- This page covers both leave return and termination/exit request types.
- Records are filtered based on the project selected in the top nav bar.
