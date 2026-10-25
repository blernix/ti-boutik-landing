/**
 * Les conditions d'utilisation de l'assistant (option Assistant Boutik).
 *
 * Un texte à part des CGV, pour une raison simple : l'assistant est un service
 * d'intelligence artificielle, il envoie le contenu de la conversation à un
 * prestataire extérieur (DeepSeek) et il écrit dans la boutique. Trois choses
 * qu'un commerçant doit pouvoir lire noir sur blanc avant de payer — et qu'on
 * ne peut pas noyer au milieu des clauses d'hébergement.
 *
 * Comme `lib/cgv.ts` : une version datée. Quand le texte change, on incrémente.
 */

export const CONDITIONS_ASSISTANT_VERSION = "2026-10-25";

/** L'adresse publique de cette page (là où pointe le lien du chat et du paiement). */
export const CONDITIONS_ASSISTANT_URL = "/assistant/conditions";

export type SectionConditions = { titre: string; paragraphes: string[] };

export const CONDITIONS_ASSISTANT: SectionConditions[] = [
  {
    titre: "1. De quoi parlent ces conditions",
    paragraphes: [
      "L'« Assistant Boutik » est une option payante de ti-boutik : un assistant automatisé, fondé sur un modèle d'intelligence artificielle, qui travaille dans votre boutique à votre demande — ajouter ou modifier un article, changer un prix, poser une photo, réécrire un texte de vitrine, lire vos commandes et votre chiffre d'affaires.",
      "Ces conditions s'appliquent à cette option uniquement. Le reste du service (publication de la boutique, paiement, hébergement) reste régi par les conditions générales de vente de ti-boutik, qui restent applicables et prévalent en cas de contradiction sur ces sujets.",
      "En souscrivant l'option, en l'utilisant, ou en laissant un membre de votre équipe l'utiliser, vous acceptez ces conditions.",
    ],
  },
  {
    titre: "2. Qui fournit le service",
    paragraphes: [
      "L'option est éditée par KIKIDEV, entrepreneur individuel immatriculé sous le numéro SIREN 922 893 169 (SIRET 922 893 169 00016). Contact : contact@ti-boutik.fr, ou WhatsApp au +590 691 24 48 57.",
      "L'éditeur du site et le responsable du traitement des données est KIKIDEV, aux mêmes coordonnées.",
    ],
  },
  {
    titre: "3. Un service d'intelligence artificielle, et ce que cela implique",
    paragraphes: [
      "Les réponses de l'assistant sont produites par un modèle de langage exploité par DeepSeek, que nous appelons par son interface de programmation (API). Le modèle ne connaît ni votre mot de passe, ni vos identifiants Stripe : il ne reçoit que ce qui est nécessaire pour répondre.",
      "Concrètement, lorsque vous écrivez à l'assistant, notre serveur transmet à DeepSeek : le texte de votre message, les derniers messages de la conversation, les éléments de votre boutique utiles à la demande (noms et prix des articles, textes de la vitrine, réglages, liste de vos photos, résumé des commandes du jour) et, si vous en joignez une, la photo.",
      "Ces données sont traitées sur les serveurs de DeepSeek, situés hors de l'Union européenne. Nous ne pouvons pas garantir une localisation européenne du traitement par ce prestataire, qui applique ses propres conditions d'utilisation et politique de confidentialité. Si cette transmission hors Union européenne ne vous convient pas, n'activez pas l'option : l'aide support, elle, ne transmet rien à un tiers de ce type pour fonctionner et reste disponible gratuitement.",
      "N'écrivez jamais dans la conversation de données sensibles : numéro de carte bancaire, mot de passe, code de sécurité, données de santé, coordonnées bancaires de vos clients, pièce d'identité. L'assistant n'en a pas besoin et nous ne pouvons pas garantir leur traitement.",
      "L'assistant est un outil d'aide : il peut se tromper, mal interpréter une demande, proposer un texte maladroit ou un prix erroné. Il ne donne ni conseil juridique, ni conseil fiscal, ni conseil médical, et il ne remplace pas la lecture des documents officiels.",
    ],
  },
  {
    titre: "4. Ce qu'il fait, et ce qui reste sous votre responsabilité",
    paragraphes: [
      "L'assistant agit pour votre compte, dans votre boutique, sur votre demande. Les gestes sensibles — modifier ou supprimer un article, changer un prix, couper le paiement en ligne, éteindre l'ardoise — exigent une confirmation explicite avant d'être appliqués. Chaque action est inscrite au journal de la boutique, avec sa date et son origine.",
      "Vous restez seul responsable du contenu publié : exactitude des prix, description des produits, allergènes, disponibilité, mentions légales et informations de vente. Un prix annoncé par erreur à vos clients vous engage : relisez ce que l'assistant propose avant de valider, et vérifiez votre vitrine après un changement important.",
      "L'assistant ne peut pas encaisser d'argent, ne peut pas modifier vos coordonnées bancaires, ne peut pas changer le mot de passe du compte et ne peut pas passer commande à votre place.",
    ],
  },
  {
    titre: "5. Usage acceptable",
    paragraphes: [
      "Vous vous engagez à ne pas utiliser l'assistant pour produire ou publier un contenu illégal, trompeur, ou contraire aux règles applicables à votre activité (vente de produits interdits, allégations de santé non autorisées, contrefaçon).",
      "Vous vous engagez également à ne pas tenter de détourner l'assistant de son rôle : extraction des instructions internes, contournement des confirmations, injection d'instructions dans un message ou dans un fichier, usage automatisé massif ou revente de l'accès.",
      "Ces tentatives sont détectées et journalisées. En cas d'abus, ti-boutik peut suspendre l'option sans remboursement, dans les conditions prévues par les conditions générales de vente, et sans préjudice de la fermeture de la boutique en cas de manquement grave.",
      "Des limites d'usage existent pour protéger le service (nombre de messages par jour pour l'aide gratuite, plafond mensuel de consommation pour l'option). Elles sont dimensionnées très au-delà d'un usage normal d'une boutique et ne servent qu'à arrêter un usage anormal.",
    ],
  },
  {
    titre: "6. Disponibilité et limites du service",
    paragraphes: [
      "L'assistant dépend de prestataires extérieurs : DeepSeek pour la génération des réponses, Stripe pour le paiement de l'option, notre hébergeur pour le service. Une panne, une maintenance ou un changement de politique chez l'un d'eux peut rendre l'assistant indisponible ou dégradé.",
      "Une indisponibilité de l'assistant ne donne pas droit à un remboursement, ni à une prolongation : la boutique et l'aide support continuent de fonctionner, et l'option ne fait pas obstacle à la gestion manuelle de votre boutique à tout moment.",
      "Nous nous efforçons de prévenir avant un changement majeur de fonctionnement ou de tarif, et de laisser un délai raisonnable avant son application.",
    ],
  },
  {
    titre: "7. Vos données, la conversation, la conservation",
    paragraphes: [
      "La conversation avec l'assistant est conservée dans notre base pour que l'assistant garde le fil, et pour que vous puissiez la relire. Vous pouvez l'effacer à tout moment avec le bouton « Effacer » de la fenêtre de discussion : la conversation et le résumé de mémoire associés sont supprimés.",
      "Les actions réalisées par l'assistant (création d'article, changement de prix, modification de texte) restent inscrites au journal de la boutique, même après l'effacement de la conversation : c'est la trace de ce qui a été fait sur vos données, et elle vous protège autant qu'elle nous engage.",
      "La suppression de la boutique entraîne la suppression de la conversation et des traces associées dans les délais décrits par les conditions générales de vente.",
    ],
  },
  {
    titre: "8. Prix, durée, résiliation",
    paragraphes: [
      "L'option est facturée 10 € par mois, ou 90 € par an (trois mois offerts par rapport au paiement mensuel, soit 120 €). Elle est sans engagement de durée : vous pouvez l'arrêter à tout moment depuis votre espace, pour la période suivante.",
      "L'option souscrite avec l'abonnement annuel de la boutique (formule « pack ») est offerte pendant deux mois, une seule fois. À l'issue de ces deux mois, elle s'arrête si vous ne souscrivez pas : aucun prélèvement n'est effectué sans votre accord.",
      "Comme l'abonnement de publication, l'option est payée d'avance et n'est pas remboursable, ni au prorata ni en totalité, y compris si vous cessez d'utiliser l'assistant, si votre boutique cesse son activité ou si elle est fermée par ti-boutik en cas de manquement.",
      "L'option s'arrête à la fin de la période payée, sans délai de grâce : le jour qui suit l'échéance, l'assistant ne peut plus modifier votre boutique. L'aide support, gratuite, reste accessible.",
    ],
  },
  {
    titre: "9. Modification de ces conditions",
    paragraphes: [
      "Ces conditions peuvent évoluer, notamment si le prestataire du modèle change ou si la loi change. La version applicable est datée en haut de cette page ; en cas de modification substantielle, vous en êtes informé par e-mail avant son entrée en vigueur, et vous pouvez arrêter l'option si vous n'êtes pas d'accord.",
    ],
  },
  {
    titre: "10. Droit applicable et litiges",
    paragraphes: [
      "Ces conditions sont soumises au droit français. En cas de difficulté, écrivez-nous d'abord : contact@ti-boutik.fr ou WhatsApp au +590 691 24 48 57 — la plupart des situations se règlent en un échange.",
      "À défaut d'accord, et s'agissant d'un contrat entre professionnels, le litige sera porté devant le tribunal compétent du ressort du siège de KIKIDEV, sauf règle impérative contraire.",
    ],
  },
];
