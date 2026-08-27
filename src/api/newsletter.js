import apiClient from "./apiClient";
export const subscribeNewsletter=async email=>(await apiClient.post("/newsletter/subscribe",{email})).data;
export const getSubscribers=async params=>(await apiClient.get("/admin/subscribers",{params})).data;
export const updateSubscriberStatus=async(id,active)=>(await apiClient.patch(`/admin/subscribers/${id}/status`,{active})).data.subscriber;
