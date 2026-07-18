export type FantasyPlayer = {
  id: string;
  gamertag: string;
  avatarUrl?: string | null;
  seed?: number | null;
  cost: number;
  points?: number;
};


export type FantasyTeam = {
  id: string;
  teamName: string;
  ownerTag: string;
  score: number;
  players: FantasyPlayer[];
};
