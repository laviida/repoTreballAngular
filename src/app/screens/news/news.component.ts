import { Component, OnInit } from '@angular/core';
import { NewsUser } from 'src/app/models/news-user';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  users: Array<NewsUser>;
  news: Array<News>;
  constructor(private serviceNews: NewsService) {}

  ngOnInit() {
    this.serviceNews.getAllNews().subscribe((n) => {
      this.news = n;
      this.serviceNews.getAllUsers(this.news.length).subscribe((u) => {
        this.users = u['results'];
        this.news.forEach(
          (_new: News, i: number) => (_new.user = u['results'][i])
        );
      });
    });
  }
}
