"use client";

/* L'écran « deux téléphones » des démos rendez-vous et location.
 *
 * Même peau, même séquence, même badge que la démo commande : c'est le même
 * produit, seuls le métier et le message changent. La séquence vit ici et
 * nulle part ailleurs — une maquette n'a pas de minuterie à elle.
 *
 * Trois temps pour un rendez-vous (il paie au salon), quatre pour une location
 * (l'acompte est encaissé à la réservation) : on ne montre pas un paiement que
 * le produit ne prend pas.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User } from "lucide-react";
import { PhoneFrame, StatusBar, ChatHeader, ChatInput } from "@/components/phone";
import { PhoneColumn, ChatBubble, TypingIndicator, ChatDay } from "@/components/chat-ui";

export type Demande = {
  /** « ✂️ Nouvelle demande de rendez-vous » */
  titre: string;
  /** [libellé, montant] — le montant passe par formatPrice */
  lignes: [string, string][];
  total: { label: string; montant: string };
  prenom: string;
  /** une ou deux phrases, prêtes, dans la bouche du commerçant */
  confirmation: string[];
  /** 4e temps : « Acompte de 30,00 € reçu · caution notée » (location seulement) */
  apres?: string;
  copy: {
    client: string;
    commercant: string;
    titreChat: string;
    icone: React.ReactNode;
    /** ligne sous les deux téléphones */
    legende: string;
  };
};

export default function DemandeSim({
  demande,
  onBack,
}: {
  demande: Demande;
  onBack: () => void;
}) {
  const [envoye, setEnvoye] = useState(false);
  const [ecrit, setEcrit] = useState(false);
  const [confirme, setConfirme] = useState(false);
  const [encaisse, setEncaisse] = useState(false);
  const clientRef = useRef<HTMLDivElement>(null);
  const commercantRef = useRef<HTMLDivElement>(null);
  const prenom = demande.prenom.trim() || "Client";

  useEffect(() => {
    const t1 = setTimeout(() => setEnvoye(true), 700);
    const t2 = setTimeout(() => setEcrit(true), 2000);
    const t3 = setTimeout(() => {
      setEcrit(false);
      setConfirme(true);
    }, 3600);
    const t4 = demande.apres
      ? setTimeout(() => setEncaisse(true), 5200)
      : undefined;
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (t4) clearTimeout(t4);
    };
  }, [demande.apres]);

  useEffect(() => {
    clientRef.current?.scrollTo({ top: clientRef.current.scrollHeight });
    commercantRef.current?.scrollTo({ top: commercantRef.current.scrollHeight });
  }, [envoye, ecrit, confirme, encaisse]);

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
        <PhoneColumn label={demande.copy.client} active={confirme && !encaisse}>
          <PhoneFrame>
            <StatusBar />
            <ChatHeader
              title={demande.copy.titreChat}
              status="En ligne"
              avatar={
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-amber-500">
                  {demande.copy.icone}
                </div>
              }
            />
            <div
              ref={clientRef}
              className="wa-chat-bg no-scrollbar flex-1 overflow-y-auto px-3 py-3"
            >
              <ChatDay />
              {envoye && (
                <ChatBubble side="out" time="14:32" read>
                  <MessageDemande demande={demande} prenom={prenom} />
                </ChatBubble>
              )}
              {ecrit && <TypingIndicator />}
              {confirme && (
                <ChatBubble side="in" time="14:35">
                  <p className="text-sm leading-snug text-zinc-700">
                    {demande.confirmation.map((phrase) => (
                      <span key={phrase} className="block">
                        {phrase}
                      </span>
                    ))}
                  </p>
                </ChatBubble>
              )}
              {encaisse && (
                <ChatBubble side="in" time="14:37">
                  <p className="text-sm leading-snug text-zinc-700">
                    <span className="mr-1">✅</span>
                    {demande.apres}
                  </p>
                </ChatBubble>
              )}
            </div>
            <ChatInput />
          </PhoneFrame>
        </PhoneColumn>

        <PhoneColumn label={demande.copy.commercant} active={ecrit}>
          <PhoneFrame>
            <StatusBar />
            <ChatHeader
              title={prenom}
              status="En ligne"
              avatar={
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                  {demande.prenom.trim() ? (
                    <span className="text-sm font-bold">
                      {demande.prenom.trim()[0].toUpperCase()}
                    </span>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </div>
              }
            />
            <div
              ref={commercantRef}
              className="wa-chat-bg no-scrollbar flex-1 overflow-y-auto px-3 py-3"
            >
              <ChatDay />
              {envoye && (
                <ChatBubble side="in" time="14:32">
                  <MessageDemande demande={demande} prenom={prenom} />
                </ChatBubble>
              )}
              {confirme && (
                <ChatBubble side="out" time="14:35" read>
                  <p className="text-sm leading-snug text-zinc-700">
                    {demande.confirmation.map((phrase) => (
                      <span key={phrase} className="block">
                        {phrase}
                      </span>
                    ))}
                  </p>
                </ChatBubble>
              )}
              {encaisse && (
                <ChatBubble side="in" time="14:37">
                  <p className="text-sm leading-snug text-zinc-700">
                    <span className="mr-1">💳</span>
                    Paiement reçu pour {prenom}.
                  </p>
                </ChatBubble>
              )}
            </div>
            <ChatInput />
          </PhoneFrame>
        </PhoneColumn>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 mt-6 flex max-w-4xl justify-center"
      >
        <div className="rounded-full bg-white/10 px-4 py-2 text-center text-sm font-medium text-emerald-50 backdrop-blur">
          {demande.copy.legende}
        </div>
      </motion.div>
    </div>
  );
}

/** La demande, telle qu'elle arrive écrite chez le commerçant. */
function MessageDemande({ demande, prenom }: { demande: Demande; prenom: string }) {
  return (
    <div className="text-sm leading-snug text-zinc-800">
      <p className="mb-1.5 font-semibold">{demande.titre}</p>
      <div className="space-y-0.5">
        {demande.lignes.map(([label, montant], i) => (
          <div key={`${label}-${i}`} className="flex justify-between gap-3">
            <span className="text-zinc-600">{label}</span>
            <span className="shrink-0 font-medium">{montant}</span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between gap-3 border-t border-black/10 pt-1.5">
        <span className="font-semibold">{demande.total.label}</span>
        <span className="font-bold text-emerald-700">{demande.total.montant}</span>
      </div>
      <p className="mt-1.5 text-[13px] text-zinc-500">👤 {prenom}</p>
    </div>
  );
}
