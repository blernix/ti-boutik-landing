import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/* La liste des sept habillages.
 *
 * Elle existe parce que le bouton « Voir les sept habillages » de la page
 * d'accueil envoyait sur `ti-boutik.fr/exemples`, qui n'a jamais existé — et
 * les trois vignettes tombaient toutes sur Rétro. Ici, chaque carte ouvre son
 * propre exemple, rendu par la vraie application.
 */

const APP = "https://app.ti-boutik.fr";

const HABILLAGES = [
  { peau: "retro", nom: "Rétro", note: "le comptoir d'avant", img: "02-retro" },
  { peau: "papier", nom: "Papier", note: "crème et terre cuite", img: "07-papier" },
  { peau: "nature", nom: "Bistrot nature", note: "sable et vert forêt", img: "05-organic" },
  { peau: "neon", nom: "Néon", note: "la nuit, les prix en gros", img: "01-neon" },
  { peau: "magazine", nom: "Magazine", note: "la une d'un journal", img: "03-editorial" },
  { peau: "brutaliste", nom: "Brutaliste", note: "l'affiche, sans détour", img: "04-brutalist" },
  { peau: "demo", nom: "Design simple", note: "l'essentiel, tout de suite", img: "06-demo" },
];

export const metadata: Metadata = {
  title: "Les sept habillages de boutique — ti-boutik",
  description:
    "Sept habillages de boutique en ligne, du comptoir rétro à l'affiche brutaliste. Chaque exemple est une vraie boutique de l'application, pas une maquette.",
  alternates: { canonical: "/habillages" },
};

export default function Habillages() {
  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5">
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
            href="/"
            className="text-sm font-semibold text-emerald-800 underline underline-offset-4"
          >
            ← Retour à l&apos;accueil
          </Link>
        </header>

        <h1 className="mt-10 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Sept habillages, une seule boutique
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          La même maison — mêmes plats, mêmes prix — vue avec sept habillages.
          Cliquez : ce sont de vraies boutiques de l&apos;application, pas des
          maquettes. Vous changez d&apos;habillage à tout moment, sans rien
          ressaisir.
        </p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HABILLAGES.map((h) => (
            <li key={h.peau}>
              <a
                href={`${APP}/exemples/${h.peau}`}
                className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition hover:ring-emerald-700/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${APP}/maquettes/apercus/${h.img}.jpg`}
                  alt={`Aperçu de l'habillage ${h.nom}`}
                  className="h-44 w-full object-cover transition group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="px-4 py-3">
                  <p className="font-bold">{h.nom}</p>
                  <p className="text-sm text-zinc-500">{h.note}</p>
                  <p className="mt-2 text-xs font-semibold text-emerald-800">
                    Ouvrir l&apos;exemple ↗
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-zinc-500">
          Vous hésitez ? Vous pourrez en changer autant de fois que vous voulez :
          les textes, les photos et les prix suivent.
        </p>
      </div>
    </main>
  );
}
