"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: "sm" | "md"| "xs";
}

const sizeClasses = {
  xs: "size-6 text-xs",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function Avatar({ name, src, size = "sm" }: AvatarProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const initials = useMemo(() => getInitials(name), [name]);
  const showImage = Boolean(src) && !hasImageError;

  return (
    <div
      className={`${sizeClasses[size]} flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-border/50 font-medium text-strong`}
      aria-hidden="true"
    >
      {showImage ? (
        <img
          src={src as string}
          alt=""
          referrerPolicy="no-referrer"
          className="size-full object-cover"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
