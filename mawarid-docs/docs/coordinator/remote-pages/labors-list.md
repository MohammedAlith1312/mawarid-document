---
sidebar_position: 8
---

# Labors List

The **Labors List** page displays a paginated list of labor/workers assigned to a specific project.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v2/crm/GetLaborListPaging?ProjectID=e6deab50-ee4e-ed11-bba3-000d3adf7194&legalEntity=MWD
```

## Query Parameters

| Parameter | Description |
|---|---|
| `ProjectID` | CRM Project GUID from the top nav bar |
| `legalEntity` | Legal entity code (e.g., `MWD`) |

## Notes

- The `ProjectID` is a GUID from the CRM system, different from the ERP project code.
- Results include all workers (employees) currently assigned to the selected project.
