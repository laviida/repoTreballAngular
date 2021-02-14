import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {

  constructor(private teamsService:TeamsService) { }

  teams:Array<Team>

  ngOnInit(): void {
    this.teams=[];
    this.teamsService.getAllTeams().subscribe(
      t=>this.teams=t
    );    
  }

}
