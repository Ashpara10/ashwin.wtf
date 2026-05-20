"use client";

import {
  collection,
  query,
  orderBy,
  limit as limitQuery,
  onSnapshot,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  name: string;
  avatar: string;
  message: string;
  createdAt: Date;
}

interface MessagesListProps {
  limit?: number;
  messageItemClassName?: string;
  variant?: "default" | "minimal";
}

export default function MessagesList({ limit, messageItemClassName, variant }: MessagesListProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
    if (limit) constraints.push(limitQuery(limit));

    const q = query(collection(db, "chat"), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "Anonymous",
            avatar: data.avatar || "",
            email: data.email || "",
            uid: data.uid || "",
            message: data.message || "",
            createdAt: data.createdAt?.toDate() || new Date(),
          };
        });
        setMessages(msgs);
        setErrorMessage("");
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching messages:", error);
        setErrorMessage(getMessagesErrorMessage(error));
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [limit]);

  return (
    <div className="divide-y divide-border/40">
      {loading ? [...Array.from({ length: limit||10 })].map((_, i) => (
        <div className={cn("p-4", messageItemClassName)} key={i}>
          <div className="flex items-start justify-start gap-4">
            <div className="size-8 shrink-0 bg-border rounded-full animate-pulse" />
            <div className="flex flex-row items-start w-full">
              <div className="flex w-full flex-col items-start  gap-2 ">
                <div className="w-2/5 bg-border animate-pulse h-3 rounded" />
                <div className="w-4/5 bg-border animate-pulse h-5 rounded-md" />
              </div>

            </div>
          </div>
        </div>
      )) : errorMessage ? (
        <div className="p-4 text-sm text-danger" role="alert">
          {errorMessage}
        </div>
      ) : messages.length === 0 ? (
        <div className="p-4 text-color opacity-70">
          No messages yet. Be the first to leave one!
        </div>
      ) : messages.map((msg) => (
        <MessageItem key={msg.id} msg={msg} className={messageItemClassName} variant={variant} />
      ))}
    </div>
  );
}

function getMessagesErrorMessage(error: unknown) {
  const code = typeof error === "object" && error && "code" in error
    ? String(error.code)
    : "";

  if (code === "permission-denied") {
    return "Messages are public in the UI, but Firestore rules are blocking signed-out reads.";
  }

  return "Could not load guestbook messages. Check the browser console for details.";
}
