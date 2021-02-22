import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TournamentMode } from '../enums/tournament-mode.enum';
import { TournamentType } from '../enums/tournament-type.enum';
import { Match } from '../models/match';
import { Score } from '../models/score';
import { Team } from '../models/team';
import { TeamTournament } from '../models/team-tournament';
import { Tournament } from '../models/tournament';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {

  tournament: Tournament;
  json_teams: Array<Team>;
  constructor() { }

  private created = new BehaviorSubject<boolean>(false);
  public _created = this.created.asObservable();

  initializeTournament(_tournament: Tournament, ids_teams: Array<string> = [], allTeams: Array<Team>) {
    this.json_teams = allTeams;
    this.tournament = _tournament;
    this.getMaxRounds();

    if (this.tournament.type == TournamentType.RANDOM && this.tournament.mode == TournamentMode.FINALS) this.playTournamentFinals();
    else if (this.tournament.type == TournamentType.ARBITRARY && this.tournament.mode == TournamentMode.FINALS) {
      this.json_teams = this.json_teams.filter(z => { if (ids_teams.includes(z.TeamID.toString())) return z; });
      this.playTournamentFinals();
    } else {
      if (this.tournament.type == TournamentType.ARBITRARY)
        this.json_teams = this.json_teams.filter(z => { if (ids_teams.includes(z.TeamID.toString())) return z; });
      this.playTournamentLeague();
    }
  }

  private playTournamentLeague() {
    let index_teams = this.getIndexTeams();
    while (index_teams.length != this.tournament.num_teams) index_teams = this.getIndexTeams();
    let init_teams = index_teams.map((x: number) => { return <TeamTournament>{ json_team: this.json_teams[x], setResult: this._setResult } });
    // jornadas
    init_teams.forEach((home, idx) => {
      init_teams.forEach((away, i) => {
        if (idx < i) this.tournament.brackets.push(<Match>{ home: home, away: away, playLeague: this._playLeague }); this.tournament.brackets.push(<Match>{ away: away, home: home, playLeague: this._playLeague });
      });
    });

    //partidos
    this.tournament.brackets.forEach(match => match.playLeague(match));
    let res_teams: Array<Match> = [];

    this.tournament.brackets.forEach((x: Match) => {
      let esta = false;
      res_teams.forEach((element: Match) => { if (x.home.json_team.TeamID == element.home.json_team.TeamID) esta = true; });
      if (!esta) res_teams.push(x);
    });
    res_teams.sort((a, b) => b.home.points - a.home.points);
    res_teams.forEach((x, idx) => x.home.position = (idx + 1));
    this.tournament_root_element.innerHTML += tournamentTable(res_teams.map(z => z.paintLeague()));

    // pulsar th para ordenar
    /*  document.getElementsByClassName('table-striped')[0].getElementsByTagName('th')[document.getElementsByClassName('table-striped')[0].getElementsByTagName('th').length - 1].addEventListener("click", () => {
          res_teams.sort((a, b) => a.home.data.points - b.home.data.points);
          this.tournament_root_element.innerHTML = tournamentTable(res_teams.map(z => z.paintLeague()));
          console.log("affa");
      });*/
  }

  private getIndexTeams() {
    let index_teams = Array.from({ length: this.tournament.num_teams }, () => ~~(Math.random() * this.json_teams.length));
    index_teams = Array.from(new Set(index_teams));
    return index_teams;
  }

  private getMaxRounds() {
    var count = 0;
    var value = this.tournament.num_teams;
    while (value >= 1) {
      value /= 2;
      count++;
    }
    this.tournament.max_rounds = count;
  }

  private _playLeague(match: Match) {
    let hScore = ~~(Math.random() * 5);
    let aScore = ~~(Math.random() * 5);
    match.score = { home_score: hScore, away_score: aScore };
    if (Math.max(hScore, aScore) == hScore) {
      match.home.setResult(3, 1, 0, 0, hScore, aScore);
      match.away.setResult(0, 0, 1, 0, hScore, aScore);
    } else if (Math.max(hScore, aScore) == aScore) {
      match.away.setResult(3, 1, 0, 0, hScore, aScore);
      match.home.setResult(0, 0, 1, 0, hScore, aScore);
    } else {
      match.away.setResult(1, 0, 0, 1, hScore, aScore);
      match.home.setResult(1, 0, 0, 1, hScore, aScore);
    }
  };

  private _setResult(team: TeamTournament, points: number, win: number, loss: number, tie: number, fgoals: number, agoals: number) {
    team.points += points;
    team.win += win;
    team.loss += loss;
    team.tie += tie;
    team.fgoals += fgoals;
    team.agoals += agoals;
  }
}
