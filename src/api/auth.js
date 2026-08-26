import apiClient from "./apiClient";
export const createBackendSession = async (idToken) => (await apiClient.post("/auth/jwt", { idToken })).data.user;
export const clearBackendSession = async () => apiClient.post("/auth/logout");
