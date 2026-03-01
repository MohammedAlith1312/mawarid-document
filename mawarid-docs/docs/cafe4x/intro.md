---
sidebar_position: 1
---

# Cafe4X

**Cafe4X** is a SaaS-based cafeteria ordering platform with three distinct roles: **Admin**, **Provider**, and **Requester**.

## How It Works

```
Requester → Scans QR code → Selects items → Places order
                                                  ↓
                              Order sent to Provider (based on location & seat)
                                                  ↓
                    Provider receives Browser Push Notification + SMS
                                                  ↓
                              Provider views & fulfils pending orders
```

## Roles

| Role | Access | Description |
|---|---|---|
| **Admin** | Login required | Manages users, locations, seats, items, and order history |
| **Provider** | Login required | Views their assigned location and fulfils pending orders |
| **Requester** | **No login required** | Scans a QR code from their seat (cabin) to place an order |

## Admin Pages

| Page | Description |
|---|---|
| [Users](./admin/users) | Manage Admin and Provider user accounts |
| [Location](./admin/location) | Manage site locations |
| [Location Seats](./admin/location-seats) | Manage cabins/seats and generate QR codes |
| [Assignment](./admin/assignment) | Assign providers to locations |
| [Items](./admin/items) | Manage available cafeteria products |
| [Orders](./admin/orders) | View full order history with status |

## Provider Pages

| Page | Description |
|---|---|
| [My Location](./provider/location) | View location assigned to this provider |
| [Pending Orders](./provider/pending-orders) | View and action pending orders |

---

## Project Details

cafe4x devloped as Aggular and cloudflare and deployed in cloudflare

| Field | Details |
|---|---|
| **URL** | [https://cafe4x.com](https://cafe4x.com) |
| **Pages** | `devtest-cafe4x` |
| **Workers** | `api-cafe-dev-test` |
| **Domains** | `apps.cafe4x.com`, `cafe4x.com`, `mawarid.cafe4x.com` |
| **DB: LIVE** | `cafe-dev-test-d1` (03b9685b-a5c2-4fe9-ae3b-e36b922c2ae4) |
| **DB: Test** | `d1-cafe4x-preview` (ed1612d4-ccd6-418f-b3a4-83287bfa003d) |
| **Resources** | Mohammed Junaid, Hammath Munirul Huda, HyderAli |
