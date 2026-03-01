---
sidebar_position: 3
---

# Accommodation Reception

The **Accommodation Reception** page displays arriving flight lines filtered by the company **MWD**, used for accommodation-based reception handling.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://portal.mawarid.com.sa/Recruitment/api/v1/recruitment/airport/getArrivingFlightLines?_Company=MWD
```

## Query Parameters

| Parameter | Value | Description |
|---|---|---|
| `_Company` | `MWD` | Filters results by legal entity/company code |

## Functionality

- Displays arriving flight lines for company **MWD**
- **Action available:** Mark employee as **Arrived** or **Not Arrived**

## Displayed Information

- Flight number and arrival date/time
- Employee name and details
- Company/accommodation assignment
- Arrival status
