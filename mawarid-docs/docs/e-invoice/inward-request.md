---
sidebar_position: 3
---

# Inward Request

The **Inward Request** page displays a history list of all incoming invoice requests received by the organization.

## Page Type

- **Type:** Remote

## Data Source

| Property | Value |
|---|---|
| Connection | DB Connector |
| SQL View | `InwardRequest` |

## Functionality

- **Read-only** list view of inward invoice request history
- No create, edit, or delete actions available
- Data is loaded directly from the database via the SQL view

## Displayed Information

- Request ID and date received
- Sender/supplier details
- Invoice reference number
- Request status
