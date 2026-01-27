# Utils Implementation Guide

This document outlines all utilities in `src/utils` folder with their rules, skills, and usage patterns.

## Overview

| File | Purpose | Category |
|------|---------|----------|
| `localStorage.ts` | LocalStorage wrapper with typed keys | Storage |
| `common.ts` | General utility functions | Core |
| `joi.ts` | Joi validation schemas | Validation |
| `account.ts` | Account type checks | Auth |
| `i18n.ts` | Internationalization setup | i18n |
| `react-query.ts` | React Query helpers | Data Fetching |
| `rating.tsx` | Rating content renderer | Business Logic |

---

## 1. localStorage.ts

**Purpose**: Type-safe wrapper for `window.localStorage`.

### STORAGE_KEY Enum
```typescript
export enum STORAGE_KEY {
  ACCESS_TOKEN = 'access-token',
  ACCOUNT_ID = 'account-id',
  ACCOUNT_TYPE = 'account-type',
  LANGUAGE = 'language',
  PHONE_NUMBER = 'phone-number',
  // ... more keys
}
```

### LocalStorage Class
```typescript
import { LocalStorage, STORAGE_KEY } from '@/utils';

const Storage = new LocalStorage();

// Set item
Storage.setStorageItem(STORAGE_KEY.ACCESS_TOKEN, 'token-value');

// Get item
const token = Storage.getStorageItem(STORAGE_KEY.ACCESS_TOKEN);

// Clear specific item
Storage.clearStorageItem(STORAGE_KEY.ACCESS_TOKEN);

// Clear all auth-related storage
Storage.clearAllStorage();
```

**Rule**: NEVER use `localStorage` directly. ALWAYS use `LocalStorage` class with `STORAGE_KEY` enum.

---

## 2. common.ts

**Purpose**: General utility functions used throughout the app.

### Data Display
```typescript
// Show data or default empty
showData(null);  // Returns '---'
showData('John'); // Returns 'John'

// Format price to VND
formatPrice(1000000);  // "1.000.000"
formatPrice(1000000, true);  // "1.000.000đ"
```

### API Response Check
```typescript
// Check if API response code is success (4 digits = success)
isSuccessCode(1000);  // true
isSuccessCode(400);   // false
```

### Date/Time Formatting
```typescript
formatDate('2024-01-20');           // "20/01/2024"
formatTime('2024-01-20T10:30:00');  // "10:30"
formatDateTime('2024-01-20T10:30'); // "20/01/2024 10:30"
formatDateLocale('2024-01-20');     // Locale-aware format
formatDateTimeNow('2024-01-20');    // Relative time if today
```

### Navigation
```typescript
// Delay navigate (for transitions)
delayNavigate(goTo(ROUTES.HOME));
```

### PWA Utilities
```typescript
isPWA();        // Is running as PWA
isPublicPage(); // Is public route
isVN();         // Is Vietnamese language
saveAppHeight(); // Handle iOS viewport height
initPWAConfig(); // Initialize PWA manifest
```

### Scroll Utilities
```typescript
resetScroll();              // Reset main body scroll
resetScrollElement('id');   // Reset specific element scroll
scrollToId('section-id', 50); // Scroll to element with offset
```

### File/Image Utilities
```typescript
getImageUrl('file-id');     // Get CDN image URL
getVideoUrl('file-id');     // Get CDN video URL
dataURLtoFile(dataUrl, 'name.jpg'); // Convert data URL to File
base64ToBlob(base64);       // Convert base64 to Blob
blobToDataUrl(blob);        // Convert Blob to data URL
```

### Geolocation
```typescript
getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2); // Distance in km
getLocation(onInit, onSuccess, onFail, onTimeout); // Get user location
```

### Google Analytics
```typescript
sendGAEvent(GA_ACTION.CLICK, GA_CATEGORY.AUTH, GA_LABEL.LOGIN);
```

---

## 3. joi.ts

**Purpose**: Pre-defined Joi validation schemas and validator class.

### Pre-defined Schemas (JOI object)
```typescript
import { JOI } from '@/utils';

JOI.PHONE_REQUIRE  // Required phone with regex
JOI.PASSWORD       // Required password with regex
JOI.EMAIL          // Optional email with format
JOI.REFERRAL_CODE  // Optional referral code
JOI.REQUIRE_MAX_1000 // Required text max 1000 chars
JOI.NUMBER         // Required number min 1
JOI.ALLOW          // Allow any value
```

### JoiValidate Class
```typescript
import { JoiValidate } from '@/utils';

const validator = new JoiValidate<FormData>({
  phoneNumber: JOI.PHONE_REQUIRE,
  email: JOI.EMAIL,
});

const result = validator.validateSchema(formData);
// { isError: boolean, errorMessage: { phoneNumber: '', email: '' } }
```

**Integration**: Used by `useValidation` hook.

---

## 4. account.ts

**Purpose**: Account type checks.

```typescript
import { isMember, isEmployee, getAccountType } from '@/utils';

isMember();       // true if user is MEMBER
isEmployee();     // true if user is not MEMBER (staff)
getAccountType(); // Get raw account type from storage
```

---

## 5. react-query.ts

**Purpose**: React Query helper for creating cached queries.

```typescript
import { createQueryWithCache } from '@/utils';

const useGetContracts = createQueryWithCache(
  (vars: GetContractsReq) => ['CONTRACTS', vars],  // Query key
  (vars: GetContractsReq) => api.getContracts(vars) // Query fn
);

// Usage in component
const { data, isLoading } = useGetContracts(
  { status: 'ACTIVE' },  // Variables
  60_000,                // staleTime (optional)
  { transform: (d) => d.data } // Config (optional)
);
```

---

## 6. rating.tsx

**Purpose**: Render rating content by type.

```typescript
import { ratingRenderContent } from '@/utils';

const { title, description } = ratingRenderContent(ratingInfo);
// Returns different content based on RATING_TYPE (CONTRACT, SESSION, PT_BOOKING)
```

---

## Rules for Creating New Utilities

1. **Location**: Add to appropriate file or create new `*.ts` file
2. **Export**: Export from `index.ts`
3. **Pure Functions**: Keep utilities pure when possible
4. **Types**: Use proper TypeScript types
5. **Constants**: Store magic values in `@/constant`
6. **i18n**: Use `t()` for user-facing strings
