import { Injectable } from '@angular/core';
import { CfTag } from '../models/cf-tag';
import { TournamentMode } from '../enums/tournament-mode.enum';
import { TournamentType } from '../enums/tournament-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ConversationalFormService {
  constructor() {}

  getTitleTag(): CfTag {
    return {
      tag: 'input',
      type: 'text',
      name: 'name',
      'cf-questions': 'Hola! Escribe el nombre del torneo. 😊',
      'cf-input-placeholder': 'Escribe un nombre ...',
    };
  }

  getNumTeamsTag(): CfTag {
    return {
      tag: 'fieldset',
      name: 'num_teams',
      'cf-questions':
        '{previous-answer}, es un nombre genial! Elige el el número de equipos para el torneo:',
      'cf-input-placeholder': 'Elige el número de equipos ...',
      children: this.getRadioTagsNumTeams(),
    };
  }

  private getRadioTagsNumTeams(): Array<CfTag> {
    let arr = [];
    [2, 4, 8, 16].forEach((n) => {
      arr.push({
        tag: 'input',
        type: 'radio',
        value: n.toString(),
        name: 'tournament_num_teams',
        'cf-label': n.toString(),
      });
    });
    return arr;
  }

  getModeTag(): CfTag {
    return {
      tag: 'fieldset',
      name: 'mode',
      'cf-questions':
        'Has elegido {previous-answer} equipos para el torneo! Elige el modo de torneo:',
      'cf-input-placeholder': 'Elige el modo de torneo ...',
      multiple: true,
      children: this.getRadioTagsMode(),
    };
  }
  private getRadioTagsMode(): Array<CfTag> {
    let arr = [];
    [
      { label: 'LEAGUE', value: TournamentMode.LEAGUE },
      { label: 'FINALS', value: TournamentMode.FINALS },
    ].forEach((x) => {
      arr.push({
        tag: 'input',
        type: 'radio',
        value: x.value,
        name: 'tournament_mode',
        'cf-label': x.label,
      });
    });
    return arr;
  }

  getTypeTag(): CfTag {
    return {
      tag: 'fieldset',
      name: 'type',
      'cf-questions':
        'Has elegido el modo {previous-answer}! Elige ahora el tipo de torneo:',
      'cf-input-placeholder': 'Elige el tipo de torneo ...',
      multiple: true,
      children: this.getRadioTagsType(),
    };
  }

  private getRadioTagsType(): Array<CfTag> {
    let arr = [];
    [
      { label: 'RANDOM', value: TournamentType.RANDOM },
      { label: 'ARBITRARY', value: TournamentType.ARBITRARY },
    ].forEach((x) => {
      arr.push({
        tag: 'input',
        type: 'radio',
        value: x.value,
        name: 'tournament_type',
        'cf-label': x.label,
      });
    });
    return arr;
  }
}
