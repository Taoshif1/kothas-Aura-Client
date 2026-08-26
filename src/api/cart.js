import apiClient from "./apiClient";
export const getCart = async () => (await apiClient.get("/cart")).data;
export const addCartItem = async (item) => (await apiClient.post("/cart", item)).data;
export const updateCartItem = async (item) => (await apiClient.patch("/cart", item)).data;
export const removeCartItem = async (productId, variantSku) => (await apiClient.delete(`/cart/items/${productId}`, { params: { variantSku: variantSku || undefined } })).data;
export const clearCart = async () => (await apiClient.delete("/cart")).data;
export const mergeCart = async (items) => (await apiClient.post("/cart/merge", { items })).data;
