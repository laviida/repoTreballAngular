import { Component, OnInit } from '@angular/core';
import * as news_json from '../../../assets/news.json';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  users: Array<any>;
  news: Array<any>;
  constructor() {}

  async ngOnInit() {
    this.news = Array.from(news_json['default']);//canviar per service
    this.users = [];

    var url = 'https://randomuser.me/api/?results=' + this.news.length;
    var response = await fetch(url);
    this.users = response.json()['results'];
    console.log(this.users);
  }
}
