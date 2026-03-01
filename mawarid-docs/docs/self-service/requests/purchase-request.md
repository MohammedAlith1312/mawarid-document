---
sidebar_position: 4
---

# Purchase Request

The **Purchase Request** page allows employees to submit procurement requests for goods or services.

## Page Type

- **Type:** Workflow

## Workflow Stages

`Draft` → `Submitted` → `Approved` → `Rejected/Cancelled` → `Error`

## ERP API Calls

| Action | ERP API Endpoint |
|---|---|
| Get Manager | `api/v1/erp/getReportingManagerForEmployee` |
| Get Employee Details | `api/v1/erp/getEmployeeDetailsByEmployeeIdOrName` |
| Insert Header | `/api/v1/erp/CreatePurchReuestHeader` |
| Delete Draft | `api/v1/erp/ExecutDeleteDraftPurchaseRequest` |
| Submit to Workflow | `MWRecIntegration/MWRecPortalIntegrationService/ExecutSubmitPurchaseRequestToWFRequest` |

### Purchase Request Line

| Action | ERP API Endpoint |
|---|---|
| Insert Line Item | `/api/v1/erp/CreatePurchReuestLine` |

## Notes

- A purchase request consists of a **header** and one or more **line items**.
- Each line item specifies the item, quantity, and estimated cost.
- The request is submitted as a whole after all lines are added.
