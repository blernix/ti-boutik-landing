import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente de Ti-Boutik : abonnement, résiliation, paiement et litiges entre professionnels.",
  alternates: {
    canonical: "/cgv",
  },
};

/* Les CGV du service. Deux publics dans le même texte : le commerçant qui
   s'abonne (client de KIKIDEV) et, en creux, ses propres clients. Les clauses
   qui ne valent que pour un consommateur le disent explicitement. */
export default function CGV() {
  return (
    <div className="min-h-screen bg-cream text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/"
          className="text-sm font-medium text-emerald-700 transition hover:underline"
        >
          ← Retour à l&apos;accueil
        </Link>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
          Conditions générales de vente
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Version du 23 octobre 2026 — elles s&apos;appliquent à tout abonnement
          souscrit sur ti-boutik.fr.
        </p>

        <div className="mt-10 space-y-10 text-zinc-700">
          <section>
            <h2 className="text-xl font-bold tracking-tight">1. Qui vend</h2>
            <p className="mt-3">
              Le service Ti-Boutik est édité et vendu par <strong>KIKIDEV</strong>,
              entrepreneur individuel immatriculé sous le numéro SIREN 922 893 169
              (SIRET 922 893 169 00016), dont l&apos;adresse et les coordonnées
              complètes figurent dans les{" "}
              <Link href="/mentions-legales" className="font-semibold text-emerald-800 underline underline-offset-4">
                mentions légales
              </Link>
              . Contact : contact@ti-boutik.fr ou WhatsApp au +590 691 24 48 57.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              2. Ce que vous achetez
            </h2>
            <p className="mt-3">
              Ti-Boutik est un service en ligne (logiciel loué, dit « SaaS ») qui
              permet à un commerçant de publier une boutique de commande sur
              Internet : catalogue avec prix et photos, horaires et créneaux de
              retrait, panier, transmission des commandes sur WhatsApp, et
              facultativement encaissement par carte bancaire.
            </p>
            <p className="mt-3">
              Le service ne comprend ni la création de votre catalogue à votre
              place, ni la gestion de vos commandes, ni l&apos;encaissement de vos
              ventes : vous restez le commerçant, nous fournissons l&apos;outil.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              3. Compte et accès
            </h2>
            <ul className="mt-3 space-y-1.5">
              <li>
                La création du compte est gratuite et suppose une adresse e-mail
                valide, confirmée par un lien.
              </li>
              <li>
                Vous êtes responsable de la confidentialité de votre mot de passe
                et de l&apos;usage fait depuis votre compte.
              </li>
              <li>
                Un compte correspond à une boutique. Le nom d&apos;adresse choisi
                est définitif.
              </li>
              <li>
                Le service s&apos;adresse aux <strong>professionnels</strong> :
                commerçants, restaurants, artisans, sociétés. En créant un compte,
                vous déclarez souscrire pour les besoins de votre activité
                professionnelle.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              4. Prix et facturation
            </h2>
            <p className="mt-3">
              Créer une boutique, la remplir et la garder en privé est{" "}
              <strong>gratuit</strong>, sans carte bancaire et sans limite de
              durée. Seule la publication de la boutique déclenche
              l&apos;abonnement.
            </p>
            <p className="mt-3">
              L&apos;abonnement est de <strong>39 € par mois</strong>, montant
              total prélevé, toutes taxes comprises. Il est mensuel, sans
              engagement de durée, et se renouvelle automatiquement à chaque
              échéance jusqu&apos;à résiliation. Une facture est disponible dans
              votre espace. Ti-Boutik ne prélève aucune commission sur vos ventes.
            </p>
            <p className="mt-3">
              Le paiement est effectué par carte bancaire auprès de notre
              prestataire de paiement <strong>Stripe Payments Europe</strong>.
              Nous ne conservons ni ne voyons vos données de carte. Une facture
              est disponible dans votre espace.
            </p>
            <p className="mt-3">
              En cas d&apos;échec de paiement, nous vous en informons par e-mail
              et la boutique est mise en pause : elle cesse d&apos;être
              commandable, sans suppression de vos données. L&apos;accès est
              rétabli au règlement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              5. Paiement par carte de vos propres clients
            </h2>
            <p className="mt-3">
              L&apos;encaissement par carte est facultatif. S&apos;il est activé,
              il passe par un compte <strong>Stripe</strong> que vous ouvrez à
              votre nom depuis votre espace Ti-Boutik. Vous êtes alors le seul
              marchand : les paiements de vos clients sont encaissés directement
              sur votre compte bancaire, sous votre responsabilité, et les frais
              de Stripe sont à votre charge. Ti-Boutik n&apos;encaisse, ne
              détient et ne reverse aucun fonds, et ne perçoit aucune commission.
            </p>
            <p className="mt-3">
              Les conditions de Stripe s&apos;appliquent à ce compte, notamment en
              matière de vérification d&apos;identité et de remboursements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              6. Vos obligations de commerçant
            </h2>
            <ul className="mt-3 space-y-1.5">
              <li>
                Publier des informations exactes : prix toutes taxes comprises,
                allergènes, disponibilité, horaires, adresse, mentions légales de
                votre établissement et coordonnées de contact valides.
              </li>
              <li>
                Respecter la réglementation propre à votre activité, en
                particulier la vente d&apos;alcool et les mentions sanitaires.
              </li>
              <li>
                Ne pas utiliser le service pour un contenu illicite, trompeur, ou
                la vente de produits interdits.
              </li>
              <li>
                Traiter les commandes reçues et informer vos clients. Ti-Boutik
                n&apos;est pas partie à la vente conclue entre vous et votre
                client.
              </li>
              <li>
                Fournir un numéro WhatsApp actif : c&apos;est le canal par lequel
                vos commandes arrivent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              7. Disponibilité et responsabilité
            </h2>
            <p className="mt-3">
              Nous faisons le nécessaire pour que le service fonctionne en
              continu, avec des sauvegardes régulières de votre catalogue et de
              vos commandes. Le service peut être interrompu pour maintenance ou
              pour une cause extérieure (panne d&apos;hébergeur, de Stripe, de
              WhatsApp, attaque informatique).
            </p>
            <p className="mt-3">
              Notre responsabilité ne peut être engagée pour les conséquences
              d&apos;une indisponibilité, d&apos;une perte de données ou d&apos;un
              manque à gagner. Elle est en tout état de cause limitée, toutes
              causes confondues, au montant de l&apos;abonnement payé au cours des
              douze derniers mois. Ces limites ne s&apos;appliquent pas en cas de
              faute lourde ou de dommage corporel.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              8. Propriété intellectuelle
            </h2>
            <p className="mt-3">
              Vos contenus (textes, photos, prix, catalogue) restent votre
              propriété. Vous nous autorisez seulement à les héberger et à les
              afficher pour faire fonctionner votre boutique. Le logiciel, le
              code, les modèles graphiques et la marque Ti-Boutik restent la
              propriété de KIKIDEV ; aucun droit d&apos;usage en dehors du service
              n&apos;est cédé.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              9. Données personnelles
            </h2>
            <p className="mt-3">
              Les données de votre compte servent à fournir le service et à vous
              facturer. Les commandes enregistrées par votre boutique vous
              appartiennent : vous en êtes responsable et devez les traiter
              conformément au RGPD. Nos prestataires techniques sont Stripe
              (paiement), Brevo (e-mails) et Google Cloud (stockage des photos).
              Vous pouvez demander la suppression de votre compte et de vos
              données à contact@ti-boutik.fr.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              10. Résiliation et suppression
            </h2>
            <p className="mt-3">
              Vous pouvez résilier à tout moment depuis votre espace, bouton
              « Gérer mon abonnement ». La résiliation prend effet à la fin de la
              période déjà payée : la boutique reste en ligne jusqu&apos;à cette
              date, puis passe en pause. Aucun remboursement au prorata
              n&apos;est effectué pour la période en cours.
            </p>
            <p className="mt-3">
              Après la pause, votre catalogue et vos commandes sont conservés
              douze mois, le temps que vous puissiez revenir. Passé ce délai, ils
              peuvent être supprimés. La suppression immédiate et définitive est
              possible à tout moment depuis votre espace (« Supprimer ma
              boutique »).
            </p>
            <p className="mt-3">
              Nous pouvons suspendre un compte en cas de non-paiement, d&apos;usage
              illicite ou de contenu manifestement trompeur, après information par
              e-mail.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              11. Pas de droit de rétractation entre professionnels
            </h2>
            <p className="mt-3">
              Le contrat est conclu entre professionnels, pour les besoins de
              votre activité : le délai de rétractation de quatorze jours prévu
              pour les consommateurs ne s&apos;applique pas. Vous n&apos;êtes pas
              engagé pour autant — créer et remplir votre boutique est gratuit, et
              vous pouvez résilier à tout moment (article 10).
            </p>
            <p className="mt-3">
              Si, par exception, vous souscrivez sans agir pour les besoins de
              votre activité professionnelle, les dispositions impératives du code
              de la consommation s&apos;appliquent, y compris le droit de
              rétractation de quatorze jours : écrivez à contact@ti-boutik.fr
              avant toute utilisation, le remboursement est intégral.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              12. Réclamation et litige
            </h2>
            <p className="mt-3">
              Une difficulté ? Écrivez à contact@ti-boutik.fr ou sur WhatsApp au
              +590 691 24 48 57 : nous répondons dans les meilleurs délais et
              cherchons une solution avec vous. Une réclamation écrite reçoit une
              réponse nominative.
            </p>
            <p className="mt-3">
              À défaut d&apos;accord, les parties peuvent recourir d&apos;un commun
              accord à une médiation conventionnelle ou à toute autre voie
              amiable. La médiation de la consommation ne s&apos;applique pas aux
              litiges entre professionnels : un commerçant n&apos;a pas à adhérer
              à un médiateur de la consommation pour ses propres achats.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">
              13. Droit applicable
            </h2>
            <p className="mt-3">
              Les présentes conditions sont soumises au droit français. Les
              litiges relèvent du tribunal de commerce de Pointe-à-Pitre, y
              compris pour une demande reconventionnelle. Si l&apos;abonnement a
              été souscrit hors activité professionnelle, les dispositions
              impératives protégeant un consommateur restent applicables.
            </p>
            <p className="mt-3">
              Nous pouvons modifier ces conditions ; la version applicable est
              celle en vigueur au jour de votre prochaine échéance, et toute
              modification substantielle vous est notifiée par e-mail un mois
              avant.
            </p>
          </section>
        </div>

        <p className="mt-12 text-sm text-zinc-500">
          <Link href="/mentions-legales" className="font-semibold text-emerald-800 underline underline-offset-4">
            Mentions légales
          </Link>{" "}
          ·{" "}
          <Link href="/" className="font-semibold text-emerald-800 underline underline-offset-4">
            Retour à l&apos;accueil
          </Link>
        </p>
      </div>
    </div>
  );
}
