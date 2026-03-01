---
sidebar_position: 2
---

# Pending Orders

The **Pending Orders** page shows all orders that have been placed by requesters at the provider's assigned location and are awaiting fulfilment.

## Functions

- View all pending orders for the assigned location
- See order details:
  - Items ordered
  - Seat / Cabin number
  - Order timestamp
- Update order status:
  - Mark as **In Progress**
  - Mark as **Completed**
  - Mark as **Cancelled**

## Order Flow

```
Requester places order (via QR scan)
        ↓
Order appears in Provider's Pending Orders
        ↓
Provider marks order as In Progress
        ↓
Provider delivers order → marks as Completed
```

## Notes

- Only orders from the provider's **assigned location** are shown.
- When a new order is placed, the provider is notified via:
  - **Browser Push Notification** — appears instantly on the provider's device
  - **SMS** — sent to the provider's registered mobile number
- See [Notifications](../notifications) for full details.
- New orders appear in real time (or on page refresh).
