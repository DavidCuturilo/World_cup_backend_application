export class GetMatchesByRoundResponseDto {
  events: MatchesInfo[];
}

class MatchesInfo {
  tournament: {
    name: string;
  };
  roundInfo: {
    round: number;
    slug?: string;
  };
  customId: string;
  status: MatchStatus;
  winnerCode: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: Record<string, unknown>;
  awayScore: Record<string, unknown>;
  startTimestamp: number;
}

class MatchStatus {
  code: number;
  description: string;
  type: string;
}

class Team {
  id: number;
  name: string;
  shortName: string;
  userCode: string;
  ranking: number;
  nameCode: string;
  teamColors: TeamColors;
}

class TeamColors {
  primary: string;
  secondary: string;
  text: string;
}
