import { useEffect, useRef, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase.config";
import { clearBackendSession, createBackendSession } from "../api/auth";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const syncRef = useRef({ uid: null, promise: null });
  const syncSession = async (firebaseUser = auth.currentUser, force = false) => {
    if (!firebaseUser) return null;
    if (!force && syncRef.current.uid === firebaseUser.uid && syncRef.current.promise) return syncRef.current.promise;
    const promise = createBackendSession(await firebaseUser.getIdToken(force)).then((profile) => {
      setUser(firebaseUser);
      setDbUser(profile);
      return profile;
    });
    syncRef.current = { uid: firebaseUser.uid, promise };
    try { return await promise; }
    catch (error) { syncRef.current = { uid: null, promise: null }; setUser(null); setDbUser(null); throw error; }
  };
  useEffect(() => onAuthStateChanged(auth, async (currentUser) => {
    try {
      if (currentUser) await syncSession(currentUser);
      else { syncRef.current = { uid: null, promise: null }; setUser(null); setDbUser(null); await clearBackendSession().catch(() => null); }
    } catch { setUser(null); setDbUser(null); }
    finally { setLoading(false); }
  }), []);
  const logoutUser = async () => {
    setLoading(true);
    await Promise.allSettled([clearBackendSession(), signOut(auth)]);
    setDbUser(null);
    setUser(null);
    syncRef.current = { uid: null, promise: null };
    setLoading(false);
  };
  const loginUser = async (email, password) => { const result = await signInWithEmailAndPassword(auth, email, password); await syncSession(result.user); return result; };
  const googleLogin = async () => { const result = await signInWithPopup(auth, googleProvider); await syncSession(result.user); return result; };
  const refreshSession = (firebaseUser = auth.currentUser) => syncSession(firebaseUser, true);
  return <AuthContext.Provider value={{ user, dbUser, loading, createUser: (email, password) => createUserWithEmailAndPassword(auth, email, password), loginUser, googleLogin, logoutUser, updateUserProfile: (profile) => updateProfile(auth.currentUser, profile), resetPassword: (email) => sendPasswordResetEmail(auth, email), refreshSession }}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
