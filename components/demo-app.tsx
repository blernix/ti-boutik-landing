"use client";

/* Aiguillage des trois démonstrations.
 *
 * Le visiteur choisit son métier en haut de page, vit la maquette, valide, puis
 * voit les deux téléphones. Le resto garde exactement son parcours d'avant
 * (Storefront + WhatsAppSim) ; les deux autres passent par DemandeSim.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Scissors, Sailboat, UtensilsCrossed } from "lucide-react";
import Storefront from "@/components/storefront";
import WhatsAppSim from "@/components/whatsapp-sim";
import StorefrontRdv, { type Reservation } from "@/components/storefront-rdv";
import StorefrontLocation, { type Location } from "@/components/storefront-location";
import DemandeSim, { type Demande } from "@/components/demande-sim";
import {
  LOUEUR,
  SALON,
  dureeCourte,
  heureCourte,
  plageDeuxDates,
} from "@/lib/demos";
import {
  cartTotal,
  formatPrice,
  type CartItem,
  type PaymentMethod,
  type Product,
} from "@/lib/menu";

type Metier = "resto" | "rdv" | "location";

const METIERS: { id: Metier; label: string; icone: React.ReactNode }[] = [
  { id: "resto", label: "Resto", icone: <UtensilsCrossed className="h-4 w-4" /> },
  { id: "rdv", label: "Rendez-vous", icone: <Scissors className="h-4 w-4" /> },
  { id: "location", label: "Location", icone: <Sailboat className="h-4 w-4" /> },
];

export default function DemoApp() {
  const [metier, setMetier] = useState<Metier>("resto");
  const [vue, setVue] = useState<"boutique" | "sim">("boutique");

  // resto
  const [items, setItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  // rendez-vous
  const [reservation, setReservation] = useState<Reservation | null>(null);
  // location
  const [location, setLocation] = useState<Location | null>(null);

  const total = cartTotal(items);

  const add = (product: Product) =>
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { product, qty: 1 }];
    });

  const increment = (id: string) =>
    setItems((prev) => prev.map((i) => (i.product.id === id ? { ...i, qty: i.qty + 1 } : i)));

  const decrement = (id: string) =>
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id));

  const order = (customerName: string) => {
    setName(customerName);
    setVue("sim");
  };

  const back = () => {
    setVue("boutique");
    setItems([]);
    setName("");
    setPaymentMethod("card");
    setReservation(null);
    setLocation(null);
  };

  const changerMetier = (m: Metier) => {
    setMetier(m);
    setVue("boutique");
    setItems([]);
    setName("");
    setReservation(null);
    setLocation(null);
  };

  const demandeRdv = reservation ? messageRdv(reservation) : null;
  const demandeLocation = location ? messageLocation(location) : null;

  return (
    <div className="relative">
      {vue === "boutique" && (
        <div className="border-b border-black/5 bg-cream">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2 px-4 py-2.5">
            <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Démo interactive
            </span>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Métier de la démonstration">
              {METIERS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => changerMetier(m.id)}
                  aria-pressed={metier === m.id}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    metier === m.id
                      ? "bg-emerald-700 text-white"
                      : "bg-black/5 text-zinc-600 hover:bg-black/10"
                  }`}
                >
                  {m.icone}
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {vue === "boutique" ? (
          <motion.div
            key={`store-${metier}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {metier === "resto" && (
              <Storefront
                items={items}
                onAdd={add}
                onIncrement={increment}
                onDecrement={decrement}
                onRemove={remove}
                onOrder={order}
                paymentMethod={paymentMethod}
                onPaymentMethod={setPaymentMethod}
              />
            )}
            {metier === "rdv" && (
              <StorefrontRdv
                onReserver={(r) => {
                  setReservation(r);
                  setVue("sim");
                }}
              />
            )}
            {metier === "location" && (
              <StorefrontLocation
                onReserver={(l) => {
                  setLocation(l);
                  setVue("sim");
                }}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key={`sim-${metier}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {metier === "resto" && (
              <WhatsAppSim
                items={items}
                name={name}
                total={total}
                paymentMethod={paymentMethod}
                onBack={back}
              />
            )}
            {metier === "rdv" && demandeRdv && (
              <DemandeSim demande={demandeRdv} onBack={back} />
            )}
            {metier === "location" && demandeLocation && (
              <DemandeSim demande={demandeLocation} onBack={back} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- les messages, calculés avant d'entrer dans l'écran ---------- */

function messageRdv(r: Reservation): Demande {
  return {
    titre: "✂️ Nouvelle demande de rendez-vous",
    lignes: [
      [
        `${r.prestation.name} · ${dureeCourte(r.prestation.duree)}`,
        formatPrice(r.prestation.price),
      ],
      ["Jour", r.jour.long],
      ["Heure", heureCourte(r.heure)],
    ],
    total: { label: "À régler au salon", montant: formatPrice(r.prestation.price) },
    prenom: r.prenom,
    confirmation: [
      `C'est noté ✅ ${r.jour.long} à ${heureCourte(r.heure)}.`,
      "Je vous le garde. À bientôt au salon 🌴",
    ],
    copy: {
      client: "👤 Client",
      commercant: "✂️ Salon · Kannot",
      titreChat: `${SALON.name} · ${SALON.subtitle}`,
      icone: <Scissors className="h-5 w-5" />,
      legende:
        "Le rendez-vous arrive écrit sur le téléphone du salon — aucun appel, aucune hésitation sur l'heure.",
    },
  };
}

function messageLocation(l: Location): Demande {
  const total = l.bien.price * l.jours;
  const acompte = Math.round(total / 3);
  return {
    titre: "🛶 Nouvelle réservation",
    lignes: [
      [`${l.bien.name} · ${formatPrice(l.bien.price)}/jour`, formatPrice(total)],
      ["Dates", plageDeuxDates(l.depart, l.retour)],
      ["Durée", `${l.jours} ${l.jours > 1 ? "jours" : "jour"}`],
    ],
    total: { label: `Total · ${l.jours} ${l.jours > 1 ? "jours" : "jour"}`, montant: formatPrice(total) },
    prenom: l.prenom,
    confirmation: [
      `C'est libre ✅ ${plageDeuxDates(l.depart, l.retour)}.`,
      `${formatPrice(total)} · caution ${formatPrice(LOUEUR.caution)} notée 🌴`,
    ],
    apres: `Acompte de ${formatPrice(acompte)} reçu · solde ${formatPrice(total - acompte)} au retrait, caution seulement notée.`,
    copy: {
      client: "👤 Client",
      commercant: "🛶 Loueur · Kanoé Kreyol",
      titreChat: `${LOUEUR.name} · Location`,
      icone: <Sailboat className="h-5 w-5" />,
      legende:
        "Les dates et le prix partent écrits : un bien et une date ne se louent pas deux fois.",
    },
  };
}
