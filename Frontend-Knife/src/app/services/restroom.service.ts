import { Injectable } from '@angular/core';
import { URL } from '../classes/globals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restroom } from '../classes/restroom';
import { ReservRestroom } from '../classes/reservrestroom';

@Injectable({
  providedIn: 'root'
})
export class RestroomService {

  constructor(private http: HttpClient) { }

  public getAllRestrooms(): Observable<Restroom[]> {
    return this.http.get<Restroom[]>(URL + 'restrooms');
  }

  public saveRestroom(restroom : Restroom) {
    return this.http.post<Restroom>(URL + 'addrestroom?token=' + localStorage.getItem('access_token'), restroom);
  }

  public delRestroom(restroom : Restroom) {
    return this.http.post<boolean>(URL + 'delrestroom?token=' + localStorage.getItem('access_token'), restroom);
  }

  public delReservRestroom(reservrestroom : ReservRestroom) {
    return this.http.post<boolean>(URL + 'delreservrestroom?token=' + localStorage.getItem('access_token'), reservrestroom);
  }

  //БРОНИРОВАНИЕ КОМНАТЫ ОТДЫХА
  public reservRestroom(resRestroom : ReservRestroom) {
    const localTime = resRestroom.date?.getTime()!;
    const utcOffsetMinutes = resRestroom.date?.getTimezoneOffset()!;
    const utcTime = localTime - (utcOffsetMinutes * 60000);
    resRestroom.date = new Date(utcTime);
    return this.http.post<ReservRestroom>(URL + 'addreservrestroom?token=' + localStorage.getItem('access_token'), resRestroom);
  }

  //ПОЛУЧЕНИЕ ВСЕХ ЗАБРОНИРОВАННЫХ КОМНАТ ПО ДАТЕ
  public getAllReservRestroomsByDate(date: string): Observable<ReservRestroom[]> {
    let params = new HttpParams()
    .set('date', date);
    return this.http.get<ReservRestroom[]>(URL + 'reservrestrooms?token=' + localStorage.getItem('access_token'), {params});
  }
}
