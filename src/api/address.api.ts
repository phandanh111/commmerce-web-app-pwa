import axiosInstance from './axios.config';

export interface AddressPayload {
  fullName: string;
  phoneNumber: string;
  province: string;
  district: string;
  ward: string;
  detail: string;
  isDefault?: boolean;
}

export const addressApi = {
  getMyAddresses: () => axiosInstance.get('/address/my-addresses'),
  create: (data: AddressPayload) => axiosInstance.post('/address/create', data),
  update: (id: number | string, data: Partial<AddressPayload>) =>
    axiosInstance.put(`/address/${id}/update`, data),
  setDefault: (id: number | string) => axiosInstance.put(`/address/${id}/set-default`),
  delete: (id: number | string) => axiosInstance.delete(`/address/${id}/delete`),
};
