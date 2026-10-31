import Link from "next/link";

/* Le bandeau d'aiguillage, posé au-dessus du header.

   Une page ne parle qu'à un métier à la fois : celle-ci vend la commande. Une
   question ouverte suffit à envoyer l'autre public vers sa page sans nommer de
   métier — le barbier répond « oui », le restaurateur passe outre. Il n'est pas
   collant : il aiguille à l'arrivée, puis s'efface au défilement. */
export default function BandeauMetier({
  question,
  href,
  libelle,
}: {
  question: string;
  href: string;
  libelle: string;
}) {
  return (
    <div className="bg-emerald-950 px-4 py-2 text-center text-[13px] leading-snug text-emerald-100/85">
      <span>{question}</span>{" "}
      <Link
        href={href}
        className="font-semibold text-amber-300 underline underline-offset-4 transition hover:text-amber-200"
      >
        {libelle}
      </Link>
    </div>
  );
}
