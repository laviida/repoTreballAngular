import { Component, OnInit, Input } from '@angular/core';
import { TeamTournament } from 'src/app/models/team-tournament';

@Component({
  selector: '[app-table-item]',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss'],
})
export class TableItemComponent implements OnInit {
  constructor() {}

  @Input() team: TeamTournament;
  ngOnInit(): void {}
}
