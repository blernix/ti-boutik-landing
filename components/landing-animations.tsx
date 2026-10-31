"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Car,
  MapPin,
  Sailboat,
  Scissors,
  Search,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { PhoneFrame, StatusBar, ChatInput } from "@/components/phone";
import { WhatsAppIcon } from "@/components/icons";

function useLoop(steps: number, intervalMs: number): number {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % steps), intervalMs);
    return () => clearInterval(id);
  }, [reduce, steps, intervalMs]);
  return step;
}

function MiniChatHeader({
  title,
  status,
  icon,
}: {
  title: string;
  status: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 bg-wa-dark px-2.5 py-2 text-white">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-amber-500">
        {icon}
      </div>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-xs font-semibold">{title}</p>
        <p className="text-[10px] text-emerald-100/80">{status}</p>
      </div>
    </div>
  );
}

function MiniBubble({
  side,
  children,
}: {
  side: "in" | "out";
  children: React.ReactNode;
}) {
  const out = side === "out";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`mb-2 flex ${out ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-3 py-2 text-xs leading-snug shadow-sm ${
          out ? "rounded-tr-md bg-wa-bubble" : "rounded-tl-md bg-white"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <div className="mb-2 flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-white px-3 py-2.5 shadow-sm">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="typing-dot h-1.5 w-1.5 rounded-full bg-zinc-400"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroPhone() {
  const step = useLoop(4, 1500);
  return (
    <div className="mx-auto w-full max-w-[280px]">
      <PhoneFrame heightClassName="h-[420px]">
        <StatusBar time="14:32" />
        <MiniChatHeader
          title="O'Boucané · Resto"
          status="En ligne"
          icon={<UtensilsCrossed className="h-4 w-4 text-white" />}
        />
        <div className="wa-chat-bg no-scrollbar flex-1 overflow-hidden px-3 py-3">
          <div className="mx-auto mb-3 w-max rounded-lg bg-white/60 px-3 py-1 text-[10px] text-zinc-500">
            Aujourd&apos;hui
          </div>
          <AnimatePresence>
            <MiniBubble side="out" key="client">
              🧾 2 plats à emporter :<br />
              1× Poulet Boucané, 1× Jus local 🙏
            </MiniBubble>
            {step === 1 && <TypingDots key="typing" />}
            {step >= 2 && (
              <MiniBubble side="in" key="merchant">
                Bonjou ! Commande reçue ✅<br />
                Prête dans 20 min 🌴
              </MiniBubble>
            )}
          </AnimatePresence>
        </div>
        <ChatInput />
      </PhoneFrame>
    </div>
  );
}

/* Le même téléphone, l'autre métier : une demande de créneau au lieu d'une
   commande. Même cadre, même conversation, mêmes animations. */
export function HeroPhoneRdv() {
  const step = useLoop(4, 1500);
  return (
    <div className="mx-auto w-full max-w-[280px]">
      <PhoneFrame heightClassName="h-[420px]">
        <StatusBar time="14:32" />
        <MiniChatHeader
          title="Carnet · Coiffure"
          status="En ligne"
          icon={<Scissors className="h-4 w-4 text-white" />}
        />
        <div className="wa-chat-bg no-scrollbar flex-1 overflow-hidden px-3 py-3">
          <div className="mx-auto mb-3 w-max rounded-lg bg-white/60 px-3 py-1 text-[10px] text-zinc-500">
            Aujourd&apos;hui
          </div>
          <AnimatePresence>
            <MiniBubble side="out" key="client">
              📅 Coupe femme, samedi 10 h ?
              <br />
              Avec Yann si possible 🙏
            </MiniBubble>
            {step === 1 && <TypingDots key="typing" />}
            {step >= 2 && (
              <MiniBubble side="in" key="merchant">
                C&apos;est noté ✅<br />
                Samedi 10 h avec Yann 🌴
              </MiniBubble>
            )}
          </AnimatePresence>
        </div>
        <ChatInput />
      </PhoneFrame>
    </div>
  );
}

const COMMERCES = [
  {
    id: "resto",
    icon: <UtensilsCrossed className="h-4 w-4 text-white" />,
    name: "Resto",
    city: "Pointe-à-Pitre",
    items: [
      { label: "Poulet boucané", price: "18 €" },
      { label: "Lambi grillé", price: "25 €" },
      { label: "Jus local", price: "5 €" },
    ],
    cta: "Commander sur WhatsApp",
  },
  {
    id: "location",
    icon: <Car className="h-4 w-4 text-white" />,
    name: "Location de voitures",
    city: "Le Gosier",
    items: [
      { label: "Citadine — 24 h", price: "45 €" },
      { label: "SUV 7 places — 24 h", price: "70 €" },
      { label: "Assurance tous risques", price: "12 €" },
    ],
    cta: "Réserver sur WhatsApp",
  },
  {
    id: "excursion",
    icon: <Sailboat className="h-4 w-4 text-white" />,
    name: "Excursion bateau",
    city: "Saint-François",
    items: [
      { label: "Sortie mangrove", price: "40 €" },
      { label: "Journée Marie-Galante", price: "85 €" },
      { label: "Snorkeling", price: "30 €" },
    ],
    cta: "Réserver sur WhatsApp",
  },
  {
    id: "boutique",
    icon: <Store className="h-4 w-4 text-white" />,
    name: "Boutique artisanale",
    city: "Basse-Terre",
    items: [
      { label: "Panier en osier", price: "35 €" },
      { label: "Tissu madras", price: "18 €" },
      { label: "Épices créoles", price: "9 €" },
    ],
    cta: "Commander sur WhatsApp",
  },
];

export function CommerceShowcase() {
  const step = useLoop(COMMERCES.length, 3200);
  const commerce = COMMERCES[step];
  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto w-full max-w-[280px]">
        <PhoneFrame heightClassName="h-[430px]">
          <div className="flex h-full flex-col bg-cream">
            <AnimatePresence mode="wait">
              <motion.div
                key={commerce.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="flex h-full flex-col"
              >
                <div className="flex items-center gap-2 bg-white px-3 py-2.5 shadow-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-amber-500">
                    {commerce.icon}
                  </div>
                  <div className="min-w-0 leading-tight">
                    <p className="truncate text-xs font-bold">{commerce.name}</p>
                    <p className="flex items-center gap-1 text-[10px] text-zinc-500">
                      <MapPin className="h-3 w-3" />
                      {commerce.city}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-700 to-teal-600 px-3 py-3 text-white">
                  <p className="text-xs font-bold leading-snug">
                    Commandez en ligne, payez par carte ou en espèces.
                  </p>
                </div>

                <div className="flex-1 space-y-2 px-3 py-3">
                  {commerce.items.map((it) => (
                    <div
                      key={it.label}
                      className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-black/5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold">
                          {it.label}
                        </p>
                        <p className="text-[10px] text-zinc-500">Disponible</p>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-emerald-700">
                        {it.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="px-3 pb-3">
                  <div className="flex items-center justify-center gap-1.5 rounded-xl bg-wa py-2.5 text-xs font-bold text-white">
                    <WhatsAppIcon className="h-4 w-4" />
                    {commerce.cta}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </PhoneFrame>
      </div>
      <div className="mt-3 flex gap-1.5">
        {COMMERCES.map((c, i) => (
          <span
            key={c.id}
            className={`h-1.5 rounded-full transition-all ${
              i === step ? "w-5 bg-emerald-600" : "w-1.5 bg-zinc-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const SEARCHES = [
  {
    query: "restaurant guadeloupe",
    name: "O'Boucané — Resto",
    url: "oboucane.fr",
    meta: "⭐ 4,9 · Ouvert · Pointe-à-Pitre",
  },
  {
    query: "location voiture pointe-à-pitre",
    name: "Karukera Location",
    url: "karukera-location.fr",
    meta: "⭐ 4,8 · Ouvert · Le Gosier",
  },
  {
    query: "excursion bateau guadeloupe",
    name: "Mangrove Aventure",
    url: "mangrove-aventure.fr",
    meta: "⭐ 4,9 · Ouvert · Saint-François",
  },
];

export function SearchDemo() {
  const step = useLoop(SEARCHES.length, 3600);
  const s = SEARCHES[step];
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 sm:p-4">
      <div className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2.5 shadow-sm">
        <Search className="h-4 w-4 shrink-0 text-zinc-400" />
        <div className="min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="block truncate text-sm text-zinc-700"
            >
              {s.query}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="h-5 w-px animate-pulse bg-emerald-600" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3 space-y-2"
        >
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                {s.name[0]}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-emerald-900">
                  {s.name}
                </p>
                <p className="truncate text-xs text-emerald-700">{s.url}</p>
              </div>
            </div>
            <p className="mt-1.5 text-xs text-zinc-600">{s.meta}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Menu", "Commander", "Horaires"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-black/5 px-3 py-2">
            <MapPin className="h-4 w-4 shrink-0 text-amber-500" />
            <p className="truncate text-xs text-zinc-500">
              {s.name} · Guadeloupe ·{" "}
              <span className="font-semibold text-emerald-700">Ouvert</span>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
