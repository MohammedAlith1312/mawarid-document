---
sidebar_position: 1
---

# Leave Request

The **Leave Request** page allows employees to submit annual, sick, or other types of leave requests through the self-service portal.

## Page Type

- **Type:** Workflow

## Workflow Stages

`Draft` → `Submitted` → `Approved` → `Rejected/Cancelled` → `Error`

## ERP API Calls

| Action | ERP API Endpoint |
|---|---|
| Get Manager | `api/v1/erp/getReportingManagerForEmployee` |
| Get Employee Details | `api/v1/erp/getEmployeeDetailsByEmployeeIdOrName` |
| Get Leave Balance | `api/v1/erp/getBalancesOfVisaVacationAndTicket` |
| Initiate Request | `api/v1/erp/InitiateLeaveRequest` |
| Validate Request | `/api/v1/erp/ValidateleaveRequest` |
| Insert (Create) | `api/v1/erp/insertLeaveRequest` |
| Delete Draft | `api/v1/erp/ExecutDeleteDraftVacationRequest` |
| File Upload | `api/v1/erp/createAttachFileLeaveRequest` |
| Submit to Workflow | `services/MWMawaridServiceGroup/MWMawaridService/submitLeaveRequestToWF` |

## Notes

- Employee must have sufficient leave balance before submitting.
- Manager is auto-fetched from ERP based on the employee profile.
- File attachments are supported for medical or supporting documents.
