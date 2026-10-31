"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, MessageCircle, Package, Star, TrendingUp } from "lucide-react";
import { WhatsAppIcon, StripeIcon } from "@/components/icons";
import { HeroPhoneRdv } from "@/components/landing-animations";
import BandeauMetier from "@/components/bandeau-metier";

const CONTACT_WHATSAPP = "https://wa.me/590691244857";
const CONTACT_EMAIL = "mailto:contact@ti-boutik.fr";
const CONTACT_TEL = "+590 691 24 48 57";
const CONTACT_ADRESSE = "contact@ti-boutik.fr";

/* L'application : créer une boutique, revenir dans la sienne. */
const APP_URL = "https://app.ti-boutik.fr";

/* Les maquettes de page de réservation vivent dans public/maquettes/ : servies
   par app.ti-boutik.fr, elles interdisent l'intégration (X-Frame-Options), donc
   on les sert depuis la landing elle-même. */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const LIEN_CREER = `${APP_URL}/inscription?modele=rdv`;
const LIEN_CONNEXION = `${APP_URL}/boutique/connexion`;

/* La fiche Google de Killian : 5,0 · 4 avis au 26/10. Le lien porte l'identifiant
   de la fiche (place_id), pas une recherche par nom — sinon il tombe sur un homonyme. */
const AVIS_GOOGLE =
  "https://www.google.com/maps/search/?api=1&query=ti-boutik&query_place_id=ChIJWyvjQw1Dh6oR2GyHPWee2k4";
const NOTE_GOOGLE = "5,0";
const NB_AVIS = 4;

const PRIX = "39 €";

const PREUVES = [
  "0 % de commission sur vos réservations",
  "Sans engagement, résiliable en un clic",
  "Je réponds moi-même sur WhatsApp",
];

/* Une ligne par situation vécue : ce qui coûte aujourd'hui, ce que ça devient. */
const AVANT_APRES: [string, string][] = [
  ["« Vous êtes dispo samedi ? » — vous répondez six fois par jour", "Vos prestations, vos durées et vos créneaux sont en ligne"],
  ["Vous recopiez le prénom et l'heure dans votre agenda", "La demande arrive écrite : nom, soin, créneau"],
  ["Vous cherchez qui avait réservé à 15 h", "Chaque rendez-vous a son heure et son nom"],
  ["Un client qui ne vous connaît pas ne vous trouve pas", "Votre page s'affiche sur son téléphone"],
];

const FONCTIONS = [
  {
    icon: <MessageCircle className="h-6 w-6" />,
    titre: "Le rendez-vous déjà rédigé",
    texte:
      "Le client choisit son soin et son heure : vous recevez le message écrit, avec son nom, la prestation et le créneau. Même conversation, même habitude.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    titre: "L'acompte qui tient le créneau",
    texte:
      "Un lien de paiement pour réserver, le reste réglé sur place. Vous choisissez le pourcentage, ou zéro. Les lapins au téléphone s'arrêtent là.",
  },
  {
    icon: <Package className="h-6 w-6" />,
    titre: "Le planning qui se remplit seul",
    texte:
      "Vos prestations, leurs durées, vos horaires : les créneaux se calculent tout seuls. Vous fermez une heure, elle disparaît de la page.",
  },
];

const ET_AUSSI = [
  "Paiement par carte : l'argent va sur votre compte",
  "Horaires et jours de fermeture",
  "Congés et fermetures exceptionnelles annoncés",
  "Photos illimitées",
  "Votre adresse votrenom.ti-boutik.fr",
  "Page prête pour Google : prestations, horaires, adresse",
];

const OBJECTIONS = [
  {
    titre: "« Mes clients appellent, ça marche très bien. »",
    texte:
      "Tant mieux : ils continuent d'appeler. Mais celui qui tombe sur votre page à 23 h ne laissera pas de message, il prendra le salon d'à côté.",
  },
  {
    titre: "« Je n'ai pas le temps de m'en occuper. »",
    texte:
      "Dix minutes depuis votre téléphone, et vous pouvez arrêter en cours de route : vous n'avez rien payé.",
  },
  {
    titre: "« Je ne suis pas doué en informatique. »",
    texte:
      "Rien à installer, rien à mettre à jour. Si vous bloquez, je le fais avec vous sur WhatsApp.",
  },
];

const FAQ_ITEMS: {
  q: string;
  a: string;
  lien?: { href: string; texte: string };
}[] = [
  {
    q: "Combien ça coûte ?",
    a: "0 € pour créer, puis 39 € par mois seulement quand vous publiez — ou 390 € par an, deux mois offerts. Sans engagement, résiliable en un clic. Aucune commission sur vos rendez-vous : seuls les frais bancaires de Stripe s'appliquent, comme sur tout paiement par carte.",
  },
  {
    q: "Combien de temps pour être en ligne ?",
    a: "Une dizaine de minutes depuis votre téléphone : votre nom, vos prestations, leurs durées, vos horaires. Le paiement par carte demande quelques minutes de plus, chez Stripe.",
  },
  {
    q: "Faut-il un logiciel, une caisse, une imprimante ?",
    a: "Un téléphone. Vous remplissez votre page depuis le navigateur, les demandes arrivent sur WhatsApp, et le client paie sur place ou par carte.",
  },
  {
    q: "Et l'acompte, comment ça marche ?",
    a: "Vous choisissez un pourcentage — ou zéro. Le client reçoit un lien de paiement sécurisé pour tenir son créneau, et règle le reste sur place, comme d'habitude.",
  },
  {
    q: "Et si j'arrête ?",
    a: "Votre page passe en pause : elle n'est plus réservable, mais rien n'est supprimé. Vous reprenez l'abonnement plus tard et retrouvez vos prestations telles quelles.",
  },
  {
    q: "Je suis restaurateur, pas coiffeur",
    a: "C'est l'autre page : la commande, le panier, les créneaux de retrait.",
    lien: { href: "/", texte: "la version commande" },
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-cream text-foreground">
      {/* L'autre métier : une question ouverte, pas une liste de commerces.
          Il aiguille à l'arrivée puis s'efface au défilement. */}
      <BandeauMetier
        question="Vous vendez plutôt des plats ou des produits ?"
        href="/"
        libelle="Voir la version commande"
      />
      <Header />

      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 px-4 pb-16 pt-16 text-white sm:pt-20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-teal-300/15 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[.14em] text-amber-300">
                Pour les coiffeurs, barbiers, ongleries &amp; soins — Guadeloupe
                &amp; Antilles
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Votre page de réservation.
                <br className="hidden sm:block" /> Les rendez-vous arrivent{" "}
                <span className="text-wa">déjà rédigés</span> sur WhatsApp.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-lg text-emerald-50/90 lg:mx-0">
                Vos prestations, vos durées, vos horaires : tout se règle depuis
                votre téléphone, en 10 minutes. {PRIX}/mois seulement quand vous
                publiez.{" "}
                <span className="font-semibold text-white">
                  0 % de commission sur vos rendez-vous.
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
                  href="/habillages-rdv"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 px-6 py-3.5 text-base font-bold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto"
                >
                  Voir un exemple
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-sm text-emerald-100/70">
                Gratuit pour créer · sans carte bancaire · en privé tant que vous
                ne publiez pas
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.1} className="hidden justify-center lg:flex">
            <HeroPhoneRdv />
          </FadeIn>
        </div>
      </section>

      {/* 2. Bande de preuve */}
      <section className="border-y border-emerald-950/10 bg-emerald-950 px-4 py-3 text-white">
        <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs font-semibold sm:text-sm">
          {PREUVES.map((p) => (
            <li key={p} className="flex items-center gap-1.5 text-emerald-50/90">
              <Check className="h-4 w-4 shrink-0 text-amber-300" />
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Démo — visible aussi sur téléphone */}
      <section id="demo" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <FadeIn>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Regardez-la comme votre client la verra
            </h2>
            <p className="mt-3 text-zinc-600">
              Il ouvre votre page sur son téléphone, voit vos soins, leurs durées
              et leurs prix, choisit son créneau. La demande arrive sur WhatsApp
              déjà écrite.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/habillages-rdv"
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-emerald-800"
              >
                Voir les exemples
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
              Une page de réservation de l&apos;application, pas une maquette.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="flex justify-center">
            <BoutiqueApercuRdv />
          </FadeIn>
        </div>
      </section>


      {/* 4. Avis Google — texte exact, nom tel qu'affiché, nombre d'avis visible */}
      <section className="border-t border-black/5 bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-center text-2xl font-extrabold tracking-tight">
              Ce qu&apos;ils en disent
            </h2>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm">
              <Stars />
              <span className="font-bold text-zinc-900">{NOTE_GOOGLE}</span>
              <span className="text-zinc-500">· {NB_AVIS} avis Google</span>
            </div>
          </FadeIn>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <FadeIn>
              <blockquote className="h-full rounded-2xl bg-cream p-5 ring-1 ring-black/5">
                <Stars small />
                <p className="mt-2 text-zinc-800">
                  « Très facile à utiliser, je recommande ! »
                </p>
                <footer className="mt-2 text-sm font-semibold text-zinc-500">
                  Gaël Moreau
                </footer>
              </blockquote>
            </FadeIn>
            <FadeIn delay={0.05}>
              <blockquote className="h-full rounded-2xl bg-cream p-5 ring-1 ring-black/5">
                <Stars small />
                <p className="mt-2 text-zinc-800">
                  « Très pratique pour les clients de mon restaurant ! »
                </p>
                <footer className="mt-2 text-sm font-semibold text-zinc-500">
                  Adrien Pennec
                </footer>
              </blockquote>
            </FadeIn>
            <FadeIn delay={0.05}>
              <blockquote className="h-full rounded-2xl bg-cream p-5 ring-1 ring-black/5">
                <Stars small />
                <p className="mt-2 text-zinc-800">
                  « Absolument génial je recommande ! »
                </p>
                <footer className="mt-2 text-sm font-semibold text-zinc-500">
                  Rym Elb
                </footer>
              </blockquote>
            </FadeIn>
          </div>
          <FadeIn>
            <p className="mt-4 text-center text-sm">
              <a
                href={AVIS_GOOGLE}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-800 underline underline-offset-4"
              >
                Voir les avis sur Google
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 4 bis. Les habillages : les vraies maquettes de l'application
          (/maquettes/rdv-0X-….html), rendues en 1024 px puis réduites, comme
          sur la page commande. Un clic ouvre la maquette en entier. */}
      <section id="habillages" className="border-t border-black/5 bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Quatre habillages, une seule page
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-600">
              Mêmes prestations, mêmes créneaux, même WhatsApp. Seul
              l&apos;habillage change : les tresses à Pointe-à-Pitre, l&apos;onglerie
              au Gosier, le barbier du Moule. Vous choisissez le vôtre, et vous
              en changez quand vous voulez.
            </p>
          </FadeIn>
          <div className="mt-8 grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { nom: "Kannòt", cle: "kannot", fichier: "rdv-01-kannot", note: "Tresses, Pointe-à-Pitre." },
              { nom: "Zétwal", cle: "zetwal", fichier: "rdv-02-zetwal", note: "Onglerie & soins, Le Gosier." },
              { nom: "Bwa Floté", cle: "bwaflote", fichier: "rdv-03-bwa-flote", note: "Atelier tresses, Sainte-Anne." },
            ].map((e, i) => (
              <FadeIn key={e.fichier} delay={i * 0.08}>
                <a
                  href={`${BASE}/habillages-rdv#${e.cle}`}
                  className="cadre-exemple group block overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/10 transition hover:shadow-2xl hover:ring-emerald-700/40"
                  aria-label={`Voir l'habillage ${e.nom} en grand`}
                >
                  <div className="flex items-center gap-1.5 border-b border-black/5 bg-zinc-50 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-red-300" />
                    <span className="h-2 w-2 rounded-full bg-amber-300" />
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    <span className="ml-2 truncate text-[10px] text-zinc-400">
                      {e.fichier}.html
                    </span>
                  </div>
                  <div className="cadre-exemple-vue relative overflow-hidden">
                    <iframe
                      src={`${BASE}/maquettes/${e.fichier}.html`}
                      title={`Maquette ${e.nom}`}
                      loading="lazy"
                      scrolling="no"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="absolute left-0 top-0 border-0"
                    />
                  </div>
                  <div className="border-t border-black/5 px-4 py-3">
                    <p className="text-sm font-bold">{e.nom}</p>
                    <p className="text-xs text-zinc-500 group-hover:text-emerald-800">{e.note}</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2} className="mt-8 text-center">
            <Link
              href="/habillages-rdv"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-emerald-800"
            >
              Voir les quatre habillages
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-3 text-sm text-zinc-500">
              Cliquez sur une maquette : elle s&apos;ouvre en grand, avec les
              pastilles pour passer de l&apos;une à l&apos;autre.
            </p>
          </FadeIn>
        </div>
        <style>{`
          /* La maquette est rendue à 1024 px (sa mise en page d'ordinateur)
             puis réduite d'un bloc, comme une capture — jamais recadrée. */
          .cadre-exemple { width: 333px; }
          .cadre-exemple-vue { height: 400px; }
          .cadre-exemple-vue iframe {
            width: 1024px; height: 1230px;
            transform: scale(0.325); transform-origin: top left;
            pointer-events: none;
          }
          @media (min-width: 640px) {
            .cadre-exemple { width: 360px; }
            .cadre-exemple-vue { height: 420px; }
            .cadre-exemple-vue iframe { transform: scale(0.35156); }
          }
        `}</style>
      </section>

      {/* 5. Problème : avant / après */}
      <section id="probleme" className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <FadeIn>
          <h2 className="text-center text-3xl font-extrabold tracking-tight">
            Un rendez-vous WhatsApp, ça vous prend combien de temps ?
          </h2>
        </FadeIn>
        <FadeIn delay={0.05}>
          <div className="mt-8 overflow-hidden rounded-3xl bg-white ring-1 ring-black/5">
            <div className="hidden gap-4 border-b border-black/5 bg-cream px-5 py-3 text-xs font-bold uppercase tracking-wide text-zinc-500 sm:grid sm:grid-cols-2">
              <span>Aujourd&apos;hui</span>
              <span className="text-emerald-800">Avec Ti-Boutik</span>
            </div>
            {AVANT_APRES.map(([avant, apres], i) => (
              <div
                key={avant}
                className={`px-5 py-4 ${
                  i > 0 ? "border-t border-black/5" : ""
                } sm:grid sm:grid-cols-2 sm:gap-4`}
              >
                <p className="text-sm text-zinc-500">{avant}</p>
                <p className="mt-1.5 flex gap-2 text-sm font-medium text-zinc-900 sm:mt-0">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 sm:hidden" />
                  {apres}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-5 text-center text-base font-semibold text-emerald-900">
            Rien ne change pour vos habitudes : les demandes continuent
            d&apos;arriver dans votre WhatsApp.
          </p>
        </FadeIn>
      </section>

      {/* 6. Fonctions : trois blocs + « et aussi » */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="text-center text-3xl font-extrabold tracking-tight">
              Trois choses, faites pour de vrai
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {FONCTIONS.map((f, i) => (
              <FadeIn key={f.titre} delay={i * 0.05}>
                <div className="h-full rounded-3xl bg-cream p-6 ring-1 ring-black/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    {f.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{f.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {f.texte}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-zinc-500">
              <span className="font-bold text-zinc-700">Et aussi :</span>{" "}
              {ET_AUSSI.join(" · ")}
            </p>
          </FadeIn>

          {/* L'assistant reste DANS cette section : c'est une option de plus, pas
              un produit à part. En section autonome, il vendait 10 €/mois à
              quelqu'un qui n'avait pas encore digéré les 39 € — et il coupait la
              page en deux entre le prix et « qui est derrière ». */}
          <FadeIn delay={0.15}>
            <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4 rounded-3xl bg-emerald-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-amber-300">
                  Option
                </p>
                <p className="mt-2 font-bold leading-snug">
                  Et si vous voulez, il tient la boutique à votre place — changer
                  un prix, ajouter un plat, publier une photo.
                </p>
                <p className="mt-1.5 text-[12.5px] text-emerald-100/75">
                  10 €/mois ou 90 €/an. Un assistant automatique, pour vous
                  seulement — il ne parle jamais à vos clients.{" "}
                  <Link
                    href="/assistant/conditions"
                    className="underline underline-offset-4"
                  >
                    Conditions
                  </Link>
                </p>
              </div>
              <a
                href={LIEN_CREER}
                className="shrink-0 rounded-xl bg-white px-4 py-2.5 text-center text-sm font-bold text-emerald-900 transition hover:bg-emerald-50"
              >
                Créer ma boutique
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7. Trois étapes */}
      <section id="comment" className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <FadeIn>
          <h2 className="text-center text-3xl font-extrabold tracking-tight">
            Trois étapes, dix minutes
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <Etape
            n={1}
            titre="Vous créez votre compte"
            texte="Un e-mail, un mot de passe, le nom de votre salon. Votre page naît en privé."
          />
          <Etape
            n={2}
            titre="Vous remplissez votre carte"
            texte="Vos prestations, leurs durées, vos tarifs, vos horaires — depuis votre téléphone."
          />
          <Etape
            n={3}
            titre="Vous publiez"
            texte={`${PRIX} par mois à ce moment-là, pas avant. Votre page ouvre à votre adresse.`}
          />
        </div>
      </section>

      {/* 8. Objections */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="text-center text-3xl font-extrabold tracking-tight">
              Vous vous dites peut-être…
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {OBJECTIONS.map((o, i) => (
              <FadeIn key={o.titre} delay={i * 0.05}>
                <div className="h-full rounded-3xl bg-cream p-6 ring-1 ring-black/5">
                  <p className="font-bold text-zinc-900">{o.titre}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {o.texte}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Prix + retour sur investissement */}
      <section id="tarif" className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <FadeIn>
          <h2 className="text-center text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {PRIX}/mois. Deux coupes de plus,
            <br className="hidden sm:block" /> et c&apos;est remboursé.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-zinc-600">
            Exemple : à 20 € la coupe, deux rendez-vous de plus dans le mois
            couvrent l&apos;abonnement. Le reste, c&apos;est pour vous.
          </p>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-900 p-7 text-white shadow-xl">
            <p className="text-4xl font-extrabold">
              0 €
              <span className="text-lg font-semibold text-emerald-100/80">
                {" "}pour créer
              </span>
            </p>
            <p className="mt-1 text-sm text-emerald-100/80">
              puis {PRIX} / mois pour publier · sans engagement, résiliable en un
              clic
            </p>
            <p className="mt-2 inline-flex items-baseline gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[13px] text-emerald-50">
              ou <strong className="font-semibold text-white">390 € par an</strong>
              <span className="text-emerald-100/70">— deux mois offerts</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-emerald-50/95">
              {[
                "Votre page à votre adresse",
                "Prestations, durées, créneaux, photos illimitées",
                "Demandes WhatsApp avec nom, soin et heure",
                "Carte, Apple Pay, Google Pay, PayPal",
                "Horaires, congés, fermetures exceptionnelles",
                "Référencement Google",
              ].map((l) => (
                <li key={l} className="flex gap-2">
                  <Check className="h-4 w-4 shrink-0 text-amber-300" />
                  {l}
                </li>
              ))}
            </ul>
            <a
              href={LIEN_CREER}
              className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-base font-bold text-emerald-800 transition hover:bg-emerald-50"
            >
              Créer ma boutique
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-5 text-center text-sm text-zinc-600">
            Vous préférez déléguer ? Je crée la boutique pour vous, sur devis.{" "}
            <a
              href={CONTACT_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-800 underline underline-offset-4"
            >
              Écrivez-moi
            </a>
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mt-6 border-t border-black/5 pt-5 text-center text-sm text-zinc-600">
            Vous vendez plutôt des plats ou des produits ?{" "}
            <Link
              href="/"
              className="font-semibold text-emerald-800 underline underline-offset-4"
            >
              La version commande
            </Link>
          </p>
        </FadeIn>
      </section>

      {/* 9 bis. L'assistant IA — petit bloc, bien visible */}
      {/* 10. Qui est derrière */}
      <section className="bg-white px-4 py-16">
        <FadeIn>
          <div className="mx-auto flex max-w-3xl flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-xl font-extrabold text-amber-300">
              K
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">
                Qui est derrière Ti-Boutik
              </h2>
              <p className="mt-2 text-zinc-600">
                Je m&apos;appelle Killian, je développe des sites pour des
                commerces guadeloupéens. Ti-Boutik, c&apos;est mon outil : je le
                fais tourner, je réponds moi-même sur WhatsApp, et je corrige ce
                qui bloque.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                Avant Ti-Boutik, j&apos;ai fait{" "}
                <a
                  href="https://tablemaster.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-800 underline underline-offset-4"
                >
                  tablemaster.fr
                </a>{" "}
                — un logiciel de réservation pour les restaurants, sans commission
                sur les couverts. Ti-Boutik, c&apos;est la même chose en plus
                simple : une page, un lien, les rendez-vous qui arrivent.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 11. FAQ */}
      <section id="faq" className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
        <FadeIn>
          <h2 className="text-center text-3xl font-extrabold tracking-tight">
            Questions fréquentes
          </h2>
        </FadeIn>
        <div className="mt-8 space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FadeIn key={item.q} delay={i * 0.03}>
              <FaqItem q={item.q} a={item.a} lien={item.lien} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 12. CTA final */}
      <section
        id="contact"
        className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 px-4 py-16 text-white sm:py-20"
      >
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Vous ne payez que le jour où vous la publiez.
            </h2>
            <p className="mt-4 text-emerald-50/90">
              Créez votre boutique maintenant, remplissez-la tranquillement. Si
              une question bloque, écrivez-moi — je réponds moi-même.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
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
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-wa px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-green-600/30 transition hover:brightness-105 sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Discutons-en
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-5 text-sm text-emerald-100/70">
              WhatsApp{" "}
              <a
                href={CONTACT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="tabular-nums underline underline-offset-2 transition hover:text-white"
              >
                {CONTACT_TEL}
              </a>{" "}
              ·{" "}
              <a
                href={CONTACT_EMAIL}
                className="underline underline-offset-2 transition hover:text-white"
              >
                {CONTACT_ADRESSE}
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      <footer className="bg-emerald-950 px-4 py-8 pb-24 text-sm text-emerald-200/60 md:pb-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p>© 2026 Ti-Boutik — Tous droits réservés.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a href={LIEN_CONNEXION} className="transition hover:text-white">
              Espace commerçant
            </a>
            <a
              href={CONTACT_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="tabular-nums transition hover:text-white"
            >
              {CONTACT_TEL}
            </a>
            <a href={CONTACT_EMAIL} className="transition hover:text-white">
              {CONTACT_ADRESSE}
            </a>
            <Link href="/cgv" className="transition hover:text-white">
              CGV
            </Link>
            <Link href="/mentions-legales" className="transition hover:text-white">
              Mentions légales
            </Link>
          </div>
        </div>
      </footer>

      <MobileContactBar />
    </div>
  );
}

function Stars({ small = false }: { small?: boolean }) {
  const taille = small ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <span className="flex items-center gap-0.5" aria-label="5 étoiles sur 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={`${taille} fill-amber-400 text-amber-400`} />
      ))}
    </span>
  );
}

function Etape({ n, titre, texte }: { n: number; titre: string; texte: string }) {
  return (
    <FadeIn>
      <div className="h-full rounded-3xl bg-white p-6 ring-1 ring-black/5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
          {n}
        </span>
        <h3 className="mt-3 text-base font-bold">{titre}</h3>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600">{texte}</p>
      </div>
    </FadeIn>
  );
}

/* Aperçu de boutique : un restaurant, le seul métier ouvert aujourd'hui. */
function BoutiqueApercu() {
  const plats = [
    { nom: "Poulet boucané", detail: "Riz, haricots, sauce chien", prix: "12 €" },
    { nom: "Accras de morue", detail: "6 pièces", prix: "5 €" },
    { nom: "Jus de goyave", detail: "33 cl, fait maison", prix: "3,50 €" },
  ];

  return (
    <div className="w-full max-w-[300px] rounded-[2.4rem] border-[10px] border-zinc-900 bg-cream shadow-2xl">
      <div className="overflow-hidden rounded-[1.7rem]">
        <div className="flex items-center gap-2 bg-white px-4 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-amber-500 text-xs font-bold text-white">
            C
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-xs font-bold">Chez Léa</p>
            <p className="text-[10px] text-zinc-500">Resto créole · Le Gosier</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-700 to-teal-600 px-4 py-4 text-white">
          <p className="text-[10px] font-bold uppercase tracking-wide text-amber-200">
            Ouvert · jusqu&apos;à 14 h
          </p>
          <p className="mt-1 text-sm font-bold leading-snug">
            Commandez en ligne, retirez au comptoir.
          </p>
        </div>

        <div className="space-y-2 p-3">
          {plats.map((p) => (
            <div
              key={p.nom}
              className="flex items-start justify-between gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-black/5"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-bold">{p.nom}</p>
                <p className="truncate text-[10px] text-zinc-500">{p.detail}</p>
              </div>
              <span className="shrink-0 text-xs font-bold text-emerald-800">
                {p.prix}
              </span>
            </div>
          ))}
        </div>

        <div className="px-3 pb-4">
          <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-2.5 text-[11px] font-semibold ring-1 ring-black/5">
            <span className="text-zinc-600">2 articles</span>
            <span className="text-emerald-800">17 €</span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-wa px-3 py-3 text-xs font-bold text-white">
            <WhatsAppIcon className="h-4 w-4" />
            Commander sur WhatsApp
          </div>
        </div>
      </div>
    </div>
  );
}

function BoutiqueApercuRdv() {
  const prestations = [
    { nom: "Coupe et brushing", detail: "Shampooing, séchage", duree: "1 h", prix: "45 €" },
    { nom: "Coupe femme", detail: "Sans brushing", duree: "45 min", prix: "35 €" },
    { nom: "Soin des mains", detail: "Pose, limage, vernis", duree: "45 min", prix: "25 €" },
  ];

  return (
    <div className="w-full max-w-[300px] rounded-[2.4rem] border-[10px] border-zinc-900 bg-cream shadow-2xl">
      <div className="overflow-hidden rounded-[1.7rem]">
        <div className="flex items-center gap-2 bg-white px-4 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-amber-500 text-xs font-bold text-white">
            C
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-xs font-bold">Carnet · Coiffure</p>
            <p className="text-[10px] text-zinc-500">Salon · Le Gosier</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-700 to-teal-600 px-4 py-4 text-white">
          <p className="text-[10px] font-bold uppercase tracking-wide text-amber-200">
            Ouvert · jusqu&apos;à 18 h
          </p>
          <p className="mt-1 text-sm font-bold leading-snug">
            Choisissez votre soin, puis votre heure.
          </p>
        </div>

        <div className="space-y-2 p-3">
          {prestations.map((p) => (
            <div
              key={p.nom}
              className="flex items-start justify-between gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-black/5"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-bold">{p.nom}</p>
                <p className="truncate text-[10px] text-zinc-500">
                  {p.detail} · {p.duree}
                </p>
              </div>
              <span className="shrink-0 text-xs font-bold text-emerald-800">
                {p.prix}
              </span>
            </div>
          ))}
        </div>

        <div className="px-3 pb-4">
          <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-2.5 text-[11px] font-semibold ring-1 ring-black/5">
            <span className="text-zinc-600">Samedi 10 h</span>
            <span className="text-emerald-800">45 €</span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-wa px-3 py-3 text-xs font-bold text-white">
            <WhatsAppIcon className="h-4 w-4" />
            Réserver sur WhatsApp
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileContactBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const goingDown = y > lastY;
      setVisible(goingDown && y > 400);
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: "120%", opacity: 0 }}
      animate={{ y: visible ? 0 : "120%", opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-x-0 bottom-0 z-50 flex gap-2 p-3 md:hidden"
    >
      <a
        href={LIEN_CREER}
        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white py-4 text-base font-bold text-emerald-800 shadow-lg transition"
      >
        Créer ma boutique
      </a>
      <a
        href={CONTACT_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Écrire sur WhatsApp"
        className="flex items-center justify-center rounded-2xl bg-wa px-4 shadow-lg shadow-green-600/40 transition"
      >
        <WhatsAppIcon className="h-6 w-6 text-white" />
      </a>
    </motion.div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-emerald-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/rendez-vous" className="flex items-center gap-2.5 text-white">
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
          <a href="#demo" className="transition hover:text-white">
            Démo
          </a>
          <a href="#comment" className="transition hover:text-white">
            Comment ça marche
          </a>
          <a href="#tarif" className="transition hover:text-white">
            Prix
          </a>
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
        <p className="px-5 pb-4 text-zinc-600">
          {a}
          {lien && (
            <>
              {" "}
              <Link
                href={lien.href}
                className="font-semibold text-emerald-800 underline underline-offset-4"
              >
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
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
