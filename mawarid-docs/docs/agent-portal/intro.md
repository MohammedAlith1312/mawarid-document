---
sidebar_position: 1
---

# Agent Portal

The **Agent Portal** is a dedicated, self-service platform for recruitment agents to manage their candidates, applications, and communications with the organization. 

## Application Flow

The workflow for the Agent Portal starts within the Recruitment application:
1. **User Creation**: A user account for the agent is created in the Recruitment app under the **Security** folder &rarr; **Agent Users** menu.
2. **Accessing the Portal**: Once the account is created, the user can log in directly to the Agent Portal.

---

## Dashboard

Upon logging in, the user lands on the **Dashboard**:
- **Recruitment Projects**: Displays the number of recruitment projects assigned to the user's role.
- **Applications**: Displayed directly below the project count, showing the total number of applications corresponding to the assigned project.

---

## Recruitment Project Menu

This menu lists all **Active Recruitment Projects**. A project is considered active if its status is either **Scheduled** or **Started**.

---

## Application Menu

The Application menu presents a comprehensive view of all applications tied to the currently logged-in user. The total number of assigned applications is shown on the **Application Status Tile**.

Below the status tile, there is an **Application Grid** with a **Recruiting ID** dropdown on the right. This grid contains four distinct sections:

### 1. Candidate
This section allows agents to add or manage candidate details:
- **Add Single Candidate**: Creates a single application entry based on the selected Recruiting ID.
- **Empty Template**: Exports an empty template to be used for bulk uploading candidate data.
- **Upload Candidate**: Allows bulk updating by uploading the populated template.

### 2. Application
This section handles application status updates:
- **Current Application**: Exports the currently selected rows from the grid into an Excel sheet.
- **Upload Status**: Updates the status of multiple applications simultaneously using the uploaded template.

### 3. Ticket
This section manages flight tickets for candidates:
- **Empty Template**: Exports an empty template for ticket uploads.
- **All Stamped Application**: Exports all candidate applications that have been stamped (visa processed).
- **Upload Tickets**: Uploads flight tickets for the available flight plans.

### 4. Passport
This section focuses on managing and updating candidate passports:
- **Empty Template**: Exports an empty template for passport uploads.
- **Current Application**: Exports the selected applications into an Excel sheet.
- **Empty Passport Application**: Exports applications that currently lack attached passport details.
- **Upload Passport**: Updates candidate passport information using the uploaded template.

---

## Flight Plan Menu

The Flight Plan menu is designed to help agents arrange flight accommodations. The **Create** option is available here for organizing flights specifically for **stamped applications**.

---

## Upload History Menu

The Upload History menu acts as an audit log for all Excel sheet uploads. It registers every upload attempt allowing users to monitor for success or failure. Supported statuses include:
- **Success**: All records uploaded successfully without issue.
- **Fail**: The entire upload failed.
- **Partial**: Some records uploaded successfully while others failed.

---

## Support Ticket Menu

| **Support Ticket Menu** | If an agent needs technical assistance or encounters an issue, they can easily create helpdesk tickets from the **Support Ticket** menu to reach out to the support team. |

---

## Project Details

Agent Portal developed under Apps4x - Portal - apps(Recuritment)

| Field | Details |
|---|---|
| **URL** | [https://portal.mawarid.com.sa/apps4x/#/Agent](https://portal.mawarid.com.sa/apps4x/#/Agent) |
| **Swagger URL** | [https://portal.mawarid.com.sa/apps4x-api/swagger/index.html](https://portal.mawarid.com.sa/apps4x-api/swagger/index.html) |
| **Deployment Server** | `172.16.1.109` |
| **API Path** | `E:\IISApplication\apps4x-api` |
| **UI Path** | `E:\IISApplication\App\apps4x` |
| **DB Server** | `172.16.1.109` |
| **DB Name** | `MWDApps4xPlat`, `MWDApps4xData` |
| **Resources** | AjeeshNasar, HyderAli, Mehran Basith |
