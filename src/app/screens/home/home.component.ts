import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    document
      .getElementsByClassName('ca3-scroll-down-arrow')[0]
      .addEventListener('click', () =>
        window.scrollTo(0, document.body.scrollHeight)
      );
  }
}
