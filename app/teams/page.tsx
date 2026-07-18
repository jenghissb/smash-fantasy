import { db } from "@/lib/db";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function TeamsPage(){

  const teams =
    await db.team.findMany({

      orderBy:{
        createdAt:"desc",
      },

      include:{
        players:{
          include:{
            player:true,
          },
        },
      },

    });


  const playerColors = ['lightgray', 'gray'];

  return (

    <main className="mx-auto max-w-6xl p-8">


      <h1 className="text-4xl font-bold">
        Fantasy Teams
      </h1>


      <div className="mt-8 grid gap-5 md:grid-cols-3">


      {
        teams.map(team=>(

          <Link
            key={team.id}
            href={`/teams/${team.id}`}
            className="rounded-2xl border border-zinc-800 p-6 hover:border-purple-500"
          >

            <h2 className="text-xl font-bold">
              {team.teamName}
            </h2>


            <p className="text-zinc-400">
              {team.ownerTag}
            </p>


            <p className="mt-4">
              Players: {team.players.length}
            </p>


            <p className="text-sm text-zinc-400">
              Score: {team.score}
            </p>


            <div className="mt-4 space-y-1 text-sm">

            {
	      //team.players.map((player, index) =>player.player.gamertag).join('  ')
             team.players.map((player, index) => (
        <span 
          key={index} 
          style={{ color: playerColors[index % playerColors.length], marginRight: '8px' }}
        >
          {player.player.gamertag}
        </span>
	
        ))
         // team.players.slice(0,5).map(
              //  ({player})=>(
               //   <div
                //    key={player.id}
              //      className="text-sm"
               //   >
                //    {player.gamertag}
                 // </div>
              //  )
             // )
            }

            </div>


          </Link>

        ))
      }


      </div>


    </main>

  );
}
