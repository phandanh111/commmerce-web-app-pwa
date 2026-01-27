# Credential Change Guide (Change Phone Number)

This document outlines the rules and skills for implementing credential change functionality.

> **Note:** This project uses **OTP-based authentication** (no passwords). The equivalent of "change password" is **Change Phone Number**.

## 1. Core Architecture
Two-step verification:
1.  **Enter New Phone**: User enters new phone number -> API sends OTP.
2.  **Verify OTP**: User enters OTP code -> API verifies and updates.

**Components**: `ChangePhoneNumberContainer`, `VerifyPhoneNumberContainer`
**Service Methods**: `sendOTPChangePhoneNumber`, `verifyOTPChangePhoneNumber`

## 2. Hooks Used
Custom hooks from `src/hooks`:

| Hook | Purpose |
|------|---------|
| `useDirection` | Navigation wrapper (goTo, goBack) |
| `useFormData<T>` | Form state management with auto-generated keys |
| `useValidation<T>` | Joi-based form validation |

### useDirection
```typescript
import { useDirection } from '@/hooks';
const { goTo, goBack } = useDirection();
```

### useFormData
```typescript
import { useFormData } from '@/hooks';
const { formData, KEY, onChangeForm } = useFormData<FormData>(initForm);
// KEY: { PHONE_NUMBER: 'phoneNumber' }
```

### useValidation
```typescript
import { useValidation } from '@/hooks';
const { errorMessage, onValidate } = useValidation<FormData>({
  phoneNumber: JOI.PHONE_REQUIRE,
});
```

## 3. Rules
- Pass `phoneNumber` via `location.state` between pages.
- After successful change, dispatch `clearUserProfile()` to refresh user data.

## 4. Skills

### Skill: Send OTP for New Phone
```typescript
const sendOTPForNewPhone = async (phoneNumber: string) => {
  const authService = new AuthService();
  const response = await authService.sendOTPChangePhoneNumber({ phoneNumber });

  if (isSuccessCode(response.code)) {
    delayNavigate(goTo(ROUTES.ACCOUNT_VERIFY_PHONE_NUMBER, {
      replace: true,
      state: { phoneNumber }
    }));
  }
};
```

### Skill: Verify and Complete Change
```typescript
const handleVerifyAndChange = async (otpCode: string) => {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const response = await authService.verifyOTPChangePhoneNumber({
    otpCode,
    phoneNumber: state?.phoneNumber,
  });

  if (isSuccessCode(response.code)) {
    dispatch(clearUserProfile()); // Clear cached profile
    delayNavigate(goTo(ROUTES.ACCOUNT_INFORMATION, { replace: true }));
  }
};
```

## 5. Key Differences from Login

| Aspect | Login | Change Phone |
|--------|-------|--------------|
| API (Send) | `sendOTPLogin` | `sendOTPChangePhoneNumber` |
| API (Verify) | `verifyOTPLogin` | `verifyOTPChangePhoneNumber` |
| On Success | Save token | Clear profile cache |
| Redirect | Home | Account Info |
