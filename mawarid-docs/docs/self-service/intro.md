---
sidebar_position: 1
---

# Self Service

The **Mawarid Self Service Portal** allows employees to create their requests and send approvals to the manager.

## How It Works

Before creating a request, the system performs a **validation form check via ERP**. After creation, it calls ERP to create the request and saves the generated **Request ID** from ERP.

> All pages follow a **workflow** pattern with the following stages:
> `Draft` → `Submitted` → `Approved` → `Rejected/Cancelled` → `Error`

## Sections

| Section | Description |
|---|---|
| [Dashboard](./dashboard) | Overview and quick access |
| [Requests](./requests/leave-request) | Submit Leave, Loan, Business Trip, Purchase, and Store Item requests |
| [My Approval](./my-approval) | Approve or reject requests as an approver |
| [My Request](./my-request) | View your own submitted requests |
| [All Requests](./all-requests) | Admin view of all requests |

## Base URL

```
https://bcp.mawarid.com.sa
```

## Project Details

SelfService developed under Apps4x - apps

- **URL**: [https://portal.mawarid.com.sa/apps4x/#/Agent](https://portal.mawarid.com.sa/apps4x/#/Agent)
- **Swagger URL**: [https://portal.mawarid.com.sa/apps4x-api/swagger/index.html](https://portal.mawarid.com.sa/apps4x-api/swagger/index.html)
- **Deployment Server**: `172.16.1.109`
- **API Path**: `E:\IISApplication\apps4x-api`
- **UI Path**: `E:\IISApplication\App\apps4x`
- **DB Server**: `172.16.1.109`
- **DB Name**: `MWDApps4xPlat`, `MWDApps4xData`
- **Worked People**: Mohammed Asim
