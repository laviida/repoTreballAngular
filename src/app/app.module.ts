import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './screens/register/register.component';
import { HomeComponent } from './screens/home/home.component';
import { NavigationBarComponent } from './widgets/navigation-bar/navigation-bar.component';
import { NewsBarComponent } from './widgets/news-bar/news-bar.component';
import { AboutComponent } from './screens/about/about.component';
import { ContactComponent } from './screens/contact/contact.component';
import { NewsComponent } from './screens/news/news.component';
import { TeamsListComponent } from './screens/teams/teams-list/teams-list.component';
import { TeamsItemComponent } from './screens/teams/teams-item/teams-item.component';
import { TeamsService } from './services/teams.service';
import { HttpClientModule } from "@angular/common/http";
import { PlayersItemComponent } from './screens/players/players-item/players-item.component';
import { PlayersListComponent } from './screens/players/players-list/players-list.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MarkersService } from './services/markers.service';
import { LoginButtonDirective } from './directives/login-button.directive';
import { UsernamePipe } from './pipes/username.pipe';
import { ErrorStarDirective } from './directives/error-star.directive';
import { TournamentsComponent } from './screens/tournaments/tournaments.component';
import { ConversationalFormComponent } from './screens/tournaments/conversational-form/conversational-form.component';
import { TableComponent } from './screens/tournaments/league/table/table.component';
import { TableItemComponent } from './screens/tournaments/league/table-item/table-item.component';
import { FinalsComponent } from './screens/tournaments/finals/finals.component';
import { BracketComponent } from './screens/tournaments/finals/bracket/bracket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavigationBarComponent,
    NewsBarComponent,
    AboutComponent,
    ContactComponent,
    NewsComponent,
    TeamsListComponent,
    TeamsItemComponent,
    PlayersItemComponent,
    PlayersListComponent,
    LoginButtonDirective,
    UsernamePipe,
    ErrorStarDirective,
    TournamentsComponent,
    ConversationalFormComponent,
    TableComponent,
    TableItemComponent,
    FinalsComponent,
    BracketComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule,
    HttpClientModule, LazyLoadImageModule, LeafletModule, FormsModule],
  providers: [TeamsService, MarkersService],
  bootstrap: [AppComponent],
})
export class AppModule { }
