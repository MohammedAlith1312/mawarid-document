---
sidebar_position: 2
---

# Zatca Invoice

The **Zatca Invoice** page displays a history list of all ZATCA-compliant electronic invoices issued by the organization.

## Page Type

- **Type:** Remote

## Data Source

| Property | Value |
|---|---|
| Connection | DB Connector |
| SQL View | `ZatcaInvoice` |

## Functionality

- **Read-only** list view of ZATCA invoice history
- No create, edit, or delete actions available
- Data is loaded directly from the database via the SQL view

## About ZATCA

ZATCA (Zakat, Tax and Customs Authority) e-invoicing is a mandatory requirement in Saudi Arabia. This page shows all invoices that have been generated and reported in compliance with ZATCA regulations.

## Displayed Information

- Invoice number and date
- Customer and supplier details
- Invoice total and VAT amount
- ZATCA submission/compliance status
