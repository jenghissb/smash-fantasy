import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const db = new PrismaClient({
  adapter,
});

async function main() {
  const count = await db.tournament.count();
  console.log("Tournament count:", count);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
