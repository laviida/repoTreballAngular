import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  tournament: Tournament;
  constructor() {}

  initializeTournament(_tournament: Tournament) {}
}
