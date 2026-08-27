const safeInternalPath=(value)=>typeof value==="string"&&value.startsWith("/")&&!value.startsWith("//")?value:null;
export const getRequestedPath=(state)=>safeInternalPath(typeof state==="string"?state:state?.from);
export const destinationForRole=(role,state)=>{const requested=getRequestedPath(state);if(requested?.startsWith("/admin"))return role==="admin"?requested:"/dashboard";if(requested?.startsWith("/dashboard"))return role==="admin"?"/admin":requested;if(requested)return requested;return role==="admin"?"/admin":"/dashboard";};
