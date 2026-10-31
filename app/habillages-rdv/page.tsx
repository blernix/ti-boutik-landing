import type { Metadata } from "next";
import GalerieRdv from "@/components/galerie-rdv";

/* La galerie reprend la barre d'exemples de l'application : une maquette
 * affichée en grand, des pastilles pour changer d'habillage. */
export const metadata: Metadata = {
  title: "Les quatre habillages de page de réservation — ti-boutik",
  description:
    "Quatre habillages pour une page de réservation : Kannòt, Zétwal, Bwa Floté, Woulé. Mêmes prestations, mêmes créneaux, seule l'allure change.",
  alternates: { canonical: "/habillages-rdv" },
};

export default function Page() {
  return <GalerieRdv />;
}
