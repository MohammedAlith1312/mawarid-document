---
sidebar_position: 9
---

# Account Statement

The **Account Statement** page shows a detailed customer account statement from ERP and supports printing.

## Page Type

- **Type:** Remote — Custom Template (with Print support)

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v1/erp/getCustStatement
```

## Features

- Displays a full account statement for the selected customer
- **Custom Template** rendering for styled report view
- **Print** functionality available directly from the page

## Notes

- Customer is determined by the top nav bar selection.
- The statement includes all transactions: invoices, payments, and adjustments.
