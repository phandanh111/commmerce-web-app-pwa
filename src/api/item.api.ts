import axiosInstance from './axios.config';

export interface ItemQuery {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number | string;
  sort?: string;
}

export const itemApi = {
  getList: (params?: ItemQuery) => axiosInstance.get('/item/list', { params }),
  getDetail: (id: number | string) => axiosInstance.get(`/item/${id}/detail`),
  getCategories: () => axiosInstance.get('/item/category/list'),
  getReviews: (itemId: number | string) => axiosInstance.get(`/item/${itemId}/reviews`),
  createReview: (itemId: number | string, data: { rating: number; comment: string }) =>
    axiosInstance.post(`/item/${itemId}/review/create`, data),
};
