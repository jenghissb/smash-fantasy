import { db } from "@/lib/db";
export const dynamic = 'force-dynamic';

export default async function Leaderboard(){

  const teams =
    await db.team.findMany({
      orderBy:{
        score:"desc",
      },
    });


  return (

    <main className="mx-auto max-w-4xl p-8">

      <h1 className="text-4xl font-bold">
        Leaderboard
      </h1>


      <div className="mt-8 space-y-3">

      {
        teams.map(
          (team,index)=>(

            <div
              key={team.id}
              className="rounded-xl border border-zinc-800 p-5"
            >

              #{index+1}

              <span className="ml-4 font-bold">
                {team.teamName}
              </span>


              <span className="float-right">
                {team.score} pts
              </span>

            </div>

          )
        )
      }

      </div>

    </main>

  );
}
