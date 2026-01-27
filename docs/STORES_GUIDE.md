# Stores (Redux) Implementation Guide

This document outlines the Redux store structure using Redux Toolkit with rules, skills, and usage patterns.

## Ý Nghĩa của Folder `stores`

Folder `stores` chứa **global state management** sử dụng **Redux Toolkit**. Nó quản lý:
- **UI State**: Loading, toast, popups
- **User Data**: Profile, contracts
- **App Data**: Clubs, payment methods
- **Feature State**: Workout progress

---

## Architecture Overview

```
src/stores/
├── Store.tsx          # Root store config, exports dispatch/selector hooks
├── index.ts           # Re-export
├── common/            # UI state slice
├── user/              # User data slice
├── general/           # App-wide data slice
├── global/            # Global config slice
└── workout/           # Feature-specific slice
```

### Each Slice Structure
```
sliceName/
├── index.ts           # Re-exports
├── reducer.ts         # Slice definition (state, reducers, extraReducers)
├── actions.ts         # Async thunks (createAsyncThunk)
└── selectors.ts       # Memoized selectors (createSelector)
```

---

## Slices Overview

| Slice | Purpose | Key State |
|-------|---------|-----------|
| `common` | UI state | `isLoading`, `toastContent`, `isShowToast` |
| `user` | User data | `userProfile`, `userContracts`, `selectedContract` |
| `general` | App data | `listClub`, `cityHaveClub`, `paymentMethods` |
| `global` | Global config | `ptPackages` |
| `workout` | Workout feature | `inProgressExercise`, `lessonConfig`, `lessonCompleted` |

---

## Store.tsx - Root Configuration

```typescript
import { configureStore } from '@reduxjs/toolkit';
import CommonReducer from './common/reducer';
import UserReducer from './user/reducer';
// ... more reducers

export const store = configureStore({
  reducer: {
    common: CommonReducer,
    user: UserReducer,
    general: GeneralReducer,
    global: GlobalReducer,
    workout: WorkoutReducer,
  },
});

// Type-safe hooks
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;
export const { dispatch } = store; // For non-component usage
```

---

## Rules

### 1. Slice Structure
- Each feature/domain has its own folder
- ALWAYS include: `reducer.ts`, `actions.ts`, `selectors.ts`, `index.ts`

### 2. State Typing
```typescript
interface State {
  data?: DataType[];
  isLoading: boolean;
}
const initialState: State = { data: [], isLoading: false };
```

### 3. Sync vs Async Actions
- **Sync**: Define in `reducers` object of `createSlice`
- **Async**: Define with `createAsyncThunk` in `actions.ts`, handle in `extraReducers`

### 4. Selectors
- Use `createSelector` for memoization
- Export named selectors: `userSelector`, `commonSelector`

---

## Skills

### Skill: Creating a New Slice

**1. reducer.ts**
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDataAction } from './actions';
import { isSuccessCode } from '@/utils';

interface State {
  items: ItemType[];
}

const initialState: State = { items: [] };

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    // Sync reducers
    clearItems: (state) => {
      state.items = [];
    },
    addItem: (state, action: PayloadAction<ItemType>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // Async reducers
    builder.addCase(getDataAction.fulfilled, (state, action) => {
      if (isSuccessCode(action.payload.code)) {
        state.items = action.payload.data;
      }
    });
  },
});

export const { clearItems, addItem } = mySlice.actions;
export default mySlice.reducer;
```

**2. actions.ts**
```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MyService } from '@/services';

export const getDataAction = createAsyncThunk(
  'mySlice/getDataAction',
  async () => {
    const service = new MyService();
    return await service.getData();
  }
);
```

**3. selectors.ts**
```typescript
import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../Store';

const selectSlice = (state: AppState) => state.mySlice;

export const mySelector = createSelector(selectSlice, (state) => state);
export const itemsSelector = createSelector(selectSlice, (state) => state.items);
```

---

### Skill: Using in Components

**Dispatch Actions**
```typescript
import { useDispatch, useSelector } from '@/stores';
import { getDataAction } from '@/stores/mySlice/actions';
import { clearItems } from '@/stores/mySlice/reducer';
import { mySelector } from '@/stores/mySlice/selectors';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(mySelector);

  useEffect(() => {
    dispatch(getDataAction()); // Async
  }, []);

  const handleClear = () => {
    dispatch(clearItems()); // Sync
  };
};
```

**Dispatch Outside Components**
```typescript
import { dispatch } from '@/stores';
import { setLoading } from '@/stores/common';

// In axios interceptor or utility
dispatch(setLoading(true));
```

---

### Skill: Persisting State to LocalStorage

```typescript
// In reducer.ts
const Storage = new LocalStorage();

const initialState: State = {
  config: Storage.getStorageItem(STORAGE_KEY.CONFIG) || defaultConfig,
};

const slice = createSlice({
  reducers: {
    updateConfig: (state, action) => {
      state.config = action.payload;
      Storage.setStorageItem(STORAGE_KEY.CONFIG, action.payload); // Persist
    },
  },
});
```

---

## Common Patterns

### Loading State (common slice)
```typescript
// Show loading
dispatch(setLoading(true));
await apiCall();
dispatch(setLoading(false));

// Or use isDisableLoading in axios config
```

### Toast Notifications (common slice)
```typescript
dispatch(showToast({ code: 1000, isError: false }));
dispatch(clearToast());
```

### User Profile (user slice)
```typescript
dispatch(getUserProfileAction());
dispatch(clearUserProfile()); // On logout or credential change
```

---

## Adding New Slice Checklist

1. [ ] Create folder: `src/stores/newSlice/`
2. [ ] Create `reducer.ts` with `createSlice`
3. [ ] Create `actions.ts` with `createAsyncThunk` (if async)
4. [ ] Create `selectors.ts` with `createSelector`
5. [ ] Create `index.ts` to re-export
6. [ ] Add reducer to `Store.tsx`
7. [ ] Add types to `AppState`
