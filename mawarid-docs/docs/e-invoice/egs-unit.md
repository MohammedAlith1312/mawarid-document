---
sidebar_position: 5
---

# EGS Unit

The **EGS Unit** page displays a history list of all EGS (E-Invoice Generation Solution) device/unit records registered with ZATCA.

## Page Type

- **Type:** Remote

## Data Source

| Property | Value |
|---|---|
| Connection | DB Connector |
| SQL View | `EGSUnit` |

## Functionality

- **Read-only** list view of EGS unit records
- No create, edit, or delete actions available
- Data is loaded directly from the database via the SQL view

## About EGS

An EGS Unit is a hardware or software device registered with ZATCA that is authorized to generate and sign ZATCA-compliant e-invoices. Each unit has a unique identifier and cryptographic certificate.

## Displayed Information

- EGS Unit ID and name
- Serial number / device identifier
- Registration status with ZATCA
- Certificate validity dates
