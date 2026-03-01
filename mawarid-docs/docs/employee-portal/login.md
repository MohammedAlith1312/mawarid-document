---
sidebar_position: 2
---

# Login

The **Login** page authenticates employees using their Iqama number and OTP verification.

## Functionality

1. Employee enters their **Iqama number** — the system calls the Employee Details API to retrieve and store employee data locally.
2. If the employee has a registered phone number, the **Send OTP** method is called.
   - If no phone number exists, an error is shown and the user is directed to [Register Mobile](./register-mobile).
3. The OTP verification form is shown — the employee enters the OTP received on their mobile and submits.
4. If the OTP is not received, the employee can click **Resend OTP**.

## APIs

| Method | URL | Params |
|---|---|---|
| GET | `crm/GetEmployeeByID` | `{IqamaNO}` |
| POST | `sms/SendOTP` | `{UserId, MobileNumber}` |
| POST | `sms/ValidateOTP` | `{UserId, MobileNumber, OTP}` |
| POST | `sms/ReSendOTP` | `{UserId, MobileNumber}` |
