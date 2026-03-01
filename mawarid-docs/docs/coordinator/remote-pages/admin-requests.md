---
sidebar_position: 3
---

# Admin Requests

The **Admin Requests** page shows all requests filtered by the selected project in the top nav bar.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v2/crm/GetRequests?ProjectID=
```

## Query Parameters

| Parameter | Description |
|---|---|
| `ProjectID` | The ID of the selected project from the top nav bar |

## Notes

- The `ProjectID` is automatically populated from the top nav bar selection.
- Coordinators can view and manage all request types submitted under the selected project.
