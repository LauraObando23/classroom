import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../interfaces/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cursos';
  } 
  getCursos(): Observable<Curso[]>{
    /*const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Curso[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers: headers})*/
    return this.http.get<Curso[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
}
