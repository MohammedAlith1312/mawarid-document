---
sidebar_position: 1
---

# E-Invoice

The **Mawarid E-Invoice Portal** provides a read-only history view of all electronic invoice records.

## Functionality

> All pages in this module **display list views only** — they show the invoice history loaded from the database via SQL Views and a DB Connector.

## How It Works

- Each page connects to the database using a **DB Connector**.
- Data is fetched through a predefined **SQL View** specific to each page.
- Pages are read-only; no create/edit/delete actions are available.

## Pages

| Page | SQL View | Description |
|---|---|---|
| [Zatca Invoice](./zatca-invoice) | `ZatcaInvoice` | ZATCA-compliant invoice records |
| [Inward Request](./inward-request) | `InwardRequest` | Incoming invoice requests |
| [Outward Request](./outward-request) | `OutwardRequest` | Outgoing invoice requests |
| [EGS Unit](./egs-unit) | `EGSUnit` | EGS device/unit records |
