import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import useAuth from "../hooks/useAuth";
import * as cartApi from "../api/cart";

const KEY = "kothas_aura_guest_cart";
const readGuest = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
const keyOf = (item) => `${item.productId}:${item.variantSku || ""}`;
const guestResult = (items) => ({ items, count: items.reduce((sum, item) => sum + item.quantity, 0), subtotal: items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) });

const CartProvider = ({ children }) => {
  const { dbUser } = useAuth();
  const [cart, setCart] = useState(() => guestResult(readGuest()));
  const [loading, setLoading] = useState(false);
  const persistGuest = (items) => { localStorage.setItem(KEY, JSON.stringify(items)); setCart(guestResult(items)); };
  const refresh = useCallback(async () => { if (!dbUser) { setCart(guestResult(readGuest())); return; } setLoading(true); try { setCart(await cartApi.getCart()); } finally { setLoading(false); } }, [dbUser]);

  useEffect(() => {
    if (!dbUser) { Promise.resolve().then(() => setCart(guestResult(readGuest()))); return; }
    const guest = readGuest();
    const request = guest.length ? cartApi.mergeCart(guest.map(({ productId, variantSku, quantity }) => ({ productId, variantSku, quantity }))) : cartApi.getCart();
    request.then((data) => { setCart(data); if (guest.length) localStorage.removeItem(KEY); }).catch(() => toast.error("Unable to synchronize your cart"));
  }, [dbUser]);

  const addItem = async (product, variant = null, quantity = 1) => {
    const payload = { productId: product._id, variantSku: variant?.sku || null, quantity };
    if (dbUser) setCart(await cartApi.addCartItem(payload));
    else { const items = readGuest(); const index = items.findIndex((item) => keyOf(item) === keyOf(payload)); const snapshot = { ...payload, name: product.name, image: product.images?.[0] || "", sku: variant?.sku || product.sku, selectedAttributes: variant?.attributes || {}, unitPrice: variant?.price ?? product.price, compareAtPrice: variant?.compareAtPrice ?? product.compareAtPrice, availableStock: variant?.stock ?? product.stock, available: product.active !== false }; if (index >= 0) items[index].quantity = Math.min(items[index].quantity + quantity, snapshot.availableStock); else items.push(snapshot); persistGuest(items); }
  };
  const updateQuantity = async (item, quantity) => { if (dbUser) setCart(await cartApi.updateCartItem({ productId: item.productId, variantSku: item.variantSku, quantity })); else persistGuest(readGuest().map((entry) => keyOf(entry) === keyOf(item) ? { ...entry, quantity } : entry)); };
  const removeItem = async (item) => { if (dbUser) setCart(await cartApi.removeCartItem(item.productId, item.variantSku)); else persistGuest(readGuest().filter((entry) => keyOf(entry) !== keyOf(item))); };
  const clear = async () => { if (dbUser) setCart(await cartApi.clearCart()); else persistGuest([]); };
  const value = { ...cart, loading, addItem, updateQuantity, removeItem, clear, refresh };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export default CartProvider;
