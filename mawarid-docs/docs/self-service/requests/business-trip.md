---
sidebar_position: 3
---

# Business Trip Request

The **Business Trip Request** page allows employees to request approval for official business travel.

## Page Type

- **Type:** Workflow

## Workflow Stages

`Draft` → `Submitted` → `Approved` → `Rejected/Cancelled` → `Error`

## ERP API Calls

| Action | ERP API Endpoint |
|---|---|
| Initiate Request | `api/v1/erp/InitiateBusinessRequest` |
| Get Manager | `api/v1/erp/getReportingManagerForEmployee` |
| Get Employee Details | `api/v1/erp/getEmployeeDetailsByEmployeeIdOrName` |
| Validate Request | `api/v1/erp/ValidateLoanRequest` |
| Insert (Create) | `api/v1/erp/creationOfLoanRequest` |
| Delete Draft | `api/v1/erp/ExecutDeleteDraftLoanRequest` |
| Submit to Workflow | `/MWMawaridService/submitLoanRequestToWF` |

## Notes

- Trip destination, purpose, and duration must be specified.
- Expense estimates can be attached during submission.
