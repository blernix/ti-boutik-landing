import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/* Les cinq habillages de page de réservation.
 *
 * La page d'accueil rendez-vous en montre trois ; les cinq vivent ici, chacun
 * avec son ancre (#carnet, #kannot…). Les aperçus sont ceux de l'application :
 * il n'existe pas encore de boutique-exemple publique pour le rendez-vous,
 * contrairement aux sept habillages de la commande.
 */

const APP = "https://app.ti-boutik.fr";

const HABILLAGES = [
  {
    peau: "carnet",
    nom: "Carnet",
    note: "Papier relié, encre noire, filets fins. La prestation se lit comme sur un carnet de rendez-vous.",
    img: "rdv-5-carnet.png",
  },
  {
    peau: "kannot",
    nom: "Kannòt",
    note: "Sable, rose corail, horizon. Une page de plage, pour un salon qui respire.",
    img: "rdv-1-kannot.jpg",
  },
  {
    peau: "zetwal",
    nom: "Zétwal",
    note: "La nuit tombée, les mains s'allument. Fond sombre, halo violet, serif.",
    img: "rdv-2-zetwal.jpg",
  },
  {
    peau: "bwaflote",
    nom: "Bwa Floté",
    note: "Bois flotté et vert profond. Une page posée, presque silencieuse.",
    img: "rdv-3-bwa-flote.jpg",
  },
  {
    peau: "woule",
    nom: "Woulé",
    note: "Des courbes, du rythme, un jaune qui claque. Pour les adresses qui bougent.",
    img: "rdv-4-woule.jpg",
  },
];

export const metadata: Metadata = {
  title: "Les cinq habillages de page de réservation — ti-boutik",
  description:
    "Cinq habillages pour une page de réservation : Carnet, Kannòt, Zétwal, Bwa Floté, Woulé. Mêmes prestations, mêmes créneaux, seule l'allure change.",
  alternates: { canonical: "/habillages-rdv" },
};

export default function HabillagesRdv() {
  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-5xl">
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
          Cinq habillages, une seule page
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Mêmes prestations, mêmes durées, mêmes créneaux : seule l&apos;allure
          change. Vous choisissez le vôtre à l&apos;inscription, et vous en
          changez quand vous voulez — sans rien ressaisir.
        </p>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {HABILLAGES.map((h) => (
            <li
              key={h.peau}
              id={h.peau}
              className="scroll-mt-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${APP}/maquettes/apercus/${h.img}`}
                alt={`Aperçu de l'habillage ${h.nom}`}
                className="w-full"
                loading="lazy"
              />
              <div className="px-5 py-4">
                <p className="font-bold">{h.nom}</p>
                <p className="mt-1 text-sm text-zinc-600">{h.note}</p>
              </div>
            </li>
          ))}
        </ul>

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
      </div>
    </main>
  );
}
