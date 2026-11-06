import type { Metadata } from "next";
import LandingRdv from "@/components/landing-rdv";

/* La page rendez-vous est une vraie page, pas une ancre : elle a son titre,
 * sa description et sa place dans le sitemap. C'est ce qui permet de la faire
 * remonter sur « page de réservation coiffeur Guadeloupe ». */
export const metadata: Metadata = {
  title: "Page de réservation pour coiffeurs, barbiers et ongleries",
  description:
    "Vos prestations, vos créneaux, vos horaires. Le client réserve depuis votre page et la demande arrive sur WhatsApp. 39 €/mois, 0 % de commission, sans engagement.",
  alternates: { canonical: "/rendez-vous" },
  openGraph: {
    title: "Votre page de réservation — Ti-Boutik",
    description:
      "Coiffeur, barbier, onglerie, soins : vos créneaux se remplissent pendant que vous travaillez.",
    url: "/rendez-vous",
    siteName: "ti-boutik",
    locale: "fr_FR",
    type: "website",
  },
  /* Sans ce bloc, la carte de partage héritait du layout : « restaurants,
     snacks et traiteurs » sur la page qu'on envoie à un barbier. */
  twitter: {
    card: "summary_large_image",
    title: "Votre page de réservation — Ti-Boutik",
    description:
      "Coiffeur, barbier, onglerie, soins : vos créneaux se remplissent pendant que vous travaillez.",
    images: ["/logo-ti-boutik.jpeg"],
  },
};

export default function Page() {
  return <LandingRdv />;
}
