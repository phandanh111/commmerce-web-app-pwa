import axiosInstance from './axios.config';

export const wishlistApi = {
  getMyList: () => axiosInstance.get('/wishlist/my-list'),
  add: (itemId: number) => axiosInstance.post('/wishlist/add', { itemId }),
  remove: (wishlistId: number | string) => axiosInstance.delete(`/wishlist/${wishlistId}/remove`),
};
