"use client";

import { Trash2 } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { deleteDoc, doc as firestoreDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthUser } from "@/hooks/useAuthUser";
import Avatar from "./Avatar";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    name: string;
    avatar: string;
    message: string;
    createdAt: Date;
    email?: string;
    uid?: string;
}

interface MessageItemProps {
    msg: Message;
    variant?: "minimal" | "default";
    className?: string
}

export default function MessageItem({ msg, variant = "default", className }: MessageItemProps) {
    const { user } = useAuthUser();
    const currentEmail = user?.email ?? null;
    const adminEmail = "ashwinparande1156610c@gmail.com";
    const canDelete = currentEmail === adminEmail || currentEmail === (msg.email || null);

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this message?");
        if (!confirmed) return;
        try {
            await deleteDoc(firestoreDoc(db, "chat", msg.id));
        } catch (err) {
            console.error("Failed to delete message:", err);
            alert("Could not delete message. Check console for details.");
        }
    };
    return (
        <div className={cn("p-4", className)}>
            {variant === "default" && (
                <div className="flex items-start group justify-start gap-4">
                    <Avatar name={msg.name} src={msg.avatar} />
                    <div className="flex flex-row items-start w-full">
                        <div className="flex w-full flex-col items-start ">
                            <h4 className="font-medium text-strong">{msg.name}</h4>
                            <p className="text-color whitespace-pre-wrap break-words">
                                {msg.message}
                            </p>
                        </div>
              
                            {canDelete && (
                                <div className="flex-shrink-0 group-hover:opacity-100 opacity-0 transition-opacity">
                                    <button onClick={handleDelete} className="hover:text-danger transition-all p-1.5 rounded-lg hover:bg-border/40">
                                        <HugeiconsIcon icon={Trash2} className="size-4" />
                                    </button>
                                </div>
                            )}

                    </div>
                </div>)}


            {variant === "minimal" && (
                <div className="flex flex-wrap items-center justify-start gap-2">
                    <Avatar size="xs" name={msg.name} src={msg.avatar} />
                    <h4 className="font-medium text-strong">{msg.name}</h4>
                    <p className="text-color truncate line-clamp-1 whitespace-pre-wrap break-words">
                        {msg.message}
                    </p>

                </div>)}

        </div>

    );
}
