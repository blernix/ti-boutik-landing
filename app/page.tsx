import type { Metadata } from "next";
import Landing from "@/components/landing";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute:
      "Ti-Boutik — Site e-commerce & commandes WhatsApp en Guadeloupe et aux Antilles",
  },
  description:
    "Boutique en ligne pour restaurants, snacks et traiteurs en Guadeloupe : les commandes arrivent déjà rédigées sur WhatsApp. 0 € pour créer, 39 €/mois pour publier, sans engagement.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Ti-Boutik — Site e-commerce & commandes WhatsApp en Guadeloupe et aux Antilles",
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
    "Création de mini-sites e-commerce pour les commerçants de Guadeloupe et des Antilles : catalogue en ligne, commandes et paiement via WhatsApp.",
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
