"use client";

import {useState} from "react";


export default function ImportPage(){


const [key,setKey]=useState("");
const [url,setUrl]=useState("");
const [result,setResult]=useState<any>();

async function doImport(){

 const res =
 await fetch(
  `/api/admin/import?key=${key}`,
  {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      url,
      mode:"import"
    })
  }
 );


 const text = await res.text();

 console.log("IMPORT RESPONSE:", text);

 const data = JSON.parse(text);
 
 alert(`Imported ${data.imported} players!`);

 window.location.href = "/build";
}

async function preview(){

 const res =
 await fetch(
  `/api/admin/import?key=${key}`,
  {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      url,
      mode:"preview"
    })
  }
 );


 const text = await res.text();

 console.log("PREVIEW RESPONSE:", text);

 try {
   setResult(JSON.parse(text));
 } catch {
   setResult({
     error:text || "Empty response"
   });
 }

}


return (

<div className="mx-auto max-w-4xl p-8">

<h1 className="text-3xl font-bold">
Import Tournament
</h1>


<input
className="mt-4 w-full rounded bg-zinc-900 p-3"
placeholder="Admin key"
value={key}
onChange={e=>setKey(e.target.value)}
/>


<input
className="mt-4 w-full rounded bg-zinc-900 p-3"
placeholder="SmashExplorer URL"
value={url}
onChange={e=>setUrl(e.target.value)}
/>


<button
onClick={preview}
className="mt-5 rounded-xl bg-purple-600 px-5 py-3"
>
Preview
</button>

{
 result?.count && (

<button
onClick={doImport}
className="mt-5 rounded-xl bg-red-600 px-5 py-3"
>
Replace Players + Import
</button>

)
}

{
result && (

<div className="mt-8">

Found:
{result.count} entrants


<div className="mt-5 space-y-2">

{
result.preview?.map(
(e:any)=>(
<div
key={e.entrantId}
className="rounded border p-3"
>

{e.gamertag}
-
Seed {e.seed}
-
${e.cost}

</div>
)
)
}

</div>

</div>

)

}


</div>

)

}
