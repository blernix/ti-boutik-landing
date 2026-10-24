"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CheckCheck,
  Flame,
  Loader2,
  Lock,
  User,
} from "lucide-react";
import {
  RESTAURANT,
  buildStripeLink,
  formatPrice,
  type CartItem,
  type PaymentMethod,
} from "@/lib/menu";
import { PhoneFrame, StatusBar, ChatHeader, ChatInput } from "@/components/phone";
import {
  StripeIcon,
  ApplePayIcon,
  GooglePayIcon,
  PayPalIcon,
} from "@/components/icons";

type WhatsAppSimProps = {
  items: CartItem[];
  name: string;
  total: number;
  paymentMethod: PaymentMethod;
  onBack: () => void;
};

export default function WhatsAppSim({
  items,
  name,
  total,
  paymentMethod,
  onBack,
}: WhatsAppSimProps) {
  const [orderSent, setOrderSent] = useState(false);
  const [merchantTyping, setMerchantTyping] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const clientChatRef = useRef<HTMLDivElement>(null);
  const merchantChatRef = useRef<HTMLDivElement>(null);
  const stripeLink = useMemo(() => buildStripeLink(total), [total]);
  const clientName = name.trim() || "Client";

  useEffect(() => {
    const t1 = setTimeout(() => setOrderSent(true), 700);
    const t2 = setTimeout(() => setMerchantTyping(true), 2000);
    const t3 = setTimeout(() => {
      setMerchantTyping(false);
      setConfirmed(true);
    }, 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    clientChatRef.current?.scrollTo({
      top: clientChatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [orderSent, merchantTyping, confirmed, paid]);

  useEffect(() => {
    merchantChatRef.current?.scrollTo({
      top: merchantChatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [orderSent, confirmed, paid]);

  const openLink = () => setPaying(true);

  const onPaid = () => {
    setPaying(false);
    setPaid(true);
  };

  const hint = !orderSent
    ? "📲 Le client envoie sa commande…"
    : !confirmed
      ? "🔗 Le gérant lit la commande…"
      : paymentMethod === "cash"
        ? "✅ Commande confirmée — paiement en espèces à la réception 🌴"
        : !paying && !paid
          ? "👉 Le client : appuie sur le lien de paiement"
          : paying
            ? "💳 Le client règle par carte…"
            : "✅ Paiement confirmé ! Commande en préparation.";

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 px-4 py-6 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute -right-16 bottom-24 h-72 w-72 rounded-full bg-teal-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 mb-4 flex w-full max-w-4xl items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Boutique
        </button>
        <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-100 backdrop-blur">
          Simulation · 2 écrans
        </span>
      </div>

      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-start lg:gap-10">
        {/* Client phone */}
        <PhoneColumn
          label="👤 Client"
          active={paymentMethod === "card" && confirmed && !paid}
        >
          <PhoneFrame>
            <StatusBar />
            <ChatHeader
              title={`${RESTAURANT.name} · ${RESTAURANT.subtitle}`}
              status="En ligne"
              avatar={
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-amber-500">
                  <Flame className="h-5 w-5" />
                </div>
              }
            />
            <div
              ref={clientChatRef}
              className="wa-chat-bg no-scrollbar flex-1 overflow-y-auto px-3 py-3"
            >
              <div className="mx-auto mb-3 w-max rounded-lg bg-white/60 px-3 py-1 text-[11px] text-zinc-500">
                Aujourd&apos;hui
              </div>

              {orderSent && (
                <ChatBubble side="out" time="14:32" read>
                  <ClientOrderMessage
                    items={items}
                    total={total}
                    name={clientName}
                    link={stripeLink}
                    method={paymentMethod}
                    onOpen={paymentMethod === "card" ? openLink : undefined}
                  />
                </ChatBubble>
              )}

              {merchantTyping && <TypingIndicator />}

              {confirmed && (
                <ChatBubble side="in" time="14:35">
                  <ConfirmationMessage
                    name={clientName}
                    method={paymentMethod}
                  />
                </ChatBubble>
              )}

              {paid && (
                <ChatBubble side="in" time="14:37">
                  <p className="text-sm leading-snug text-zinc-700">
                    <span className="mr-1">✅</span>
                    Paiement de{" "}
                    <span className="font-bold text-emerald-700">
                      {formatPrice(total)}
                    </span>{" "}
                    reçu ! Votre commande est en préparation.
                  </p>
                </ChatBubble>
              )}
            </div>
            <ChatInput />
            <AnimatePresence>
              {paying && <StripeBrowser total={total} onPaid={onPaid} />}
            </AnimatePresence>
          </PhoneFrame>
        </PhoneColumn>

        {/* Merchant phone */}
        <PhoneColumn label="🍽️ Restaurateur · O'Boucané" active={merchantTyping}>
          <PhoneFrame>
            <StatusBar />
            <ChatHeader
              title={clientName}
              status="En ligne"
              avatar={
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                  {clientName.trim() ? (
                    <span className="text-sm font-bold">
                      {clientName[0].toUpperCase()}
                    </span>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </div>
              }
            />
            <div
              ref={merchantChatRef}
              className="wa-chat-bg no-scrollbar flex-1 overflow-y-auto px-3 py-3"
            >
              <div className="mx-auto mb-3 w-max rounded-lg bg-white/60 px-3 py-1 text-[11px] text-zinc-500">
                Aujourd&apos;hui
              </div>

              {orderSent && (
                <ChatBubble side="in" time="14:32">
                  <ClientOrderMessage
                    items={items}
                    total={total}
                    name={clientName}
                    link={stripeLink}
                    method={paymentMethod}
                  />
                </ChatBubble>
              )}

              {confirmed && (
                <ChatBubble side="out" time="14:35" read>
                  <ConfirmationMessage
                    name={clientName}
                    method={paymentMethod}
                  />
                </ChatBubble>
              )}

              {paid && (
                <ChatBubble side="in" time="14:37">
                  <p className="text-sm leading-snug text-zinc-700">
                    <span className="mr-1">💳</span>
                    Paiement de{" "}
                    <span className="font-bold text-emerald-700">
                      {formatPrice(total)}
                    </span>{" "}
                    reçu pour {clientName}. Commande en préparation.
                  </p>
                </ChatBubble>
              )}
            </div>
            <ChatInput />
          </PhoneFrame>
        </PhoneColumn>
      </div>

      <div className="relative z-10 mt-6 flex max-w-4xl justify-center">
        <div className="rounded-full bg-white/10 px-4 py-2 text-center text-sm font-medium text-emerald-50 backdrop-blur">
          {hint}
        </div>
      </div>
    </div>
  );
}

function PhoneColumn({
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

function ChatBubble({
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

function TypingIndicator() {
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

function ClientOrderMessage({
  items,
  total,
  name,
  link,
  method,
  onOpen,
}: {
  items: CartItem[];
  total: number;
  name: string;
  link: string;
  method: PaymentMethod;
  onOpen?: () => void;
}) {
  return (
    <div>
      <p className="text-sm font-bold text-zinc-800">🧾 Nouvelle commande</p>
      <div className="mt-1.5 space-y-1">
        {items.map(({ product, qty }) => (
          <p key={product.id} className="text-sm leading-snug text-zinc-700">
            <span className="font-semibold">{qty} ×</span> {product.name}{" "}
            <span className="text-zinc-500">
              — {formatPrice(product.price * qty)}
            </span>
          </p>
        ))}
      </div>
      <div className="mt-2 border-t border-black/5 pt-2">
        <p className="text-sm font-bold text-zinc-800">
          Total : {formatPrice(total)}
        </p>
        <p className="mt-1 text-sm text-zinc-700">👤 {name}</p>
      </div>
      <div className="mt-2 rounded-lg bg-black/5 px-2.5 py-2">
        {method === "card" ? (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              🔗 Lien de paiement
            </p>
            {onOpen ? (
              <button
                onClick={onOpen}
                className="mt-0.5 break-all text-left font-mono text-[10px] leading-snug text-sky-700 underline decoration-sky-400 underline-offset-2"
              >
                {link}
              </button>
            ) : (
              <p className="mt-0.5 break-all font-mono text-[10px] leading-snug text-sky-700">
                {link}
              </p>
            )}
            <p className="mt-1.5 text-[11px] leading-snug text-zinc-500">
              💡 Réglez uniquement après confirmation du restaurant.
            </p>
          </>
        ) : (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              💵 Paiement en espèces
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">
              À la réception de la commande.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function ConfirmationMessage({
  name,
  method,
}: {
  name: string;
  method: PaymentMethod;
}) {
  return (
    <p className="text-sm leading-snug text-zinc-700">
      Bonjour {name} ! Commande acceptée ✅{" "}
      {method === "card"
        ? "Vous pouvez initier le paiement via le lien de votre message précédent 🌴"
        : "Payez en espèces à la réception 🌴"}{" "}
      Mèsi !
    </p>
  );
}

function StripeBrowser({
  total,
  onPaid,
}: {
  total: number;
  onPaid: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "processing" | "success">(
    "idle",
  );
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const handlePay = () => {
    setStatus("processing");
    timers.current.push(setTimeout(() => setStatus("success"), 1400));
    timers.current.push(setTimeout(onPaid, 2400));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 flex flex-col bg-white"
    >
      <div className="flex items-center gap-2 border-b border-black/10 bg-zinc-50 px-3 pb-2 pt-2">
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] text-zinc-500 ring-1 ring-black/10">
          <Lock className="h-3 w-3 text-emerald-600" />
          <span className="truncate">pay.stripe.com/c/pay/…</span>
        </div>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto p-4">
        {status !== "success" ? (
          <>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#635BFF] text-white">
                <StripeIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold">Stripe Checkout</p>
                <p className="text-xs text-zinc-500">
                  Paiement sécurisé · 3-D Secure
                </p>
              </div>
            </div>

            <div className="mb-4 rounded-2xl bg-zinc-50 p-4">
              <p className="text-xs text-zinc-500">
                {RESTAURANT.name} · Commande
              </p>
              <p className="text-2xl font-extrabold">{formatPrice(total)}</p>
            </div>

            <div className="mb-4 rounded-2xl border border-black/10 p-4">
              <p className="mb-2 text-xs font-semibold text-zinc-500">
                Carte bancaire
              </p>
              <div className="rounded-xl border border-black/10 px-3 py-2.5 text-sm font-medium">
                •••• •••• •••• 4242
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-black/10 px-3 py-2.5 text-sm text-zinc-500">
                  12 / 27
                </div>
                <div className="rounded-xl border border-black/10 px-3 py-2.5 text-sm text-zinc-500">
                  CVC
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-2 flex items-center gap-3 text-[11px] font-medium text-zinc-400">
                <span className="h-px flex-1 bg-black/5" />
                ou payez avec
                <span className="h-px flex-1 bg-black/5" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center gap-1 rounded-xl border border-black/10 bg-white py-2.5">
                  <ApplePayIcon className="h-5 w-5 text-black" />
                  <span className="text-[10px] font-semibold text-zinc-500">
                    Apple Pay
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-xl border border-black/10 bg-white py-2.5">
                  <GooglePayIcon className="h-5 w-5 text-[#4285F4]" />
                  <span className="text-[10px] font-semibold text-zinc-500">
                    Google Pay
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-xl border border-black/10 bg-white py-2.5">
                  <PayPalIcon className="h-5 w-5 text-[#003087]" />
                  <span className="text-[10px] font-semibold text-zinc-500">
                    PayPal
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={status !== "idle"}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#635BFF] text-sm font-bold text-white transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {status === "idle" && (
                <>
                  <Lock className="h-4 w-4" />
                  Payer {formatPrice(total)}
                </>
              )}
              {status === "processing" && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Paiement en cours…
                </>
              )}
            </button>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"
            >
              <Check className="h-10 w-10 text-emerald-600" />
            </motion.div>
            <p className="text-lg font-bold">Paiement réussi</p>
            <p className="mt-1 text-sm text-zinc-500">
              {formatPrice(total)} — {RESTAURANT.name}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
