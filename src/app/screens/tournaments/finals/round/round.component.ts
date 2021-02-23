import { Component, OnInit, Input } from '@angular/core';
import { TournamentRounds } from 'src/app/enums/tournament-rounds.enum';
import { Match } from 'src/app/models/match';

@Component({
  selector: '[app-round]',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss'],
})
export class RoundComponent implements OnInit {
  constructor() {}

  @Input() round: TournamentRounds;
  @Input() brackets: Array<Match>;

  title: string;
  ngOnInit(): void {
    console.log(this.brackets);
    switch (this.round) {
      case TournamentRounds.ROUND_OF_16:
        this.title = 'Round of 16';
        break;
      case TournamentRounds.QUARTER_FINAL:
        this.title = 'Quarter Final';
        break;
      case TournamentRounds.SEMI_FINAL:
        this.title = 'Semi Final';
        break;
      case TournamentRounds.BRONZE_FINAL:
        this.title = 'Bronze';
        break;
      case TournamentRounds.GOLD_FINAL:
        this.title = 'Gold';
        break;
      default:
        break;
    }
  }
}
