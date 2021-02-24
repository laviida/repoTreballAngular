import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewsUser } from '../models/news-user';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  private urlNewsJson = './assets/json/news.json';
  private urlNewsUsers = 'https://randomuser.me/api/?results=';

  getAllNews(): Observable<Array<News>> {
    return this.http.get<Array<News>>(this.urlNewsJson);
  }

  getAllUsers(len: number): Observable<Array<NewsUser>> {
    return this.http.get<Array<NewsUser>>(this.urlNewsUsers + len);
  }
}
