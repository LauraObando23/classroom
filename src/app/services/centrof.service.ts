import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Centrofor} from '../interfaces/centrof';

@Injectable({
  providedIn: 'root'
})
export class CentrofService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/centro';
  } 
  newCenter(centrofor: Centrofor): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, centrofor);
  }
  getCentrofor(): Observable<Centrofor[]>{
    /*const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Curso[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers: headers})*/
    return this.http.get<Centrofor[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
}