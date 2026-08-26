import apiClient from "./apiClient";
export const getCategories = async (signal) => (await apiClient.get("/categories", { signal })).data;
export const getAdminCategories = async () => (await apiClient.get("/categories/admin/all")).data;
export const createCategory = async (category) => (await apiClient.post("/categories", category)).data.category;
export const updateCategory = async (id, changes) => (await apiClient.patch(`/categories/${id}`, changes)).data.category;
export const deleteCategory = async (id) => apiClient.delete(`/categories/${id}`);
