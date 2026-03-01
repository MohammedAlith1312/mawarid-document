---
sidebar_position: 1
---

# All Customers

The **All Customers** page displays a paginated list of all CRM customer accounts available to the coordinator.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v2/crm/GetAllAccountPaging?pageNumber=1&pageSize=10&SearchData=
```

## Query Parameters

| Parameter | Description |
|---|---|
| `pageNumber` | Current page number (default: 1) |
| `pageSize` | Number of records per page (default: 10) |
| `SearchData` | Optional search keyword for filtering |

## Notes

- Customer selection from this page populates the **top nav bar** for project filtering.
- Only customers linked to the coordinator's assigned projects are shown.
