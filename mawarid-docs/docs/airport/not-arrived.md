---
sidebar_position: 4
---

# Not Arrived

The **Not Arrived** page displays a list of employees/flight lines where the arrival has not been confirmed.

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://portal.mawarid.com.sa/Recruitment/api/v1/recruitment/airport/getNotArrivedFlightLines
```

## Functionality

- Lists all flight lines where the employee has **not checked in** or been marked as arrived
- **Action available:** Update arrival status to **Arrived**

## Displayed Information

- Flight number and expected arrival date/time
- Employee name and passport/ID details
- Current status: Not Arrived
- Days since expected arrival

## Notes

- This page helps coordinators follow up on missing or delayed arrivals.
- Records remain here until manually marked as Arrived or Escaped.
