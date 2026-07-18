"use client";

import { useState } from "react";
import PlayerCard from "@/components/PlayerCard";
import BudgetMeter from "@/components/BudgetMeter";
import SubmitTeam from "@/components/SubmitTeam";

export default function TeamBuilder({
  tournament,
}: any) {


  const [selected, setSelected] = useState<any[]>([]);
  const [filter, setFilter] = useState("");


  const used = selected.reduce(
    (sum, p) => sum + p.cost,
    0
  );


  function toggle(player:any) {

    const exists = selected.some(
      p => p.id === player.id
    );


    if (exists) {

      setSelected(
        selected.filter(
          p => p.id !== player.id
        )
      );

      return;
    }


    if (selected.length >= tournament.maxRosterSize) {
      return;
    }


    if (used + player.cost > tournament.budget) {
      return;
    }


    setSelected([
      ...selected,
      player
    ]);

  }


  return (
    <main className="mx-auto max-w-6xl p-4">

{tournament.startggUrl && (
  <a
    href={tournament.startggUrl}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center rounded-lg bg-purple-600 px-4 py-2 font-semibold hover:bg-purple-500"
  >
    Bracket
  </a>
)}


<div className="sticky bg-zinc-950 top-0 z-20">
      <h3 className="text-xl font-semibold">
        Selected Players ({selected.length} / {tournament.maxRosterSize}) 
      </h3>

      <div>
        <BudgetMeter
          used={used}
          max={tournament.budget}
        />
      </div>


<input
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  placeholder="Search players..."
  className="mt-2 mb-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
/>
</div>

      <div className="mt-2 grid gap-4 md:grid-cols-3">


        {


        tournament.players
         .filter((player) => {
             const f = filter.toLowerCase();

           return (
              player.gamertag.toLowerCase().includes(f)
             );
           })
           .map((player:any)=>(

          <PlayerCard
            key={player.id}
            player={player}
            selected={
              selected.some(
                p=>p.id===player.id
              )
            }
            onToggle={() =>
              toggle(player)
            }
          />

        ))}

      </div>
      <SubmitTeam
        tournamentId={tournament.id}
        players={selected}
      />
    </main>
  );
}
