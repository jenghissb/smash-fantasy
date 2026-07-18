import Link from "next/link";


export default function TournamentHeader({
  tournament,
}: {
  tournament:{
    name:string;
    bracketUrl:string|null;
  }
}) {

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

      <h1 className="text-2xl font-bold">
        {tournament.name}
        <span className="ml-3 text-purple-400">
          Fantasy
        </span>
      </h1>


      <p className="mt-2 text-zinc-400">
        Draft your roster. Stay under budget.
        Score points based on tournament results.
      </p>

      {
        tournament.startggUrl &&
        <Link
          href={tournament.startggUrl}
          target="_blank"
          className="mt-6 inline-block rounded-xl border border-zinc-700 px-5 py-3"
        >
          View Bracket ↗
        </Link>
      }


    </section>
  );
}
