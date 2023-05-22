import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grupo } from '../interfaces/grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/grupos';
  } 
  getGrupos(): Observable<Grupo[]>{
    /*const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Curso[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers: headers})*/
    return this.http.get<Grupo[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
  deleteGroup(id_group: Number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id_group}`);
  }
  updateGroup(id_group: Number,grupo: Grupo): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id_group}`, grupo);
  }
  getOneGroup(id_group: Number): Observable<Grupo>{
    return this.http.get<Grupo>(`${this.myAppUrl}${this.myApiUrl}/${id_group}`);
  }

  //FILTROS
  getGNid(numero_idt: Number): Observable<Grupo>{
    return this.http.get<Grupo>(`${this.myAppUrl}${this.myApiUrl}/filterid/${numero_idt}`);
  }
  getGNc(): Observable<Grupo[]>{
    return this.http.get<Grupo[]>(`${this.myAppUrl}${this.myApiUrl}/filternc`)
  }
  getGName(): Observable<Grupo[]>{
    return this.http.get<Grupo[]>(`${this.myAppUrl}${this.myApiUrl}/filternu`)
  }
  getGCc(): Observable<Grupo[]>{
    return this.http.get<Grupo[]>(`${this.myAppUrl}${this.myApiUrl}/filtercc`)
  }
}