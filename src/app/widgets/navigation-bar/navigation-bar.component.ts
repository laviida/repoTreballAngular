import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  isLogged: boolean;
  isTeamsPage: boolean;
  user: User;

  @Output() changeEvent = new EventEmitter<string>();

  constructor(
    private auth: AuthService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.auth._isLogged.subscribe((u) => {
      this.isLogged = u != null;
      this.user = u;
    });
    this.navigationService._isTeamsPage.subscribe(
      (b) => (this.isTeamsPage = b)
    );
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  change(key: string) {
    this.changeEvent.emit(key);
  }

  ngOnDestroy() {}
}
