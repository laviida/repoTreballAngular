import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationStart, Event, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private location: Location, private router: Router) {}

  private isTeamsPage = new BehaviorSubject<boolean>(null);
  public _isTeamsPage = this.isTeamsPage.asObservable();

  private actualRoute: String;

  updateActualRoute(): void {
    this.actualRoute = this.location.path().replace('/', '');
    this.isTeamsPage.next(this.actualRoute == 'teams');
  }

  onRouterChange() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
      }

      if (event instanceof NavigationEnd) {
        this.updateActualRoute();
      }
    });
  }
}
