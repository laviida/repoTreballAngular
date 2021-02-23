import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';
import { Match } from 'src/app/models/match';
import * as _ from 'lodash';
import { TournamentRounds } from 'src/app/enums/tournament-rounds.enum';
@Component({
  selector: 'app-finals',
  templateUrl: './finals.component.html',
  styleUrls: ['./finals.component.scss'],
})
export class FinalsComponent implements OnInit {
  constructor(private t_service: TournamentService) {}
  matches: Array<Match>;

  roundOf16: TournamentRounds;
  quarterFinals: TournamentRounds;
  semiFinals: TournamentRounds;
  bronze: TournamentRounds;
  gold: TournamentRounds;

  roundOf16Array: Array<Match>;
  quarterFinalsArray: Array<Match>;
  semiFinalsArray: Array<Match>;
  bronzeArray: Array<Match>;
  goldArray: Array<Match>;

  ngOnInit(): void {
    this.matches = this.t_service.getResultsFinals();
    console.log(this.matches);

    this.roundOf16 = this.matches.find(
      (m) => m.round == TournamentRounds.ROUND_OF_16
    )
      ? TournamentRounds.ROUND_OF_16
      : null;
    this.quarterFinals = this.matches.find(
      (m) => m.round == TournamentRounds.QUARTER_FINAL
    )
      ? TournamentRounds.QUARTER_FINAL
      : null;
    this.semiFinals = this.matches.find(
      (m) => m.round == TournamentRounds.SEMI_FINAL
    )
      ? TournamentRounds.SEMI_FINAL
      : null;
    this.bronze = this.matches.find(
      (m) => m.round == TournamentRounds.BRONZE_FINAL
    )
      ? TournamentRounds.BRONZE_FINAL
      : null;
    this.gold = this.matches.find((m) => m.round == TournamentRounds.GOLD_FINAL)
      ? TournamentRounds.GOLD_FINAL
      : null;
    this.matches;
    this.roundOf16Array = this.t_service.filterBracketsByRound(
      TournamentRounds.ROUND_OF_16,
      this.matches
    );
    this.quarterFinalsArray = this.t_service.filterBracketsByRound(
      TournamentRounds.QUARTER_FINAL,
      this.matches
    );
    this.semiFinalsArray = this.t_service.filterBracketsByRound(
      TournamentRounds.SEMI_FINAL,
      this.matches
    );
    this.bronzeArray = this.t_service.filterBracketsByRound(
      TournamentRounds.BRONZE_FINAL,
      this.matches
    );
    this.goldArray = this.t_service.filterBracketsByRound(
      TournamentRounds.GOLD_FINAL,
      this.matches
    );
    console.log(this.bronzeArray);

    console.log(this.goldArray);
  }
}
