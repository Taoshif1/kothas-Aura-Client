import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trackOrder } from "../api/orders";

const OrderSuccess = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(() => { try { return JSON.parse(sessionStorage.getItem(`kotha_order_${orderNumber}`)); } catch { return null; } });
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const reload = async (event) => { event.preventDefault(); try { setOrder(await trackOrder({ orderNumber, phone })); setError(""); } catch (requestError) { setError(requestError.response?.data?.message || "We could not find this order."); } };
  return <section className="container-x min-h-[75vh] pt-40 text-center"><div className="mx-auto max-w-2xl rounded-[40px] bg-white p-10 shadow-sm"><p className="uppercase tracking-[4px] text-primary">Thank you</p><h1 className="heading mt-3 text-5xl">Order confirmed</h1><p className="mt-5 text-lg">Order <strong>{orderNumber}</strong></p>{order ? <div className="mt-7 rounded-3xl bg-base-200 p-6"><p className="text-3xl font-bold text-primary">৳ {order.total}</p><p className="mt-2">{order.payment?.method?.toUpperCase()} · {order.payment?.status?.replaceAll("_", " ")}</p></div> : <form onSubmit={reload} className="mt-7"><p>Enter the order phone number to reload the confirmation.</p><input value={phone} onChange={(event)=>setPhone(event.target.value)} className="input input-bordered mt-4 w-full" placeholder="01XXXXXXXXX"/><button className="btn btn-primary mt-3 w-full rounded-full">Load Order</button>{error && <p className="mt-3 text-error">{error}</p>}</form>}<div className="mt-8 flex flex-wrap justify-center gap-3"><Link to="/track-order" className="btn btn-primary rounded-full">Track Order</Link><Link to="/shop" className="btn btn-outline rounded-full">Continue Shopping</Link><Link to="/dashboard/orders" className="btn btn-ghost rounded-full">My Orders</Link></div></div></section>;
};
export default OrderSuccess;
