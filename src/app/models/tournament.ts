import { TournamentMode } from '../enums/tournament-mode.enum';
import { TournamentType } from '../enums/tournament-type.enum';
import { Pair } from './pair';

export interface Tournament {
  mode: TournamentMode;
  type: TournamentType;
  num_teams: number;
  max_rounds: number;
  brackets: Array<Pair>;
}
