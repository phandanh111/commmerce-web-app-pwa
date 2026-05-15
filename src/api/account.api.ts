import axiosInstance from './axios.config';

export const accountApi = {
  getMyInfo: () => axiosInstance.get('/account/information/me'),
  updateMyInfo: (formData: FormData) =>
    axiosInstance.put('/account/information/update/me', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  createInfo: (formData: FormData) =>
    axiosInstance.post('/account/information/implement', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
