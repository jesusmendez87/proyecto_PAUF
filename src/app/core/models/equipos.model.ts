export interface Iequipo {
 _id: string;
  name: string;
  city: string;
  category: string;
  players: Array<{
    player_id: string;
    player_name: string;
    position: string;
    number: number;
  }>;
  sport: string;
}