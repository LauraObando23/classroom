import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';
import { User } from '../interfaces/user';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
  
  user: User={
    //id_user: '',
    name_user: '',
    email: '',
    tipo_usuario: '',
    numero_idt: '',
    password: ''
  }
  constructor(private router: Router, private _errorService: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token')
    if(token){
      request = request.clone({ setHeaders:  { Authorization: `Bearer ${token}`} })
    }
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse) => {
        if(error.status == 401){
          this._errorService.mensajError(error)
          this.router.navigate(['/login'])
        }
        return throwError(() => error);
      })
    );
  }
}
