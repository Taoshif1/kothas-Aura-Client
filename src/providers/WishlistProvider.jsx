import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { WishlistContext } from "../context/WishlistContext";
import * as api from "../api/wishlist";

const KEY = "kothas_aura_guest_wishlist";
const readGuest = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };

const WishlistProvider = ({ children }) => {
  const { dbUser } = useAuth();
  const [items, setItems] = useState(readGuest);
  const persist = (next) => { localStorage.setItem(KEY, JSON.stringify(next)); setItems(next); };

  useEffect(() => {
    if (!dbUser) { Promise.resolve().then(() => setItems(readGuest())); return; }
    const guest = readGuest();
    const request = guest.length ? api.mergeWishlist(guest.map((item) => item._id)) : api.getWishlist();
    request.then((data) => { setItems(data.items); if (guest.length) localStorage.removeItem(KEY); }).catch(() => toast.error("Unable to synchronize wishlist"));
  }, [dbUser]);

  const contains = (id) => items.some((item) => item._id === id);
  const toggle = async (product) => {
    if (dbUser) {
      const data = contains(product._id) ? await api.removeWishlistItem(product._id) : await api.addWishlistItem(product._id);
      setItems(data.items);
    } else persist(contains(product._id) ? items.filter((item) => item._id !== product._id) : [...items, product]);
  };
  return <WishlistContext.Provider value={{ items, count: items.length, contains, toggle }}>{children}</WishlistContext.Provider>;
};
export default WishlistProvider;
