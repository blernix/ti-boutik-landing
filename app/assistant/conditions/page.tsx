import type { Metadata } from "next";
import Link from "next/link";
import {
  CONDITIONS_ASSISTANT,
  CONDITIONS_ASSISTANT_VERSION,
} from "@/lib/assistant/conditions";

export const metadata: Metadata = {
  title: "Conditions d'utilisation de l'assistant IA — Ti-Boutik",
  description:
    "Conditions de l'option Assistant Boutik : assistant automatisé (IA), données transmises au modèle, responsabilités du commerçant, prix et résiliation.",
  alternates: { canonical: "/assistant/conditions" },
  openGraph: {
    title: "Conditions d'utilisation de l'assistant IA — Ti-Boutik",
    description:
      "Assistant automatisé, sous-traitant IA, responsabilités du commerçant, prix et résiliation de l'option Assistant Boutik.",
    url: "/assistant/conditions",
  },
};

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

function dateFr(iso: string): string {
  const [a, m, j] = iso.split("-");
  return j && m && a ? `${Number(j)} ${MOIS[Number(m) - 1]} ${a}` : iso;
}

export default function ConditionsAssistant() {
  return (
    <main className="min-h-screen bg-[#faf7f0] px-4 py-14 text-zinc-900">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-800 transition hover:underline"
        >
          ← Ti-Boutik
        </Link>

        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
          Option Assistant Boutik
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Conditions d&apos;utilisation de l&apos;assistant
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Version du {dateFr(CONDITIONS_ASSISTANT_VERSION)} — elles s&apos;appliquent
          à toute souscription de l&apos;option Assistant Boutik.
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-zinc-700">
          {CONDITIONS_ASSISTANT.map((section) => (
            <section key={section.titre}>
              <h2 className="text-lg font-extrabold tracking-tight text-zinc-900">
                {section.titre}
              </h2>
              {section.paragraphes.map((texte, i) => (
                <p key={i} className="mt-3">
                  {texte}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-emerald-900 px-5 py-5 text-[14px] leading-relaxed text-emerald-50">
          <p className="font-bold text-white">En résumé, sans jargon</p>
          <ul className="mt-2 space-y-1.5">
            <li>· Vos messages et votre catalogue passent par un modèle d&apos;IA externe, hors d&apos;Europe.</li>
            <li>· L&apos;assistant peut se tromper : vous relisez vos prix et vos textes.</li>
            <li>· Il n&apos;encaisse rien et ne touche pas à vos accès bancaires.</li>
            <li>· Vous pouvez effacer la conversation et arrêter l&apos;option quand vous voulez.</li>
          </ul>
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          Une question sur ces conditions ?{" "}
          <a
            href="mailto:contact@ti-boutik.fr"
            className="font-semibold text-emerald-800 underline underline-offset-4"
          >
            contact@ti-boutik.fr
          </a>{" "}
          — ou WhatsApp au +590 691 24 48 57.
        </p>
      </div>
    </main>
  );
}
