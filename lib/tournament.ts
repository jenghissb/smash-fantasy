import { db } from "./db";


export async function getDemoTournament() {

  return db.tournament.findFirst({
    include: {
      players: {
        orderBy: {
          seed: "asc",
        },
      },
    },
  });

}
