import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-news-bar',
  templateUrl: './news-bar.component.html',
  styleUrls: ['./news-bar.component.scss'],
})
export class NewsBarComponent implements OnInit {
  constructor(private serviceNews: NewsService) {}
  news: Array<News>;

  ngOnInit(): void {
    this.serviceNews
      .getAllNews()
      .subscribe((n) => (this.news = n.slice(0, 10)));
  }
}
