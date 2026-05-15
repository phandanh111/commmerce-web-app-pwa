import axiosInstance from './axios.config';

export const paymentMethodApi = {
  getList: () => axiosInstance.get('/payment-method/list'),
};
