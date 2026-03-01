---
sidebar_position: 2
---

# Loan Request

The **Loan Request** page allows employees to apply for salary advances or loans through the self-service portal.

## Page Type

- **Type:** Workflow

## Workflow Stages

`Draft` → `Submitted` → `Approved` → `Rejected/Cancelled` → `Error`

## ERP API Calls

| Action | ERP API Endpoint |
|---|---|
| Initiate Request | `api/v1/erp/InitiateLoanRequest` |
| Get Manager | `api/v1/erp/getReportingManagerForEmployee` |
| Get Employee Details | `api/v1/erp/getEmployeeDetailsByEmployeeIdOrName` |
| Validate Request | `api/v1/erp/ValidateLoanRequest` |
| Insert (Create) | `api/v1/erp/creationOfLoanRequest` |
| Delete Draft | `api/v1/erp/ExecutDeleteDraftLoanRequest` |
| Submit to Workflow | `MWMawaridService/submitLoanRequestToWF` |

## Notes

- Loan eligibility is validated against ERP before allowing submission.
- The loan amount and repayment terms are configured in ERP.
