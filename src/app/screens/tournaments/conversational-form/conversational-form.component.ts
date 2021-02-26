import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { ConversationalForm, EventDispatcher } from 'conversational-form';
import { TeamsService } from 'src/app/services/teams.service';
import { TournamentType } from 'src/app/enums/tournament-type.enum';
import { Team } from 'src/app/models/team';
import { ConversationalFormService } from 'src/app/services/conversational-form.service';
import { Tournament } from 'src/app/models/tournament';
import { Router } from '@angular/router';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-conversational-form',
  templateUrl: './conversational-form.component.html',
  styleUrls: ['./conversational-form.component.scss'],
})
export class ConversationalFormComponent implements OnInit {
  @ViewChild('tournament_form') myCF: ElementRef;
  cf: any;
  teams: Array<Team>;

  constructor(
    private serviceTeams: TeamsService,
    private serviceCf: ConversationalFormService,
    private router: Router,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    var dispatcher = new EventDispatcher();

    dispatcher.addEventListener(
      'cf-flow-update',
      function (event) {
        console.log('update', event);
      },
      false
    );
    this.serviceTeams.getAllTeams().subscribe((t) => {
      this.teams = t;
      this.cf = ConversationalForm.startTheConversation({
        eventDispatcher: dispatcher,
        options: {
          theme: 'dark',
          userImage: 'assets/img/user.png',
          robotImage: 'assets/img/MLB_logo.png',
          submitCallback: () => {
            var formData = this.cf.getFormData(true);
            this.tournamentService.initializeTournament(
              {
                name: formData.name,
                mode: formData['mode'][0],
                num_teams: parseInt(formData.num_teams[0]),
                type: formData.type[0],
              },
              formData.teams,
              this.teams
            );
            this.tournamentService.playTournament();
            this.router.navigate(['/tournaments']);
            this.cf.addRobotChatResponse('Torneo creado correctamente.');
          },
          flowStepCallback: async (
            dto: any,
            success: Function,
            error: Function
          ) => {
            let data = this.cf.getFormData(true);
            if (
              dto.tag.name == 'type' &&
              dto.tag.value[0] == TournamentType.ARBITRARY
            )
              this.cf.addTags(this.serviceCf.getTeamsTag(this.teams));
            else if (dto.tag.name == 'teams') {
              if (dto.tag.value.length == data.num_teams) return success();
              else return error();
            }
            return success();
          },
        },
        tags: [
          this.serviceCf.getTitleTag(),
          this.serviceCf.getNumTeamsTag(),
          this.serviceCf.getModeTag(),
          this.serviceCf.getTypeTag(),
        ],
      });
    });
  }
}
