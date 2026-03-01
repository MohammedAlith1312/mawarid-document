---
sidebar_position: 4
---

# Outward Request

The **Outward Request** page displays a history list of all outgoing invoice requests sent by the organization.

## Page Type

- **Type:** Remote

## Data Source

| Property | Value |
|---|---|
| Connection | DB Connector |
| SQL View | `OutwardRequest` |

## Functionality

- **Read-only** list view of outward invoice request history
- No create, edit, or delete actions available
- Data is loaded directly from the database via the SQL view

## Displayed Information

- Request ID and date sent
- Recipient/customer details
- Invoice reference number
- Request status and delivery confirmation
