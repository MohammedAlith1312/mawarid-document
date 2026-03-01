---
sidebar_position: 2
---

# All Projects

The **All Projects** page displays a paginated list of all CRM projects associated with the coordinator.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v2/crm/GetAllProjects?pageNumber=1&pageSize=10&searchData=
```

## Query Parameters

| Parameter | Description |
|---|---|
| `pageNumber` | Current page number (default: 1) |
| `pageSize` | Number of records per page (default: 10) |
| `searchData` | Optional search keyword for filtering |

## Notes

- Project selection from this page populates the **top nav bar** context for all other pages.
- The top nav form loads dynamically based on the app configuration.
