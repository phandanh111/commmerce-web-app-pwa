# 📢 Toast Notification System Guide

Hướng dẫn triển khai hệ thống thông báo (Toast) tập trung cho ứng dụng React + Redux + TypeScript.

---

## 📋 Mục Lục

1. [Tổng Quan Kiến Trúc](#1-tổng-quan-kiến-trúc)
2. [Cài Đặt Dependencies](#2-cài-đặt-dependencies)
3. [Triển Khai Chi Tiết](#3-triển-khai-chi-tiết)
4. [Hướng Dẫn Sử Dụng](#4-hướng-dẫn-sử-dụng)
5. [Ví Dụ Thực Tế](#5-ví-dụ-thực-tế)

---

## 1. Tổng Quan Kiến Trúc

```
┌─────────────────────────────────────────────────────────────┐
│  API Response                                                │
│  (axios interceptor)                                         │
│         │                                                    │
│         ▼                                                    │
│  Redux Store (common/reducer.ts)                             │
│  ├── showToast({ status, code, message })                   │
│  ├── closeToast()                                           │
│         │                                                    │
│         ▼                                                    │
│  App.tsx (useSelector → isShowToast, toastContent)          │
│         │                                                    │
│         ▼                                                    │
│  Toast Component (MUI Snackbar + Alert)                     │
│         │                                                    │
│         ▼                                                    │
│  i18n Translation (vi.json / en.json)                       │
│  ├── success.{code} → "Thành công"                          │
│  ├── error.{code} → "Có lỗi xảy ra"                         │
└─────────────────────────────────────────────────────────────┘
```

### Ưu điểm của kiến trúc này:
- ✅ **Tập trung**: Tất cả thông báo được quản lý tại một nơi
- ✅ **Tự động**: API tự động hiển thị toast không cần code thủ công
- ✅ **Đa ngôn ngữ**: Hỗ trợ i18n dễ dàng
- ✅ **Linh hoạt**: Có thể tắt toast cho API cụ thể
- ✅ **Nhất quán**: UI thống nhất trên toàn ứng dụng

---

## 2. Cài Đặt Dependencies

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @reduxjs/toolkit react-redux
npm install axios
npm install i18next react-i18next
```

---

## 3. Triển Khai Chi Tiết

### 3.1. Extend Axios Config Types

```typescript
// src/types/axios.d.ts
import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    isDisableLoading?: boolean;
    isDisableToast?: boolean;
  }
}
```

### 3.2. Redux Store - Common Reducer

```typescript
// src/store/common/reducer.ts
import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastContent {
  status?: AlertColor;      // 'success' | 'error' | 'warning' | 'info'
  code?: number;            // Mã code từ API
  message?: string;         // Message từ API
  description?: {
    code?: number;
    message?: string;
  };
}

interface CommonState {
  isLoading: boolean;
  isShowToast: boolean;
  toastContent: ToastContent;
}

const initialState: CommonState = {
  isLoading: false,
  isShowToast: false,
  toastContent: {},
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action: PayloadAction<ToastContent>) => {
      state.isShowToast = true;
      state.toastContent = action.payload;
    },
    closeToast: (state) => {
      state.isShowToast = false;
    },
  },
});

export const { showToast, setLoading, closeToast } = commonSlice.actions;
export default commonSlice.reducer;
```

### 3.3. Redux Selectors

```typescript
// src/store/common/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectCommon = (state: RootState) => state.common;

export const commonSelector = createSelector(selectCommon, (state) => state);
```

### 3.4. Axios Service với Interceptors

```typescript
// src/services/axios.service.ts
import axios from 'axios';
import { setLoading, showToast } from 'store/common';
import { store } from 'store/store';

const { dispatch } = store;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request Interceptor - Hiển thị loading
api.interceptors.request.use(
  (config) => {
    const { isDisableLoading } = config;
    
    if (!isDisableLoading) {
      dispatch(setLoading(true));
    }

    // Thêm Authorization header
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    dispatch(setLoading(false));
    throw error;
  },
);

// Response Interceptor - Hiển thị toast
api.interceptors.response.use(
  // Success Response (2xx)
  (response) => {
    const { isDisableLoading, isDisableToast } = response.config;

    if (!isDisableLoading) {
      dispatch(setLoading(false));
    }

    if (!isDisableToast) {
      dispatch(
        showToast({
          status: 'success',
          ...response.data,
        }),
      );
    }

    return response;
  },
  // Error Response (4xx, 5xx)
  (error) => {
    const { response } = error;
    const { isDisableToast } = response?.config || {};

    dispatch(setLoading(false));

    if (!isDisableToast && response) {
      dispatch(
        showToast({
          status: 'error',
          ...response.data,
        }),
      );
    }

    // Xử lý 401 Unauthorized
    if (response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }

    return response;
  },
);
```

### 3.5. Toast Component

```tsx
// src/components/shared/Toast.tsx
import { Alert, AlertColor, Slide, SlideProps, Snackbar } from '@mui/material';
import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  status: AlertColor;
  message?: string;
  code?: number;
  duration?: number;
  isOpen?: boolean;
  onClose?: () => void;
};

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

// Helper function để check success code
const isSuccessCode = (code: number) => code >= 1000 && code < 2000;

function Toast({
  status,
  message = '',
  code = -1,
  duration = 5000,
  isOpen = false,
  onClose,
}: Props) {
  return createPortal(
    <Snackbar
      open={isOpen && message?.length > 0}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={duration}
      onClose={onClose}
      TransitionComponent={SlideTransition}
    >
      <Alert
        severity={status}
        variant="filled"
        sx={{ width: '100%', fontSize: '16px' }}
        onClose={onClose}
      >
        {/* Hiển thị code nếu là error */}
        {!isSuccessCode(code) ? `${message} (${code})` : message}
      </Alert>
    </Snackbar>,
    document.body,
  );
}

export default React.memo(Toast);
```

### 3.6. App.tsx - Tích Hợp Toast

```tsx
// src/App.tsx
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeToast, commonSelector } from 'store/common';
import Toast from 'components/shared/Toast';
import Spinner from 'components/shared/Spinner';

function App() {
  const { isLoading, isShowToast, toastContent } = useSelector(commonSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Parse message với i18n
  const parseMessage = useMemo(() => {
    const { code, message, status, description } = toastContent;
    
    // Xử lý service error (code = 4)
    if (code === 4) {
      return {
        code: description?.code,
        message: description?.message,
        type: 'service-error',
      };
    }
    
    return {
      code,
      message,
      type: status, // 'success' | 'error'
    };
  }, [toastContent]);

  return (
    <>
      {/* Your App Content */}
      <RouterProvider router={router} />
      
      {/* Global Loading Spinner */}
      <Spinner isLoading={isLoading} />
      
      {/* Global Toast */}
      <Toast
        status={toastContent?.status || 'info'}
        isOpen={isShowToast}
        code={parseMessage?.code}
        onClose={() => dispatch(closeToast())}
        message={t(`${parseMessage?.type}.${parseMessage?.code}`) || ''}
      />
    </>
  );
}

export default App;
```

### 3.7. i18n Configuration

```typescript
// src/utils/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './languages/en.json';
import vi from './languages/vi.json';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'vi',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

### 3.8. Translation Files

```json
// src/utils/languages/vi.json
{
  "success": {
    "1000": "Thao tác thành công",
    "1001": "Đăng nhập thành công",
    "1002": "Đăng ký thành công",
    "1010": "Tạo mới thành công",
    "1011": "Cập nhật thành công",
    "1012": "Xóa thành công"
  },
  "error": {
    "1": "Lỗi không xác định",
    "2": "Lỗi cú pháp",
    "3": "Vượt quá thời gian phản hồi",
    "4": "Lỗi dịch vụ",
    "5": "Không có quyền truy cập",
    "100": "Dữ liệu không hợp lệ",
    "101": "Không tìm thấy dữ liệu",
    "102": "Dữ liệu đã tồn tại"
  },
  "service-error": {
    "103": "Mật khẩu không đúng",
    "104": "Tài khoản không tồn tại",
    "108": "Mã xác thực không đúng"
  }
}
```

```json
// src/utils/languages/en.json
{
  "success": {
    "1000": "Operation successful",
    "1001": "Login successful",
    "1002": "Registration successful",
    "1010": "Created successfully",
    "1011": "Updated successfully",
    "1012": "Deleted successfully"
  },
  "error": {
    "1": "Unknown error",
    "2": "Syntax error",
    "3": "Request timeout",
    "4": "Service error",
    "5": "Access denied",
    "100": "Invalid data",
    "101": "Data not found",
    "102": "Data already exists"
  },
  "service-error": {
    "103": "Incorrect password",
    "104": "Account not found",
    "108": "Invalid verification code"
  }
}
```

---

## 4. Hướng Dẫn Sử Dụng

### 4.1. Tự Động Hiển Thị Toast (Mặc định)

API sẽ tự động hiển thị toast khi response trả về:

```typescript
// Service
export const createUser = (data: CreateUserDto) => {
  return api.post('/api/users', data);
  // ✅ Toast tự động hiển thị "Tạo mới thành công"
};
```

### 4.2. Tắt Toast Cho API Cụ Thể

```typescript
// Service - không cần hiển thị toast
export const getUsers = () => {
  return api.get('/api/users', {
    isDisableToast: true,  // ← Tắt toast
  });
};

// Tắt cả loading và toast
export const checkHealth = () => {
  return api.get('/api/health', {
    isDisableLoading: true,
    isDisableToast: true,
  });
};
```

### 4.3. Hiển Thị Toast Thủ Công

```typescript
import { showToast, closeToast } from 'store/common';
import { useDispatch } from 'react-redux';

function MyComponent() {
  const dispatch = useDispatch();

  const handleSuccess = () => {
    dispatch(showToast({
      status: 'success',
      code: 1000,
      message: 'Custom success message',
    }));
  };

  const handleError = () => {
    dispatch(showToast({
      status: 'error',
      code: 100,
      message: 'Custom error message',
    }));
  };

  const handleWarning = () => {
    dispatch(showToast({
      status: 'warning',
      code: 0,
      message: 'Cảnh báo quan trọng!',
    }));
  };

  return (
    <>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
      <button onClick={handleWarning}>Warning</button>
    </>
  );
}
```

---

## 5. Ví Dụ Thực Tế

### 5.1. Login Flow

```typescript
// services/auth.service.ts
export const login = (credentials: LoginDto) => {
  return api.post('/api/auth/login', credentials);
  // Response: { code: 1001, message: "Success", data: { accessToken, user } }
  // Toast hiển thị: "Đăng nhập thành công"
};

// containers/LoginContainer.tsx
const handleLogin = async (data: LoginDto) => {
  const response = await login(data);
  if (response?.data?.code === 1001) {
    localStorage.setItem('accessToken', response.data.data.accessToken);
    navigate('/dashboard');
  }
};
```

### 5.2. CRUD Operations

```typescript
// services/user.service.ts
export const userService = {
  // GET - Tắt toast vì chỉ là fetch data
  getAll: () => api.get('/api/users', { isDisableToast: true }),
  
  // GET by ID - Tắt toast
  getById: (id: string) => api.get(`/api/users/${id}`, { isDisableToast: true }),
  
  // POST - Bật toast (mặc định)
  create: (data: CreateUserDto) => api.post('/api/users', data),
  
  // PUT - Bật toast (mặc định)
  update: (id: string, data: UpdateUserDto) => api.put(`/api/users/${id}`, data),
  
  // DELETE - Bật toast (mặc định)
  delete: (id: string) => api.delete(`/api/users/${id}`),
};
```

### 5.3. API Response Format

Backend nên trả về response theo format sau:

```typescript
// Success Response
{
  "code": 1001,      // Success code (1000-1999)
  "message": "Success",
  "data": { ... }
}

// Error Response
{
  "code": 103,       // Error code
  "message": "Invalid password",
  "description": {
    "code": 103,
    "message": "Password is incorrect"
  }
}
```

---

## 📚 Best Practices

| Scenario | isDisableToast | Lý do |
|----------|----------------|-------|
| GET list/detail | `true` | Không cần thông báo khi load data |
| POST create | `false` | Thông báo thành công cho user |
| PUT update | `false` | Thông báo cập nhật thành công |
| DELETE | `false` | Thông báo xóa thành công |
| Background request | `true` | Không làm phiền user |
| Auth check | `true` | Silent check |

---

## 🎨 Customization

### Thay đổi vị trí Toast

```tsx
<Snackbar
  anchorOrigin={{ 
    vertical: 'bottom',  // 'top' | 'bottom'
    horizontal: 'right'  // 'left' | 'center' | 'right'
  }}
>
```

### Thay đổi thời gian hiển thị

```tsx
<Toast duration={3000} />  {/* 3 giây */}
```

### Thay đổi animation

```tsx
import { Fade, Grow, Zoom } from '@mui/material';

// Fade
<Snackbar TransitionComponent={Fade}>

// Grow
<Snackbar TransitionComponent={Grow}>

// Zoom
<Snackbar TransitionComponent={Zoom}>
```

---

## 📁 Cấu Trúc Thư Mục

```
src/
├── components/
│   └── shared/
│       ├── Toast.tsx
│       └── Spinner.tsx
├── services/
│   └── axios.service.ts
├── store/
│   ├── store.ts
│   └── common/
│       ├── index.ts
│       ├── reducer.ts
│       └── selectors.ts
├── utils/
│   ├── i18n.ts
│   └── languages/
│       ├── en.json
│       └── vi.json
├── types/
│   └── axios.d.ts
└── App.tsx
```

---

*Tài liệu được tạo tự động từ dự án AparTech CRM.*
