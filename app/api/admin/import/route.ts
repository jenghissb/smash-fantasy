import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { scrapeEntrants } from "@/lib/smash-explorer";
import { getCostFromSeed } from "@/lib/cost";


export async function POST(req: Request) {

  const key =
    new URL(req.url)
      .searchParams
      .get("key");


  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }


  const body = await req.json();

  const {
    url,
    mode,
  } = body;


  if (!url) {
    return NextResponse.json(
      {
        error:
          "Missing url or tournamentId"
      },
      {
        status:400
      }
    );
  }




  const data =
    await scrapeEntrants(url);

  const {
    tournamentId,
    tournamentName,
    eventName,
    startggUrl,
    entrants,
  } = data;

  const smashExplorerId = tournamentId;


  if (mode === "preview") {

    return NextResponse.json({

      count: entrants.length,

      preview:
        entrants.slice(0,25)
        .map(e=>({
          ...e,
          cost:
            getCostFromSeed(e.seed)
        }))

    });

  }



  if (mode === "import") {

  try {





await db.tournament.deleteMany();

    const tournament =
     await db.tournament.upsert({
      where: {
        smashExplorerId,
      },

      update: {
        name: tournamentName ?? "Imported Tournament",
        eventName,
        startggUrl,
        smashExplorerUrl: url,
      },

      create: {
        name: tournamentName ?? "Imported Tournament",
        eventName,
        startggUrl,
        smashExplorerUrl: url,
        smashExplorerId,
        budget: 1600,
        maxRosterSize: 12,
      },
    });


await db.teamPlayer.deleteMany({
  where: {
    player: {
      tournamentId: tournament.id,
    },
  },
});


await db.player.deleteMany({
  where: {
    tournamentId: tournament.id,
  },
});


await db.player.createMany({

  data: entrants.map((e)=>({

    tournamentId: tournament.id,

    entrantId: e.entrantId,

    gamertag: e.gamertag,

    seed: e.seed,

    location: e.location,

    cost: getCostFromSeed(e.seed),

  }))

});





    return NextResponse.json({

      success:true,

      imported:
        entrants.length,

    });
   
    } catch (error) {

  console.error("IMPORT ERROR:", error);

  return NextResponse.json(
    {
      error:
        error instanceof Error
        ? error.message
        : "Unknown import error"
    },
    {
      status:500
    }
  );

} 
  }



  return NextResponse.json(
    {
      error:"Invalid mode"
    },
    {
      status:400
    }
  );

}
