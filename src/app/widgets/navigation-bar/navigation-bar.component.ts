import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})

export class NavigationBarComponent implements OnInit, OnDestroy {

  isLogged: boolean;
  user: User;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth._isLogged.subscribe(u => {
      this.isLogged = u != null;
      this.user = u;

    })
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
  }

}
