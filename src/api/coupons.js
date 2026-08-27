import apiClient from "./apiClient";
export const getCoupons=async params=>(await apiClient.get("/admin/coupons",{params})).data;
export const createCoupon=async value=>(await apiClient.post("/admin/coupons",value)).data.coupon;
export const updateCoupon=async(id,value)=>(await apiClient.patch(`/admin/coupons/${id}`,value)).data.coupon;
export const deactivateCoupon=async id=>(await apiClient.delete(`/admin/coupons/${id}`)).data.coupon;
