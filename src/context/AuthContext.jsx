/* eslint-disable react-refresh/only-export-components */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/auth";

const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign-up
  const signup = async (name, email, password) => {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(credentials.user, { displayName: name });

    setUser({
      ...credentials.user,
      displayName: name,
    });

    return credentials.user;
  };

  // Login
  const login = async (email, password) => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    return credentials.user;
  };

  // Google login
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    return result.user;
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  //   Persist Login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
