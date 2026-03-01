---
sidebar_position: 5
---

# Store Item Request

The **Store Item Request** page allows employees to request items from the company's internal store or inventory.

## Page Type

- **Type:** Workflow

## Workflow Stages

`Draft` → `Submitted` → `Approved` → `Rejected/Cancelled` → `Error`

## ERP API Calls

| Action | ERP API Endpoint |
|---|---|
| Get Manager | `api/v1/erp/getReportingManagerForEmployee` |
| Get Employee Details | `api/v1/erp/getEmployeeDetailsByEmployeeIdOrName` |
| Validate Request | `/api/v1/recruitment/ValidateItemRequest` |
| Insert (Create) | `/api/v1/erp/CreateItemRequest` |
| Submit to Workflow | `i/services/MWRecIntegration/MWRecPortalIntegrationService/ExecutSubmitItemRequestToWFRequest` |

## Notes

- Only items available in the store inventory can be requested.
- The system validates item availability before allowing submission.
