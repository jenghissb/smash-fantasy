import { getDemoTournament } from "@/lib/tournament";
import TeamBuilder from "./TeamBuilder";

export const dynamic = 'force-dynamic';

export default async function BuildPage() {

  const tournament = await getDemoTournament();


  if (!tournament) {
    return (
      <div className="p-8">
        No tournament loaded.
      </div>
    );
  }


  return (
    <TeamBuilder
      tournament={tournament}
    />
  );
}
