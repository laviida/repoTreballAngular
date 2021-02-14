import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private urlUsersJson = "./assets/json/users.json";

  private logged = new BehaviorSubject<User>(null);
  public _isLogged = this.logged.asObservable();

  register(user: User) {
    //se guardaría en la base de datos
  }

  login(user: User): Observable<User> {
    return this.http.get<Array<User>>(this.urlUsersJson).pipe(map(u => u.find(u => user.username == u.username && user.password == u.password)));
  }

  remember(user: User) {
    localStorage.setItem("remember", JSON.stringify(user));
  }

  notremember() {
    localStorage.removeItem("remember");
  }

  getRemember(): User {
    var user = JSON.parse(localStorage.getItem("remember"));
    return user != null ? user : { username: "", password: "", remember: false };
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLogged(): boolean {
    this.logged.next(null != localStorage.getItem('token') ? this.getRemember() : null);
    return null != localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

}
