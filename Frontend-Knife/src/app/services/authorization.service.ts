import { Injectable } from '@angular/core';
import { Role } from '../classes/role';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../classes/globals';
import { Person } from '../classes/person';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private roleapp : Roles = Roles.GUEST;

  constructor(private http: HttpClient) {}

  setUserRole(roleapp: Roles) {
    this.roleapp = roleapp;
  }

  getUserRole(): Roles {
    return this.roleapp;
  }

  getAuthorization() : boolean {
    return (this.roleapp != Roles.GUEST);
  }

  getAuthorizationAdmin() : boolean {
    return (this.roleapp == Roles.ADMIN);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(URL + 'roles');
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(URL + 'persons');
  }

  findToken(): Observable<any> {
    let params = new HttpParams()
    .set('token', localStorage.getItem('access_token')!);
    return this.http.get<boolean>(URL + 'gettoken', {params});
  }

  login(login: string, password: string): Observable<any> {
    let params = new HttpParams()
    .set('login', login)
    .set('password', password);
    return this.http.get(URL + 'loginuser', {params});
  }

  registration(person: Person) {
    return this.http.post<Person>(URL + 'registration?token=' + localStorage.getItem('access_token'), person);
  }

  public delPerson(person : Person) {
    return this.http.post<boolean>(URL + 'delperson?token=' + localStorage.getItem('access_token'), person);
  }
}

enum Roles {
  GUEST,
  TRENER,
  ADMIN
}
