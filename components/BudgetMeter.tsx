type Props = {
  used: number;
  max: number;
};


export default function BudgetMeter({
  used,
  max,
}: Props) {

  const remaining = max - used;

  return (
    <div className="rounded-xl border border-zinc-800 p-4">

      <div className="flex justify-between">
        <span>
          Budget
        </span>

        <span>
          {remaining} remaining
        </span>
      </div>


      <div className="mt-3 h-3 rounded-full bg-zinc-800">

        <div
          className="h-full rounded-full bg-purple-500"
          style={{
            width: `${Math.min((used / max) * 100, 100)}%`
          }}
        />

      </div>

    </div>
  );
}
