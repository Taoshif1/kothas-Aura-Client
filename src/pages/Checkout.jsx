import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
const Checkout = () => <section className="flex min-h-[70vh] items-center pt-28"><div className="container-x text-center"><p className="uppercase tracking-[4px] text-primary">Phase 4</p><h1 className="heading mt-3 text-5xl">Checkout is coming next</h1><p className="mx-auto mt-5 max-w-xl text-neutral/60">Your cart is safe. Address, delivery, payment, and order creation will be added in the checkout phase.</p><Link to={ROUTES.CART} className="btn btn-primary mt-8 rounded-full">Return to Cart</Link></div></section>;
export default Checkout;
