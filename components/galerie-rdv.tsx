"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* La galerie des habillages de rendez-vous.
 *
 * Même principe que la barre d'exemples de l'application : une maquette
 * affichée en grand, et des pastilles en bas pour passer de l'une à l'autre
 * sans recharger la page.
 */

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const MAQUETTES = [
  { id: "kannot", nom: "Kannòt", fichier: "rdv-01-kannot" },
  { id: "zetwal", nom: "Zétwal", fichier: "rdv-02-zetwal" },
  { id: "bwaflote", nom: "Bwa Floté", fichier: "rdv-03-bwa-flote" },
  { id: "woule", nom: "Woulé", fichier: "rdv-04-woule" },
];

export default function GalerieRdv() {
  const [actif, setActif] = useState(MAQUETTES[0].id);
  const choix = MAQUETTES.find((m) => m.id === actif) ?? MAQUETTES[0];

  /* Les vignettes de la page d'accueil arrivent ici avec #zetwal : on ouvre
     directement l'habillage demandé, et l'adresse reste partageable. */
  useEffect(() => {
    const lire = () => {
      const id = window.location.hash.replace("#", "");
      if (MAQUETTES.some((m) => m.id === id)) setActif(id);
    };
    lire();
    window.addEventListener("hashchange", lire);
    return () => window.removeEventListener("hashchange", lire);
  }, []);

  const choisir = (id: string) => {
    setActif(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      <header className="border-b border-black/5 bg-cream/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <Link href="/rendez-vous" className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl">
              <Image
                src={`${BASE}/logo-background.png`}
                alt="Ti-Boutik"
                width={36}
                height={36}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="text-base font-bold tracking-tight">Ti-Boutik</span>
          </Link>
          <Link
            href="/rendez-vous"
            className="text-sm font-semibold text-emerald-800 underline underline-offset-4"
          >
            ← Retour à la page rendez-vous
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-4 pt-6">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Quatre habillages, une page de réservation
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600">
          Mêmes prestations, mêmes créneaux : seule l&apos;allure change. Prenez
          la maquette en grand ci-dessous ; les pastilles en bas changent
          d&apos;habillage.
        </p>

        <div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/10">
          <div className="flex items-center gap-1.5 border-b border-black/5 bg-zinc-50 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-300" />
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            <span className="ml-2 truncate text-[10px] text-zinc-400">
              {choix.fichier}.html
            </span>
            <a
              href={`${BASE}/maquettes/${choix.fichier}.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto shrink-0 rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-emerald-800 ring-1 ring-emerald-200 transition hover:bg-emerald-50"
            >
              Ouvrir en entier ↗
            </a>
          </div>
          <iframe
            key={choix.fichier}
            src={`${BASE}/maquettes/${choix.fichier}.html`}
            title={`Maquette ${choix.nom}`}
            className="block h-[calc(100vh-260px)] min-h-[520px] w-full border-0"
          />
        </div>

        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
          <a
            href="https://app.ti-boutik.fr/inscription?modele=rdv"
            className="rounded-2xl bg-emerald-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
          >
            Créer ma boutique
          </a>
          <Link
            href="/rendez-vous"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-emerald-800 ring-1 ring-emerald-200 transition hover:bg-emerald-50"
          >
            Revoir la page rendez-vous
          </Link>
        </div>
      </div>

      {/* La barre de choix, comme dans l'application : une pastille par
          habillage, celle en cours en blanc. */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 overflow-x-auto border-t border-white/15 bg-[#0b0b0c] px-3 py-2 sm:justify-center">
        <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-[.14em] text-zinc-400">
          Habillage
        </span>
        <nav aria-label="Choisir un habillage" className="flex gap-1">
          {MAQUETTES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => choisir(m.id)}
              aria-pressed={m.id === actif}
              className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition ${
                m.id === actif
                  ? "bg-white font-bold text-zinc-900"
                  : "text-zinc-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {m.nom}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
