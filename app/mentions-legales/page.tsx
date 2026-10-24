import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site ti-boutik.fr, édité par KIKIDEV.",
  alternates: {
    canonical: "/mentions-legales",
  },
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-cream text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/"
          className="text-sm font-medium text-emerald-700 transition hover:underline"
        >
          ← Retour à l&apos;accueil
        </Link>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
          Mentions légales
        </h1>

        <p className="mt-4 text-sm text-zinc-600">
          Les conditions de vente du service sont dans les{" "}
          <Link
            href="/cgv"
            className="font-semibold text-emerald-800 underline underline-offset-4"
          >
            conditions générales de vente
          </Link>
          .
        </p>

        <div className="mt-10 space-y-10">
          <section>
            <h2 className="text-xl font-bold tracking-tight">
              Éditeur du site
            </h2>
            <p className="mt-3 text-zinc-700">
              Le site <strong>ti-boutik.fr</strong> est édité par :
            </p>
            <ul className="mt-3 space-y-1.5 text-zinc-700">
              <li>
                <span className="font-semibold">Raison sociale :</span> KIKIDEV
              </li>
              <li>
                <span className="font-semibold">Forme juridique :</span>{" "}
                Entrepreneur Individuel
              </li>
              <li>
                <span className="font-semibold">SIREN :</span> 922 893 169
              </li>
              <li>
                <span className="font-semibold">SIRET :</span> 922 893 169 00016
              </li>
              <li>
                <span className="font-semibold">N° TVA :</span> FR80922893169
              </li>
              <li>
                <span className="font-semibold">Code APE :</span> 62.01Z -
                Programmation informatique
              </li>
              <li>
                <span className="font-semibold">Adresse :</span> CESSON, France
              </li>
              <li>
                <span className="font-semibold">Email :</span>{" "}
                <a
                  href="mailto:killian.lecrut@gmail.com"
                  className="text-emerald-700 hover:underline"
                >
                  killian.lecrut@gmail.com
                </a>
              </li>
              <li>
                <span className="font-semibold">Téléphone :</span>{" "}
                <a
                  href="tel:+33641970383"
                  className="text-emerald-700 hover:underline"
                >
                  06 41 97 03 83
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              Directeur de publication
            </h2>
            <p className="mt-3 text-zinc-700">
              Le directeur de publication du site est Killian Lecrut, en sa
              qualité d&apos;entrepreneur individuel.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">Hébergement</h2>
            <p className="mt-3 text-zinc-700">Le site est hébergé par :</p>
            <ul className="mt-3 space-y-1.5 text-zinc-700">
              <li>
                <span className="font-semibold">Hébergeur :</span> Hostinger
                International Ltd.
              </li>
              <li>
                <span className="font-semibold">Adresse :</span> 61 Lordou
                Vironos Street, 6023 Larnaca, Chypre
              </li>
              <li>
                <span className="font-semibold">Serveur :</span> France
              </li>
              <li>
                <span className="font-semibold">Site web :</span>{" "}
                <a
                  href="https://www.hostinger.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  www.hostinger.fr
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              Propriété intellectuelle
            </h2>
            <p className="mt-3 text-zinc-700">
              L&apos;ensemble du contenu de ce site (textes, images, logos, code
              source) est la propriété exclusive de KIKIDEV, sauf mention
              contraire. Toute reproduction, représentation, modification,
              publication ou adaptation, totale ou partielle, est strictement
              interdite sans l&apos;autorisation écrite préalable de
              l&apos;éditeur.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
