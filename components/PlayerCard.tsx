type Props = {
  player: {
    id: string;
    gamertag: string;
    seed: number | null;
    cost: number;
  };

  selected: boolean;

  onToggle: () => void;
};


export default function PlayerCard({
  player,
  selected,
  onToggle,
}: Props) {


  return (
    <button
      onClick={onToggle}
      className={`
        rounded-xl border p-4 text-left
        transition
        ${selected
          ? "border-purple-500 bg-purple-950"
          : "border-zinc-800 hover:border-zinc-600"
        }
      `}
    >

      <div className="font-semibold">
        {player.gamertag}
      </div>


      <div className="mt-2 text-sm text-zinc-400">

        Seed #{player.seed}

        <br />

        Cost: {player.cost}

      </div>


    </button>
  );
}
