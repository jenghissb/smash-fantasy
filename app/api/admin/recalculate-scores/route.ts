import { NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function POST(req: Request) {

  const key =
    new URL(req.url).searchParams.get("key");


  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }


  const teams =
    await db.team.findMany({
      include: {
        players: {
          include: {
            player: true,
          },
        },
      },
    });


  for (const team of teams) {

    const totalScore =
      team.players.reduce(
        (sum, tp) =>
          sum + tp.player.score,
        0
      );


    await db.team.update({
      where: {
        id: team.id,
      },
      data: {
        score: totalScore,
      },
    });

  }


  return NextResponse.json({
    success: true,
    teamsUpdated: teams.length,
  });

}
