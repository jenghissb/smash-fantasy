import * as cheerio from "cheerio";


export type ImportedEntrant = {

  entrantId:string;

  gamertag:string;

  seed:number;

  location:string;

  startggUrl:string;

};

export type SmashImportResult = {

  tournamentId:string;

  tournamentName?:string;

  eventName?:string;

  startggUrl?:string;

  entrants: ImportedEntrant[];

};


export async function scrapeEntrants(
  url:string
):Promise<SmashImportResult> {


  const response =
    await fetch(url);


  if(!response.ok){

    throw new Error(
      "Could not fetch SmashExplorer page"
    );

  }


  const html =
    await response.text();


  const $ =
    cheerio.load(html);


  const entrants:ImportedEntrant[]=[];



  $("#entrantsTable tr")
    .slice(1)
    .each((_,row)=>{


      const cells =
        $(row).find("td");


      if(cells.length < 3){
        return;
      }


      const seed =
        Number(
          $(cells[0])
          .text()
          .trim()
        );


      const link =
        $(cells[2])
        .find("a");


      const gamertag =
        link.text().trim();


      const href =
        link.attr("href");


      const entrantId =
        $(row).attr("id");



      if(
        entrantId &&
        gamertag
      ){

        entrants.push({

          entrantId,

          gamertag,

          seed,

          location:
            $(cells[3])
            .text()
            .trim(),

          startggUrl:
            href ?? "",

        });

      }


    });


  return {

   tournamentId:
     $("#EventId").val()?.toString()
     ??
     url.match(/SelectEntrants\/(\d+)/)?.[1]
     ??
     "",

  
   tournamentName:
     $(".jumbotron h3")
     .text()
     .trim(),


   startggUrl:
     $(".jumbotron a")
     .attr("href"),


   entrants

  };

}
