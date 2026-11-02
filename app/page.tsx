import type { Metadata } from "next";
import Landing from "@/components/landing-app";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute:
      "Ti-Boutik — commandes, rendez-vous et locations pour les commerces des Antilles",
  },
  description:
    "Comptoir, rendez-vous, location : votre boutique prend la forme de votre métier et les demandes arrivent déjà écrites sur WhatsApp. 0 € pour créer, 39 €/mois pour publier, 0 % de commission.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Ti-Boutik — commandes, rendez-vous et locations pour les commerces des Antilles",
    description:
      "Votre boutique en ligne, les commandes déjà rédigées sur WhatsApp. 0 € pour créer, 39 €/mois pour publier.",
    url: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Boutiques en ligne pour les commerces de Guadeloupe et des Antilles : ventes au comptoir, rendez-vous et locations, avec la demande écrite sur WhatsApp.",
  areaServed: [
    "Guadeloupe",
    "Martinique",
    "Saint-Martin",
    "Saint-Barthélemy",
    "Antilles françaises",
  ],
  priceRange: "€€",
  email: "killian.lecrut@gmail.com",
  telephone: "+590691244857",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Landing />
    </>
  );
}
