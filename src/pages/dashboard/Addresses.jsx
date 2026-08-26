import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addAddress, deleteAddress, getAddresses } from "../../api/addresses";

const Addresses = () => {
  const [items, setItems] = useState([]);
  const { register, handleSubmit, reset } = useForm({ defaultValues: { deliveryZone: "inside_dhaka" } });
  const load = () => getAddresses().then(setItems);
  useEffect(() => { load().catch(() => toast.error("Could not load addresses")); }, []);
  const add = async (values) => { try { await addAddress(values); reset({ deliveryZone: "inside_dhaka" }); await load(); toast.success("Address saved"); } catch (error) { toast.error(error.response?.data?.message || "Address could not be saved"); } };
  const remove = async (id) => { await deleteAddress(id); await load(); };
  return <section><h1 className="heading text-4xl">Addresses</h1><div className="mt-7 grid gap-6 xl:grid-cols-2"><form onSubmit={handleSubmit(add)} className="grid gap-3 rounded-3xl bg-white p-7">{["label","recipientName","phone","addressLine","area","city","postalCode"].map((name)=><input key={name} className="input input-bordered w-full" placeholder={name.replace(/([A-Z])/g," $1")} {...register(name,{required:!["label","postalCode"].includes(name)})}/>)}<select className="select select-bordered" {...register("deliveryZone")}><option value="inside_dhaka">Inside Dhaka</option><option value="outside_dhaka">Outside Dhaka</option></select><label><input type="checkbox" {...register("isDefault")}/> Set as default</label><button className="btn btn-primary rounded-full">Save Address</button></form><div className="space-y-4">{items.map((item)=><article key={item.id} className="rounded-3xl bg-white p-6"><div className="flex justify-between"><strong>{item.label||"Address"} {item.isDefault&&<span className="badge badge-primary">Default</span>}</strong><button onClick={()=>remove(item.id)} className="btn btn-xs btn-ghost text-error">Remove</button></div><p className="mt-2">{item.recipientName} · {item.phone}</p><p>{item.addressLine}, {item.area}, {item.city}</p></article>)}</div></div></section>;
};
export default Addresses;
