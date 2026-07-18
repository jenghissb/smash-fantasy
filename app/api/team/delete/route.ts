import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { browserId } = await req.json();

  const team = await db.team.findFirst({
    where: {
      browserId,
    },
  });

  if (!team) {
    return NextResponse.json({
      success: true,
    });
  }

  await db.teamPlayer.deleteMany({
    where: {
      teamId: team.id,
    },
  });

  await db.team.delete({
    where: {
      id: team.id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
