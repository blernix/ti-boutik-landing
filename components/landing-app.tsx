"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Star } from "lucide-react";
import {
  HeroPhone,
  HeroPhoneLocation,
  HeroPhoneRdv,
} from "@/components/landing-animations";
import ApercuAdmin from "@/components/apercu-admin";

/* La page d'accueil de ti-boutik.fr.
 *
 * Le sélecteur de métier ne change pas seulement une liste : il change la
 * démonstration, les exemples du quotidien, l'avant/après et l'aperçu de
 * l'espace commerçant. Un loueur de canoës ne doit jamais lire « vos plats ».
 *
 * Rien n'est affirmé qui ne soit vérifiable : 0 € pour créer, 39 €/mois à la
 * publication, 0 % de commission, sept habillages. Aucun client inventé.
 */

const CONTACT_WHATSAPP = "https://wa.me/590691244857";
const APP_URL = "https://app.ti-boutik.fr";
const LIEN_CREER = `${APP_URL}/inscription`;
const LIEN_CONNEXION = `${APP_URL}/boutique/connexion`;
const AVIS_GOOGLE =
  "https://www.google.com/maps/search/?api=1&query=ti-boutik&query_place_id=ChIJWyvjQw1Dh6oR2GyHPWee2k4";

type Paire = [string, string];

type Contenu = {
  /* Les deux phrases du premier écran. Elles changent avec le métier : c'est
     ce qui fait qu'un loueur ne lit jamais « vos plats ». Le titre porte un
     mot entre **étoiles** : il est rendu dans la couleur WhatsApp. */
  hero: { titre: string; sousTitre: string };
  /* Message déjà écrit dans WhatsApp quand il clique « je vous la crée » :
     Killian sait qui écrit et pour quoi, sans poser de question. */
  messageWa: string;
  accroche: string;
  demo: {
    texte: string;
    nom: string;
    sous: string;
    lignes: Paire[];
    pied: string;
    total: string;
    bouton: string;
  };
  pilotage: {
    phrases: [string, string, string];
    carte1: { etat: string; titre: string; sous: string; total: string; note: string; bouton: string };
    carte2: { titre: string; lignes: Paire[]; pied: string };
    carte3: { titre: string; montant: string; sous: string; bouton: string; pied: string };
  };
  avantApres: Paire[];
};

type Famille = {
  cle: "commerce" | "rdv" | "location";
  /* Le premier écran ne peut pas afficher trois fois « Je vends des plats ou
     des produits » : trois boutons courts, un verbe que le commerçant se dit,
     et un qualificatif qui nomme ce qu'il vend. */
  bouton: string;
  qualificatif: string;
  carte: string;
  promesse: string;
  compte: string;
  detail: string[];
  lien: { href: string; libelle: string };
  onglets: [string, string, string];
  contenu: Contenu;
};

const FAMILLES: Famille[] = [
  {
    cle: "commerce",
    bouton: "Je vends",
    qualificatif: "plats, produits",
    carte: "Je vends des plats ou des produits",
    promesse: "Restaurant, snack, traiteur, épicerie.",
    compte: "Trois commandes à 15 € couvrent le mois.",
    detail: [
      "Un panier avec les options : taille, suppléments, « sans piment ».",
      "Le stock compte : à zéro, l'article sort de la vitrine tout seul.",
      "Le client choisit son créneau de retrait, vous recevez la commande écrite.",
      "Paiement au retrait, ou par carte sur votre compte Stripe. Acompte possible.",
    ],
    lien: { href: "/demo", libelle: "Voir une boutique de comptoir" },
    onglets: ["Commandes", "Ma boutique", "Paiements"],
    contenu: {
      hero: {
        titre:
          "Votre carte en ligne, et la commande arrive **écrite** sur WhatsApp.",
        sousTitre:
          "Carte, prix, options, stock. Il commande, vous recevez la référence.",
      },
      messageWa:
        "Bonjour Killian, je vends des plats et des produits. Je voudrais ma boutique Ti-Boutik, vous pouvez me la créer ?",
      accroche: "La commande arrive écrite sur WhatsApp, avec le créneau et la référence.",
      demo: {
        texte:
          "Il ouvre votre boutique, voit la carte et les prix, remplit son panier et choisit son heure de retrait. La validation ouvre WhatsApp avec le récapitulatif déjà écrit.",
        nom: "Chez Léa · Resto créole · Le Gosier",
        sous: "Ouvert · jusqu'à 14 h",
        lignes: [
          ["Poulet boucané", "12,00 €"],
          ["Accras de morue", "5,00 €"],
          ["Jus de goyave", "3,50 €"],
        ],
        pied: "2 articles · retrait 12 h 30",
        total: "17,00 €",
        bouton: "Commander sur WhatsApp",
      },
      pilotage: {
        phrases: [
          "Vous confirmez d'un clic, le client reçoit son e-mail. Une commande entièrement payée ne se reconfirme pas — l'écran vous le dit au lieu de vous laisser cliquer.",
          "Un prix change, un plat part : trente secondes, sans passer par moi. À zéro, l'article sort de la vitrine tout seul.",
          "Vous voyez ce qui est encaissé et ce qui reste à régler. Pour annuler, vous remboursez l'acompte, le solde, ou les deux : si le client a payé d'avance, vous pouvez garder l'acompte.",
        ],
        carte1: {
          etat: "À confirmer",
          titre: "Client · 2 articles",
          sous: "Aujourd'hui, retrait 12 h 30",
          total: "Total 50,00 €",
          note: "Acompte 10,00 € reçu · reste 40,00 €",
          bouton: "Confirmer la commande",
        },
        carte2: {
          titre: "Ma carte",
          lignes: [
            ["Poulet boucané", "12,00 €"],
            ["Accras de morue", "5,00 €"],
            ["Jus de goyave", "3,50 €"],
          ],
          pied: "En rupture : l'article sort de la vitrine",
        },
        carte3: {
          titre: "Argent reçu",
          montant: "10,00 € encaissés",
          sous: "Reste à régler au retrait : 40,00 €",
          bouton: "Rembourser l'acompte · 10,00 €",
          pied: "Le solde n'est pas encore encaissé : rien à rembourser.",
        },
      },
      avantApres: [
        ["« C'est combien le poulet ? » — vous répondez six fois par jour", "Il voit votre carte, vos prix, vos options"],
        ["Vous recopiez la commande, vous oubliez la sauce", "Le récapitulatif arrive écrit, avec la référence"],
        ["Vous cherchez le message dans quarante conversations", "Chaque commande a sa référence"],
        ["Un client qui ne vous connaît pas ne vous trouve pas", "Votre boutique s'affiche sur son téléphone"],
      ],
    },
  },
  {
    cle: "rdv",
    bouton: "Je reçois",
    qualificatif: "sur rendez-vous",
    carte: "Je reçois sur rendez-vous",
    promesse: "Coiffeur, barbier, onglerie, soins, réparation.",
    compte: "Deux rendez-vous à 25 € couvrent le mois.",
    detail: [
      "Vos prestations, leurs durées, leurs prix : le carnet se remplit tout seul.",
      "Le client voit les créneaux libres et réserve sans vous appeler.",
      "Le rendez-vous arrive écrit sur votre WhatsApp, avec la référence.",
      "Un QR code à coller au salon, ou le lien dans votre bio.",
    ],
    lien: { href: "/rendez-vous", libelle: "Voir la version rendez-vous" },
    onglets: ["Rendez-vous", "Ma boutique", "Paiements"],
    contenu: {
      hero: {
        titre:
          "Vos créneaux libres, et le rendez-vous arrive **écrit** sur WhatsApp.",
        sousTitre:
          "Prestations, durées, créneaux. Il réserve, vous confirmez d'un clic.",
      },
      messageWa:
        "Bonjour Killian, je reçois sur rendez-vous. Je voudrais ma boutique Ti-Boutik, vous pouvez me la créer ?",
      accroche: "Le rendez-vous se pose dans votre carnet, pas dans une conversation.",
      demo: {
        texte:
          "Il voit les prestations, les durées et les créneaux encore libres, choisit son heure. La validation ouvre WhatsApp avec la demande déjà écrite — vous n'avez plus qu'à dire oui.",
        nom: "Kannot · Salon · Le Gosier",
        sous: "Ouvert · dernier créneau 17 h 30",
        lignes: [
          ["Tresses longues · 1 h 30", "45,00 €"],
          ["Coupe + barbe · 45 min", "30,00 €"],
          ["Coloration · 2 h", "60,00 €"],
        ],
        pied: "Jeudi 14 h 30 · 1 h 30",
        total: "45,00 €",
        bouton: "Réserver ce créneau",
      },
      pilotage: {
        phrases: [
          "La demande arrive avec la prestation, la durée, l'heure — et sa référence. Vous confirmez, il reçoit son e-mail. Un créneau déjà réservé ne peut plus l'être.",
          "Une prestation change de prix ou de durée en trente secondes. Un congé bloque les créneaux d'avance, sans toucher au reste.",
          "L'acompte reçu se rembourse sur le bon paiement, pas sur le voisin. Le solde se règle au salon : rien à rembourser puisqu'il n'est pas encaissé.",
        ],
        carte1: {
          etat: "À confirmer",
          titre: "Léa M. · Tresses longues",
          sous: "Jeudi 14 h 30 · 1 h 30",
          total: "Total 45,00 €",
          note: "Paiement au salon · aucun acompte",
          bouton: "Confirmer le rendez-vous",
        },
        carte2: {
          titre: "Mes prestations",
          lignes: [
            ["Tresses · 1 h 30", "45,00 €"],
            ["Coupe + barbe · 45 min", "30,00 €"],
            ["Coloration · 2 h", "60,00 €"],
          ],
          pied: "Congé d'août bloqué à l'avance",
        },
        carte3: {
          titre: "Acomptes reçus",
          montant: "45,00 € reçus d'avance",
          sous: "Reste à régler au salon : 0,00 €",
          bouton: "Rembourser l'acompte · 45,00 €",
          pied: "Le client annule ? Le créneau se libère tout seul.",
        },
      },
      avantApres: [
        ["Le téléphone sonne au milieu d'une coupe", "Le client voit les créneaux libres et réserve"],
        ["« Jeudi 14 h » noté sur un carnet, une main dans les cheveux", "Le rendez-vous est écrit, avec la durée"],
        ["Deux clientes arrivent sur le même créneau", "Un créneau réservé ne peut plus l'être"],
        ["Vous rappelez la veille, cliente par cliente", "Le rappel part tout seul"],
      ],
    },
  },
  {
    cle: "location",
    bouton: "Je loue",
    qualificatif: "biens, dates",
    carte: "Je loue un bien, un gîte, une intervention",
    promesse: "Canoë, vélo, engin, logement, chantier.",
    compte: "Une location de 50 € couvre le mois.",
    detail: [
      "Le client choisit ses dates : l'heure, le jour, la nuit ou la semaine.",
      "Le planning montre ce qui est pris — plus de double réservation.",
      "Plusieurs exemplaires d'un même bien, chacun son stock.",
      "Caution notée, solde réclamé avant l'arrivée, acompte si vous voulez.",
    ],
    lien: { href: "/fonctions", libelle: "Tout ce que ça fait pour une location" },
    onglets: ["Locations", "Ma boutique", "Paiements"],
    contenu: {
      hero: {
        titre:
          "Vos dates libres, et la réservation arrive **écrite** sur WhatsApp.",
        sousTitre:
          "Dates, prix calculé, caution notée. Il réserve, le planning se remplit.",
      },
      messageWa:
        "Bonjour Killian, je loue des biens. Je voudrais ma boutique Ti-Boutik, vous pouvez me la créer ?",
      accroche: "Les dates libres se voient, le prix se calcule, le planning se remplit sans vous.",
      demo: {
        texte:
          "Il voit ce qui est libre sur ses dates, le prix se calcule selon la durée, la caution est affichée. La validation ouvre WhatsApp avec la réservation écrite.",
        nom: "Kanoé Kreyol · Location · Le Gosier",
        sous: "Ouvert · retrait à 8 h",
        lignes: [
          ["Canoë 2 places · 30 €/jour", "90,00 €"],
          ["Paddle · 20 €/jour", "60,00 €"],
          ["Kayak 2 places · 25 €/jour", "75,00 €"],
        ],
        pied: "12 → 15 août · 3 jours",
        total: "90,00 €",
        bouton: "Réserver ces dates",
      },
      pilotage: {
        phrases: [
          "La demande porte les dates, le bien et la référence. Vous confirmez, le planning se remplit : un bien et une date ne peuvent plus être loués deux fois.",
          "Un bien passe en rupture, un tarif change de période : vous le faites depuis le téléphone. Plus un exemplaire de libre, il sort de la vitrine.",
          "L'acompte est encaissé à la réservation, le solde réclamé avant l'arrivée, la caution seulement notée — aucun argent bloqué. L'annulation rembourse l'acompte, le solde, ou les deux.",
        ],
        carte1: {
          etat: "À confirmer",
          titre: "Kévin R. · 2 canoës",
          sous: "12 → 15 août · 3 jours",
          total: "Total 90,00 €",
          note: "Caution 100 € notée · solde avant l'arrivée",
          bouton: "Confirmer la réservation",
        },
        carte2: {
          titre: "Mes biens",
          lignes: [
            ["Canoë · 30 €/jour", "6 libres"],
            ["Paddle · 20 €/jour", "4 libres"],
            ["Kayak · 25 €/jour", "0 libre"],
          ],
          pied: "Plus rien de libre : sorti de la vitrine",
        },
        carte3: {
          titre: "Acomptes reçus",
          montant: "30,00 € d'acompte",
          sous: "Solde 60,00 € réclamé le 9 août",
          bouton: "Rembourser l'acompte · 30,00 €",
          pied: "La caution n'est jamais bloquée : elle est notée.",
        },
      },
      avantApres: [
        ["« C'est libre le 14 ? » — vous vérifiez dans trois carnets", "Le planning montre ce qui est pris"],
        ["Le même canoë loué deux fois le 14", "Un bien et une date ne se réservent qu'une fois"],
        ["Vous calculez à la main : 3 jours, deux canoës", "Le prix se calcule avec les dates"],
        ["Vous courez après le solde à l'arrivée", "Le solde est réclamé avant, tout seul"],
      ],
    },
  },
];

const INCLUS = [
  "Votre adresse votrenom.ti-boutik.fr",
  "Carte, prestations ou biens, photos illimitées",
  "Stock, options, créneaux, horaires",
  "Demande écrite sur WhatsApp, avec référence",
  "Paiement par carte sur votre compte Stripe",
  "Page prête pour Google : horaires, adresse, menu",
];

const OBJECTIONS = [
  {
    titre: "« Je n'ai pas le temps. »",
    texte:
      "Dix minutes depuis votre téléphone pour ouvrir la boutique. Vous pouvez arrêter en cours de route : vous n'avez rien payé.",
  },
  {
    titre: "« Je ne suis pas doué en informatique. »",
    texte:
      "Rien à installer, rien à mettre à jour. Si vous bloquez, je le fais avec vous sur WhatsApp.",
  },
  {
    titre: "« Mes clients commandent déjà sur WhatsApp. »",
    texte:
      "C'est le principe : rien ne change pour eux. Vous recevez un panier au lieu d'un message à recopier.",
  },
  {
    titre: "« Et si j'arrête ? »",
    texte:
      "Votre boutique passe en pause : plus commandable, rien de supprimé. Vous reprenez quand vous voulez, avec votre catalogue tel quel.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Combien ça coûte ?",
    a: "0 € pour créer, puis 39 € par mois seulement quand vous publiez — ou 390 € par an, deux mois offerts. Sans engagement, résiliable en un clic. Aucune commission sur vos ventes : seuls les frais bancaires de Stripe s'appliquent, sur votre propre compte.",
  },
  {
    q: "Est-ce que ça marche pour mon métier ?",
    a: "Trois mécaniques existent : le comptoir (plats, produits), le rendez-vous (prestations, durées) et la location (dates, périodes). Si vous vendez, recevez ou louez, l'une des trois est la vôtre.",
  },
  {
    q: "Et le paiement par carte, comment ça marche ?",
    a: "Un compte Stripe gratuit, à relier depuis votre page Paiements. Carte, Apple Pay, Google Pay. L'argent va directement sur votre compte : il ne passe jamais par Ti-Boutik. Ne créez pas de compte Stripe de votre côté — non relié, le paiement resterait bloqué.",
  },
  {
    q: "Combien de temps pour être en ligne ?",
    a: "Une dizaine de minutes pour votre nom, votre carte et vos prix. Le paiement par carte demande quelques minutes de plus, chez Stripe. Vous ne payez qu'au moment de publier.",
  },
  {
    q: "Mes clients doivent-ils créer un compte ?",
    a: "Non. Ils ouvrent votre boutique sur leur téléphone, choisissent et valident. Rien à installer, aucun mot de passe à retenir.",
  },
];

export default function LandingApp() {
  const [famille, setFamille] = useState<Famille["cle"]>("commerce");
  const active = FAMILLES.find((f) => f.cle === famille) ?? FAMILLES[0];
  const c = active.contenu;

  return (
    <div className="min-h-screen bg-cream pb-24 text-foreground sm:pb-0">
      <Header />

      {/* 1 — Premier écran : la promesse, le métier, le prix, un bouton.
             Le sélecteur ne s'ajoute pas au hero : il en fait partie, et le
             titre change avec lui. Un visiteur ne lit donc jamais le métier
             de quelqu'un d'autre. */}
      <section
        id="metier"
        className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 px-4 pb-12 pt-9 text-white sm:pb-16 sm:pt-16"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-teal-300/15 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <FadeIn>
              <h1 className="mx-auto max-w-xl text-[26px] font-extrabold leading-tight tracking-tight sm:text-4xl lg:mx-0 lg:text-[42px]">
                <Accent texte={c.hero.titre} />
              </h1>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div
                role="tablist"
                aria-label="Votre métier"
                className="mx-auto mt-5 flex gap-1.5 rounded-2xl bg-white/10 p-1.5 ring-1 ring-white/15 sm:max-w-md lg:mx-0"
              >
                {FAMILLES.map((f) => {
                  const choisi = f.cle === famille;
                  return (
                    <button
                      key={f.cle}
                      role="tab"
                      aria-selected={choisi}
                      aria-label={f.carte}
                      onClick={() => setFamille(f.cle)}
                      className={`flex flex-1 flex-col items-center justify-center rounded-xl px-1.5 py-2 transition ${
                        choisi
                          ? "bg-white text-emerald-900 shadow-sm"
                          : "text-emerald-50/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="text-[12.5px] font-extrabold sm:text-sm">{f.bouton}</span>
                      <span
                        className={`mt-0.5 text-[10px] font-semibold ${
                          choisi ? "text-emerald-700" : "text-emerald-100/60"
                        }`}
                      >
                        {f.qualificatif}
                      </span>
                    </button>
                  );
                })}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-emerald-50/85 lg:mx-0">
                {c.hero.sousTitre}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-5">
                <p className="text-[26px] font-extrabold tracking-tight">
                  39 €<span className="text-sm font-bold text-emerald-100/70">/mois</span>
                </p>
                <p className="mt-0.5 text-[13px] font-bold text-amber-200">{active.compte}</p>
                <p className="mt-1 text-[12px] text-emerald-100/70">
                  0 € pour créer · aucune commission · vous ne payez qu&apos;à la
                  publication
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-5">
                <a
                  href={LIEN_CREER}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-base font-bold text-emerald-800 shadow-lg transition hover:bg-emerald-50 sm:mx-auto sm:w-auto lg:mx-0"
                >
                  Créer ma boutique
                  <ArrowRight className="h-5 w-5" />
                </a>
                <p className="mt-3 text-[13px] text-emerald-100/80">
                  ou{" "}
                  <a
                    href={`${CONTACT_WHATSAPP}?text=${encodeURIComponent(c.messageWa)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-emerald-300/50 underline-offset-4 transition hover:text-white"
                  >
                    je vous la crée en 10 minutes sur WhatsApp
                  </a>
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.1} className="hidden justify-center lg:flex">
            {active.cle === "rdv" ? (
              <HeroPhoneRdv />
            ) : active.cle === "location" ? (
              <HeroPhoneLocation />
            ) : (
              <HeroPhone />
            )}
          </FadeIn>
        </div>
      </section>

      {/* 2 — Bande de preuve */}
      <section className="border-y border-emerald-950/10 bg-emerald-950 px-4 py-3 text-white">
        <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs font-semibold sm:text-sm">
          {[
            "0 % de commission sur vos ventes",
            "0 € pour créer, sans carte bancaire",
            "Sans engagement, résiliable en un clic",
          ].map((p) => (
            <li key={p} className="flex items-center gap-1.5 text-emerald-50/90">
              <Check className="h-4 w-4 shrink-0 text-amber-300" />
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* 3 — La douleur d'abord. Avant, la page montrait la démo (la solution)
             avant d'avoir nommé le problème ; or c'est cette phrase qui vend. */}
      <section id="probleme" className="scroll-mt-20 border-t border-black/5 bg-white px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Avant, ça passait par votre tête
            </h2>
          </FadeIn>
          <div key={`${active.cle}-aa`} className="mt-8 overflow-hidden rounded-2xl ring-1 ring-black/5">
            <div className="grid grid-cols-2 bg-zinc-100 text-[11px] font-bold uppercase tracking-[.12em] text-zinc-500">
              <p className="px-4 py-2.5">Aujourd&apos;hui</p>
              <p className="border-l border-black/5 px-4 py-2.5 text-emerald-800">Avec Ti-Boutik</p>
            </div>
            {c.avantApres.map(([avant, apres]) => (
              <div key={avant} className="grid grid-cols-2 border-t border-black/5 bg-white">
                <p className="px-4 py-3 text-[13.5px] text-zinc-600">{avant}</p>
                <p className="border-l border-black/5 px-4 py-3 text-[13.5px] font-semibold text-emerald-900">
                  {apres}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            Rien ne change pour vos habitudes : les demandes continuent d&apos;arriver
            dans votre WhatsApp.
          </p>
        </div>
      </section>

      {/* 4 — La solution : la boutique telle que le client la voit, puis les
             quatre choses que le commerçant ne gère plus à la main. */}
      <section id="demo" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <FadeIn key={`${active.cle}-demo`}>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Regardez-la comme votre client la verra
            </h2>
            <p className="mt-3 text-zinc-600">{c.demo.texte}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-emerald-800"
              >
                Ouvrir la démo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={LIEN_CREER}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-base font-bold text-emerald-800 ring-1 ring-emerald-200 transition hover:bg-emerald-50"
              >
                Créer la mienne
              </a>
            </div>
            <p className="mt-3 text-sm text-zinc-500">
              C&apos;est une vraie boutique de l&apos;application, pas une maquette.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="flex justify-center">
            <div className="w-full max-w-sm rounded-[2rem] bg-white p-4 shadow-xl ring-1 ring-black/5">
              <div className="rounded-2xl bg-cream p-4">
                <p className="text-[11px] font-bold uppercase tracking-[.14em] text-emerald-800">
                  {c.demo.nom}
                </p>
                <p className="mt-1 text-[11px] font-semibold text-emerald-700">{c.demo.sous}</p>
                {c.demo.lignes.map(([nom, prix]) => (
                  <div
                    key={nom}
                    className="mt-3 flex items-center justify-between border-b border-black/5 pb-2 text-[13px]"
                  >
                    <span className="font-semibold">{nom}</span>
                    <span className="text-zinc-500">{prix}</span>
                  </div>
                ))}
                <div className="mt-3 flex items-center justify-between text-[13px] font-bold">
                  <span>{c.demo.pied}</span>
                  <span>{c.demo.total}</span>
                </div>
                <p className="mt-3 rounded-xl bg-wa px-3 py-2 text-center text-[12.5px] font-bold text-white">
                  {c.demo.bouton}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* La carte du métier : ce qu'il n'a plus à faire lui-même. Elle vivait
            dans l'ancienne section « Quelle est votre façon de vendre ? » ; le
            sélecteur ayant monté dans le premier écran, le contenu descend ici
            au lieu de disparaître. */}
        <FadeIn key={`${active.cle}-detail`} className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-black/5">
          <p className="text-[15px] font-bold text-emerald-900">{c.accroche}</p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {active.detail.map((d) => (
              <li key={d} className="flex items-start gap-2 text-[14.5px] text-zinc-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                {d}
              </li>
            ))}
          </ul>
          <Link
            href={active.lien.href}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 underline underline-offset-4"
          >
            {active.lien.libelle}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </section>

      {/* 5 — Le différenciateur : l'espace commerçant, reconstruit en code (et
             non en capture d'écran, qui vieillit au premier changement d'écran). */}
      <section id="piloter" className="scroll-mt-20 border-t border-black/5 bg-white px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Ce que vous pilotez tous les jours
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-600">
              La vitrine, c&apos;est ce que le client voit. Le reste, c&apos;est
              vous. Depuis votre téléphone, entre deux services.
            </p>
            <p className="mt-2 text-[11.5px] uppercase tracking-wide text-zinc-400">
              Aperçus de l&apos;espace commerçant, avec les phrases qu&apos;il
              affiche vraiment.
            </p>
          </FadeIn>

          <div className="mx-auto mt-8 max-w-3xl">
            <ApercuAdmin
              nomBoutique={c.demo.nom.split(" · ")[0]}
              libelles={active.onglets}
              onglets={[
                {
                  titre: "Commandes",
                  sous: c.pilotage.carte1.etat,
                  lignes: [
                    [c.pilotage.carte1.titre, ""],
                    [c.pilotage.carte1.sous, ""],
                  ],
                  total: c.pilotage.carte1.total,
                  note: c.pilotage.carte1.note,
                  action: c.pilotage.carte1.bouton,
                  actionFaite: "le client a reçu son e-mail",
                  pied: "",
                },
                {
                  titre: c.pilotage.carte2.titre,
                  sous: "",
                  lignes: c.pilotage.carte2.lignes,
                  total: "",
                  note: "",
                  action: "",
                  actionFaite: "",
                  pied: "",
                },
                {
                  titre: "Paiements",
                  sous: "",
                  lignes: [[c.pilotage.carte3.montant, ""]],
                  total: "",
                  note: c.pilotage.carte3.sous,
                  action: c.pilotage.carte3.bouton,
                  actionFaite: "remboursé, le client est prévenu",
                  pied: c.pilotage.carte3.pied,
                },
              ]}
            />
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {[
              ["La demande qui arrive", c.pilotage.phrases[0]],
              ["Ce que vous modifiez seul", c.pilotage.phrases[1]],
              ["L'argent", c.pilotage.phrases[2]],
            ].map(([titre, texte]) => (
              <div key={titre}>
                <h3 className="text-[15px] font-extrabold">{titre}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-zinc-600">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Qui est derrière, AVANT le prix. L'objection n°1 d'un commerçant
             d'ici n'est pas le tarif, c'est « il va disparaître dans six mois ».
             La proximité rassure avant qu'il regarde le prix, pas après. */}
      <section className="border-t border-black/5 bg-cream px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Qui est derrière Ti-Boutik
            </h2>
            <div className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <p className="text-[14.5px] leading-relaxed text-zinc-700">
                Je m&apos;appelle Killian, je développe des sites pour des commerces
                guadeloupéens. Ti-Boutik, c&apos;est mon outil : je le fais tourner,
                je réponds moi-même sur WhatsApp, et je corrige ce qui bloque.
                Avant, j&apos;ai fait tablemaster.fr, un logiciel de réservation pour
                les restaurants, sans commission sur les couverts.
              </p>
              <ul className="mt-4 grid gap-2 text-[14px] text-zinc-700">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  Des boutiques réelles en démonstration, pas des maquettes.
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1.5 font-bold text-zinc-900">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 5,0
                  <span className="font-medium text-zinc-500">· 4 avis Google</span>
                </span>
                <a
                  href={AVIS_GOOGLE}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 text-zinc-600"
                >
                  Les lire
                </a>
              </div>
              {/* La phrase honnête : ces avis portent sur le développeur, pas sur
                  le produit. Tant qu'aucun client n'utilise l'outil, on le dit. */}
              <p className="mt-2 text-[12.5px] text-zinc-500">
                Ces avis portent sur mon travail de développeur, pas encore sur le
                produit.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 8 — Prix */}
      <section id="tarif" className="scroll-mt-20 mx-auto max-w-3xl px-4 py-14 sm:py-16">
        <FadeIn>
          <h2 className="text-3xl font-extrabold tracking-tight">
            39 €/mois. Le mois se paie avec deux ou trois ventes de plus.
          </h2>
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <p className="text-5xl font-extrabold tracking-tight">
                39 €<span className="text-lg font-bold text-zinc-500">/mois</span>
              </p>
              <p className="text-sm font-semibold text-zinc-500">
                0 € pour créer · 390 €/an, deux mois offerts
              </p>
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {INCLUS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[14px] text-zinc-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-1.5 rounded-2xl bg-cream p-4 text-[13px] text-zinc-700">
              {FAMILLES.map((f) => (
                <p key={f.cle} className={f.cle === active.cle ? "font-bold text-emerald-900" : ""}>
                  {f.promesse.split(".")[0]} : {f.compte}
                </p>
              ))}
            </div>
            <a
              href={LIEN_CREER}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3.5 text-base font-bold text-white transition hover:bg-emerald-800"
            >
              Créer ma boutique
              <ArrowRight className="h-5 w-5" />
            </a>
            <p className="mt-3 text-center text-[13px] text-zinc-500">
              Option assistant : 10 €/mois ou 90 €/an — il modifie la boutique à
              votre place, il ne parle jamais à vos clients.{" "}
              <Link href="/fonctions" className="underline underline-offset-4">
                Tout ce que ça fait
              </Link>
            </p>
            <p className="mt-2 text-center text-[13px] text-zinc-500">
              Sept habillages au choix, interchangeables à tout moment.{" "}
              <Link href="/habillages" className="underline underline-offset-4">
                Les voir
              </Link>
            </p>
          </div>
        </FadeIn>
      </section>

      {/* 9 — Objections */}
      <section className="border-t border-black/5 bg-white px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-extrabold tracking-tight">Vous vous dites peut-être…</h2>
          </FadeIn>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {OBJECTIONS.map((o) => (
              <div key={o.titre} className="rounded-2xl bg-cream p-5 ring-1 ring-black/5">
                <p className="font-extrabold">{o.titre}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-zinc-600">{o.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section id="faq" className="scroll-mt-20 mx-auto max-w-2xl px-4 py-14 sm:py-16">
        <FadeIn>
          <h2 className="text-3xl font-extrabold tracking-tight">Questions fréquentes</h2>
        </FadeIn>
        <div className="mt-8 space-y-2">
          {FAQ.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* 12 — Appel final */}
      <section
        id="contact"
        className="bg-gradient-to-br from-emerald-900 to-teal-900 px-4 py-14 text-center text-white sm:py-16"
      >
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Préparez votre boutique ce soir, publiez-la quand elle est prête.
          </h2>
          <p className="mt-3 text-emerald-50/90">
            La création est à 0 €. Vous ne payez qu&apos;au moment de publier, et
            vous pouvez arrêter en cours de route.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={LIEN_CREER}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-base font-bold text-emerald-800 shadow-lg transition hover:bg-emerald-50 sm:w-auto"
            >
              Créer ma boutique
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href={CONTACT_WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 px-6 py-3.5 text-base font-bold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto"
            >
              Écrire sur WhatsApp
            </a>
          </div>
          <p className="mt-4 text-sm text-emerald-100/70">
            Sans engagement · résiliable en un clic · je réponds moi-même
          </p>
        </div>
      </section>

      <Footer />
      <MobileContactBar />
    </div>
  );
}


/* ---------- Coquille ---------- */

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-emerald-900/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5 text-white">
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
        <nav className="hidden items-center gap-6 text-sm font-medium text-emerald-100/80 lg:flex">
          <a href="#piloter" className="transition hover:text-white">
            Ce que vous pilotez
          </a>
          <a href="#tarif" className="transition hover:text-white">
            Prix
          </a>
          <Link href="/fonctions" className="transition hover:text-white">
            Fonctions
          </Link>
          <a href="#faq" className="transition hover:text-white">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={LIEN_CONNEXION}
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-emerald-100/80 transition hover:text-white sm:block"
          >
            Se connecter
          </a>
          <a
            href={LIEN_CREER}
            className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
          >
            Créer ma boutique
          </a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-[13px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Ti-Boutik — boutiques en ligne pour commerces des Antilles. Édité par
          Killian Lecrut, Guadeloupe.
        </p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/fonctions" className="hover:text-zinc-800">
            Fonctions
          </Link>
          <Link href="/habillages" className="hover:text-zinc-800">
            Habillages
          </Link>
          <Link href="/mentions-legales" className="hover:text-zinc-800">
            Mentions légales
          </Link>
          <Link href="/cgv" className="hover:text-zinc-800">
            CGV
          </Link>
        </nav>
      </div>
    </footer>
  );
}

function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-white/95 px-3 py-2.5 backdrop-blur sm:hidden">
      <div className="flex items-center gap-2">
        <a
          href={CONTACT_WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center rounded-xl bg-wa px-3 py-2.5 text-[13.5px] font-bold text-white"
        >
          WhatsApp
        </a>
        <a
          href={LIEN_CREER}
          className="flex flex-1 items-center justify-center rounded-xl bg-emerald-800 px-3 py-2.5 text-[13.5px] font-bold text-white"
        >
          Créer ma boutique
        </a>
      </div>
    </div>
  );
}

function Accent({ texte }: { texte: string }) {
  /* Un titre porte son mot décisif entre **étoiles** : « la commande arrive
     **écrite** sur WhatsApp ». On le rend dans la couleur WhatsApp, sans
     dangerouslySetInnerHTML — le contenu reste une chaîne, pas du HTML. */
  return (
    <>
      {texte.split("**").map((part, i) =>
        i % 2 ? (
          <span key={i} className="text-wa">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-bold">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 text-[14px] leading-relaxed text-zinc-600">{a}</p>
      </motion.div>
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
