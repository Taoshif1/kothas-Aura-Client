import { useState } from "react";
import { useForm } from "react-hook-form";
import { trackOrder } from "../api/orders";

const TrackOrder = () => {
  const [order, setOrder] = useState(null); const [error, setError] = useState("");
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const submit = async (values) => { try { setOrder(await trackOrder(values)); setError(""); } catch (requestError) { setOrder(null); setError(requestError.response?.data?.message || "Order not found."); } };
  return <section className="container-x min-h-[75vh] pt-36"><div className="mx-auto max-w-3xl"><p className="uppercase tracking-[4px] text-primary">Delivery progress</p><h1 className="heading mt-2 text-5xl">Track your order</h1><form onSubmit={handleSubmit(submit)} className="mt-8 grid gap-4 rounded-3xl bg-white p-7 md:grid-cols-[1fr_1fr_auto]"><input className="input input-bordered" placeholder="Order number" {...register("orderNumber",{required:true})}/><input className="input input-bordered" placeholder="Phone number" {...register("phone",{required:true})}/><button disabled={isSubmitting} className="btn btn-primary rounded-full">Track</button></form>{error && <div className="alert alert-error mt-5">{error}</div>}{order && <div className="mt-7 rounded-3xl bg-white p-8"><div className="flex flex-wrap justify-between gap-3"><h2 className="heading text-3xl">{order.orderNumber}</h2><span className="badge badge-primary badge-lg">{order.orderStatus}</span></div><div className="mt-8 space-y-5 border-l-2 border-primary/30 pl-7">{order.statusHistory.map((entry,index)=><div key={`${entry.status}-${index}`}><p className="font-bold text-primary">{entry.status}</p><p className="text-sm text-neutral/60">{new Date(entry.changedAt).toLocaleString()}</p></div>)}</div><p className="mt-8 text-xl font-bold">Total: ৳ {order.total}</p></div>}</div></section>;
};
export default TrackOrder;
