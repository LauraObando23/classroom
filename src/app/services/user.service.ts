import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Administrador?: boolean;
  numero_idt?: number;
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users';
  }
  getUsers(): Observable<User[]>{
    /*const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Curso[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers: headers})*/
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  signIn(user: User): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  logIn(user: User): Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user);
  }
  getOneUser(numero_idt: Number): Observable<User>{
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}/${numero_idt}`);
  }
  getOneUserN(name_user: String): Observable<User>{
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}/${name_user}`);
  }
  deleteUsers(numero_idt: String): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${numero_idt}`);
  }
  updateUsers(numero_idt: Number,user: User): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${numero_idt}`, user);
  }
  getTokenDecoded(): any {
    const helper = new JwtHelperService();
    const data = localStorage.getItem('token');
    if (data) {
      return helper.decodeToken(data);
    } else {
      return null;
    }
  }
}
