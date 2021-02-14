import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-teams-item',
  templateUrl: './teams-item.component.html',
  styleUrls: ['./teams-item.component.scss']
})
export class TeamsItemComponent implements OnInit {

  constructor() { }

  @Input() team: Team;

  ngOnInit(): void {
  }

}
