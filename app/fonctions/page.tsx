import type { Metadata } from "next";
import Link from "next/link";

/* La page qui manquait : ce que l'application sait faire, par famille.
 *
 * La page d'accueil tient une promesse ; ici on répond à « ça fait quoi
 * exactement ? ». Une seule règle : chaque ligne doit correspondre à quelque
 * chose qui existe dans le produit. Pas de fonction rêvée, pas de « bientôt ».
 */

export const metadata: Metadata = {
  title: "Tout ce que Ti-Boutik sait faire — par métier",
  description:
    "Les fonctions de Ti-Boutik, famille par famille : comptoir, rendez-vous, location. Panier, stock, créneaux, carnet, planning, acompte, paiement par carte, commande écrite sur WhatsApp.",
  alternates: { canonical: "/fonctions" },
};

const FAMILLES = [
  {
    cle: "commerce",
    titre: "Comptoir — plats, produits",
    pour: "Restaurant, snack, traiteur, épicerie, pâtisserie, artisan qui vend un article.",
    fonctions: [
      "Panier avec quantités, options (taille, suppléments) et prix justes.",
      "Stock par article : à zéro, l'article sort de la vitrine tout seul.",
      "Créneau de retrait choisi par le client, selon vos horaires.",
      "Ardoise du jour, remise à zéro chaque matin.",
      "Allergènes sur la fiche (les 14 INCO) pour les métiers de bouche.",
      "Commande écrite sur votre WhatsApp : articles, créneau, référence.",
      "Validation manuelle ou automatique, au choix.",
      "Paiement au retrait, ou par carte sur votre compte Stripe.",
      "Acompte : un pourcentage du panier, au-delà d'un seuil que vous fixez.",
      "E-mail de confirmation au client, e-mail d'alerte à vous.",
      "Lien vers votre fiche Google le lendemain du retrait.",
      "Photo, description et ordre d'affichage de chaque article.",
    ],
  },
  {
    cle: "rdv",
    titre: "Rendez-vous — prestations",
    pour: "Coiffeur, barbier, onglerie, esthéticienne, tatoueur, réparation.",
    fonctions: [
      "Prestations avec durée, prix et description.",
      "Carnet de rendez-vous : les créneaux libres se calculent seuls.",
      "Le client réserve depuis votre lien ou le QR code du salon.",
      "Horaires d'ouverture, pauses et congés respectés.",
      "Validation des demandes, ou acceptation automatique.",
      "Le rendez-vous arrive écrit sur votre WhatsApp : nom, prestation, heure.",
      "Acompte possible, jamais la totalité.",
      "Paiement du solde au salon, ou par carte.",
      "Rappel par e-mail avant le rendez-vous.",
      "Agenda personnel par lien privé, sans compte à créer.",
      "Fidélité : un passage offert tous les N rendez-vous.",
      "Historique par client, retrouvé depuis son numéro.",
    ],
  },
  {
    cle: "location",
    titre: "Location — biens, séjours, interventions",
    pour: "Canoë, vélo, engin, gîte, appartement, artisan qui se déplace.",
    fonctions: [
      "Biens avec plusieurs exemplaires : chacun son stock.",
      "Tarif à l'heure, à la journée, à la nuit ou à la semaine.",
      "Le client choisit ses dates, le prix se calcule seul.",
      "Planning des dates prises : plus de double réservation.",
      "Trois gabarits : bien, logement, intervention — champs et mots adaptés.",
      "Caution notée sur la réservation, sans bloquer d'argent.",
      "Acompte à la réservation, solde réclamé avant l'arrivée.",
      "Demande du solde automatique, X jours avant (0 = jamais).",
      "Confirmation écrite sur votre WhatsApp.",
      "E-mails d'arrivée et de départ au client.",
      "Remboursement de l'acompte ou du solde, séparément.",
      "Avis demandé après le séjour.",
    ],
  },
];

const COMMUN = [
  "Votre adresse votrenom.ti-boutik.fr, en HTTPS.",
  "Sept habillages interchangeables, sans rien perdre.",
  "Photos illimitées, bandeau, page d'accueil personnalisée.",
  "Commandes, rendez-vous ou réservations : une seule boîte, avec référence.",
  "Remboursement de l'acompte et du solde, séparément, quand la carte a servi.",
  "Paiement par carte sur votre compte Stripe — 0 % de commission Ti-Boutik.",
  "Sauvegarde quotidienne de votre boutique.",
  "Assistant automatique (option) : il modifie votre boutique à votre place.",
];

const NE_FAIT_PAS = [
  "Pas de livraison, ni de créneau de livraison.",
  "Pas de marketplace : chaque boutique vit à son adresse.",
  "Pas d'application à installer, ni pour vous ni pour vos clients.",
  "Pas de caisse, pas de terminal de paiement.",
  "Pas de comptabilité, pas d'inventaire fournisseurs.",
  "Pas de site multi-pages à construire.",
];

export default function Fonctions() {
  return (
    <main className="min-h-screen bg-cream text-foreground">
      <header className="border-b border-black/5 bg-emerald-900 px-4 py-3 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="text-base font-bold tracking-tight">
            Ti-Boutik
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/#tarif" className="text-emerald-100/80 hover:text-white">
              Prix
            </Link>
            <a
              href="https://app.ti-boutik.fr/inscription"
              className="rounded-xl bg-white px-4 py-2 font-bold text-emerald-800"
            >
              Créer ma boutique
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-emerald-800">
          Fonctions
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Tout ce que ça sait faire. Rien de plus.
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Trois mécaniques, un seul outil. Trouvez votre famille, lisez la liste :
          chaque ligne existe vraiment dans l&apos;application. La dernière
          section dit ce qu&apos;elle ne fait pas — c&apos;est aussi utile de le
          savoir.
        </p>

        <div className="mt-10 space-y-8">
          {FAMILLES.map((f) => (
            <section key={f.cle} className="rounded-3xl bg-white p-6 ring-1 ring-black/5 sm:p-8">
              <h2 className="text-xl font-extrabold">{f.titre}</h2>
              <p className="mt-1 text-[13.5px] text-zinc-500">{f.pour}</p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {f.fonctions.map((x) => (
                  <li key={x} className="flex gap-2 text-[14px] leading-relaxed text-zinc-700">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
                    {x}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-black/5 sm:p-8">
          <h2 className="text-xl font-extrabold">Dans les trois cas</h2>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {COMMUN.map((x) => (
              <li key={x} className="flex gap-2 text-[14px] leading-relaxed text-zinc-700">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
                {x}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-3xl bg-emerald-950 p-6 text-white sm:p-8">
          <h2 className="text-xl font-extrabold">Ce que ça ne fait pas</h2>
          <p className="mt-1 text-[13.5px] text-emerald-100/70">
            Autant le dire avant que vous le demandiez.
          </p>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {NE_FAIT_PAS.map((x) => (
              <li key={x} className="flex gap-2 text-[14px] leading-relaxed text-emerald-50/90">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                {x}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 rounded-3xl bg-white p-6 text-center ring-1 ring-black/5 sm:p-8">
          <p className="text-lg font-extrabold">
            39 €/mois à la publication. 0 € pour créer, 0 % de commission.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://app.ti-boutik.fr/inscription"
              className="rounded-2xl bg-emerald-700 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-800"
            >
              Créer ma boutique
            </a>
            <Link
              href="/demo"
              className="rounded-2xl bg-cream px-6 py-3.5 font-bold text-emerald-800 ring-1 ring-emerald-200 transition hover:bg-emerald-50"
            >
              Voir une vraie boutique
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-[13px] text-zinc-500">
          <Link href="/" className="underline underline-offset-4">
            Retour à l&apos;accueil
          </Link>
        </p>
      </div>
    </main>
  );
}
