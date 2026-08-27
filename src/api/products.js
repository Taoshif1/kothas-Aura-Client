import apiClient from "./apiClient";

export const getProducts = async (params = {}, signal) => {
  const { data } = await apiClient.get("/products", { params, signal });
  return data;
};

export const getAdminProducts = async (params = {}) => (await apiClient.get("/products/admin/all", { params })).data;
export const getAdminProduct = async (id) => (await apiClient.get(`/products/admin/${id}`)).data.product;
export const createProduct = async (product) => (await apiClient.post("/products", product)).data.product;
export const updateProduct = async (id, changes) => (await apiClient.patch(`/products/${id}`, changes)).data.product;
export const deactivateProduct = async (id) => (await apiClient.delete(`/products/${id}`)).data.product;

export const getProduct = async (id, signal) => {
  const { data } = await apiClient.get(`/products/${id}`, { signal });
  return data.product;
};
