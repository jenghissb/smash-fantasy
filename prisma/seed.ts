import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});


const db = new PrismaClient({
  adapter,
});


const players = [
  ["FalconMaster", 1, 250],
  ["BlueFox", 3, 220],
  ["Toast", 5, 190],
  ["Scoob", 7, 170],
  ["Nova", 10, 150],
  ["Pixel", 13, 140],
  ["Shadow", 17, 130],
  ["Raptor", 25, 120],
  ["Cloud", 33, 100],
  ["Echo", 43, 90],
  ["Knight", 65, 80],
  ["Bolt", 75, 70],
  ["Spark", 113, 60],
  ["Mini", 150, 50],
];


async function main() {

  await db.teamPlayer.deleteMany();
  await db.team.deleteMany();
  await db.player.deleteMany();
  await db.tournament.deleteMany();

  const tournament = await db.tournament.create({
    data: {
      name: "Smash Fantasy Demo Tournament",
      bracketUrl: "https://start.gg",
      budget: 1600,
      maxRosterSize: 12,
    },
  });


  for (const [gamertag, seed, cost] of players) {

    await db.player.create({
      data: {
        tournamentId: tournament.id,
        entrantId: `demo-${gamertag}`,
        gamertag,
        seed,
        cost,
      },
    });

  }


  console.log("Seed complete!");
}


main()
  .catch(console.error)
  .finally(() => db.$disconnect());
