import { db } from "@/lib/db";


export default async function TeamPage({
  params,
}:{
  params:Promise<{id:string}>
}){

  const {id}=await params;


  const team =
    await db.team.findUnique({

      where:{
        id,
      },

      include:{
        players:{
          include:{
            player:true,
          },
        },
      },

    });



  if(!team){
    return (
      <div className="p-8">
        Team not found
      </div>
    );
  }



  const cost =
    team.players.reduce(
      (sum,p)=>sum+p.player.cost,
      0
    );


  return (

<main className="mx-auto max-w-5xl p-8" >


<div className="flex items-start justify-between">

  <div>

    <h1 className="text-2xl font-bold">
      {team.teamName}
    </h1>

    <p className="text-sm text-zinc-400">
      {team.ownerTag}
    </p>

  </div>

  <div className="text-right">

    <div className="text-2xl font-bold">
      {team.score ?? 0}
    </div>

    <div className="text-xs text-zinc-500">
      pts
    </div>

  </div>

</div>


      <div className="mt-6 rounded-xl border border-zinc-800 p-5">

        Budget:
        <span className="ml-2 font-bold">
          {cost}
        </span>

      </div>



      <div className="mt-8 grid gap-4 md:grid-cols-3">






<div className="space-y-2">

{team.players.map(tp=>(

<div
key={tp.id}
className="flex justify-between rounded-lg bg-zinc-800 px-3 py-2"
>

<div>

<div className="font-medium">

{tp.player.gamertag}

</div>

<div className="text-xs text-zinc-500">

Seed #{tp.player.seed}

</div>

</div>

<div className="font-semibold">

${tp.player.cost}

</div>

</div>

))}

</div>





      </div>


    </main>

  );
}
