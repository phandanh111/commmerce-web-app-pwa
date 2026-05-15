import axiosInstance from './axios.config';

export const couponApi = {
  validate: (code: string) => axiosInstance.post('/coupon/validate', { code }),
};
