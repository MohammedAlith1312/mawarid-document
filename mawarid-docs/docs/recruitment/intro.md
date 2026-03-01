---
sidebar_position: 1
---

# Recruitment

The **Recruitment** application provides a comprehensive system for managing the hiring process, including agent setup, workflow configuration, and detailed reporting.

## Getting Started

The application flow typically starts within the Security menu:

1. **Recruitment User Creation**: Navigate to the **Security** folder &rarr; **Recruitment Users** menu to create internal user accounts.
2. **Assigning Agents**: During user creation, you can assign recruitment agents to the user by clicking the **plus icon** at the end of the data row.
3. **Login & Access**: Once the user logs in, they will automatically have access to data corresponding to the agents assigned during their account creation.

---

## Application Structure

The application is organized into the following main folders and sections:

### Setup
- **Application Status**: This menu serves as the core action engine for the application. It allows you to define a tree structure for application statuses and their corresponding available actions. For instance, when an application has a "New" status, this menu dictates which subsequent statuses and actions are accessible from that point onward.

### Report
This section provides various detailed reports and summaries tailored to the logged-in user's assigned agents:

- **Recruitment Project**: Displays the recruitment projects assigned to your associated agents. It features a tile grouped by **Recruitment Status** and allows filtering by specific Agent IDs assigned to you.
- **Application**: Shows detailed application data based on the recruiting IDs of your assigned agents. 
  - Features tiles grouped by **Application Status**.
  - Includes filters for **Recruiting ID** and **Application ID** to view specific agent data.
  - Provides a **Salary Action Tile** which offers options to:
    - **Download Empty Template**: For salary data imports.
    - **Download Salary Application**: Export all or filtered salary applications.
    - **Upload Salary**: Import data to update salary information.
- **Recruitment Project Summary**: Provides a high-level card list view of recruitment project data, grouped by application status. It includes essential filters for **Agent ID** and **Recruiting ID**.
- **Pending Passport Application**: Lists pending requests related to candidate passports. Action options include:
  - **Download Empty Template**: Generates a template for bulk uploading.
  - **Download Passport Application**: Exports all or filtered passport applications.
  - **Upload Passport**: Allows you to bulk update passport data securely.
- **Application Summary**: A consolidated, card-scrollable view of applications, grouped by status. It includes the following filters to refine and display precise agent-related data:
  - **From Date**
  - **To Date**
  - **Recruiting ID**
  - **Agent Account**
  - **Include ERP**

### Import
- **Import History**: View the logs and statuses of previous data import operations to monitor for success or failure.

### Security
This section handles access control for the application:
- **Agent Users**: Create and manage external user accounts for agents, allowing them to access the Agent Portal.
- **Recruitment Users**: Manage internal user accounts and their agent assignments as described in the "Getting Started" section.

---

## Project Details

Recuritment developed under Apps4x - apps

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
