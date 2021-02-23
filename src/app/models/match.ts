import { TeamTournament } from './team-tournament';
import { Score } from './score';
import { TournamentRounds } from '../enums/tournament-rounds.enum';

export interface Match {
  home: TeamTournament;
  away: TeamTournament;
  winner?: TeamTournament;
  loser?: TeamTournament;
  score?: Score;
  round?: TournamentRounds;
}
