import { TeamTournament } from './team-tournament';
import { Score } from './score';

export interface Match {
  home: TeamTournament;
  away: TeamTournament;
  winner?: TeamTournament;
  loser?: TeamTournament;
  score?: Score;
  playLeague?: Function;
}
