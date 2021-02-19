import { TournamentMode } from '../enums/tournament-mode.enum';
import { TournamentType } from '../enums/tournament-type.enum';
import { Match } from './match';

export interface Tournament {
  mode: TournamentMode;
  type: TournamentType;
  num_teams: number;
  max_rounds?: number;
  brackets?: Array<Match>;
}
