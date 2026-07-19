"use client";

import { useMemo, useState } from "react";
import { scoreForPlacement } from "@/lib/scoring";

type Player = {
  id: string;
  gamertag: string;
  seed: number;
  placement: number | null;
  score: number;
};

export default function ScoreTable({
  players,
}: {
  players: Player[];
}) {

  const [adminKey, setAdminKey] = useState("");

  const [rows, setRows] = useState(
    players.map((p) => ({
      ...p,
      placement:
        p.placement?.toString() ?? "",
    }))
  );

  const [saving, setSaving] =
    useState(false);

  async function saveAll() {

    setSaving(true);

    for (const row of rows) {

      if (!row.placement) continue;

      await fetch(
        `/api/admin/player-score?key=${adminKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            playerId: row.id,
            placement: Number(
              row.placement
            ),
          }),
        }
      );

    }

await fetch(
  `/api/admin/recalculate-scores?key=${adminKey}`,
  {
    method: "POST",
  }
);

    setSaving(false);

    alert("Placements saved.");

  }

  const entered =
    useMemo(
      () =>
        rows.filter(
          (r) => r.placement !== ""
        ).length,
      [rows]
    );

  return (
    <>

      <input
        type="password"
        placeholder="Admin Key"
        value={adminKey}
        onChange={(e) =>
          setAdminKey(e.target.value)
        }
        className="mb-6 w-full rounded border p-3"
      />

      <div className="mb-4 text-sm text-zinc-500">
        {entered} / {rows.length} players entered
      </div>

      <table className="w-full border-collapse">

        <thead>

          <tr className="border-b">

            <th className="p-2 text-left">
              Seed
            </th>

            <th className="p-2 text-left">
              Player
            </th>

            <th className="p-2">
              Placement
            </th>

            <th className="p-2">
              Fantasy Points
            </th>

          </tr>

        </thead>

        <tbody>

          {rows.map((row, index) => (

            <tr
              key={row.id}
              className="border-b"
            >

              <td className="p-2">
                {row.seed}
              </td>

              <td className="p-2">
                {row.gamertag}
              </td>

              <td className="p-2">

                <input
                  type="number"
                  value={row.placement}
                  onChange={(e) => {

                    const copy =
                      [...rows];

                    copy[index].placement =
                      e.target.value;

                    setRows(copy);

                  }}
                  className="w-20 rounded border p-2"
                />

              </td>

              <td className="text-center">

                {scoreForPlacement(
                  Number(row.placement)
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <button
        onClick={saveAll}
        disabled={saving}
        className="mt-6 rounded bg-purple-600 px-5 py-3"
      >
        {saving
          ? "Saving..."
          : "Save All Placements"}
      </button>

    </>
  );
}
