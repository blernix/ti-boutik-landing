import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/* Les quatre maquettes de page de réservation.
 *
 * Ce sont les vraies maquettes de l'application, servies en HTML
 * (app.ti-boutik.fr/maquettes/rdv-0X-….html). La page d'accueil en montre
 * trois ; ici on les regarde en entier, et on peut faire défiler à l'intérieur.
 */

/* Les maquettes sont servies par la landing : app.ti-boutik.fr interdit leur
   intégration (X-Frame-Options: SAMEORIGIN). */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const MAQUETTES = [
  {
    id: "kannot",
    nom: "Kannòt",
    fichier: "rdv-01-kannot",
    note: "Kannòt Tresses — Pointe-à-Pitre. Sable, corail, horizon : une page de plage pour un salon qui respire.",
  },
  {
    id: "zetwal",
    nom: "Zétwal",
    fichier: "rdv-02-zetwal",
    note: "Zétwal — onglerie & soins, Le Gosier. La nuit tombée, les mains s'allument.",
  },
  {
    id: "bwaflote",
    nom: "Bwa Floté",
    fichier: "rdv-03-bwa-flote",
    note: "Bwa Floté — atelier tresses & soins, Sainte-Anne. Bois flotté, vert profond, presque silencieux.",
  },
  {
    id: "woule",
    nom: "Woulé",
    fichier: "rdv-04-woule",
    note: "Woulé Barber Club — Le Moule. Des courbes, du rythme, un jaune qui claque.",
  },
];

export const metadata: Metadata = {
  title: "Les quatre habillages de page de réservation — ti-boutik",
  description:
    "Quatre habillages pour une page de réservation : Kannòt, Zétwal, Bwa Floté, Woulé. Mêmes prestations, mêmes créneaux, seule l'allure change.",
  alternates: { canonical: "/habillages-rdv" },
};

export default function HabillagesRdv() {
  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/rendez-vous" className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl">
              <Image
                src="/logo-background.png"
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
        </header>

        <h1 className="mt-10 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Quatre habillages, une page de réservation
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Mêmes prestations, mêmes durées, mêmes créneaux : seule l&apos;allure
          change. Ce sont les vraies maquettes — faites défiler dedans, ou
          ouvrez-les en entier.
        </p>

        <div className="mt-8 grid justify-items-center gap-8 lg:grid-cols-2">
          {MAQUETTES.map((m) => (
            <article
              key={m.id}
              id={m.id}
              className="carte-maquette scroll-mt-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
            >
              <div className="flex items-center gap-1.5 border-b border-black/5 bg-zinc-50 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-red-300" />
                <span className="h-2 w-2 rounded-full bg-amber-300" />
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                <span className="ml-2 truncate text-[10px] text-zinc-400">
                  {m.fichier}.html
                </span>
              </div>
              <div className="vue-maquette relative overflow-hidden">
                <iframe
                  src={`${BASE}/maquettes/${m.fichier}.html`}
                  title={`Maquette ${m.nom}`}
                  loading="lazy"
                  className="absolute left-0 top-0 border-0"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-black/5 px-5 py-4">
                <div>
                  <p className="font-bold">{m.nom}</p>
                  <p className="mt-1 max-w-md text-sm text-zinc-600">{m.note}</p>
                </div>
                <a
                  href={`${BASE}/maquettes/${m.fichier}.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-xl bg-white px-3 py-2 text-xs font-bold text-emerald-800 ring-1 ring-emerald-200 transition hover:bg-emerald-50"
                >
                  Ouvrir en entier ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
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

        <style>{`
          /* La maquette est rendue à 1024 px puis réduite d'un bloc : la mise
             en page d'ordinateur reste intacte, rien n'est recadré. */
          .carte-maquette { width: 100%; max-width: 520px; }
          .vue-maquette { height: 420px; }
          .vue-maquette iframe {
            width: 1024px; height: 1290px;
            transform: scale(0.34); transform-origin: top left;
          }
          @media (min-width: 700px) {
            .vue-maquette { height: 640px; }
            .vue-maquette iframe { transform: scale(0.5078); }
          }
        `}</style>
      </div>
    </main>
  );
}
