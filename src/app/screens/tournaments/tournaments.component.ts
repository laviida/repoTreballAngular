import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
})
export class TournamentsComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    //this.router.navigate(["/create-tournament"]);
    $('#conversational-form').remove();
  }
}
