import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TournamentMode } from '../enums/tournament-mode.enum';
import { TournamentType } from '../enums/tournament-type.enum';
import { Match } from '../models/match';
import { Score } from '../models/score';
import { Team } from '../models/team';
import { TeamTournament } from '../models/team-tournament';
import { Tournament } from '../models/tournament';
import { TournamentRounds } from '../enums/tournament-rounds.enum';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private tournament: Tournament;
  private json_teams: Array<Team>;
  private ids_teams: Array<string>;
  private resultsLeague: Array<TeamTournament>;
  constructor() {}

  private created = new BehaviorSubject<boolean>(false);
  public _created = this.created.asObservable();

  initializeTournament(
    _tournament: Tournament,
    ids_teams: Array<string> = [],
    allTeams: Array<Team>
  ) {
    this.json_teams = allTeams;
    this.tournament = _tournament;
    this.tournament.brackets = [];
    this.tournament.brackets_finals = [];
    this.ids_teams = ids_teams;
    this.getMaxRounds();
  }

  playTournament() {
    if (
      this.tournament.type == TournamentType.RANDOM &&
      this.tournament.mode == TournamentMode.FINALS
    )
      this.playTournamentFinals();
    else if (
      this.tournament.type == TournamentType.ARBITRARY &&
      this.tournament.mode == TournamentMode.FINALS
    ) {
      this.json_teams = this.json_teams.filter((z) => {
        if (this.ids_teams.includes(z.TeamID.toString())) return z;
      });
      this.playTournamentFinals();
    } else {
      if (this.tournament.type == TournamentType.ARBITRARY)
        this.json_teams = this.json_teams.filter((z) => {
          if (this.ids_teams.includes(z.TeamID.toString())) return z;
        });
      this.playTournamentLeague();
    }
    this.created.next(true);
  }

  public getTournament(): Tournament {
    return this.tournament;
  }

  private playTournamentLeague() {
    let index_teams = this.getIndexTeams();
    while (index_teams.length != this.tournament.num_teams)
      index_teams = this.getIndexTeams();
    let init_teams = index_teams.map((x: number) => {
      return <TeamTournament>{
        json_team: this.json_teams[x],
      };
    });
    // jornadas
    init_teams.forEach((home, idx) => {
      init_teams.forEach((away, i) => {
        if (idx < i)
          this.tournament.brackets.push(<Match>{ home: home, away: away });
        this.tournament.brackets.push(<Match>{ away: away, home: home });
      });
    });

    //partidos
    this.tournament.brackets.forEach(
      (match) => (match = this.playLeague(match))
    );
    let res_teams: Array<Match> = [];

    this.tournament.brackets.forEach((x: Match) => {
      let esta = false;
      res_teams.forEach((element: Match) => {
        if (x.home.json_team.TeamID == element.home.json_team.TeamID)
          esta = true;
      });
      if (!esta) res_teams.push(x);
    });
    res_teams.sort((a, b) => b.home.points - a.home.points);
    res_teams.forEach((x, idx) => (x.home.position = idx + 1));
    this.resultsLeague = res_teams.map((x) => x.home);
  }

  public getResultsLeague(): Array<TeamTournament> {
    return this.resultsLeague;
  }

  public getResultsFinals(): Array<Match> {
    return this.tournament.brackets_finals;
  }

  private playTournamentFinals() {
    this.updateBrackets(false, true);

    switch (this.tournament.num_teams) {
      case 16:
        this.tournament.brackets.map(
          (x) => (x.round = TournamentRounds.ROUND_OF_16)
        );
        this.tournament.brackets_finals.push(...this.tournament.brackets);
        this.updateBrackets();
        this.tournament.brackets.map(
          (x) => (x.round = TournamentRounds.QUARTER_FINAL)
        );
        this.tournament.brackets_finals.push(...this.tournament.brackets);
        this.updateBrackets();
        this.tournament.brackets.map(
          (x) => (x.round = TournamentRounds.SEMI_FINAL)
        );
        this.tournament.brackets_finals.push(...this.tournament.brackets);
        this.updateBrackets(true, false);
        this.tournament.brackets[1].round = TournamentRounds.BRONZE_FINAL;
        this.tournament.brackets[0].round = TournamentRounds.GOLD_FINAL;
        this.tournament.brackets_finals.push(...this.tournament.brackets);

        break;
      case 8:
        this.tournament.brackets.map(
          (x) => (x.round = TournamentRounds.QUARTER_FINAL)
        );
        this.tournament.brackets_finals.push(...this.tournament.brackets);
        this.updateBrackets();
        this.tournament.brackets.map(
          (x) => (x.round = TournamentRounds.SEMI_FINAL)
        );
        this.tournament.brackets_finals.push(...this.tournament.brackets);
        this.updateBrackets(true, false);
        this.tournament.brackets[1].round = TournamentRounds.BRONZE_FINAL;
        this.tournament.brackets[0].round = TournamentRounds.GOLD_FINAL;
        this.tournament.brackets_finals.push(...this.tournament.brackets);
        break;
      case 4:
        this.tournament.brackets.map(
          (x) => (x.round = TournamentRounds.SEMI_FINAL)
        );
        this.tournament.brackets_finals.push(...this.tournament.brackets);
        this.updateBrackets(true);
        this.tournament.brackets[1].round = TournamentRounds.BRONZE_FINAL;
        this.tournament.brackets[0].round = TournamentRounds.GOLD_FINAL;
        this.tournament.brackets_finals.push(...this.tournament.brackets);
        break;
      case 2:
        this.tournament.brackets[0].round = TournamentRounds.GOLD_FINAL;
        this.tournament.brackets_finals.push(...this.tournament.brackets);
        break;
      default:
        break;
    }
    //this.paintWinners();
  }

  private updateBrackets(finals = false, init = false) {
    if (init) {
      let index_teams = this.getIndexTeams();
      while (index_teams.length != this.tournament.num_teams)
        index_teams = this.getIndexTeams();
      let init_teams = index_teams.map(
        (x) => <TeamTournament>{ json_team: this.json_teams[x] }
      );
      init_teams.forEach((x, idx, arr) =>
        idx % 2 != 0
          ? this.tournament.brackets.push(<Match>{
              home: arr[idx - 1],
              away: x,
            })
          : ''
      );
    } else {
      let winner_teams = this.tournament.brackets.map((x) => x.winner);
      let losers_teams = this.tournament.brackets.map((x) => x.loser);
      this.tournament.brackets = [];
      finals
        ? winner_teams.concat(losers_teams).forEach((x, idx, arr) =>
            idx % 2 != 0
              ? this.tournament.brackets.push(<Match>{
                  home: arr[idx - 1],
                  away: x,
                })
              : ''
          )
        : winner_teams.forEach((x, idx) =>
            idx % 2 != 0
              ? this.tournament.brackets.push(<Match>{
                  home: winner_teams[idx - 1],
                  away: x,
                })
              : ''
          );
    }
    this.tournament.brackets.forEach((x) => (x = this.play(x)));
  }

  private getIndexTeams() {
    let index_teams = Array.from(
      { length: this.tournament.num_teams },
      () => ~~(Math.random() * this.json_teams.length)
    );
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

  private playLeague(match: Match): Match {
    let hScore = ~~(Math.random() * 5);
    let aScore = ~~(Math.random() * 5);
    match.score = { home_score: hScore, away_score: aScore };
    if (Math.max(hScore, aScore) == hScore) {
      match.home = this.setResult(match.home, 3, 1, 0, 0, hScore, aScore);
      match.away = this.setResult(match.away, 0, 0, 1, 0, hScore, aScore);
    } else if (Math.max(hScore, aScore) == aScore) {
      match.away = this.setResult(match.away, 3, 1, 0, 0, hScore, aScore);
      match.home = this.setResult(match.home, 0, 0, 1, 0, hScore, aScore);
    } else {
      match.away = this.setResult(match.away, 1, 0, 0, 1, hScore, aScore);
      match.home = this.setResult(match.home, 1, 0, 0, 1, hScore, aScore);
    }
    return match;
  }
  private play(match: Match): Match {
    let hScore = ~~(Math.random() * 5);
    let aScore = ~~(Math.random() * 5);

    match.score = <Score>{ home_score: hScore, away_score: aScore };
    if (hScore != aScore)
      Math.max(hScore, aScore) == hScore
        ? ((match.winner = match.home), (match.loser = match.away))
        : ((match.winner = match.away), (match.loser = match.home));
    else
      Math.random() > 0.5
        ? ((match.winner = match.home), (match.loser = match.away))
        : ((match.winner = match.away), (match.loser = match.home));
    return match;
  }

  private setResult(
    team: TeamTournament,
    points: number,
    win: number,
    loss: number,
    tie: number,
    fgoals: number,
    agoals: number
  ): TeamTournament {
    team = this.checkNan(team);
    team.points += points;
    team.win += win;
    team.loss += loss;
    team.tie += tie;
    team.fgoals += fgoals;
    team.agoals += agoals;
    return team;
  }

  private checkNan(team: TeamTournament): TeamTournament {
    team.points = isNaN(team.points) ? 0 : team.points;
    team.win = isNaN(team.win) ? 0 : team.win;
    team.loss = isNaN(team.loss) ? 0 : team.loss;
    team.tie = isNaN(team.tie) ? 0 : team.tie;
    team.fgoals = isNaN(team.fgoals) ? 0 : team.fgoals;
    team.agoals = isNaN(team.agoals) ? 0 : team.agoals;
    return team;
  }

  public filterBracketsByRound(
    round: TournamentRounds,
    matches: Array<Match>
  ): Array<Match> {
    return matches.filter((m) => m.round == round);
  }
}
