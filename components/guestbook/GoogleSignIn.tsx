"use client";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon, LoginCircle01Icon, Logout, Logout01Icon, Logout02Icon } from "@hugeicons/core-free-icons";
import Avatar from "./Avatar";


interface GoogleSignInProps {
  user: User | null;
  onSignIn: (user: User) => void;
  onSignOut: () => void;
}

export default function GoogleSignIn({
  user,
  onSignIn,
  onSignOut,
}: GoogleSignInProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    // No redirect flow: auth state is handled by onAuthStateChanged in the hook
  }, [onSignIn]);

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) onSignIn(result.user);
    } catch (error) {
      console.error("Sign in error:", error);
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      await signOut(auth);
      onSignOut();
    } catch (error) {
      console.error("Sign out error:", error);
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="flex items-center flex-row gap-4 md:p-4 md:border md:border-border/40 rounded-xl">
        <div className="flex min-w-0 md:w-auto w-2/3 items-center gap-3 rounded-lg">
          <Avatar
            name={user.displayName || user.email || "User"}
            src={user.photoURL}
            size={"sm"}
          />
          <div>
            <p className="font-medium text-strong">{user.displayName || user.email}</p>
            <p className="text-sm text-color">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="ml-auto md:px-4 p-2 md:py-2 bg-danger text-danger-text rounded-lg cursor-pointer hover:bg-danger-hover disabled:opacity-50"
        >
          <span className="md:flex hidden">

          {loading ? "Signing out..." : "Sign Out"}
          </span>
          <HugeiconsIcon icon={LoginCircle01Icon} className="md:hidden flex size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="px-4 py-2 bg-white text-warning-text gap-2 flex items-center justify-center rounded-lg hover:bg-gray-200 disabled:opacity-50 font-medium"
      >
        {loading ? (
          <HugeiconsIcon icon={Loading03Icon} className="size-5 animate-spin" />
        ) : (
          <Image src="/google.png" alt="Google Icon" width={20} height={20} />
        )}
        {loading ? "Signing In..." : "Sign In with Google"}
      </button>
      {errorMessage && (
        <p className="text-sm text-danger" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

function getAuthErrorMessage(error: unknown) {
  const code = typeof error === "object" && error && "code" in error
    ? String(error.code)
    : "";

  if (code === "auth/unauthorized-domain") {
    return "This browser address is not allowed in Firebase Auth. Add it in Firebase Authentication > Settings > Authorized domains.";
  }

  if (code === "auth/popup-blocked" || code === "auth/popup-closed-by-user") {
    return "Google sign-in could not open. Try again, or use the localhost URL on desktop.";
  }

  return "Google sign-in failed. Check the browser console for details.";
}
