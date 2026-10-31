import Image from "next/image";
import Link from "next/link";
import BandeauMetier from "@/components/bandeau-metier";

/* La page « rendez-vous ».
 *
 * Même maison, même voix que la page commande — mais un autre métier : ici on
 * ne vend pas des plats, on remplit des créneaux. Le vocabulaire change
 * (prestations, créneaux, réserver), jamais le squelette.
 *
 * Tout ce qui est affirmé ici est vrai dans l'application aujourd'hui :
 * prestations avec durée, créneaux, demande envoyée sur WhatsApp, acompte
 * optionnel, page publique sur un sous-domaine. Rien sur la location.
 */

const LIEN = "https://app.ti-boutik.fr/inscription?modele=rdv";

/* Les deux captures vivent dans public/rdv/. Un <img> ordinaire ne reçoit pas
   le basePath de Next : on le préfixe à la main pour que l'aperçu servi sous
   /apercu/ trouve bien ses images. */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const GARANTIES = [
  { t: "Sans engagement", d: "Vous arrêtez quand vous voulez, en deux clics." },
  { t: "0 % de commission", d: "Vos réservations sont à vous, pas à moi." },
  { t: "10 minutes", d: "Pas de logiciel à apprendre : tout se règle au téléphone." },
];

const AVANT_APRES = [
  {
    avant: "« Vous êtes dispo samedi ? » — vous répondez six fois par jour.",
    apres: "Vos prestations, vos durées et vos créneaux sont en ligne.",
  },
  {
    avant: "Vous recopiez le prénom et l'heure dans votre agenda.",
    apres: "La demande arrive déjà rédigée : nom, soin, heure.",
  },
  {
    avant: "Un client qui ne vous connaît pas ne vous trouve pas.",
    apres: "Votre page s'affiche sur son téléphone, avec vos tarifs.",
  },
  {
    avant: "Un créneau se perd parce que personne n'a rappelé.",
    apres: "Le client reçoit la confirmation, avec l'adresse et l'heure.",
  },
];

const TROIS = [
  {
    n: "01",
    t: "Le rendez-vous arrive sur WhatsApp",
    d: "Nom, prestation, créneau. Vous répondez « c'est noté », ou vous proposez une autre heure. C'est tout.",
  },
  {
    n: "02",
    t: "L'acompte, si vous en voulez un",
    d: "Un lien de paiement pour tenir le créneau, le reste réglé sur place. Vous choisissez le pourcentage — ou zéro.",
  },
  {
    n: "03",
    t: "Votre planning, géré par vous",
    d: "Vous ouvrez et fermez vos créneaux depuis votre téléphone. Une pause, un jour off : ils disparaissent de la page.",
  },
];

const ETAPES = [
  {
    n: "1",
    t: "Vous installez, en 10 minutes",
    d: "Vos prestations, leurs durées, vos horaires. Pas de logiciel à apprendre, pas de formation.",
  },
  {
    n: "2",
    t: "Vous partagez votre adresse",
    d: "ti-boutik.fr/votre-salon. Le lien va dans votre bio Instagram, sur votre vitrine, dans WhatsApp.",
  },
  {
    n: "3",
    t: "Le client réserve, vous recevez",
    d: "Il choisit son soin et son heure. La demande tombe sur votre téléphone. Vous confirmez d'un message.",
  },
];

const OBJECTIONS = [
  {
    q: "Mes clients appellent, ça marche très bien",
    a: "Tant mieux, ils continuent d'appeler. Mais celui qui tombe sur votre page à 23 h ne laissera pas de message : il prendra le salon d'à côté.",
  },
  {
    q: "Je n'ai pas le temps de m'en occuper",
    a: "Dix minutes pour la page. Ensuite elle travaille pendant que vous coupez — c'est le principe.",
  },
  {
    q: "Je ne suis pas doué en informatique",
    a: "Si vous savez envoyer une photo par WhatsApp, vous savez remplir votre page. Et si ça bloque, vous m'écrivez : je réponds moi-même.",
  },
];

const FAQ = [
  {
    q: "Combien ça coûte, vraiment ?",
    a: "39 €/mois, ou 390 €/an. L'assistant qui tient la boutique à votre place est une option à 10 €/mois. Aucune commission sur vos réservations : ce que le client paie arrive chez vous.",
  },
  {
    q: "Il faut une machine, un logiciel, une imprimante ?",
    a: "Un téléphone. Vous remplissez votre page depuis le navigateur, les demandes arrivent sur WhatsApp.",
  },
  {
    q: "Comment le client règle ?",
    a: "Sur place, en espèces ou par carte. Si vous voulez un acompte pour tenir le créneau, l'application envoie un lien de paiement sécurisé.",
  },
  {
    q: "Et si j'arrête ?",
    a: "Vous fermez la page quand vous voulez. Vos textes, vos photos et vos prix restent à vous, et rien ne vous est prélevé une fois l'abonnement arrêté.",
  },
  {
    q: "Je suis restaurateur, pas coiffeur",
    a: "C'est l'autre page : la commande, le panier, la livraison.",
    lien: { href: "/", texte: "la version commande" },
  },
];

export default function LandingRdv() {
  return (
    <div className="min-h-screen bg-cream text-foreground">
      <BandeauMetier
        question="Vous vendez plutôt des plats ou des produits ?"
        href="/"
        libelle="Voir la version commande"
      />

      <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/rendez-vous" className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl">
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
          <nav className="hidden items-center gap-5 text-sm text-zinc-600 md:flex">
            <a href="#demo" className="hover:text-zinc-900">
              À quoi ça ressemble
            </a>
            <a href="#comment" className="hover:text-zinc-900">
              Comment ça marche
            </a>
            <a href="#prix" className="hover:text-zinc-900">
              Prix
            </a>
            <a href="#faq" className="hover:text-zinc-900">
              Questions
            </a>
          </nav>
          <a
            href={LIEN}
            className="rounded-xl bg-emerald-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-800"
          >
            Créer ma page
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="px-4 pb-14 pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Coiffeur, barbier, onglerie, soins — Guadeloupe &amp; Antilles
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Vos créneaux se remplissent
            <br className="hidden sm:block" /> pendant que vous coupez.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-600">
            Vos prestations, vos durées, vos horaires. Le client choisit son
            créneau sur votre page, et la demande arrive sur WhatsApp, déjà
            rédigée.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={LIEN}
              className="rounded-2xl bg-emerald-900 px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-emerald-800"
            >
              Créer ma page
            </a>
            <a
              href="#demo"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-base font-semibold text-zinc-700 transition hover:border-emerald-700/40"
            >
              À quoi ça ressemble
            </a>
          </div>
          <p className="mt-3 text-sm text-zinc-500">
            39 €/mois seulement quand vous publiez. Sans engagement, 0 % de
            commission.
          </p>
        </div>
      </section>

      {/* GARANTIES */}
      <section className="border-y border-black/5 bg-white px-4 py-6">
        <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          {GARANTIES.map((g) => (
            <li key={g.t}>
              <p className="text-sm font-bold">{g.t}</p>
              <p className="text-sm text-zinc-500">{g.d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* DEMO */}
      <section id="demo" className="scroll-mt-20 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Ce que votre client voit
          </h2>
          <p className="mt-3 text-zinc-600">
            Une page qui s&apos;ouvre sur son téléphone, avec vos soins, leurs
            durées, leurs prix. Il touche « Réserver », choisit son heure : pas
            de compte à créer, pas d&apos;application à installer.
          </p>
        </div>
        <figure className="mx-auto mt-7 max-w-3xl overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/rdv/carnet-prestations.jpg`}
            alt="Les prestations d'un salon : coupe et brushing 1 h 45 €, coupe femme 45 min 35 €, bouton Réserver"
            className="w-full"
          />
          <figcaption className="px-4 py-3 text-xs text-zinc-500">
            Vos prestations, leur durée, leur prix. Le client choisit, vous
            recevez.
          </figcaption>
        </figure>
        <figure className="mx-auto mt-4 max-w-3xl overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/rdv/zetwal.jpg`}
            alt="Une page de réservation de soins, habillage Zétwal"
            className="w-full"
            loading="lazy"
          />
          <figcaption className="px-4 py-3 text-xs text-zinc-500">
            Aperçus d&apos;habillages : Carnet et Zétwal. Le vôtre se choisit à
            l&apos;inscription.
          </figcaption>
        </figure>
      </section>

      {/* AVANT / APRÈS */}
      <section className="border-t border-black/5 bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Le téléphone qui sonne pendant une coupe
          </h2>
          <ul className="mt-6 divide-y divide-black/5">
            {AVANT_APRES.map((l) => (
              <li key={l.avant} className="grid gap-1 py-4 sm:grid-cols-2 sm:gap-6">
                <p className="text-zinc-500">
                  <span className="mr-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Avant
                  </span>
                  {l.avant}
                </p>
                <p className="font-medium">
                  <span className="mr-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Après
                  </span>
                  {l.apres}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TROIS CHOSES */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Trois choses, faites pour de vrai
          </h2>
          <ul className="mt-7 grid gap-5 sm:grid-cols-3">
            {TROIS.map((t) => (
              <li key={t.n} className="rounded-3xl bg-white p-5 ring-1 ring-black/5">
                <p className="text-xs font-bold text-emerald-700">{t.n}</p>
                <p className="mt-2 font-bold">{t.t}</p>
                <p className="mt-2 text-sm text-zinc-600">{t.d}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-zinc-500">
            Et aussi : vos horaires et vos fermetures, plusieurs personnes sur un
            même créneau, vos photos, votre adresse avec l&apos;itinéraire, une
            page prête pour Google.
          </p>
        </div>
      </section>

      {/* COMMENT */}
      <section id="comment" className="scroll-mt-20 border-t border-black/5 bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Trois étapes, un après-midi
          </h2>
          <ol className="mt-7 space-y-6">
            {ETAPES.map((e) => (
              <li key={e.n} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-sm font-bold text-white">
                  {e.n}
                </span>
                <div>
                  <p className="font-bold">{e.t}</p>
                  <p className="text-zinc-600">{e.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Vous vous dites peut-être…
          </h2>
          <ul className="mt-6 space-y-5">
            {OBJECTIONS.map((o) => (
              <li key={o.q} className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
                <p className="font-semibold">« {o.q} »</p>
                <p className="mt-2 text-zinc-600">{o.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRIX */}
      <section id="prix" className="scroll-mt-20 border-t border-black/5 bg-emerald-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-lg">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Un prix, pas de commission
          </h2>
          <div className="mt-6 rounded-3xl bg-emerald-900 p-6 ring-1 ring-white/10">
            <p className="text-sm text-emerald-100/80">Votre page de réservation</p>
            <p className="mt-1 text-4xl font-extrabold">
              39 €<span className="text-lg font-semibold text-emerald-100/80">/mois</span>
            </p>
            <p className="text-sm text-emerald-100/70">ou 390 €/an, deux mois offerts</p>
            <ul className="mt-5 space-y-2 text-sm text-emerald-50/90">
              <li>✓ Votre page, vos prestations, vos créneaux</li>
              <li>✓ Les demandes sur WhatsApp, déjà rédigées</li>
              <li>✓ L&apos;acompte par carte, si vous le voulez</li>
              <li>✓ Aucune commission sur vos réservations</li>
              <li>✓ Sans engagement</li>
            </ul>
            <p className="mt-4 rounded-xl bg-white/10 px-3 py-2 text-[13px] text-emerald-50/95">
              + 10 €/mois, si vous voulez :{" "}
              <Link
                href="/assistant/conditions"
                className="font-semibold text-white underline underline-offset-4"
              >
                un assistant tient la boutique à votre place
              </Link>
              .
            </p>
            <a
              href={LIEN}
              className="mt-6 flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-base font-bold text-emerald-800 transition hover:bg-emerald-50"
            >
              Créer ma page
            </a>
          </div>
          <p className="mt-4 text-center text-sm text-emerald-100/80">
            Deux coupes de plus, et l&apos;abonnement est remboursé.
          </p>
          <p className="mt-6 border-t border-white/10 pt-5 text-center text-sm text-emerald-100/80">
            Vous vendez plutôt des plats ou des produits ?{" "}
            <Link href="/" className="font-semibold text-white underline underline-offset-4">
              La version commande
            </Link>
          </p>
        </div>
      </section>

      {/* QUI */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Qui est derrière
          </h2>
          <p className="mt-4 text-zinc-600">
            Je m&apos;appelle Killian Lecrut. Je vis en Guadeloupe et je fais des
            sites pour les commerces d&apos;ici — dont{" "}
            <a
              href="https://tablemaster.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-800 underline underline-offset-4"
            >
              tablemaster.fr
            </a>
            . Ti-Boutik, c&apos;est la même chose en plus simple : une page, un
            lien, les réservations qui arrivent.
          </p>
          <p className="mt-3 text-zinc-600">
            Vous m&apos;écrivez, je réponds. Pas de service client à l&apos;autre
            bout du monde.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-black/5 bg-white px-4 py-14">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Les questions qu&apos;on me pose
          </h2>
          <dl className="mt-6 divide-y divide-black/5">
            {FAQ.map((f) => (
              <div key={f.q} className="py-4">
                <dt className="font-semibold">{f.q}</dt>
                <dd className="mt-1 text-zinc-600">
                  {f.a}
                  {f.lien && (
                    <>
                      {" "}
                      <Link
                        href={f.lien.href}
                        className="font-semibold text-emerald-800 underline underline-offset-4"
                      >
                        {f.lien.texte}
                      </Link>
                      .
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Votre prochain client cherche un créneau.
          </h2>
          <p className="mt-3 text-zinc-600">
            Dix minutes pour la page. Après, elle travaille pendant que vous
            coupez.
          </p>
          <a
            href={LIEN}
            className="mt-6 inline-flex rounded-2xl bg-emerald-900 px-6 py-3.5 text-base font-bold text-white transition hover:bg-emerald-800"
          >
            Créer ma page
          </a>
          <p className="mt-3 text-sm text-zinc-500">
            Sans engagement. Vous arrêtez quand vous voulez.
          </p>
        </div>
      </section>

      <footer className="border-t border-black/5 px-4 py-8 text-center text-xs text-zinc-500">
        <p>
          ti-boutik — Guadeloupe.{" "}
          <Link href="/cgv" className="underline underline-offset-4">
            Conditions
          </Link>{" "}
          ·{" "}
          <Link href="/" className="underline underline-offset-4">
            Version commande
          </Link>
        </p>
      </footer>
    </div>
  );
}
