"use client";

import GoogleSignIn from "@/components/guestbook/GoogleSignIn";
import MessageForm from "@/components/guestbook/MessageForm";
import MessagesList from "@/components/guestbook/MessagesList";
import { useAuthUser } from "@/hooks/useAuthUser";


export default function Guestbook() {
  const { user, authReady, handleSignIn, handleSignOut } = useAuthUser();

  return (
    <main className="min-h-screen mt-16 md:mt-24 ">
      <div className="max-w-3xl w-full mx-auto">
        {/* Header */}
        <div className="mb-8 px-4 md:px-0">
          <h1 className="text-xl md:text-2xl tracking-tight text-strong mb-2">Guestbook 🌱</h1>
          <p className="md:text-lg">
            SignIn with your google account to leave a message in the guestbook
          </p>
        </div>

        {/* Sign In Section */}
        {authReady && (
          <div className="mb-8">
            <GoogleSignIn
              user={user}
              onSignIn={handleSignIn}
              onSignOut={handleSignOut}
            />
          </div>
        )}
        

        {/* Message Form Section */}
        {user && (
          <div className="fixed z-50  mx-auto inset-x-2 md:inset-x-0 bottom-4">
            <MessageForm user={user} />
          </div>
        )}

        {/* Messages Section */}
        <div className="">
          <MessagesList messageItemClassName="px-4 md:p-4 " />
        </div>
      </div>
    </main>
  );
}
