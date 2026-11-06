import type { Metadata } from "next";
import DemoApp from "@/components/demo-app";

export const metadata: Metadata = {
  title: "Démo interactive",
  description:
    "Trois démos Ti-Boutik à essayer : commande au resto, rendez-vous au salon, location de matériel. La commande arrive écrite sur WhatsApp, pour les commerçants de Guadeloupe et des Antilles.",
  alternates: {
    canonical: "/demo",
  },
};

export default function DemoPage() {
  return <DemoApp />;
}
