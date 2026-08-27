import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { getDashboard } from "../../api/users";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

const DashboardHome = () => {
  const { dbUser } = useAuth(); const cart = useCart(); const wishlist = useWishlist();
  const [data,setData]=useState(null); const [error,setError]=useState("");
  useEffect(()=>{getDashboard().then(setData).catch(e=>setError(e.response?.data?.message||"Could not load your dashboard."));},[]);
  const firstName=dbUser?.name?.trim().split(/\s+/)[0]||"there";
  return <section><h1 className="heading text-4xl sm:text-5xl">Welcome back, {firstName}</h1><p className="mt-3 text-neutral/70">Here&apos;s what&apos;s happening with your account.</p>{error&&<div className="alert alert-error mt-6">{error}</div>}{!data&&!error?<div className="mt-10 flex justify-center"><span className="loading loading-spinner loading-lg text-primary"/></div>:data&&<><div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5"><DashboardCard title="Total Orders" value={data.summary.totalOrders} to="/dashboard/orders" action="View Orders"/><DashboardCard title="Pending" value={data.summary.pendingOrders} to="/dashboard/orders?status=Pending" action="View Pending"/><DashboardCard title="Wishlist" value={wishlist.count} to="/wishlist" action="Open Wishlist"/><DashboardCard title="Cart" value={cart.count} to="/cart" action="View Cart"/><DashboardCard title="Saved Addresses" value={data.summary.savedAddresses} to="/dashboard/addresses" action="Manage Addresses"/></div><div className="mt-10 rounded-3xl bg-white p-6 sm:p-8"><div className="flex items-center justify-between"><h2 className="heading text-3xl">Recent Orders</h2>{data.recentOrders.length>0&&<Link to="/dashboard/orders" className="btn btn-ghost btn-sm">View All</Link>}</div>{data.recentOrders.length?<div className="mt-5 space-y-3">{data.recentOrders.map(order=><article key={order._id} className="grid gap-3 rounded-2xl border border-base-300 p-4 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] md:items-center"><strong>{order.orderNumber}</strong><span>{new Date(order.createdAt).toLocaleDateString()}</span><span>৳ {order.total}</span><span className="badge badge-outline">{order.orderStatus}</span><Link className="btn btn-primary btn-sm" to={`/dashboard/orders/${order._id}`}>View Details</Link></article>)}</div>:<div className="py-12 text-center"><p className="text-lg font-semibold">No orders yet</p><p className="mt-2 text-neutral/60">Your purchases will appear here.</p><Link to="/shop" className="btn btn-primary mt-5 rounded-full">Start Shopping</Link></div>}</div></>}</section>;
};
export default DashboardHome;
