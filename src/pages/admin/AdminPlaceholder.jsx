import { useLocation } from "react-router-dom";
const AdminPlaceholder = () => { const title = useLocation().pathname.split("/").pop().replace(/\b\w/g, (letter) => letter.toUpperCase()); return <section className="rounded-3xl bg-white p-12 text-center"><p className="uppercase tracking-[4px] text-primary">Coming in a later phase</p><h1 className="heading mt-3 text-5xl">{title}</h1><p className="mt-5 text-neutral/60">The secure route and navigation foundation are ready.</p></section>; };
export default AdminPlaceholder;
