"use client";

import { useState } from "react";
import { getBrowserId } from "@/lib/browser-id";
import { useRouter } from "next/navigation";


export default function SubmitTeam({
  players,
}:{
  players:any[];
}) {


  const router = useRouter();


  const [teamName,setTeamName] =
    useState("");

  const [ownerTag,setOwnerTag] =
    useState("");

  const [error,setError] =
    useState("");


async function submit() {
  setError("");

  let response;
  let data;

  try {
    response = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teamName,
        ownerTag,
        browserId: getBrowserId(),
        playerIds: players.map((p) => p.id),
      }),
    });

    data = await response.json();
    console.log("Response data:", data);

  } catch (e) {
    console.error("Network or JSON parsing error:", e);
    setError("Something went wrong with the request.");
    return; // Stop execution if the fetch completely failed
  }

  if (!response || !response.ok) {
    setError(data?.error || `Server error: ${response?.status}`);
    return;
  }

  router.push(`/teams/${data.teamId}`);
}

  return (

    <div className="mt-8 rounded-xl border border-zinc-800 p-6">


      <h2 className="text-xl font-bold">
        Submit Team
      </h2>


      <input
        className="mt-4 w-full rounded bg-zinc-900 p-3"
        placeholder="Team name"
        value={teamName}
        onChange={
          e=>setTeamName(e.target.value)
        }
      />


      <input
        className="mt-3 w-full rounded bg-zinc-900 p-3"
        placeholder="Gamertag"
        value={ownerTag}
        onChange={
          e=>setOwnerTag(e.target.value)
        }
      />


      {
        error &&
        <p className="mt-3 text-red-400">
          {error}
        </p>
      }


      <button
        onClick={submit}
        className="mt-5 rounded-xl bg-purple-600 px-6 py-3"
      >
        Submit Team
      </button>


    </div>

  );

}
