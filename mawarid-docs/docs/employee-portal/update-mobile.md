---
sidebar_position: 4
---

# Update Mobile

The **Update Mobile** page allows employees to update their registered phone number.

## Functionality

1. Employee enters their **Iqama number**, **passport number**, and **new mobile number** — the system calls the Employee Details API.
2. The passport number and current phone number are validated against the employee record.
3. If valid, the system calls **Change Phone Number** API with the old and new numbers.
4. An OTP verification form is shown — employee enters the OTP received on their mobile and submits.
5. On success, the employee is redirected to the [Login](./login) page.
6. If OTP is not received, the employee can click **Resend OTP**.

## APIs

| Method | URL | Params |
|---|---|---|
| GET | `crm/GetEmployeeByID` | `{IqamaNO}` |
| POST | `crm/ChangePhoneNumber` | `{EmployeeID, IqamaNO, NewPhonenumber, OldPhonenumber, Otp}` |
| POST | `sms/ValidateOTP` | `{UserId, MobileNumber, OTP}` |
| POST | `sms/ReSendOTP` | `{UserId, MobileNumber}` |
