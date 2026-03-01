---
sidebar_position: 3
---

# Register Mobile

The **Register Mobile** page allows employees who have no registered phone number to add their mobile number to the system.

## Functionality

1. Employee enters their **Iqama number**, **passport number**, and **mobile number** — the system calls the Employee Details API.
2. The passport number is validated against the employee record.
3. If valid, the system calls **Add Phone Number** API to register the mobile.
4. An OTP verification form is shown — employee enters the OTP received on their mobile and submits.
5. On success, the employee is redirected to the [Login](./login) page.
6. If OTP is not received, the employee can click **Resend OTP**.

## APIs

| Method | URL | Params |
|---|---|---|
| GET | `crm/GetEmployeeByID` | `{IqamaNO}` |
| POST | `crm/AddPhoneNumber` | `{EmployeeID, IqamaNO, Phonenumber, Otp}` |
| POST | `sms/ValidateOTP` | `{UserId, MobileNumber, OTP}` |
| POST | `sms/ReSendOTP` | `{UserId, MobileNumber}` |
