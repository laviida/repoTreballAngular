import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';
import { TeamTournament } from 'src/app/models/team-tournament';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  results: Array<TeamTournament>;
  constructor(private t_service: TournamentService) {}

  ngOnInit(): void {
    this.results = this.t_service.getResultsLeague();
  }
}
