import axiosInstance from './axios.config';

export const invoiceApi = {
  getMyOrders: () => axiosInstance.get('/invoice/my-orders'),
  getDetail: (id: number | string) => axiosInstance.get(`/invoice/${id}/detail`),
  cancel: (id: number | string) => axiosInstance.put(`/invoice/${id}/cancel`),
};
