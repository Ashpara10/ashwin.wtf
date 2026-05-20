"use client";

import { useCallback, useEffect, useState } from "react";
import { User, onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const handleSignIn = useCallback((newUser: User) => {
    setUser(newUser);
  }, []);

  const handleSignOut = useCallback(() => {
    setUser(null);
  }, []);

  useEffect(() => {
    // Handle the result coming back from Google redirect
    getRedirectResult(auth).catch((error) => {
      console.error("Redirect sign-in error:", error.code, error.message);
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    authReady,
    handleSignIn,
    handleSignOut,
  };
}