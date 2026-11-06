"use client";

/* Les pièces communes des écrans « deux téléphones ».
 *
 * Extraites de whatsapp-sim.tsx en même temps qu'arrivent la démo rendez-vous
 * et la démo location : les trois doivent avoir exactement la même peau, et
 * c'est le seul moyen de le garantir sans recopier trois fois le même balisage.
 */

import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";

export function PhoneColumn({
  label,
  active,
  children,
}: {
  label: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="flex w-full max-w-[360px] flex-col items-center gap-3"
    >
      <div
        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
          active
            ? "bg-amber-400 text-emerald-950 shadow-lg shadow-amber-400/30"
            : "bg-white/10 text-emerald-50"
        }`}
      >
        {label}
      </div>
      <div
        className={`w-full transition ${
          active ? "rounded-[3.2rem] ring-2 ring-amber-400/70" : ""
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function ChatBubble({
  side,
  time,
  read,
  children,
}: {
  side: "in" | "out";
  time: string;
  read?: boolean;
  children: React.ReactNode;
}) {
  const out = side === "out";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`mb-2 flex ${out ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 shadow-sm ${
          out ? "rounded-tr-md bg-wa-bubble" : "rounded-tl-md bg-white"
        }`}
      >
        {children}
        <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-zinc-500">
          <span>{time}</span>
          {out && read && <CheckCheck className="h-4 w-4 text-sky-500" />}
        </div>
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-2 flex justify-start"
    >
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm">
        <span
          className="typing-dot h-2 w-2 rounded-full bg-zinc-400"
          style={{ animationDelay: "0s" }}
        />
        <span
          className="typing-dot h-2 w-2 rounded-full bg-zinc-400"
          style={{ animationDelay: "0.15s" }}
        />
        <span
          className="typing-dot h-2 w-2 rounded-full bg-zinc-400"
          style={{ animationDelay: "0.3s" }}
        />
      </div>
    </motion.div>
  );
}

/** Le jour affiché en tête de conversation, comme dans WhatsApp. */
export function ChatDay() {
  return (
    <div className="mx-auto mb-3 w-max rounded-lg bg-white/60 px-3 py-1 text-[11px] text-zinc-500">
      Aujourd&apos;hui
    </div>
  );
}
