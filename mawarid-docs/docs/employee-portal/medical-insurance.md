---
sidebar_position: 14
---

# Medical Insurance

The **Medical Insurance** page shows the employee's current medical insurance details and the list of covered clinics.

## Functionality

1. Displays the current employee's medical insurance information.
2. Shows all clinics covered under the employee's medical insurance plan.

## APIs

| Step | Method | URL | Params |
|---|---|---|---|
| Insurance details | GET | `crm/GetEmployeeByID` | `{IqamaNO}` |
| Clinic list | GET | `crm/GetMedicalCover` | — |
