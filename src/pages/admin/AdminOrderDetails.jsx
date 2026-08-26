import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { cancelAdminOrder, getAdminOrder, updateOrderStatus, updatePaymentStatus } from "../../api/adminOrders";

const AdminOrderDetails = () => {
  const { id } = useParams(); const [order,setOrder]=useState(null);
  useEffect(()=>{getAdminOrder(id).then(setOrder).catch(()=>toast.error("Could not load order"));},[id]);
  const status=async(value)=>{try{setOrder(await updateOrderStatus(id,value));toast.success("Status updated")}catch(error){toast.error(error.response?.data?.message||"Update failed")}};
  const payment=async(value)=>{try{setOrder(await updatePaymentStatus(id,value));toast.success("Payment updated")}catch(error){toast.error(error.response?.data?.message||"Update failed")}};
  const cancel=async()=>{if(!confirm("Cancel this order and restore stock?"))return;try{setOrder(await cancelAdminOrder(id));toast.success("Order cancelled")}catch(error){toast.error(error.response?.data?.message||"Cancellation failed")}};
  if(!order)return <span className="loading loading-spinner"/>;
  return <section><h1 className="heading text-4xl">{order.orderNumber}</h1><div className="mt-7 grid gap-6 xl:grid-cols-2"><div className="rounded-3xl bg-white p-7"><h2 className="heading text-2xl">Customer</h2><p className="mt-3">{order.customer.name} · {order.customer.phone}</p><p>{order.deliveryAddress.addressLine}, {order.deliveryAddress.area}, {order.deliveryAddress.city}</p><h2 className="heading mt-7 text-2xl">Products</h2>{order.items.map(item=><p className="mt-3" key={`${item.productId}-${item.variantSku}`}>{item.name} × {item.quantity} — ৳ {item.lineTotal}</p>)}</div><div className="rounded-3xl bg-white p-7"><h2 className="heading text-2xl">Management</h2><label className="mt-5 block">Order status<select value={order.orderStatus} onChange={event=>status(event.target.value)} className="select select-bordered mt-2 w-full"><option>{order.orderStatus}</option>{["Confirmed","Processing","Shipped","Delivered"].filter(value=>value!==order.orderStatus).map(value=><option key={value}>{value}</option>)}</select></label><label className="mt-5 block">Payment status<select value={order.payment.status} onChange={event=>payment(event.target.value)} className="select select-bordered mt-2 w-full">{["due","pending_verification","paid","rejected"].map(value=><option key={value}>{value}</option>)}</select></label>{order.payment.transactionId&&<p className="mt-4">Transaction: <strong>{order.payment.transactionId}</strong></p>}<p className="mt-6 text-xl font-bold">Total: ৳ {order.total}</p>{!["Delivered","Cancelled"].includes(order.orderStatus)&&<button onClick={cancel} className="btn btn-error btn-outline mt-6">Cancel & Restore Stock</button>}</div></div></section>;
};
export default AdminOrderDetails;
