import{Link}from"react-router-dom";import{FiArrowLeft}from"react-icons/fi";
const BackButton=({to,label="Back"})=><Link to={to} className="btn btn-ghost btn-sm -ml-2 mb-4 gap-2"><FiArrowLeft aria-hidden="true"/>{label}</Link>;export default BackButton;
