import { NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function POST(req: Request) {

  const body = await req.json();

  if (new Date() >= new Date("2026-07-18T11:30:00-07:00")) {
    return NextResponse.json(
      {
        error: "Team submissions are closed",
      },
      {
        status: 400,
      }
    );
  }

  const {
    teamName,
    ownerTag,
    browserId,
    playerIds,
  } = body;


  if (!teamName || !ownerTag || !browserId) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }


  if (!playerIds?.length) {
    return NextResponse.json(
      { error: "Select at least one player" },
      { status: 400 }
    );
  }


  const existingBrowserTeam =
    await db.team.findFirst({
      where: {
        browserId,
      },
    });


  if (existingBrowserTeam) {
    return NextResponse.json(
      {
        error: "You already submitted a team",
      },
      {
        status: 400,
      }
    );
  }




  const teams =
    await db.team.findMany();


  const duplicateGamertag =
    teams.some(
      team =>
        team.ownerTag.toLowerCase() ===
        ownerTag.toLowerCase()
    );


  if (duplicateGamertag) {
    return NextResponse.json(
      {
        error:"Gamertag already submitted",
      },
      {
        status:400,
      }
    );
  }


  const team =
    await db.team.create({

      data: {

        teamName,

        ownerTag,

        browserId,


        players: {
          create:
            playerIds.map(
              (id:string)=>({
                playerId:id,
              })
            ),
        },

      },

    });


  return NextResponse.json({
    teamId: team.id,
  });

}
