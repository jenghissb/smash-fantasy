export function getCostFromSeed(seed:number){

  const costs = [
    [1,250],
    [2,240],
    [3,220],
    [4,210],
    [5,190],
    [6,190],
    [7,170],
    [10,150],
    [13,140],
    [17,130],
    [25,120],
    [33,100],
    [43,90],
    [65,80],
    [75,70],
    [113,60],
    [150,50],
    [168,40],
    [184,30],
    [192,20],
    [204,10],
  ];


  for(const [maxSeed,cost] of costs){

    if(seed <= maxSeed){
      return cost;
    }

  }


  return 10;
}
