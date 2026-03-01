---
sidebar_position: 2
---
# Internal Portal 

---

## 1. Introduction

### 1.1 Purpose
This Functional Design Document (FDD) defines the functional behavior, workflows, validations, and user interactions for **Internal Portal – Phase 1**. It serves as a reference for development, testing, and stakeholder validation.

### 1.2 Scope (Phase 1)
Phase 1 includes the following modules:
- Login
- Attendance
- Profile
- Self Service
- Document & Insurance
- Application List
- Notifications (Pending Approvals)

---

## 2. User Roles (Phase 1)

| Role | Description |
|----|----|
| Employee | Default portal user with access to self-services, attendance, profile, and documents |
| Manager | Employee with approval visibility (pending approvals count only – Phase 1) |

---

## 3. Module-wise Functional Design

---

## 3.1 Login Module

### 3.1.1 Description
The system provides centralized login using Single Sign-On (SSO). No separate login screen is required.

### 3.1.2 Functional Flow
1. User accesses the Internal Portal URL.
2. System authenticates the user via AD / SSO.
3. If the user is logging in for the first time:
   - Prompt user to enter **Employee ID**.
   - System validates Employee ID format.
4. System fetches the following details from ERP:
   - Reporting Manager
   - Designation
   - Department
5. Fetched details are stored in the local database.
6. User is redirected to the Welcome / Home page.

### 3.1.3 Validations & Rules
- Employee ID is mandatory on first login.
- Employee ID must exist in ERP.
- ERP fetch failure must show a user-friendly error message.

---

## 3.2 Attendance Module

### 3.2.1 Description
Attendance module automatically and manually tracks employee working hours and attendance status.

### 3.2.2 Automatic Punch-In Rules
The system shall automatically record **Punch-In** when:
- User logs into the portal.
- User opens the application for the first time on a given day.

### 3.2.3 Automatic Punch-Out Rules
The system shall automatically record **Punch-Out** when:
- User logs out from the portal.
- Browser is closed.
- System is shut down or becomes inactive (based on last heartbeat/activity timestamp).

### 3.2.4 Manual Punch-In / Punch-Out
- Users can manually Punch-In or Punch-Out if automatic tracking fails.
- Manual actions must be logged with timestamp and source.

### 3.2.5 Working Hours Clock
- A live working hours clock is displayed once Punch-In is recorded.
- Clock updates in real time until Punch-Out.

### 3.2.6 Attendance Status Calculation
Attendance Status is automatically calculated based on:
- Punch-In time
- Punch-Out time
- Total working hours

| Status | Condition (Configurable) |
|------|--------------------------|
| Present | Meets minimum working hours |
| Late | Punch-In after defined late time |
| Absent | No Punch-In recorded |

### 3.2.7 Attendance List View
Displayed fields:
- Date
- Punch-In Time
- Punch-Out Time
- Total Hours
- Late Hours
- Status (Present / Late / Absent / Holiday)

---

## 3.3 Profile Module

### 3.3.1 Description
Displays employee profile information fetched from ERP and stored locally.

### 3.3.2 Fields Displayed
- Employee Name
- Employee ID
- Email
- Mobile Number
- Designation
- Department
- Reporting Manager

### 3.3.3 Rules
- Profile details are read-only in Phase 1.
- Any updates must be done via ERP.

---

## 3.4 Self Service Module

### 3.4.1 Description
Self Service module acts as a redirection hub to existing Apps4x Self Service features.

### 3.4.2 Functional Behavior
- All self-service requests are moved to Apps4x.
- Internal Portal only redirects users to Apps4x Self Service pages.
- No self-service forms are created within Internal Portal (Phase 1).

### 3.4.3 Rules
- User permissions are handled by Apps4x.
- Portal does not store self-service transaction data.

---

## 3.5 Application List Module

### 3.5.1 Description
Displays the list of applications available to the user.

### 3.5.2 Functional Behavior
- Show application list identical to the Portal Welcome Page.
- Application visibility is based on user role and permission.

### 3.5.3 Fields Displayed
- Application Name
- Application Description
- Navigation Link

---

## 3.6 Document & Insurance Module

### 3.6.1 Description
Provides access to HR documents and insurance-related forms.

### 3.6.2 Functional Behavior
- Display list of documents similar to Portal Welcome Page.
- Allow users to download documents.

### 3.6.3 Document Types
- Insurance Forms
- HR Forms

### 3.6.4 Rules
- Documents are read-only.
- Upload or modification is not allowed in Phase 1.

---

## 3.7 Notification Module (Pending Approvals)

### 3.7.1 Description
Displays pending approval notifications for users.

### 3.7.2 Functional Behavior
- Show count of pending approvals on the dashboard.
- Clicking the notification redirects user to the respective system (Apps4x / ERP).

### 3.7.3 Rules
- Only count is shown in Phase 1.
- Detailed approval processing is out of scope.

---

## 4. Non-Functional Requirements (Phase 1)

- Authentication via SSO only
- Secure communication with ERP
- Role-based access control
- Responsive UI (desktop-first)
- Audit logging for attendance actions

---

## 5. Assumptions & Dependencies

- ERP services are available and responsive
- SSO is properly configured
- Apps4x continues to handle Self Service workflows

---

## 6. Phase 1 Deliverables

- Login with SSO
- Attendance (Auto + Manual)
- Profile View
- Self Service Redirection
- Application List
- Document & Insurance Downloads
- Pending Approval Count

---


**End of Document**

---

## Project Details

Internal Portal developed UI in React and used apps4x as a backend

| Field | Details |
|---|---|
| **URL** | [https://portal.mawarid.com.sa//mawarid-intel](https://portal.mawarid.com.sa//mawarid-intel) |
| **Swagger URL** | [https://portal.mawarid.com.sa/apps4x-api/swagger/index.html](https://portal.mawarid.com.sa/apps4x-api/swagger/index.html) |
| **Deployment Server** | `172.16.1.109` |
| **API Path** | `E:\IISApplication\apps4x-api` |
| **UI Path** | `E:\IISApplication\App\mawarid-intel` |
| **DB Server** | `172.16.1.109` |
| **DB Name** | `MWDApps4xPlat`, `MWDApps4xData` |
| **Resources** | Mohammed Juniad |
