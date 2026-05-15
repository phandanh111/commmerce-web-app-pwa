import axiosInstance from './axios.config';

export const cartApi = {
  getAll: () => axiosInstance.get('/cart/view'),
  addItem: (data: { itemId: number; quantity: number }) => axiosInstance.post('/cart/add', data),
  updateItem: (cartId: number | string, data: { quantity: number }) =>
    axiosInstance.put(`/cart/${cartId}/update`, data),
  removeItem: (cartId: number | string) => axiosInstance.delete(`/cart/${cartId}/delete`),
  checkout: (data: {
    cartIds: number[];
    addressId: number;
    paymentMethodId: number;
    couponCode?: string;
  }) => axiosInstance.post('/cart/checkout', data),
};
