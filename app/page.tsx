import Link from "next/link";
import { getDemoTournament } from "@/lib/tournament";
import TournamentHeader from "@/components/TournamentHeader";


export default async function Home(){

  const tournament =
    await getDemoTournament();


  if(!tournament){
    return (
      <div className="p-8">
        No tournament loaded
      </div>
    );
  }


  return (

    <main className="mx-auto max-w-5xl space-y-8 p-4">


      <TournamentHeader
        tournament={tournament}
      />


      <div className="grid gap-4 md:grid-cols-3">


        <Link
          href="/build"
          className="rounded-xl border border-zinc-800 p-6 hover:border-purple-500"
        >
          <h2 className="text-xl font-bold">
            Build Team
          </h2>

          <p className="mt-2 text-zinc-400">
            Draft your fantasy roster.
          </p>

        </Link>



        <Link
          href="/teams"
          className="rounded-xl border border-zinc-800 p-6 hover:border-purple-500"
        >

          <h2 className="text-xl font-bold">
            Teams
          </h2>

          <p className="mt-2 text-zinc-400">
            See everyone's picks.
          </p>

        </Link>



        <Link
          href="/leaderboard"
          className="rounded-xl border border-zinc-800 p-6 hover:border-purple-500"
        >

          <h2 className="text-xl font-bold">
            Leaderboard
          </h2>

          <p className="mt-2 text-zinc-400">
            Track fantasy scores.
          </p>

        </Link>


      </div>


    </main>

  );
}
