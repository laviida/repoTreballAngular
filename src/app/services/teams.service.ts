import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Team } from '../models/team';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teamsList:Array<Team>;
  private urlTeamsJson = "./assets/json/teams_players.json";

  constructor(private http:HttpClient) { }

  getAllTeams():Observable<Array<Team>>{
    return this.http.get<Array<Team>>(this.urlTeamsJson);
  }

  getTeam(id:Number):Observable<Team>{
    return this.http.get<Array<Team>>(this.urlTeamsJson).pipe(map(t=>t.find(p=>p.TeamID==id)));
  }
}
//TeamID
