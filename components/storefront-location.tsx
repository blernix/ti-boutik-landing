"use client";

/* La maquette de boutique d'un loueur — démo location.
 *
 * Le cœur de la page n'est pas une photo, c'est le calendrier : on touche le
 * départ, puis le retour, et le prix se calcule. Les jours déjà loués sont
 * hachurés — un bien et une date ne se réservent qu'une fois, ça se voit au
 * lieu de se promettre.
 */

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Navigation, Sailboat, X } from "lucide-react";
import {
  BIENS,
  LOUEUR,
  joursEntre,
  plageDeuxDates,
  quatorze,
  type Bien,
  type JourLocation,
} from "@/lib/demos";
import { formatPrice } from "@/lib/menu";
import { useMonte } from "@/lib/use-monte";
import { WhatsAppIcon } from "@/components/icons";

export type Location = {
  bien: Bien;
  depart: Date;
  retour: Date;
  jours: number;
  prenom: string;
};

export default function StorefrontLocation({
  onReserver,
}: {
  onReserver: (l: Location) => void;
}) {
  const [depart, setDepart] = useState<Date | null>(null);
  const [retour, setRetour] = useState<Date | null>(null);
  const [ouvert, setOuvert] = useState<Bien | null>(null);
  const [prenom, setPrenom] = useState("");
  const [refus, setRefus] = useState("");

  const monte = useMonte();
  const jours = monte ? quatorze() : [];

  const nbJours =
    depart && retour ? Math.max(1, joursEntre(depart, retour)) : 0;

  const choisirJour = (j: JourLocation) => {
    if (j.pris) return;
    setRefus("");
    if (!depart || (depart && retour)) {
      setDepart(j.date);
      setRetour(null);
      return;
    }
    if (j.date <= depart) {
      setDepart(j.date);
      setRetour(null);
      return;
    }
    const milieu = jours.some(
      (x) => x.pris && x.date > depart && x.date <= j.date,
    );
    if (milieu) {
      setRefus("Ces dates passent sur une période déjà louée. Choisissez plus court.");
      return;
    }
    setRetour(j.date);
  };

  const dansLaPlage = (j: JourLocation) => {
    if (!depart) return false;
    if (!retour) return j.date.getTime() === depart.getTime();
    return j.date >= depart && j.date <= retour;
  };

  const fermer = () => setOuvert(null);

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Link
            href="/"
            aria-label="Retour à l'accueil"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-amber-500 text-white shadow-md shadow-emerald-600/20 transition hover:brightness-105"
          >
            <Sailboat className="h-5 w-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold leading-tight tracking-tight">
              {LOUEUR.name}
            </p>
            <p className="flex items-center gap-1 text-xs text-zinc-500">
              <MapPin className="h-3 w-3" />
              {LOUEUR.city}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Ouvert
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 pt-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 px-6 py-8 text-white shadow-lg shadow-emerald-900/10">
          <div className="relative z-10">
            <p className="mb-2 text-sm font-semibold text-amber-200">🇬🇵 Bonjou !</p>
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              Choisissez vos dates, le prix se calcule.
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-emerald-50/90">
              <Clock className="h-4 w-4" />
              {LOUEUR.hours} — la réservation arrive écrite sur WhatsApp.
            </p>
          </div>
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-400/30 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-teal-300/20 blur-2xl" />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{LOUEUR.address}</p>
              <p className="text-xs text-zinc-500">Retrait au ponton</p>
            </div>
          </div>
          <a
            href={LOUEUR.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
          >
            <Navigation className="h-4 w-4" />
            S&apos;y rendre
          </a>
        </div>

        {/* Les dates : la pièce maîtresse de la page */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-xl bg-zinc-50 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                Départ
              </p>
              <p className="text-sm font-bold">
                {depart
                  ? depart.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
                  : "—"}
              </p>
            </div>
            <div className="flex-1 rounded-xl bg-zinc-50 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                Retour
              </p>
              <p className="text-sm font-bold">
                {retour
                  ? retour.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
                  : "—"}
              </p>
            </div>
            <div className="shrink-0 rounded-xl bg-emerald-50 px-3 py-2 text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                Durée
              </p>
              <p className="text-sm font-bold text-emerald-800">
                {nbJours ? `${nbJours} j` : "—"}
              </p>
            </div>
          </div>

          <div className="-mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4 pb-1">
            {jours.length === 0 ? (
              <div className="h-[58px] w-full animate-pulse rounded-xl bg-black/5" />
            ) : (
              jours.map((j) => (
                <button
                  key={j.cle}
                  onClick={() => choisirJour(j)}
                  disabled={j.pris}
                  aria-pressed={dansLaPlage(j)}
                  style={
                    j.pris
                      ? {
                          backgroundImage:
                            "repeating-linear-gradient(45deg, #e4e4e7, #e4e4e7 4px, #f4f4f5 4px, #f4f4f5 8px)",
                        }
                      : undefined
                  }
                  className={`flex w-12 shrink-0 flex-col items-center rounded-xl py-1.5 transition ${
                    j.pris
                      ? "cursor-not-allowed text-zinc-400"
                      : dansLaPlage(j)
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  <span className="text-[9.5px] uppercase">{j.court}</span>
                  <span className="text-[17px] font-bold leading-tight">{j.numero}</span>
                </button>
              ))
            )}
          </div>
          <p className="mt-2 text-[11.5px] text-zinc-500">
            Touchez le départ, puis le retour. Les jours hachurés sont déjà loués.
          </p>
          {refus && <p className="mt-1 text-[12px] text-red-700">{refus}</p>}
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 pb-16 pt-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Les biens</h2>
            <p className="text-xs text-zinc-500">Le prix se calcule avec vos dates.</p>
          </div>
          <span className="text-sm text-zinc-500">{BIENS.length} biens</span>
        </div>

        <div className="space-y-3">
          {BIENS.map((b) => {
            const pris = b.libre === 0;
            return (
              <button
                key={b.id}
                onClick={() => !pris && setOuvert(b)}
                disabled={pris}
                className={`flex w-full items-center justify-between gap-3 rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 transition ${
                  pris ? "opacity-60" : "hover:shadow-md"
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-bold">{b.name}</p>
                  <p className="mt-0.5 text-[12.5px] text-zinc-500">{b.detail}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <div className="text-right">
                    <p className="text-base font-extrabold text-emerald-700">
                      {formatPrice(b.price)}
                    </p>
                    <p className="text-[11px] text-zinc-500">par jour</p>
                  </div>
                  <span
                    className={`rounded-full px-3.5 py-2 text-sm font-bold ${
                      pris ? "bg-zinc-200 text-zinc-500" : "bg-emerald-600 text-white"
                    }`}
                  >
                    {pris ? "Pris" : "Réserver"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      <Feuille
        bien={ouvert}
        onFermer={fermer}
        depart={depart}
        retour={retour}
        nbJours={nbJours}
        prenom={prenom}
        onPrenom={setPrenom}
        onReserver={() => {
          if (!ouvert || !depart || !retour) return;
          onReserver({ bien: ouvert, depart, retour, jours: nbJours, prenom });
        }}
      />
    </div>
  );
}

function Feuille({
  bien,
  onFermer,
  depart,
  retour,
  nbJours,
  prenom,
  onPrenom,
  onReserver,
}: {
  bien: Bien | null;
  onFermer: () => void;
  depart: Date | null;
  retour: Date | null;
  nbJours: number;
  prenom: string;
  onPrenom: (v: string) => void;
  onReserver: () => void;
}) {
  const total = bien && nbJours ? bien.price * nbJours : 0;
  const pret = Boolean(bien && depart && retour && nbJours);

  return (
    <AnimatePresence>
      {bien && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onFermer}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-3xl"
          >
            <div className="flex max-h-[88vh] flex-col rounded-t-3xl bg-white shadow-2xl">
              <div className="flex items-start justify-between gap-3 px-5 py-4">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">Votre location</h2>
                  <p className="mt-0.5 text-[13px] text-zinc-500">{bien.name}</p>
                </div>
                <button
                  onClick={onFermer}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition hover:bg-zinc-200"
                  aria-label="Fermer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-2">
                {depart && retour ? (
                  <div className="rounded-2xl border border-black/5 p-3.5">
                    <p className="text-[13px] font-semibold">
                      {plageDeuxDates(depart, retour)} · {nbJours}{" "}
                      {nbJours > 1 ? "jours" : "jour"}
                    </p>
                    <div className="mt-2 flex items-baseline justify-between text-[13px] text-zinc-600">
                      <span>
                        {formatPrice(bien.price)} × {nbJours}{" "}
                        {nbJours > 1 ? "jours" : "jour"}
                      </span>
                      <span className="font-bold text-zinc-800">{formatPrice(total)}</span>
                    </div>
                    <p className="mt-2 border-t border-dashed border-black/10 pt-2 text-[11.5px] text-zinc-500">
                      Caution {formatPrice(LOUEUR.caution)} notée, non débitée.
                    </p>
                  </div>
                ) : (
                  <p className="rounded-2xl bg-zinc-50 px-3.5 py-3 text-[13px] text-zinc-600">
                    Choisissez d&apos;abord vos dates, en haut de la page.
                  </p>
                )}

                <input
                  value={prenom}
                  onChange={(e) => onPrenom(e.target.value)}
                  placeholder="Votre prénom"
                  className="mt-4 w-full rounded-2xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-3 border-t border-black/5 px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] text-zinc-500">
                    {pret ? "Total à régler" : "Dates à choisir"}
                  </span>
                  <span className="text-lg font-extrabold">
                    {pret ? formatPrice(total) : "—"}
                  </span>
                </div>
                <p className="text-[11.5px] text-zinc-500">
                  Acompte par carte, solde au retrait.
                </p>
                <button
                  onClick={onReserver}
                  disabled={!pret}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-wa py-3.5 text-base font-bold text-white shadow-lg shadow-green-600/25 transition hover:brightness-105 active:scale-[0.99] disabled:opacity-50"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Réserver sur WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
