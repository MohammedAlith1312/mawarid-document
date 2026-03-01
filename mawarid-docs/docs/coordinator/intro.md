---
sidebar_position: 1
---

# Coordinator

The **Mawarid Coordinator Portal** provides project coordinators with tools to manage customers, projects, financial reports, employee timesheets, and contract workflows.

## Key Functionality

> **Customer and Project must be selected from the top nav bar.**
> The top nav bar form loads dynamically based on the app configuration.

## Base URL

```
https://bcp.mawarid.com.sa
```

## Pages Overview

### Remote Pages (Data from ERP / CRM)

| Page | Description |
|---|---|
| [All Customers](./remote-pages/all-customers) | List all CRM customers |
| [All Projects](./remote-pages/all-projects) | List all CRM projects |
| [Admin Requests](./remote-pages/admin-requests) | View project-based requests |
| [Leave & Termination](./remote-pages/leave-and-termination) | Return/termination requests by project |
| [All Invoice](./remote-pages/all-invoice) | Customer invoice journal |
| [Pending Invoices](./remote-pages/pending-invoices) | Invoices pending settlement |
| [Aging Report](./remote-pages/aging-report) | Downloadable aging balance report |
| [Labors List](./remote-pages/labors-list) | Labor list by project |
| [Account Statement](./remote-pages/account-statement) | Customer account statement |
| [Loan Report](./remote-pages/loan-report) | Employee loan details by project |
| [Customer Transaction](./remote-pages/customer-transaction) | All customer transactions |
| [Customer Payments](./remote-pages/customer-payments) | All customer payments |
| [Worker Pay Statement](./remote-pages/worker-pay-statement) | Worker payroll statement |
| [Employee Timesheet](./remote-pages/employee-timesheet) | Timesheet list by period |
| [Timesheet Approve](./remote-pages/timesheet-approve) | Approve employee timesheets |

### Entity Pages (Configuration & Workflows)

| Page | Type | Description |
|---|---|---|
| [Customers](./entities/customers) | Entity | Setup for top nav bar |
| [Projects](./entities/projects) | Entity | Setup for top nav bar |
| [Request Type](./entities/request-type) | Entity | Master data |
| [Messages](./entities/messages) | Entity | Send notifications by nationality/language |
| [Contract Renewal](./entities/contract-renewal) | Entity - Workflow | Renewal notifications to employees |
| [Employee Request](./entities/employee-request) | Entity - Workflow | Integration with employee portal (test data) |

---

## Project Details

coordinator developed under Old Apps4x (system - platform)

| Field | Details |
|---|---|
| **URL** | [https://portal.mawarid.com.sa/System/#/Coordinator/login/](https://portal.mawarid.com.sa/System/#/Coordinator/login/) |
| **Swagger URL** | [https://portal.mawarid.com.sa/Systemapi/swagger/index.html](https://portal.mawarid.com.sa/Systemapi/swagger/index.html) |
| **Deployment Server** | `172.16.1.109` |
| **API Path** | `E:\IISApplication\SystemApi` |
| **UI Path** | `E:\IISApplication\App\System` |
| **DB Server** | `172.16.1.109` |
| **DB Name** | `NewSystemMWD` |
| **Resources** | AjeeshNasar, HyderAli Mehran Basith|
