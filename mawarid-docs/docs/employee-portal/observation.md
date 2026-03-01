---
sidebar_position: 13
---

# Observation

The **Observation** page works on an Observation (complaint) card — employees can view their existing observations and create new ones.

## Functionality

1. **View** all observation (complaint) records for the current employee.
2. **Create** a new observation by submitting the observation form.

## APIs

| Step | Method | URL | Params |
|---|---|---|---|
| List observations | GET | `crm/GetIncidentList` | `{EmployeeID}` |
| Create observation | POST | `crm/CreateNewIncedint` | `{SectorID, CaseType, EmpID, CaseCategory, Notes, mobileNumber}` |
