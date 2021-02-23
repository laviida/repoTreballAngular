import { Team } from './team';

export interface TeamTournament {
  json_team: Team;
  points?: number;
  win?: number;
  loss?: number;
  tie?: number;
  fgoals?: number;
  agoals?: number;
  position?: number;
}
