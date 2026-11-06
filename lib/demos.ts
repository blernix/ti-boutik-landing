/* Données des deux démonstrations — rendez-vous et location.
 *
 * Les noms, les durées et les prix sont ceux déjà écrits sur l'accueil
 * (components/landing-app.tsx) : la démo ne peut pas raconter une autre
 * histoire que la page qui l'annonce. Une seule unité partout : « jours »
 * pour la location (un canoë se loue à la journée, pas à la nuit).
 */

export const SALON = {
  name: "Kannot",
  subtitle: "Salon",
  city: "Le Gosier",
  address: "Rue du Stade, Le Gosier",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rue+du+Stade+Le+Gosier+Guadeloupe",
  open: true,
  hours: "Mar–Sam · 8 h 30 → 18 h",
} as const;

export type Prestation = {
  id: string;
  name: string;
  /** en minutes */
  duree: number;
  detail: string;
  price: number;
};

export const PRESTATIONS: Prestation[] = [
  {
    id: "tresses-longues",
    name: "Tresses longues",
    duree: 90,
    detail: "Mèches fournies",
    price: 45,
  },
  {
    id: "coupe-barbe",
    name: "Coupe + barbe",
    duree: 45,
    detail: "Dégradé, contours au rasoir",
    price: 30,
  },
  {
    id: "coloration",
    name: "Coloration",
    duree: 120,
    detail: "Patine et soin inclus",
    price: 60,
  },
  {
    id: "soin-cuir",
    name: "Soin du cuir chevelu",
    duree: 40,
    detail: "Gommage et massage",
    price: 35,
  },
];

export const LOUEUR = {
  name: "Kanoé Kreyol",
  subtitle: "Location de canoës",
  city: "Le Gosier",
  address: "Ponton de la plage, Le Gosier",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Ponton+plage+Le+Gosier+Guadeloupe",
  open: true,
  hours: "Retrait au ponton · 8 h → 17 h",
  caution: 100,
} as const;

export type Bien = {
  id: string;
  name: string;
  detail: string;
  /** par jour */
  price: number;
  libre: number;
};

export const BIENS: Bien[] = [
  {
    id: "canoe-2",
    name: "Canoë 2 places",
    detail: "Pagaies et gilets fournis",
    price: 30,
    libre: 2,
  },
  {
    id: "paddle",
    name: "Paddle",
    detail: "Planche rigide, leash",
    price: 20,
    libre: 3,
  },
  {
    id: "kayak-2",
    name: "Kayak 2 places",
    detail: "Stable, idéal lagune",
    price: 25,
    libre: 0,
  },
];

/* ---------- horaires ---------- */

export const OUVERTURE = 8 * 60 + 30;
export const FERMETURE = 18 * 60;
export const PAS = 30;

/** « 10 h 30 », « 8 h », « 18 h » */
export function heureCourte(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
}

/** « 1 h 30 », « 45 min » */
export function dureeCourte(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${m}`;
}

/** Empreinte stable : les créneaux déjà pris ne changent pas d'un rendu à l'autre. */
function empreinte(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100003;
  return h;
}

export type Creneau = { minutes: number; libre: boolean };

/**
 * Les créneaux d'une journée pour une prestation donnée.
 * On ne propose jamais une pose de 2 h à 17 h quand le salon ferme à 18 h :
 * la grille s'adapte à la durée du soin, c'est la promesse du produit.
 */
export function creneaux(prestation: Prestation, cle: string): Creneau[] {
  const e = empreinte(cle + prestation.id);
  const liste: Creneau[] = [];
  let i = 0;
  for (let m = OUVERTURE; m + prestation.duree <= FERMETURE; m += PAS) {
    liste.push({ minutes: m, libre: (e + i * 7) % 4 !== 0 });
    i++;
  }
  return liste;
}

/* ---------- jours ---------- */

export type Jour = {
  cle: string;
  date: Date;
  /** « JEU 13 » */
  court: string;
  /** « jeudi 13 nov. » */
  long: string;
  complet: boolean;
};

const FERME = [0, 1]; // le salon ferme dimanche et lundi

function cleDe(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function courtDe(d: Date): string {
  return d
    .toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" })
    .replace(".", "")
    .toUpperCase();
}

function longDe(d: Date): string {
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

/**
 * Les prochains jours d'ouverture, à partir de demain.
 * Le troisième jour est complet : c'est ce qui montre l'état « plus de place »
 * sans avoir à l'inventer au moment où on regarde.
 */
export function prochainsJours(nb = 5, depuis = new Date()): Jour[] {
  const jours: Jour[] = [];
  const d = new Date(depuis.getFullYear(), depuis.getMonth(), depuis.getDate());
  while (jours.length < nb) {
    d.setDate(d.getDate() + 1);
    if (FERME.includes(d.getDay())) continue;
    jours.push({
      cle: cleDe(d),
      date: new Date(d),
      court: courtDe(d),
      long: longDe(d),
      complet: jours.length === 2,
    });
  }
  return jours;
}

/* ---------- dates de location ---------- */

export type JourLocation = {
  cle: string;
  date: Date;
  numero: number;
  /** « jeu. » */
  court: string;
  /** « août » */
  mois: string;
  pris: boolean;
};

/**
 * Quatorze jours à partir d'aujourd'hui.
 * Quatre jours au milieu sont déjà loués : c'est ce qui empêche de réserver
 * par-dessus, et le démontre au lieu de le promettre.
 */
export function quatorze(depuis = new Date()): JourLocation[] {
  const jours: JourLocation[] = [];
  const d = new Date(depuis.getFullYear(), depuis.getMonth(), depuis.getDate());
  for (let i = 0; i < 14; i++) {
    jours.push({
      cle: cleDe(d),
      date: new Date(d),
      numero: d.getDate(),
      court: d.toLocaleDateString("fr-FR", { weekday: "short" }).replace(".", ""),
      mois: d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", ""),
      pris: i >= 4 && i <= 7,
    });
    d.setDate(d.getDate() + 1);
  }
  return jours;
}

/** Nombre de jours entre deux dates, sans se faire piéger par le fuseau. */
export function joursEntre(debut: Date, fin: Date): number {
  const a = Date.UTC(debut.getFullYear(), debut.getMonth(), debut.getDate());
  const b = Date.UTC(fin.getFullYear(), fin.getMonth(), fin.getDate());
  return Math.round((b - a) / 86400000);
}

/** « 12 → 15 août » */
export function plageDeuxDates(debut: Date, fin: Date): string {
  const j = (d: Date) => d.getDate();
  const m = (d: Date) => d.toLocaleDateString("fr-FR", { month: "long" });
  if (debut.getMonth() === fin.getMonth()) {
    return `${j(debut)} → ${j(fin)} ${m(fin)}`;
  }
  return `${j(debut)} ${m(debut)} → ${j(fin)} ${m(fin)}`;
}
