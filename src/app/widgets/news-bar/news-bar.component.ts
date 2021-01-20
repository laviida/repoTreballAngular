import { Component, OnInit } from '@angular/core';
import * as news from '../../../assets/news.json';

@Component({
  selector: 'app-news-bar',
  templateUrl: './news-bar.component.html',
  styleUrls: ['./news-bar.component.scss'],
})
export class NewsBarComponent implements OnInit {
  constructor() {}
  news: Array<any>;

  ngOnInit(): void {
    this.news = Array.from(news['default']).slice(0, 10);
  }
}
