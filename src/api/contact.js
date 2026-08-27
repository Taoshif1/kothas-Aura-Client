import apiClient from "./apiClient";
export const sendContactMessage=async value=>(await apiClient.post("/contact",value)).data;
export const getAdminMessages=async params=>(await apiClient.get("/admin/contact",{params})).data;
export const getAdminMessage=async id=>(await apiClient.get(`/admin/contact/${id}`)).data.message;
export const updateMessageStatus=async(id,status)=>(await apiClient.patch(`/admin/contact/${id}/status`,{status})).data.message;
