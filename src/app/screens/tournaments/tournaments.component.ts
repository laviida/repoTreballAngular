import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentService } from 'src/app/services/tournament.service';
import { TournamentMode } from 'src/app/enums/tournament-mode.enum';
import { Tournament } from 'src/app/models/tournament';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
})
export class TournamentsComponent implements OnInit {
  ngOnInit(): void {
    this._show = false;
    this.LEAGUE = TournamentMode.LEAGUE;
    this.FINALS = TournamentMode.FINALS;
    this.tournament;
    this.service._created.subscribe((c) => {
      this.created = c;
      this.tournament = this.service.getTournament();
      if (this.created) this.mode = this.tournament.mode;
    });
    $('#conversational-form').remove();
  }
  tournament: Tournament;
  created: boolean;
  mode: TournamentMode;
  LEAGUE: TournamentMode;
  FINALS: TournamentMode;
  _show: boolean;

  constructor(private router: Router, private service: TournamentService) {}

  create() {
    this.router.navigate(['/create-tournament']);
  }

  show() {
    this._show = !this._show;
  }
}
