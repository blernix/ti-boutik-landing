"use client";

import { useSyncExternalStore } from "react";

const rien = () => () => {};

/**
 * Vrai seulement une fois monté dans le navigateur.
 *
 * Les démos calculent des dates à partir d'aujourd'hui : si on les calculait
 * aussi pendant le rendu statique, le HTML du build et celui du navigateur
 * afficheraient deux jours différents — React signalerait une erreur
 * d'hydratation. Ce crochet donne `false` côté serveur, `true` côté navigateur,
 * sans passer par un setState dans un effet (interdit par le compilateur React
 * de ce dépôt).
 */
export function useMonte(): boolean {
  return useSyncExternalStore(rien, () => true, () => false);
}
