"use client";

/* La maquette de boutique d'un salon — démo rendez-vous.
 *
 * Même grammaire que la maquette resto (components/storefront.tsx) : bandeau,
 * bloc vert, ligne d'adresse, liste, tiroir du bas. Ce qui change, c'est ce
 * qu'on y fait : on choisit un soin, puis une heure, et le créneau déjà pris
 * se voit barré.
 */

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Navigation, Scissors, X } from "lucide-react";
import {
  PRESTATIONS,
  SALON,
  creneaux,
  dureeCourte,
  heureCourte,
  prochainsJours,
  type Jour,
  type Prestation,
} from "@/lib/demos";
import { formatPrice } from "@/lib/menu";
import { useMonte } from "@/lib/use-monte";
import { WhatsAppIcon } from "@/components/icons";

export type Reservation = {
  prestation: Prestation;
  jour: Jour;
  heure: number;
  prenom: string;
};

export default function StorefrontRdv({
  onReserver,
}: {
  onReserver: (r: Reservation) => void;
}) {
  const [ouverte, setOuverte] = useState<Prestation | null>(null);
  const [jour, setJour] = useState<Jour | null>(null);
  const [heure, setHeure] = useState<number | null>(null);
  const [prenom, setPrenom] = useState("");

  const monte = useMonte();
  const jours = monte ? prochainsJours(5) : [];

  const premierLibre = (() => {
    for (const j of jours) {
      if (j.complet) continue;
      const libre = creneaux(PRESTATIONS[0], j.cle).find((c) => c.libre);
      if (libre) return { jour: j, minutes: libre.minutes };
    }
    return null;
  })();

  const ouvrir = (p: Prestation) => {
    setOuverte(p);
    setJour(null);
    setHeure(null);
  };

  const fermer = () => {
    setOuverte(null);
    setJour(null);
    setHeure(null);
  };

  const grille = ouverte && jour ? creneaux(ouverte, jour.cle) : [];

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Link
            href="/"
            aria-label="Retour à l'accueil"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-amber-500 text-white shadow-md shadow-emerald-600/20 transition hover:brightness-105"
          >
            <Scissors className="h-5 w-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold leading-tight tracking-tight">
              {SALON.name}
            </p>
            <p className="flex items-center gap-1 text-xs text-zinc-500">
              <MapPin className="h-3 w-3" />
              {SALON.city}
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
            <p className="mb-2 text-sm font-semibold text-amber-200">
              🇬🇵 Bonjou !
            </p>
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              Choisissez votre soin, puis votre heure.
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-emerald-50/90">
              <Clock className="h-4 w-4" />
              {SALON.hours} — le rendez-vous arrive écrit sur WhatsApp.
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
              <p className="truncate text-sm font-semibold">{SALON.address}</p>
              <p className="text-xs text-zinc-500">Ouvert aujourd&apos;hui</p>
            </div>
          </div>
          <a
            href={SALON.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
          >
            <Navigation className="h-4 w-4" />
            S&apos;y rendre
          </a>
        </div>

        {/* Le premier créneau libre : c'est l'ancre de la page, elle montre que
            les horaires sont calculés, pas écrits à la main. */}
        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-black/5 bg-white/60 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
            Premier créneau libre
          </p>
          {premierLibre ? (
            <p className="text-sm font-bold">
              {premierLibre.jour.court} · {heureCourte(premierLibre.minutes)}
            </p>
          ) : (
            <span className="h-5 w-32 animate-pulse rounded bg-black/5" />
          )}
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 pb-16 pt-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Les soins</h2>
            <p className="text-xs text-zinc-500">Durée et prix affichés, comme au salon.</p>
          </div>
          <span className="text-sm text-zinc-500">{PRESTATIONS.length} prestations</span>
        </div>

        <div className="space-y-3">
          {PRESTATIONS.map((p) => (
            <button
              key={p.id}
              onClick={() => ouvrir(p)}
              className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <div className="min-w-0">
                <p className="truncate text-[15px] font-bold">{p.name}</p>
                <p className="mt-0.5 text-[12.5px] text-zinc-500">
                  {p.detail} · {dureeCourte(p.duree)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-base font-extrabold text-emerald-700">
                  {formatPrice(p.price)}
                </span>
                <span className="rounded-full bg-emerald-600 px-3.5 py-2 text-sm font-bold text-white">
                  Choisir
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>

      <Feuille
        ouverte={ouverte !== null}
        onFermer={fermer}
        prestation={ouverte}
        jours={jours}
        jour={jour}
        onJour={(j) => {
          setJour(j);
          setHeure(null);
        }}
        grille={grille}
        heure={heure}
        onHeure={setHeure}
        prenom={prenom}
        onPrenom={setPrenom}
        onReserver={() => {
          if (!ouverte || !jour || heure === null) return;
          onReserver({ prestation: ouverte, jour, heure, prenom });
        }}
      />
    </div>
  );
}

function Feuille({
  ouverte,
  onFermer,
  prestation,
  jours,
  jour,
  onJour,
  grille,
  heure,
  onHeure,
  prenom,
  onPrenom,
  onReserver,
}: {
  ouverte: boolean;
  onFermer: () => void;
  prestation: Prestation | null;
  jours: Jour[];
  jour: Jour | null;
  onJour: (j: Jour) => void;
  grille: { minutes: number; libre: boolean }[];
  heure: number | null;
  onHeure: (m: number) => void;
  prenom: string;
  onPrenom: (v: string) => void;
  onReserver: () => void;
}) {
  const pret = Boolean(prestation && jour && heure !== null);

  return (
    <AnimatePresence>
      {ouverte && prestation && (
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
                  <h2 className="text-lg font-bold tracking-tight">
                    Votre rendez-vous
                  </h2>
                  <p className="mt-0.5 text-[13px] text-zinc-500">
                    {prestation.name} · {dureeCourte(prestation.duree)} ·{" "}
                    {formatPrice(prestation.price)}
                  </p>
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
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  Le jour
                </p>
                <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
                  {jours.map((j) => (
                    <button
                      key={j.cle}
                      onClick={() => onJour(j)}
                      aria-pressed={jour?.cle === j.cle}
                      className={`shrink-0 rounded-xl px-3 py-2 text-[12.5px] font-bold transition ${
                        jour?.cle === j.cle
                          ? "bg-emerald-600 text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      {j.court}
                    </button>
                  ))}
                </div>

                <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  L&apos;heure
                </p>
                {!jour ? (
                  <p className="rounded-xl bg-zinc-50 px-3 py-3 text-[13px] text-zinc-500">
                    Choisissez d&apos;abord un jour.
                  </p>
                ) : jour.complet ? (
                  <p className="rounded-xl bg-zinc-50 px-3 py-3 text-[13px] text-zinc-600">
                    Complet ce jour-là. Choisissez un autre jour.
                  </p>
                ) : (
                  <>
                    <div className="grid grid-cols-4 gap-2">
                      {grille.map((c) => (
                        <button
                          key={c.minutes}
                          onClick={() => c.libre && onHeure(c.minutes)}
                          disabled={!c.libre}
                          aria-pressed={heure === c.minutes}
                          className={`rounded-xl px-2 py-2.5 text-[12.5px] font-bold transition ${
                            !c.libre
                              ? "cursor-not-allowed bg-zinc-100 text-zinc-400 line-through"
                              : heure === c.minutes
                                ? "bg-emerald-600 text-white"
                                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                          }`}
                        >
                          {heureCourte(c.minutes)}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-[11.5px] text-zinc-500">
                      Les heures barrées sont déjà prises.
                    </p>
                  </>
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
                    {jour && heure !== null
                      ? `${jour.long} · ${heureCourte(heure)}`
                      : "Jour et heure à choisir"}
                  </span>
                  <span className="text-lg font-extrabold">
                    {formatPrice(prestation.price)}
                  </span>
                </div>
                <p className="text-[11.5px] text-zinc-500">
                  À régler au salon · aucun acompte.
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
