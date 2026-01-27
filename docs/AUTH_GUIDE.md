# Authentication Guide (Login/Logout)

This document outlines the rules and skills for implementing authentication (Login/Logout) using the OTP flow.

## 1. Core Architecture
- **Components**: `LoginContainer` (Phone Input) -> `VerifyOTPContainer` (OTP Input).
- **Service**: `AuthService` handles API calls (`sendOTPLogin`, `verifyOTPLogin`).
- **Storage**: `LocalStorage` utility manages `ACCESS_TOKEN` and session data.

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
// Usage: delayNavigate(goTo(ROUTES.HOME, { replace: true, state: {...} }))
```

### useFormData
```typescript
import { useFormData } from '@/hooks';
const { formData, KEY, onChangeForm } = useFormData<FormData>(initForm);
// KEY auto-generates: { PHONE_NUMBER: 'phoneNumber' }
// Usage: onChangeForm(KEY.PHONE_NUMBER)(value)
```

### useValidation
```typescript
import { useValidation } from '@/hooks';
const { errorMessage, onValidate } = useValidation<FormData>({
  phoneNumber: JOI.PHONE_REQUIRE,
});
// Usage: const isError = onValidate(formData);
```

## 3. Rules

### Token Management
- ALWAYS use `LocalStorage` class and `STORAGE_KEY` enum from `src/utils`.
- Key `STORAGE_KEY.ACCESS_TOKEN` triggers authenticated state.

### Navigation Flow
1.  Input Phone -> API `sendOTPLogin` -> Navigate to VerifyOTP with `phoneNumber` in state.
2.  Input OTP -> API `verifyOTPLogin` -> Save token -> Navigate to Home.

## 4. Skills

### Skill: Login (Send OTP)
```typescript
const sendOTPCode = async (phoneNumber: string) => {
  const authService = new AuthService();
  const response = await authService.sendOTPLogin({ phoneNumber });
  
  if (isSuccessCode(response.code)) {
    delayNavigate(goTo(ROUTES.VERIFY_OTP, {
      replace: true,
      state: { phoneNumber }
    }));
  }
};
```

### Skill: Verify OTP
```typescript
const handleVerify = async (otpCode: string) => {
  const authService = new AuthService();
  const Storage = new LocalStorage();
  const { state } = useLocation();

  const response = await authService.verifyOTPLogin({
    otpCode,
    phoneNumber: state?.phoneNumber
  });

  if (isSuccessCode(response.code)) {
    Storage.setStorageItem(STORAGE_KEY.ACCESS_TOKEN, response.data.accessToken);
    Storage.setStorageItem(STORAGE_KEY.ACCOUNT_ID, response.data.accountId);
    delayNavigate(goTo(ROUTES.HOME, { replace: true }));
  }
};
```

### Skill: Logout
```typescript
const handleLogout = () => {
  const Storage = new LocalStorage();
  Storage.clearAllStorage();
  window.location.href = ROUTES.LADING;
};
```

### Skill: Auto-Logout
Handled globally in `axios.service.ts` - 401 response triggers `clearAllStorage()` and redirect.
