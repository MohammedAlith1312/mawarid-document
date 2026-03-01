---
sidebar_position: 7
---

# Aging Report

The **Aging Report** page provides a downloadable financial aging report showing outstanding balances grouped by aging buckets.

## Page Type

- **Type:** Remote (Download)

## API Endpoint

```
GET https://bcp.mawarid.com.sa/api/v1/erp/DownloadAgingReport?agingAsOfdate=9/5/2024&balanceAsOfDate=9/5/2024&custAccount=...
```

## Query Parameters

| Parameter | Description |
|---|---|
| `agingAsOfdate` | Date to calculate aging from (format: `M/D/YYYY`) |
| `balanceAsOfDate` | Date for balance snapshot (format: `M/D/YYYY`) |
| `custAccount` | Customer account number from ERP |

## Notes

- This endpoint returns a downloadable file (e.g., Excel or PDF).
- Both date parameters must be provided to generate the report.
- The customer account is populated from the top nav bar selection.
