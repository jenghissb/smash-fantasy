import { db } from "@/lib/db";
import ScoreTable from "./ScoreTable";

export default async function ScoringPage() {
  const players = await db.player.findMany({
    orderBy: [
      {
        seed: "asc",
      },
      {
        gamertag: "asc",
      },
    ],
  });

  return (
    <div className="mx-auto max-w-6xl p-8">

      <h1 className="mb-6 text-3xl font-bold">
        Manual Placement Entry
      </h1>

      <ScoreTable players={players} />

    </div>
  );
}
