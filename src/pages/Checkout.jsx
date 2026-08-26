import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { previewCheckout } from "../api/checkout";
import { createOrder } from "../api/orders";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

const BUY_NOW_KEY = "kothas_aura_buy_now";
const readBuyNow = () => { try { return JSON.parse(sessionStorage.getItem(BUY_NOW_KEY)); } catch { return null; } };

const Checkout = () => {
  const { dbUser } = useAuth();
  const cart = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source") === "buy-now" ? "buy-now" : "cart";
  const [preview, setPreview] = useState(null);
  const [previewError, setPreviewError] = useState("");
  const idempotencyKey = useRef(crypto.randomUUID());
  const buyNow = useMemo(readBuyNow, []);
  const selections = useMemo(() => source === "buy-now" ? [buyNow].filter(Boolean) : cart.items.map(({ productId, variantSku, quantity }) => ({ productId, variantSku, quantity })), [buyNow, cart.items, source]);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({ defaultValues: { name: dbUser?.name || "", email: dbUser?.email || "", phone: dbUser?.phone || "", deliveryZone: "inside_dhaka", paymentMethod: "cod" } });
  const deliveryZone = watch("deliveryZone");
  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    if (!selections.length) return;
    const controller = new AbortController();
    setPreviewError("");
    previewCheckout({ items: selections, deliveryZone }, controller.signal).then(setPreview).catch((error) => { if (error.code !== "ERR_CANCELED") setPreviewError(error.response?.data?.message || "Checkout is temporarily unavailable."); });
    return () => controller.abort();
  }, [deliveryZone, selections]);

  const submit = async (values) => {
    try {
      const order = await createOrder({ idempotencyKey: idempotencyKey.current, orderSource: source === "buy-now" ? "buy_now" : "cart", items: selections, customer: { name: values.name, phone: values.phone, email: values.email || "" }, deliveryAddress: { recipientName: values.name, phone: values.phone, addressLine: values.addressLine, area: values.area, city: values.city, postalCode: values.postalCode || "", deliveryZone: values.deliveryZone }, payment: { method: values.paymentMethod, transactionId: values.transactionId || "", senderPhone: values.senderPhone || "" } }, !dbUser);
      sessionStorage.setItem(`kotha_order_${order.orderNumber}`, JSON.stringify(order));
      if (source === "buy-now") sessionStorage.removeItem(BUY_NOW_KEY); else await cart.clear();
      navigate(`/order-success/${order.orderNumber}`);
    } catch (error) { toast.error(error.response?.data?.message || "Order could not be placed."); }
  };

  if (!selections.length) return <section className="container-x min-h-[70vh] pt-40 text-center"><h1 className="heading text-5xl">Nothing to check out</h1><Link to="/shop" className="btn btn-primary mt-8 rounded-full">Continue Shopping</Link></section>;
  return <section className="pb-20 pt-32"><form onSubmit={handleSubmit(submit)} className="container-x grid gap-8 lg:grid-cols-[1fr_380px]"><div><p className="uppercase tracking-[4px] text-primary">Secure ordering</p><h1 className="heading mt-2 text-5xl">Checkout</h1><div className="mt-7 grid gap-4 rounded-3xl bg-white p-7 md:grid-cols-2">{[["Name","name",true],["Phone","phone",true],["Email","email",false],["Address","addressLine",true],["Area","area",true],["City","city",true],["Postal Code","postalCode",false]].map(([label,name,required])=><label key={name} className={name === "addressLine" ? "md:col-span-2" : ""}><span className="mb-2 block font-medium">{label}</span><input className="input input-bordered w-full" {...register(name,{ required: required ? `${label} is required` : false, ...(name === "phone" ? { pattern: { value: /^01\d{9}$/, message: "Use a Bangladesh mobile number (01XXXXXXXXX)" } } : {}) })}/>{errors[name] && <span className="mt-1 block text-sm text-error">{errors[name].message}</span>}</label>)}<label><span className="mb-2 block font-medium">Delivery Zone</span><select className="select select-bordered w-full" {...register("deliveryZone")}><option value="inside_dhaka">Inside Dhaka</option><option value="outside_dhaka">Outside Dhaka</option></select></label></div><div className="mt-6 rounded-3xl bg-white p-7"><h2 className="heading text-3xl">Payment</h2>{preview?.paymentMethods.map((payment)=><label key={payment.method} className="mt-4 flex items-center gap-3 rounded-2xl border p-4"><input type="radio" value={payment.method} {...register("paymentMethod")}/><span className="font-semibold">{payment.method.toUpperCase()}</span>{payment.number && <span className="text-neutral/60">— {payment.number}</span>}</label>)}{paymentMethod !== "cod" && <div className="mt-4 grid gap-4 md:grid-cols-2"><input className="input input-bordered" placeholder="Transaction ID" {...register("transactionId",{ required: "Transaction ID is required" })}/><input className="input input-bordered" placeholder="Sender phone (optional)" {...register("senderPhone")}/></div>}</div></div><aside className="h-fit rounded-3xl bg-white p-7 shadow-sm"><h2 className="heading text-3xl">Order Summary</h2>{preview?.items.map((item)=><div key={`${item.productId}-${item.variantSku || "simple"}`} className="my-4 flex justify-between gap-4"><span>{item.name} × {item.quantity}</span><span>৳ {item.lineTotal}</span></div>)}{previewError && <div className="alert alert-error my-4 text-sm">{previewError}</div>}<div className="space-y-2 border-t pt-4"><p className="flex justify-between"><span>Subtotal</span><span>৳ {preview?.subtotal ?? 0}</span></p><p className="flex justify-between"><span>Delivery</span><span>৳ {preview?.deliveryCharge ?? 0}</span></p><p className="flex justify-between text-xl font-bold"><span>Total</span><span>৳ {preview?.total ?? 0}</span></p></div><button disabled={!preview || Boolean(previewError) || isSubmitting} className="btn btn-primary mt-6 w-full rounded-full">{isSubmitting ? "Placing Order…" : "Place Order"}</button></aside></form></section>;
};
export default Checkout;
