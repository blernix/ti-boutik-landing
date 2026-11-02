"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Star } from "lucide-react";
import { HeroPhone } from "@/components/landing-animations";

/* La page d'accueil de ti-boutik.fr — deuxième version.
 *
 * La première ne parlait qu'aux restaurants : la moitié de l'application
 * (rendez-vous, location) n'y avait pas sa place, et l'espace commerçant —
 * ce que le client ne voit jamais — n'apparaissait nulle part. Ici :
 *  1. une promesse qui couvre les trois familles sans mentir ;
 *  2. un sélecteur qui montre à chacun sa mécanique ;
 *  3. ce que le commerçant pilote (file de commandes, carte, argent) ;
 *  4. la preuve, l'argent, les objections, les questions.
 *
 * Rien n'est affirmé qui ne soit vérifiable : 0 € pour créer, 39 €/mois à la
 * publication, 0 % de commission, sept habillages. Pas de client inventé.
 */

const CONTACT_WHATSAPP = "https://wa.me/590691244857";
const APP_URL = "https://app.ti-boutik.fr";
const LIEN_CREER = `${APP_URL}/inscription`;
const LIEN_CONNEXION = `${APP_URL}/boutique/connexion`;
const AVIS_GOOGLE =
  "https://www.google.com/maps/search/?api=1&query=ti-boutik&query_place_id=ChIJWyvjQw1Dh6oR2GyHPWee2k4";

type Famille = "commerce" | "rdv" | "location";

const FAMILLES: {
  cle: Famille;
  titre: string;
  promesse: string;
  compte: string;
  detail: string[];
  lien: { href: string; libelle: string };
}[] = [
  {
    cle: "commerce",
    titre: "Je vends des plats ou des produits",
    promesse: "Restaurant, snack, traiteur, épicerie.",
    compte: "Trois commandes à 15 € couvrent le mois.",
    detail: [
      "Un panier avec les options : taille, suppléments, « sans piment ».",
      "Le stock compte : à zéro, l'article sort de la vitrine tout seul.",
      "Le client choisit son créneau de retrait, vous recevez la commande écrite.",
      "Paiement au retrait, ou par carte sur votre compte Stripe. Acompte possible.",
    ],
    lien: { href: "/demo", libelle: "Voir une boutique de comptoir" },
  },
  {
    cle: "rdv",
    titre: "Je reçois sur rendez-vous",
    promesse: "Coiffeur, barbier, onglerie, soins, réparation.",
    compte: "Deux rendez-vous à 25 € couvrent le mois.",
    detail: [
      "Vos prestations, leurs durées, leurs prix : le carnet se remplit tout seul.",
      "Le client voit les créneaux libres et réserve sans vous appeler.",
      "Le rendez-vous arrive écrit sur votre WhatsApp, avec la référence.",
      "Un QR code à coller au salon, ou le lien dans votre bio.",
    ],
    lien: { href: "/rendez-vous", libelle: "Voir la version rendez-vous" },
  },
  {
    cle: "location",
    titre: "Je loue un bien, un gîte, une intervention",
    promesse: "Canoë, vélo, engin, logement, chantier.",
    compte: "Une location de 50 € couvre le mois.",
    detail: [
      "Le client choisit ses dates : l'heure, le jour, la nuit ou la semaine.",
      "Le planning montre ce qui est pris — plus de double réservation.",
      "Plusieurs exemplaires d'un même bien, chacun son stock.",
      "Caution notée, solde réclamé avant l'arrivée, acompte si vous voulez.",
    ],
    lien: { href: "/habillages-rdv", libelle: "Voir un exemple de location" },
  },
];

const PILOTAGE: { titre: string; texte: string }[] = [
  {
    titre: "La file de commandes",
    texte:
      "Vous confirmez d'un clic, le client reçoit son e-mail. Une commande entièrement payée ne se reconfirme pas — l'écran vous le dit au lieu de vous laisser cliquer.",
  },
  {
    titre: "Votre carte, depuis votre téléphone",
    texte:
      "Un prix change, un plat part : trente secondes, sans passer par moi. À zéro, l'article sort de la vitrine tout seul.",
  },
  {
    titre: "L'argent",
    texte:
      "Vous voyez ce qui est encaissé et ce qui reste à régler. Pour annuler, vous remboursez l'acompte, le solde, ou les deux : si le client a payé d'avance, vous pouvez garder l'acompte.",
  },
];

const AVANT_APRES: [string, string][] = [
  ["« C'est combien le poulet ? » — vous répondez six fois par jour", "Il voit votre carte, vos prix, vos options"],
  ["Vous recopiez la commande, vous oubliez la sauce", "Le récapitulatif arrive écrit, avec la référence"],
  ["Vous cherchez le message dans quarante conversations", "Chaque commande a sa référence"],
  ["Un client qui ne vous connaît pas ne vous trouve pas", "Votre boutique s'affiche sur son téléphone"],
];

const INCLUS = [
  "Votre adresse votrenom.ti-boutik.fr",
  "Carte, prestations ou biens, photos illimitées",
  "Stock, options, créneaux, horaires",
  "Commande écrite sur WhatsApp, avec référence",
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

const FAQ: { q: string; a: string; lien?: { href: string; texte: string } }[] = [
  {
    q: "Combien ça coûte ?",
    a: "0 € pour créer, puis 39 € par mois seulement quand vous publiez — ou 390 € par an, deux mois offerts. Sans engagement, résiliable en un clic. Aucune commission sur vos ventes : seuls les frais bancaires de Stripe s'appliquent, comme sur tout paiement par carte.",
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
  const [famille, setFamille] = useState<Famille>("commerce");
  const active = FAMILLES.find((f) => f.cle === famille) ?? FAMILLES[0];

  return (
    <div className="min-h-screen bg-cream pb-14 text-foreground sm:pb-0">
      <Header />

      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 px-4 pb-16 pt-14 text-white sm:pt-20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-teal-300/15 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[.14em] text-amber-300">
                Comptoir, rendez-vous, location — Guadeloupe &amp; Antilles
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Vos clients commandent, réservent ou louent.
                <br className="hidden sm:block" /> Vous recevez{" "}
                <span className="text-wa">tout prêt</span> sur WhatsApp.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-lg text-emerald-50/90 lg:mx-0">
                Un snack n&apos;a pas besoin d&apos;un carnet de rendez-vous, un
                salon n&apos;a pas besoin d&apos;un panier. Ici la boutique prend
                la forme de votre métier, et la demande arrive écrite sur
                WhatsApp : nom, articles ou dates, créneau, référence.{" "}
                <span className="font-semibold text-white">
                  0 % de commission sur la vente.
                </span>
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <a
                  href={LIEN_CREER}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-base font-bold text-emerald-800 shadow-lg transition hover:bg-emerald-50 sm:w-auto"
                >
                  Créer ma boutique
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link
                  href="/demo"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 px-6 py-3.5 text-base font-bold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto"
                >
                  Voir une vraie boutique
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-sm text-emerald-100/70">
                0 € pour créer · sans carte bancaire · en privé tant que vous ne
                publiez pas
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.1} className="hidden justify-center lg:flex">
            <HeroPhone />
          </FadeIn>
        </div>
      </section>

      {/* 2 — Bande de preuve */}
      <section className="border-y border-emerald-950/10 bg-emerald-950 px-4 py-3 text-white">
        <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs font-semibold sm:text-sm">
          {[
            "0 % de commission sur vos ventes",
            "39 €/mois seulement à la publication",
            "Sans engagement, résiliable en un clic",
          ].map((p) => (
            <li key={p} className="flex items-center gap-1.5 text-emerald-50/90">
              <Check className="h-4 w-4 shrink-0 text-amber-300" />
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* 3 — Sélecteur de métier */}
      <section id="metier" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <FadeIn>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Quelle est votre façon de vendre ?
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-600">
            Trois façons de vendre, un seul outil. Cliquez sur la vôtre : la
            suite de la page parle votre langue.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-3 md:grid-cols-3" role="tablist" aria-label="Famille de métier">
          {FAMILLES.map((f) => {
            const choisi = f.cle === famille;
            return (
              <button
                key={f.cle}
                role="tab"
                aria-selected={choisi}
                onClick={() => setFamille(f.cle)}
                className={`rounded-2xl border p-5 text-left transition ${
                  choisi
                    ? "border-emerald-700 bg-white shadow-md ring-2 ring-emerald-700/20"
                    : "border-black/10 bg-white/60 hover:border-emerald-700/40 hover:bg-white"
                }`}
              >
                <p className="text-[15px] font-extrabold leading-snug">{f.titre}</p>
                <p className="mt-1 text-[13px] text-zinc-500">{f.promesse}</p>
                <p className="mt-3 text-[13px] font-semibold text-emerald-800">
                  {f.compte}
                </p>
              </button>
            );
          })}
        </div>

        <FadeIn key={active.cle} className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-black/5">
          <ul className="grid gap-2.5 sm:grid-cols-2">
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

      {/* 4 — Ce que le commerçant pilote */}
      <section id="piloter" className="border-t border-black/5 bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Ce que vous pilotez, une fois publiée
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-600">
              La vitrine, c&apos;est ce que le client voit. Le reste, c&apos;est
              vous : les commandes du jour, la carte, l&apos;argent. Depuis votre
              téléphone, entre deux services.
            </p>
            <p className="mt-2 text-[11.5px] uppercase tracking-wide text-zinc-400">
              Aperçus de l&apos;espace commerçant, avec les phrases qu&apos;il
              affiche vraiment.
            </p>
          </FadeIn>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <ApercuCommandes />
            <ApercuCatalogue />
            <ApercuArgent />
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {PILOTAGE.map((p) => (
              <div key={p.titre}>
                <h3 className="text-[15px] font-extrabold">{p.titre}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-zinc-600">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Démo */}
      <section id="demo" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <FadeIn>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Regardez-la comme votre client la verra
            </h2>
            <p className="mt-3 text-zinc-600">
              Il ouvre votre boutique sur son téléphone, voit la carte et les prix,
              remplit son panier. La validation ouvre WhatsApp avec le
              récapitulatif déjà écrit.
            </p>
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
                  Chez Léa · Resto créole · Le Gosier
                </p>
                <p className="mt-1 text-[11px] font-semibold text-emerald-700">
                  Ouvert · jusqu&apos;à 14 h
                </p>
                {[
                  ["Poulet boucané", "12,00 €"],
                  ["Accras de morue", "5,00 €"],
                  ["Jus de goyave", "3,50 €"],
                ].map(([nom, prix]) => (
                  <div
                    key={nom}
                    className="mt-3 flex items-center justify-between border-b border-black/5 pb-2 text-[13px]"
                  >
                    <span className="font-semibold">{nom}</span>
                    <span className="text-zinc-500">{prix}</span>
                  </div>
                ))}
                <div className="mt-3 flex items-center justify-between text-[13px] font-bold">
                  <span>2 articles</span>
                  <span>17,00 €</span>
                </div>
                <p className="mt-3 rounded-xl bg-wa px-3 py-2 text-center text-[12.5px] font-bold text-white">
                  Commander sur WhatsApp
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6 — Avant / après */}
      <section id="probleme" className="border-t border-black/5 bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Une commande WhatsApp, ça vous prend combien de temps ?
            </h2>
          </FadeIn>
          <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-black/5">
            <div className="grid grid-cols-2 bg-zinc-100 text-[11px] font-bold uppercase tracking-[.12em] text-zinc-500">
              <p className="px-4 py-2.5">Aujourd&apos;hui</p>
              <p className="border-l border-black/5 px-4 py-2.5 text-emerald-800">
                Avec Ti-Boutik
              </p>
            </div>
            {AVANT_APRES.map(([avant, apres]) => (
              <div key={avant} className="grid grid-cols-2 border-t border-black/5 bg-white">
                <p className="px-4 py-3 text-[13.5px] text-zinc-600">{avant}</p>
                <p className="border-l border-black/5 px-4 py-3 text-[13.5px] font-semibold text-emerald-900">
                  {apres}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            Rien ne change pour vos habitudes : les commandes continuent
            d&apos;arriver dans votre WhatsApp.
          </p>
        </div>
      </section>

      {/* 7 — Habillages */}
      <section id="habillages" className="border-t border-black/5 bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-extrabold tracking-tight">
              La même maison, sept habillages
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-zinc-600">
              Même carte, mêmes photos, même panier. Seul l&apos;habillage change :
              le comptoir d&apos;avant, le papier crème, la table du bistrot. Vous
              choisissez le vôtre, et vous en changez quand vous voulez.
            </p>
            <Link
              href="/habillages"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-emerald-800"
            >
              Voir les sept habillages
              <ArrowRight className="h-5 w-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 8 — Prix */}
      <section id="tarif" className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
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
                <p key={f.cle}>
                  <span className="font-bold">{f.promesse.split(".")[0]} :</span>{" "}
                  {f.compte}
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
          </div>
        </FadeIn>
      </section>

      {/* 9 — Objections */}
      <section className="border-t border-black/5 bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Vous vous dites peut-être…
            </h2>
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

      {/* 10 — Preuve et fondateur */}
      <section className="border-t border-black/5 bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-center text-2xl font-extrabold tracking-tight">
              Ce qu&apos;on peut affirmer aujourd&apos;hui
            </h2>
            <ul className="mx-auto mt-6 grid max-w-xl gap-2 text-[14px] text-zinc-700">
              {[
                "Des boutiques réelles en démonstration, pas des maquettes.",
                "Sept habillages, interchangeables à tout moment.",
                "4 avis Google publics, 5,0 — ils parlent du travail, pas du produit.",
                "Aucune commission prélevée sur une vente.",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <p className="text-[14.5px] leading-relaxed text-zinc-700">
                Je m&apos;appelle Killian, je développe des sites pour des
                commerces guadeloupéens. Ti-Boutik, c&apos;est mon outil : je le
                fais tourner, je réponds moi-même sur WhatsApp, et je corrige ce
                qui bloque. Avant, j&apos;ai fait tablemaster.fr, un logiciel de
                réservation pour les restaurants, sans commission sur les
                couverts.
              </p>
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
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section id="faq" className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
        <FadeIn>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Questions fréquentes
          </h2>
        </FadeIn>
        <div className="mt-8 space-y-2">
          {FAQ.map((item) => (
            <FaqItem key={item.q} {...item} />
          ))}
        </div>
      </section>

      {/* 12 — Appel final */}
      <section
        id="contact"
        className="bg-gradient-to-br from-emerald-900 to-teal-900 px-4 py-16 text-center text-white sm:py-20"
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

/* ---------- L'espace commerçant, en trois aperçus ---------- */

function CadreApercu({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-cream p-3.5 ring-1 ring-black/5">
      <div className="rounded-xl bg-white p-4 shadow-sm">{children}</div>
    </div>
  );
}

function ApercuCommandes() {
  return (
    <CadreApercu>
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-extrabold uppercase tracking-wide text-zinc-500">
          À confirmer
        </p>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">
          1
        </span>
      </div>
      <p className="mt-2 text-[14px] font-extrabold">Client · 2 articles</p>
      <p className="text-[12.5px] text-zinc-500">Aujourd&apos;hui, retrait 12 h 30</p>
      <p className="mt-2 text-[13px] font-semibold">Total 50,00 €</p>
      <p className="mt-1 inline-block rounded-lg bg-cream px-2 py-1 text-[11.5px] font-semibold text-zinc-600">
        Acompte 10,00 € reçu · reste 40,00 €
      </p>
      <p className="mt-3 rounded-lg bg-emerald-700 px-3 py-2 text-center text-[12.5px] font-bold text-white">
        Confirmer la commande
      </p>
    </CadreApercu>
  );
}

function ApercuCatalogue() {
  return (
    <CadreApercu>
      <p className="text-[12px] font-extrabold uppercase tracking-wide text-zinc-500">
        Ma carte
      </p>
      {[
        ["Poulet boucané", "12,00 €", true],
        ["Accras de morue", "5,00 €", true],
        ["Jus de goyave", "3,50 €", false],
      ].map(([nom, prix, dispo]) => (
        <div
          key={String(nom)}
          className="mt-2.5 flex items-center justify-between border-b border-black/5 pb-2 last:border-0"
        >
          <span className="text-[13px] font-semibold">{nom}</span>
          <span className="flex items-center gap-2">
            <span className="text-[12.5px] text-zinc-500">{prix}</span>
            <span
              className={`h-2 w-2 rounded-full ${dispo ? "bg-emerald-600" : "bg-zinc-300"}`}
            />
          </span>
        </div>
      ))}
      <p className="mt-3 rounded-lg bg-cream px-3 py-2 text-center text-[12px] font-semibold text-zinc-600">
        En rupture : l&apos;article sort de la vitrine
      </p>
    </CadreApercu>
  );
}

function ApercuArgent() {
  return (
    <CadreApercu>
      <p className="text-[12px] font-extrabold uppercase tracking-wide text-zinc-500">
        Argent reçu
      </p>
      <p className="mt-2 text-[14px] font-extrabold">10,00 € encaissés</p>
      <p className="text-[12.5px] text-zinc-500">Reste à régler au retrait : 40,00 €</p>
      <p className="mt-3 rounded-lg border border-zinc-200 px-3 py-2 text-center text-[12px] font-bold text-zinc-700">
        Rembourser l&apos;acompte · 10,00 €
      </p>
      <p className="mt-2 rounded-lg bg-cream px-3 py-2 text-center text-[11.5px] font-semibold text-zinc-600">
        Le solde n&apos;est pas encore encaissé : rien à rembourser.
      </p>
    </CadreApercu>
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
          <a href="#metier" className="transition hover:text-white">
            Votre métier
          </a>
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

function FaqItem({
  q,
  a,
  lien,
}: {
  q: string;
  a: string;
  lien?: { href: string; texte: string };
}) {
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
          className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 text-[14px] leading-relaxed text-zinc-600">
          {a}
          {lien && (
            <>
              {" "}
              <Link href={lien.href} className="font-semibold underline underline-offset-4">
                {lien.texte}
              </Link>
              .
            </>
          )}
        </p>
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
