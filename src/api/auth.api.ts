import axiosInstance from './axios.config';

export interface LoginPayload { phoneNumber: string; password: string }
export interface RegisterPayload { phoneNumber: string; password: string; email?: string }
export interface ChangePasswordPayload { currentPassword: string; newPassword: string; logoutAll?: boolean }

export const authApi = {
  login: (data: LoginPayload) => axiosInstance.post('/auth/login', data),
  register: (data: RegisterPayload) => axiosInstance.post('/auth/register', data),
  profile: () => axiosInstance.get('/auth/profile'),
  changePassword: (data: ChangePasswordPayload) => axiosInstance.post('/auth/change-password', data),
  refreshToken: () => axiosInstance.post('/auth/refresh-token'),
  updateMe: (data: Partial<{ email: string; phoneNumber: string }>) =>
    axiosInstance.put('/account/update/me', data),
};
