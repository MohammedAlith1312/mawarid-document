---
sidebar_position: 2
---

# My Request

The **My Request** page is the end user's personal dashboard for all submitted SDR requests.

## Functions

- View all requests submitted by the logged-in user
- Create a new request (opens the request form)
- Track the current status of each request
- View request details and history

## Creating a New Request

The request form is filled in two stages:

### Stage 1 — Filled by Requester
| Field | Description |
|---|---|
| **Category** | Select one or more systems: ERP / CRM / Portal / Integration |
| **Summary** | Free text description of the feature or change |
| **Requirements List** | User stories: *As a [role], I want [feature], So that [benefit]* with Priority |

After completing Stage 1, the user **submits** the request. Status moves to **General Manager Approval**.

### Stage 2 — Filled by General Manager
After GM approval, the GM enters **Project Benefits**:

| Benefit Type | Details |
|---|---|
| Legal | Any legal compliance or regulatory benefit |
| Financial | Cost savings, revenue impact, or financial gain |
| Other | Operational or strategic benefit types |

:::note
Once submitted, a popup indicates the number of requests ahead in the queue (New + Queue projects). This number updates as the request progresses.
:::

## Request Statuses

| Status | Description |
|---|---|
| **Draft** | Created but not yet submitted |
| **General Manager Approval** | Awaiting GM decision |
| **IT Review** | Under IT assessment and estimation |
| **Steering Committee** | Escalated for committee approval (estimation > 21 days) |
| **Approved** | Approved — project created |
| **Rejected** | Request was rejected |
| **Completed** | Development completed |
| **Hold** | Project is on hold |
