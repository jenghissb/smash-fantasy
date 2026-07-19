import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { scoreForPlacement } from "@/lib/scoring";

export async function POST(req: Request) {

  const key =
    new URL(req.url).searchParams.get("key");

  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const {
    playerId,
    placement,
  } = await req.json();

  await db.player.update({

    where: {
      id: playerId,
    },

    data: {
      placement: Number(placement),
      score: scoreForPlacement(Number(placement)),
    },

  });

  return NextResponse.json({
    success: true,
  });

}
