---
sidebar_position: 1
---

# Customer Support

This section contains documentation for the Customer Support app.

## Overview

Customer Support portal for managing external customer inquiries and providing seamless service.

## Menu Structure

### Setup

The **Setup** menu is the core configuration area of the application and contains the following 7 sub-menus:

#### Customer
This is the starting point of the application. It manages the customers who require service, as the primary purpose of the application is providing customer support.

#### Address Book
The Address Book is a collection of email addresses stored for communication purposes. For example, when an email is created under a specific customer (e.g., `alsaif@mawaridservices.com` with Customer ID `CBN0001030`), the "To" email is stored in the address book along with the Customer ID. When typing in the "To" dropdown during email creation, it will load the contacts stored in the Address Book for quick selection.

#### Team
This menu defines the roles and positions of the users in the system. There are three main positions: 
- **Coordinator**
- **Supervisor**
- **Project Manager**

While creating a user in the team, a "Reporting To" field will appear for Coordinators and Supervisors. Supervisors must report to a Project Manager, and Coordinators must report to a Supervisor. Based on these selections, a hierarchical tree structure is automatically formed.

#### Team Structure
This menu is an extension of the Team menu. It visually displays the hierarchical tree structure of the users based on their defined positions (Coordinator, Supervisor, and Project Manager) and reporting lines.

#### Coordinator Customer
This menu allows you to directly assign a coordinator to specific customers. In this context, all users assigned here are treated functionally as coordinators, and their system roles are not applied.

#### My Customer
This menu contains and displays the specific customers assigned to the currently logged-in user. 

#### My Signature
This section allows the logged-in user to define their email signature. This signature is automatically shown and applied when the user is creating a new mail.

### Mails

The **Mails** menu is responsible for email communication and management within the application. It contains the following 4 sub-menus:

#### Address Book
The Address Book in the Mails menu serves the same function as the one in the Setup menu. It is a collection of email addresses stored for communication purposes. For example, when an email is created under a specific customer (e.g., `alsaif@mawaridservices.com` with Customer ID `CBN0001030`), the "To" email is stored in the address book along with the Customer ID. When typing in the "To" dropdown during email creation, it will load the contacts stored in the Address Book for quick selection.

#### New Mail
This option is used to compose and send a new email. Clicking it will open a popup window to create the mail. Based on the content of the email, it will automatically notify the respective user (coordinator).

#### Inbox
The Inbox displays all the emails that have been assigned to or received by the currently logged-in user.

#### Sent Item
The Sent Item folder contains a record of all the emails that have been created and sent by the currently logged-in user.

### Email Flow & Tickets

After creating an email, the corresponding tickets are generated and can be found in the **Tickets** folder. The Tickets folder includes the following sub-menus:

- **My Tickets**
- **Unassigned Tickets**
- **All Tickets**
- **My All Closed Tickets**
- **Assigned to me**
- **Created By Me**

#### Ticket Details
When you open a specific ticket, you will see a detailed view containing relevant information about the customer and the inquiry. From the ticket details screen, you can perform several key actions:

- **Schedule:** Schedule a time for the ticket.
- **Close:** Close the ticket once the issue is resolved.
- **Pickup:** Assign the ticket to yourself.
- **Assign:** Assign the ticket to another user.
- **Ticket:** Directly create an associated ticket in the helpdesk application.

Additionally, you can interact with the ticket using these options:
- **Comments:** Add comments to communicate regarding the ticket.
- **Notes:** Add internal notes if required.
- **Send Approval:** If authorization is needed to start work on a ticket, you can send an approval request to a specific user.

> **Note:** Important restrictions apply when an approval is pending. No further actions can be taken on a ticket until the pending approval request is completed.

#### Ticket Tabs
The ticket details screen also features multiple tabs at the bottom that display relevant information based on actions taken:
- **Conversation:** View the history of communication.
- **Ticket:** View the primary ticket details.
- **Approvals:** View any approvals linked to the ticket.
- **Attachments:** View files attached to the ticket.
- **Status History:** View the timeline of status changes for the ticket.

### Approvals

If an approval request is sent from a ticket, it will appear in the **Approvals** folder. This folder contains the following sub-menus:

- **My Pending Approvals**
- **My Completed Approvals**
- **My All Approvals**
- **Me Send Approvals**  

When the designated approver opens the approval details from this folder, they have the option to either **Approve** or **Reject** the request that was sent from the ticket.

### All Items (Admin)

The **All Items** parent menu is designed for users with admin-level permissions to track and monitor overall application usage. It includes the following sub-menus:

- **All Ticket:** View all tickets across the system.
- **All Closed Tickets:** View all tickets that have been resolved and closed.
- **All Emails:** View all email communications across the system.
- **All Received Emails:** View a log of all incoming emails.
- **All Send Emails:** View a log of all outgoing emails.
- **All Tasks:** View all tasks created within the system.
- **All Approvals:** View the status of all approvals across the application.

### Reports

The **Reports** folder provides analytical views and metrics regarding the tickets created within the system. It contains the following sub-menus:

#### Tickets By Customer
This report displays ticket data based on specific customers. 
- **Filters:** You can filter the report using a "From Date," "To Date," and "Customer ID."
- **Views:** The data is presented in both a list format and a chart visualization, categorized by the status of the tickets.

#### Request By Coordinator
This report focuses on the requests and tickets assigned to specific coordinators (users).
- **Visualization:** It displays a dedicated card for each coordinator, including their profile image. Inside the card, a chart visualizes the tickets assigned to them, organized by ticket status.

### My Team Tickets

The **My Team Tickets** folder contains the **My Team Tickets** menu. This section displays a list of tickets associated with the users in your defined team, reflecting the hierarchical team structure that was configured in the **Setup** menu.

### Dashboards

The application features two primary dashboards to provide a high-level overview of ticket metrics and team performance:

#### Dashboard
This is the main dashboard for the application. All data displayed here can be dynamically filtered using a **From Date** and **To Date**. It includes the following visual metrics:

- **All Tickets (Chart):** A graphical representation of all system tickets.
- **My Assigned Tickets (Chart):** A chart visualizing the tickets assigned specifically to you.
- **Request By Coordinator (Chart):** A chart visualizing requests handled by coordinators.
- **My Assigned Tickets (Tiles):** Quick metric tiles showing counts for your assigned tickets.
- **All Tickets (Tiles):** Quick metric tiles showing overall ticket counts.
- **Coordinators Request by Customer (List):** A detailed list view of coordinator requests broken down by customer.
- **Request by Coordinators (List):** A detailed list view outlining requests directly assigned to coordinators.

#### My Team Dashboard
This dashboard is tailored to show metrics relevant to your specific team. 
- **Filters:** It can be filtered using **From Date**, **To Date**, and **User ID**.
- **Metrics:** It displays the total count of your team's tickets categorized by their current status.
- **List View:** It also features a "Request by Coordinator" list that provides a count based on the ticket status for your team members.
