import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@/api/auth.api';
import type { LoginPayload, RegisterPayload } from '@/api/auth.api';

export interface AuthUser {
  id: number;
  email: string;
  phoneNumber?: string;
  role?: { name: string; code: string };
  information?: {
    fullName?: string;
    avatar?: string;
    dateOfBirth?: string;
    gender?: string;
  };
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  loading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async (payload: LoginPayload, { rejectWithValue }) => {
  try {
    const res = await authApi.login(payload);
    const data = res.data?.data || {};
    if (data.accessToken) localStorage.setItem('access_token', data.accessToken);
    // fetch profile separately after login
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Đăng nhập thất bại');
  }
});

export const register = createAsyncThunk('auth/register', async (payload: RegisterPayload, { rejectWithValue }) => {
  try {
    const res = await authApi.register(payload);
    return res.data?.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Đăng ký thất bại');
  }
});

export const fetchProfile = createAsyncThunk('auth/profile', async (_, { rejectWithValue }) => {
  try {
    const res = await authApi.profile();
    // Response: { data: AccountEntity }
    return res.data?.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('access_token');
    },
    clearError(state) { state.error = null; },
    setUser(state, action) { state.user = action.payload; state.isAuthenticated = true; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state) => { state.loading = false; })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('access_token');
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
