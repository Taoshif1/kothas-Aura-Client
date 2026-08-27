import apiClient from "./apiClient";
export const getProfile = async () => (await apiClient.get("/users/me")).data.user;
export const updateProfile = async (values) => (await apiClient.patch("/users/me", values)).data.user;
export const getDashboard = async () => (await apiClient.get("/users/me/dashboard")).data;
