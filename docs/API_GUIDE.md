# API Implementation Guide

This document outlines the rules and skills for implementing API interactions.

## 1. Core Architecture
- **AxiosGW** (`src/services/axios.service.ts`): Centralized Axios instance with base URL from env.
- **Interceptors**:
  - Request: Attaches `Authorization` header, manages global loading.
  - Response: Handles error toasts, success codes, auto-logout on 401.

## 2. Rules

### File Organization
- Services: `src/services/*.service.ts`
- Return `response.data as APIResponse`, not full Axios response.
- Use `isDisableToast: true` to handle errors manually.

### Naming Conventions
- Methods: verb-noun (e.g., `getContracts`, `createMemberContract`)
- DTOs: Strict typing from `types` folder.

## 3. Skills

### Skill: Creating a Service Method
```typescript
import { AxiosGW } from './axios.service';
import { APIResponse } from 'types';

export default class ExampleService {
  async createItem(payload: CreateItemReq) {
    return (await AxiosGW.post('/api/v1/resource', payload)).data as APIResponse;
  }

  async getItems(status: string) {
    return (await AxiosGW.get('/api/v1/resource', {
      params: { status },
      isDisableToast: true,
    })).data as APIResponse;
  }
}
```

### Skill: Using React Query
```typescript
import { createQueryWithCache } from '@/utils';

const useGetContracts = createQueryWithCache(
  (variables: GetContractsReq) => ['GET_CONTRACTS', variables],
  (variables: GetContractsReq) => new UserService().getContracts(variables)
);

// In component
const { data, isLoading } = useGetContracts({ clubId: '123' });
```

### Skill: File Uploads
```typescript
async uploadFile(file: Blob) {
  const formData = new FormData();
  formData.append('image', file);
  return (await AxiosGW.put('/api/v1/upload', formData)).data as APIResponse;
}
```

### Skill: Custom Config Options
- `isDisableLoading: true` - Skip global loading spinner.
- `isDisableToast: true` - Skip global error toast.
- `isDisableRedirect: true` - Skip 401 redirect.
