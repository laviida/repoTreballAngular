import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './screens/register/register.component';
import { HomeComponent } from './screens/home/home.component';
import { NavigationBarComponent } from './widgets/navigation-bar/navigation-bar.component';
import { NewsBarComponent } from './widgets/news-bar/news-bar.component';
import { CountdownComponent } from './widgets/countdown/countdown.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavigationBarComponent,
    NewsBarComponent,
    CountdownComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
