import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase.config";
import { clearBackendSession, createBackendSession } from "../api/auth";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshSession = async (firebaseUser = auth.currentUser) => {
    if (!firebaseUser) return null;
    const profile = await createBackendSession(await firebaseUser.getIdToken(true));
    setDbUser(profile);
    return profile;
  };
  useEffect(() => onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    try {
      if (currentUser) await refreshSession(currentUser);
      else { setDbUser(null); await clearBackendSession().catch(() => null); }
    } catch { setDbUser(null); }
    finally { setLoading(false); }
  }), []);
  const logoutUser = async () => {
    setLoading(true);
    await Promise.allSettled([clearBackendSession(), signOut(auth)]);
    setDbUser(null);
    setLoading(false);
  };
  const loginUser = async (email, password) => { const result = await signInWithEmailAndPassword(auth, email, password); await refreshSession(result.user); return result; };
  const googleLogin = async () => { const result = await signInWithPopup(auth, googleProvider); await refreshSession(result.user); return result; };
  return <AuthContext.Provider value={{ user, dbUser, loading, createUser: (email, password) => createUserWithEmailAndPassword(auth, email, password), loginUser, googleLogin, logoutUser, updateUserProfile: (profile) => updateProfile(auth.currentUser, profile), resetPassword: (email) => sendPasswordResetEmail(auth, email), refreshSession }}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
