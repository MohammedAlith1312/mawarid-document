---
sidebar_position: 6
---

# Receive by Customer

The **Receive by Customer** page displays arriving flight lines that are received directly by the customer (not by Mawarid).

## Page Type

- **Type:** Remote

## API Endpoint

```
GET https://portal.mawarid.com.sa/Recruitment/api/v1/recruitment/airport/getArrivingFlightLinesByCustomer
```

## Functionality

- Lists all flight lines assigned for **customer-side reception**
- **Action available:** Mark employee as **Arrived** or **Not Arrived**

## Displayed Information

- Flight number and arrival date/time
- Employee name and passport details
- Customer name responsible for reception
- Arrival status

## Notes

- Used when the customer handles airport reception directly instead of Mawarid.
- Coordinators can still track and update arrival status from this page.
