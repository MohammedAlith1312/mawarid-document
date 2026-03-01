---
sidebar_position: 5
---

# Notifications

Cafe4X uses two notification channels to alert providers immediately when a new order is placed by a requester.

## 1. Browser Push Notification

When a requester places an order, the assigned provider receives a **browser push notification** in real time — even if the Provider Portal tab is open in the background.

### Requirements
- The provider must be **logged in** to the Provider Portal.
- The provider must have **allowed notifications** in their browser when prompted.

### Behaviour
- A push notification appears on the provider's device as soon as the order is submitted.
- Clicking the notification opens the [Pending Orders](./provider/pending-orders) page.

---

## 2. SMS Notification

In addition to the browser push notification, an **SMS is automatically sent** to the provider's registered mobile number when a new order is placed at their assigned location.

### Requirements
- The provider's mobile number must be saved in their user profile (managed by Admin in the [Users](./admin/users) page).

### Behaviour
- SMS is sent the moment the requester submits the order.
- The SMS contains the order details including the seat/cabin number and items ordered.

---

## Notification Flow

```
Requester scans QR and places order
               ↓
   ┌───────────────────────────┐
   │  Assigned Provider        │
   │  ✅ Browser Push          │
   │  ✅ SMS to Mobile         │
   └───────────────────────────┘
               ↓
   Provider opens Pending Orders and fulfils the order
```
