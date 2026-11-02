"use client";

import { useState } from "react";
import { Check, Store, CreditCard, ClipboardList, CalendarDays, Undo2 } from "lucide-react";

/* L'espace commerçant, reconstruit en code — et non en capture d'écran.
 *
 * Il reprend le vrai langage de l'espace commerçant (components/espace/theme.ts
 * du saas) : papier #fdf9f2, vert de marque #16a34a, cartes blanches à gros
 * rayons, pastilles, pilules. Un commerçant qui arrive du site ne doit pas se
 * demander s'il a changé de produit — et une capture, elle, vieillit au premier
 * changement d'écran.
 *
 * Ce qui est vivant ici : la navigation, la confirmation d'une commande, la
 * mise en rupture d'un article, le remboursement. Ce qui est faux et qu'on dit :
 * une démonstration, montants d'exemple, rien n'est encaissé.
 */

const PAPIER = "#fdf9f2";
const ENCRE = "#171717";
const SOURDINE = "#6f6a61";
const MARQUE = "#16a34a";

export type Bloc = {
  titre: string;
  sous: string;
  lignes: [string, string][];
  total: string;
  note: string;
  action: string;
  actionFaite: string;
  pied: string;
};

export default function ApercuAdmin({
  nomBoutique,
  onglets,
  libelles,
}: {
  nomBoutique: string;
  onglets: [Bloc, Bloc, Bloc];
  libelles: [string, string, string];
}) {
  const [actif, setActif] = useState(0);
  const [confirme, setConfirme] = useState(false);
  const [rembourse, setRembourse] = useState(false);
  const [rupture, setRupture] = useState<number[]>([]);
  const bloc = onglets[actif];
  const slug = nomBoutique
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const acompte = /acompte[^.]*reçu/i.test(bloc.note);

  const icones = [
    <ClipboardList key="c" className="h-4 w-4" />,
    <Store key="s" className="h-4 w-4" />,
    <CreditCard key="p" className="h-4 w-4" />,
  ];

  return (
    <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5" style={{ background: PAPIER }}>
      {/* la fenêtre : on voit que c'est un écran, pas une photo */}
      <div className="flex items-center gap-2 border-b px-3 py-2" style={{ borderColor: "rgba(23,23,23,.08)" }}>
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <p
          className="ml-1.5 truncate rounded-md bg-white px-2 py-0.5 text-[10.5px]"
          style={{ color: SOURDINE, boxShadow: "inset 0 0 0 1px rgba(23,23,23,.06)" }}
        >
          app.ti-boutik.fr/boutique/{actif === 0 ? "commandes" : actif === 1 ? "vitrine" : "paiements"}
        </p>
      </div>

      {/* sur téléphone, la barre latérale devient une rangée d'onglets */}
      <div className="flex gap-1 overflow-x-auto px-2 pb-2 sm:hidden">
        {libelles.map((l, i) => (
          <button
            key={l}
            onClick={() => setActif(i)}
            aria-selected={i === actif}
            role="tab"
            className="shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition"
            style={
              i === actif
                ? { background: "#fff", color: ENCRE, boxShadow: "0 1px 2px rgba(23,23,23,.06)" }
                : { color: SOURDINE }
            }
          >
            {l}
          </button>
        ))}
      </div>

      <div className="flex min-h-[320px]">
        {/* la barre latérale de l'espace commerçant */}
        <div
          className="hidden w-[146px] shrink-0 border-r px-2.5 py-3 sm:block"
          style={{ borderColor: "rgba(23,23,23,.08)" }}
        >
          <div className="flex items-center gap-1.5 px-1 pb-3">
            <span
              className="grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[10px] font-extrabold text-white"
              style={{ background: MARQUE }}
              aria-hidden="true"
            >
              ti
            </span>
            <span className="truncate text-[10.5px] font-bold" style={{ color: ENCRE }}>
              {nomBoutique}
            </span>
          </div>
          {libelles.map((l, i) => (
            <button
              key={l}
              onClick={() => setActif(i)}
              role="tab"
              aria-selected={i === actif}
              className="mb-0.5 flex w-full items-center gap-2 rounded-full px-2.5 py-1.5 text-left text-[11.5px] font-semibold transition"
              style={
                i === actif
                  ? { background: "#fff", color: ENCRE, boxShadow: "0 1px 2px rgba(23,23,23,.06)" }
                  : { color: SOURDINE }
              }
            >
              {icones[i]}
              <span className="truncate">{l}</span>
            </button>
          ))}
          <div className="mt-2 border-t pt-2" style={{ borderColor: "rgba(23,23,23,.08)" }}>
            <p
              className="flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[11.5px] font-semibold"
              style={{ color: SOURDINE }}
            >
              <CalendarDays className="h-4 w-4" /> Mon compte
            </p>
          </div>
        </div>

        {/* le contenu de l'onglet */}
        <div className="min-w-0 flex-1 px-4 py-4">
          <p className="text-[22px] font-extrabold leading-tight tracking-tight" style={{ color: ENCRE }}>
            {libelles[actif]}
          </p>
          {actif === 1 && (
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[.14em]" style={{ color: SOURDINE }}>
              {bloc.titre}
            </p>
          )}

          {/* onglet commandes : les pastilles de filtre, comme le vrai écran */}
          {actif === 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["À confirmer", "À préparer", "Prêtes", "Historique"].map((f, i) => (
                <span
                  key={f}
                  className="rounded-full px-2.5 py-1 text-[10.5px] font-semibold"
                  style={
                    i === 0
                      ? { background: MARQUE, color: "#fff" }
                      : { background: "#fff", color: SOURDINE, boxShadow: "inset 0 0 0 1px rgba(23,23,23,.07)" }
                  }
                >
                  {f}
                  {i === 0 && !confirme ? " · 1" : ""}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 rounded-3xl bg-white p-3.5" style={{ boxShadow: "inset 0 0 0 1px rgba(23,23,23,.06)" }}>
            {actif !== 1 && (
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[.14em]" style={{ color: SOURDINE }}>
                  {bloc.sous}
                </p>
                <p className="mt-0.5 truncate text-[13.5px] font-bold" style={{ color: ENCRE }}>
                  {bloc.lignes[0]?.[0] ?? ""}
                </p>
              </div>
              <p className="shrink-0 text-[13px] font-extrabold" style={{ color: ENCRE }}>
                {bloc.total}
              </p>
            </div>
            )}

            {bloc.lignes.length > 0 && (
              <div className={actif === 1 ? "" : "mt-2"}>
                {(actif === 1 ? bloc.lignes : bloc.lignes.slice(1)).map(([nom, prix], i) => {
                  const coupe = rupture.includes(i);
                  return actif === 1 ? (
                    <button
                      key={nom}
                      onClick={() => setRupture((r) => (r.includes(i) ? r.filter((x) => x !== i) : [...r, i]))}
                      className="flex w-full items-center justify-between gap-2 border-t py-2 text-left"
                      style={{ borderColor: "rgba(23,23,23,.06)" }}
                    >
                      <span
                        className="text-[12.5px] font-semibold"
                        style={{ color: coupe ? "#a8a29e" : ENCRE, textDecoration: coupe ? "line-through" : "none" }}
                      >
                        {nom}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="text-[11.5px]" style={{ color: SOURDINE }}>
                          {prix}
                        </span>
                        <span
                          className="flex h-4 w-7 items-center rounded-full p-0.5 transition"
                          style={{ background: coupe ? "rgba(23,23,23,.15)" : MARQUE }}
                        >
                          <span
                            className={`h-3 w-3 rounded-full bg-white shadow transition ${coupe ? "" : "translate-x-3"}`}
                          />
                        </span>
                      </span>
                    </button>
                  ) : (
                    <div
                      key={nom}
                      className="flex items-center justify-between gap-2 border-t py-2"
                      style={{ borderColor: "rgba(23,23,23,.06)" }}
                    >
                      <span className="text-[12.5px]" style={{ color: ENCRE }}>
                        {nom}
                      </span>
                      <span className="text-[11.5px]" style={{ color: SOURDINE }}>
                        {prix}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* l'état de l'argent, comme sur la vraie carte de commande */}
            {bloc.note && (
              <p
                className="mt-2.5 inline-block rounded-full px-2.5 py-1 text-[10.5px] font-semibold"
                style={
                  confirme
                    ? { background: "rgba(22,163,74,.10)", color: "#166534" }
                    : acompte
                      ? { background: "rgba(226,163,46,.16)", color: "#8a5a12" }
                      : { background: "rgba(23,23,23,.05)", color: "#5c5a54" }
                }
              >
                {confirme ? "Payée" : bloc.note}
              </p>
            )}

            {/* les gestes */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {actif === 0 &&
                (confirme ? (
                  <>
                    <span className="flex items-center gap-1.5 text-[11.5px] font-semibold" style={{ color: "#166534" }}>
                      <Check className="h-3.5 w-3.5" /> {bloc.actionFaite}
                    </span>
                    <button
                      onClick={() => setConfirme(false)}
                      className="flex items-center gap-1 text-[10.5px] font-semibold underline underline-offset-2"
                      style={{ color: SOURDINE }}
                    >
                      <Undo2 className="h-3 w-3" /> revenir
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setConfirme(true)}
                    className="rounded-full px-4 py-2 text-[11.5px] font-semibold text-white transition hover:brightness-95 active:scale-[.98]"
                    style={{ background: MARQUE }}
                  >
                    {bloc.action}
                  </button>
                ))}

              {actif === 2 &&
                (rembourse ? (
                  <span className="flex items-center gap-1.5 text-[11.5px] font-semibold" style={{ color: "#166534" }}>
                    <Check className="h-3.5 w-3.5" /> {bloc.actionFaite}
                  </span>
                ) : (
                  <button
                    onClick={() => setRembourse(true)}
                    className="rounded-full bg-white px-4 py-2 text-[11.5px] font-semibold ring-1 ring-black/5 transition hover:bg-[#fdf9f2]"
                    style={{ color: ENCRE }}
                  >
                    {bloc.action}
                  </button>
                ))}

              {actif === 1 && (
                <span className="text-[10.5px]" style={{ color: SOURDINE }}>
                  {rupture.length > 0
                    ? `${rupture.length} article${rupture.length > 1 ? "s" : ""} sorti${rupture.length > 1 ? "s" : ""} de la vitrine`
                    : "Tout est visible du client"}
                </span>
              )}
            </div>
          </div>

          <p className="mt-6 text-[10.5px]" style={{ color: "#a8a29e" }}>
            Boutique en ligne · {slug}.ti-boutik.fr
          </p>

          {bloc.pied && (
            <p className="mt-2 text-[10.5px]" style={{ color: SOURDINE }}>
              {bloc.pied}
            </p>
          )}
        </div>
      </div>

      <p
        className="border-t px-3 py-1.5 text-[10px]"
        style={{ borderColor: "rgba(23,23,23,.08)", color: "#a8a29e", background: "#faf6ee" }}
      >
        Démonstration — montants d&apos;exemple, rien n&apos;est encaissé.
      </p>
    </div>
  );
}
