import apiClient from "./apiClient";
export const getWishlist = async () => (await apiClient.get("/wishlist")).data;
export const addWishlistItem = async (id) => (await apiClient.post(`/wishlist/${id}`)).data;
export const removeWishlistItem = async (id) => (await apiClient.delete(`/wishlist/${id}`)).data;
export const mergeWishlist = async (productIds) => (await apiClient.post("/wishlist/merge", { productIds })).data;
