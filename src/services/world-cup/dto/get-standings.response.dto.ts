export class GetStandingsResponseDto {
  standings: StandingsInfo[];
}

class StandingsInfo {
  tournament: {
    name: string;
  };
  name: string;
  description: string;
  rows: TableStandings[];
  updatedAtTimestamp: number;
}

class TableStandings {
  team: TeamInfo;
  promotions: {
    text: string;
  };
  position: number;
  matches: number;
  wins: number;
  losses: number;
  draws: number;
  scoresFor: number;
  scoresAgainst: number;
  points: number;
  id: number;
}

class TeamInfo {
  name: string;
  shortName: string;
  ranking: number;
}
