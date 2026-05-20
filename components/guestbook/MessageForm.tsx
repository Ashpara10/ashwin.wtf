"use client";

import { User } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp02Icon, StopIcon } from "@hugeicons/core-free-icons";

interface MessageFormProps {
  user: User | null;
}

export default function MessageForm({ user }: MessageFormProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !message.trim()) {
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "chat"), {
          name: user.displayName || "Anonymous",
          avatar: user.photoURL || "",
          email: user.email || "",
          uid: user.uid || "",
          message: message.trim(),
          createdAt: serverTimestamp(),
      });
      setMessage("");
    } catch (error) {
      console.error("Error adding message:", error);
    } finally {
      setLoading(false);
    }
  };

//   if (!user) {
//     return (
//       <div className="p-6 bg-background border border-border rounded-lg">
//         <p className="text-strong font-medium">
//           Please sign in to leave a message
//         </p>
//       </div>
//     );
//   }

  return (
    <form onSubmit={handleSubmit} className="border flex flex-row border-border/60 bg-border/20 backdrop-blur-xl items-center justify-center  rounded-xl w-full max-w-3xl mx-auto">
      <div className="w-full p-4 pr-0">
        <textarea className="size-full flex-1 resize-none  focus:outline-none"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave a message..."
          disabled={loading}
          rows={1}
        />
      </div>
      <div className="p-4 shrink-0">
      <button
        type="submit"
        disabled={loading || !message.trim()}
        className="p-2  rounded-full bg-white hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center ml-auto"
        >
        <HugeiconsIcon className="size-4 md:size-5 text-black" icon={loading?StopIcon:ArrowUp02Icon} />
      </button>
          </div>
    </form>
  );
}
