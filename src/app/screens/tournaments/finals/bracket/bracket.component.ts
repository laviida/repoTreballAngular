import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/models/match';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss'],
})
export class BracketComponent implements OnInit {
  constructor() {}

  @Input() bracket: Match;
  ngOnInit(): void {}
}
