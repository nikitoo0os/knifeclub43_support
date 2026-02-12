import { Injectable } from '@angular/core';
import { URL } from '../classes/globals';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reference } from '../classes/reference';
import { ReservReference } from '../classes/reservreference';
import { ImgReference } from '../classes/imgreference';
import { Birthday } from '../classes/birthday';
import { ReservBlock } from '../classes/reservblock';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  constructor(private http: HttpClient) { }

  public getByReferenceId(idreference: number): Observable<any> {
    return this.http.get<any>(URL + 'reference/' + idreference);
  }

  public getAllReferences(): Observable<Reference[]> {
    return this.http.get<Reference[]>(URL + 'referenceslist');
  }

  public getAllReferencesReservation(date: string): Observable<any> {
    let params = new HttpParams()
    .set('date', date);
    return this.http.get<any>(URL + 'referenceslistreservation?token=' + localStorage.getItem('access_token'), {params});
  }

  public getAllReferencesForClient(): Observable<HttpResponse<Reference[]>> {
    return this.http.get<Reference[]>(URL + 'referenceslistclient', {observe: 'response'});
  }

  public getAllImage(): Observable<ImgReference[]> {
    return this.http.get<ImgReference[]>(URL + 'referencesimgall');
  }

  //МЕТОД ПОЛУЧЕНИЯ ВСЕХ БРОНЕЙ ЗА ОПРЕДЕЛЕННЫЙ ДЕНЬ
  public getAllReservReferencesByDate(date: string): Observable<ReservReference[]> {
    let params = new HttpParams()
    .set('date', date);
    return this.http.get<ReservReference[]>(URL + 'reservreferences?token=' + localStorage.getItem('access_token'), {params});
  }

    //МЕТОД ПОЛУЧЕНИЯ ВСЕХ БРОНЕЙ
  public getAllReservReferencesAll(): Observable<ReservReference[]> {
    return this.http.get<ReservReference[]>(URL + 'reservreferencesall?token=' + localStorage.getItem('access_token'));
  }

    public getTopReferences(): Observable<any> {
      return this.http.get<any>(URL + 'gettopreferences');
    }

    //МЕТОД ПОЛУЧЕНИЯ ВСЕХ БРОНЕЙ ЗА ОПРЕДЕЛЕННЫЙ ДЕНЬ АКТИВНЫХ БРОНЕЙ
    public getAllReservReferencesByDateActive(date: string): Observable<ReservReference[]> {
      let params = new HttpParams()
      .set('date', date);
      return this.http.get<ReservReference[]>(URL + 'reservreferencesactive?token=' + localStorage.getItem('access_token'), {params});
    }

  public getAllReservReferencesByStartDateAndEndDate(idreference: number): Observable<ReservReference[]> {
    let params = new HttpParams()
    .set('idReference', idreference);
    return this.http.get<ReservReference[]>(URL + 'reservreferencesperiod', {params});
  }

  //БРОНИРОВАНИЕ УСЛУГИ
  public reservReference(resReference : ReservReference, isClient: boolean) {
    const localTime = resReference.date?.getTime()!;
    const utcOffsetMinutes = resReference.date?.getTimezoneOffset()!;
    const utcTime = localTime - (utcOffsetMinutes * 60000);
    resReference.date = new Date(utcTime);
    if (!isClient) return this.http.post<boolean>(URL + 'reservReference?token=' + localStorage.getItem('access_token'), resReference);
    else return this.http.post<boolean>(URL + 'reservReferenceclient', resReference);
  }

  public saveReference(reference : Reference) {
    return this.http.post<Reference>(URL + 'addreference?token=' + localStorage.getItem('access_token'), reference);
  }

  public delReference(reference : Reference) {
    return this.http.post<Reference>(URL + 'delreference?token=' + localStorage.getItem('access_token'), reference);
  }

  public saveBirthday(birthday : Birthday) {
    return this.http.post<Birthday>(URL + 'addbirthday?token=' + localStorage.getItem('access_token'), birthday);
  }

  public delBirthday(birthday : Birthday) {
    return this.http.post<boolean>(URL + 'delbirthday?token=' + localStorage.getItem('access_token'), birthday);
  }

  public saveImgReference(imgreference : ImgReference) {
    return this.http.post<ImgReference>(URL + 'addimgreference?token=' + localStorage.getItem('access_token'), imgreference);
  }

  public delImgReference(imgreference : ImgReference) {
    return this.http.post<ImgReference>(URL + 'delimgreference?token=' + localStorage.getItem('access_token'), imgreference);
  }

  public getAllBirthdaysForClient(): Observable<Birthday[]> {
    return this.http.get<Birthday[]>(URL + 'birthdaysclient');
  }

  public getAllBirthdays(): Observable<Birthday[]> {
    return this.http.get<Birthday[]>(URL + 'birthdays');
  }

  public getAllReservBlocks(date: string): Observable<ReservBlock[]> {
    let params = new HttpParams()
    .set('date', date);
    return this.http.get<ReservBlock[]>(URL + 'getreservblocks?token=' + localStorage.getItem('access_token'), {params});
  }

  public saveReservBlock(reservBlock : ReservBlock) {
    const localTime = reservBlock.date?.getTime()!;
    const utcOffsetMinutes = reservBlock.date?.getTimezoneOffset()!;
    const utcTime = localTime - (utcOffsetMinutes * 60000);
    reservBlock.date = new Date(utcTime);
    return this.http.post<ReservBlock>(URL + 'addreservblock?token=' + localStorage.getItem('access_token'), reservBlock);
  }

  public delReservBlock(reservBlock : ReservBlock) {
    return this.http.post<ReservBlock>(URL + 'delreservblock?token=' + localStorage.getItem('access_token'), reservBlock);
  }

  public getDate(): Observable<any> {
    return this.http.get<any>(URL + 'getdate');
  }
}
