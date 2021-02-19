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

@Component({
  selector: 'app-conversational-form',
  templateUrl: './conversational-form.component.html',
  styleUrls: ['./conversational-form.component.scss'],
})
export class ConversationalFormComponent implements OnInit {
  @ViewChild('tournament_form') myCF: ElementRef;
  cf: any;
  teams: Array<Team>;
  @Output() tournamentEventEmitter = new EventEmitter<Tournament>();

  constructor(
    private serviceTeams: TeamsService,
    private serviceCf: ConversationalFormService
  ) {}

  ngOnInit(): void {
    this.serviceTeams.getAllTeams().subscribe((t) => {
      this.teams = t;
      this.cf = ConversationalForm.startTheConversation({
        options: {
          userImage: 'assets/img/user.png',
          robotImage: 'assets/img/MLB_logo.png',
          submitCallback: () => {
            var formData = this.cf.getFormData(true);
            console.log(formData);

            //this.tournamentEventEmitter.emit();
            /*tournament = new Tournament(
            formDataSerialized.tournament_type[0],
            formDataSerialized.tournament_mode[0],
            parseInt(formDataSerialized.tournament_num_teams[0]),
            document.getElementById("classification")
          );
          tournament.createTournament(formDataSerialized.teams);*/

            this.cf.addRobotChatResponse('Torneo creado correctamente.');
          },
          flowStepCallback: async (
            dto: any,
            success: Function,
            error: Function
          ) => {
            let data = this.cf.getFormData(true);
            console.log(this.cf);

            if (
              dto.tag.name == 'tournament_type' &&
              dto.tag.value[0] == TournamentType.ARBITRARY
            ) {
              let children = [];
              children = t.map((x) => {
                let child = {};
                child['cf-label'] = x.Name;
                child['value'] = x.TeamID;
                child['cf-image'] = x.WikipediaLogoUrl;
                return child;
              });
              console.log(children[0]);

              this.cf.addTags([
                {
                  tag: 'select',
                  name: 'teams',
                  'cf-questions':
                    'Elige los equipos que participarán en el torneo',
                  'cf-input-placeholder': 'Filtrar equipos ...',
                  multiple: true,
                  children: children,
                },
              ]);
            } else if (dto.tag.name == 'teams') {
              if (dto.tag.value.length == data.tournament_num_teams)
                return success();
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
      console.log(this.cf);
    });
  }
}
