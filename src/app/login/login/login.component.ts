import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService){

  }
  ngOnInit(): void {
    
  }
  logIn(){
    //Ingreso
    if(this.email == '' || this.password == ''){
      this.toastr.error('Todos los campos son obligatorios', 'ERROR');
      return;
    }
    //body
    const user: User={
      email: this.email,
      password: this.password,
      name_user: '',
      numero_idt: '',
      tipo_usuario: ''
    }
    this._userService.logIn(user).subscribe({
      next: (token) => {
        this.router.navigate(['/start']);
        localStorage.setItem('token', token);

        var tokenDecod = this._userService.getTokenDecoded();
        console.log(tokenDecod);
        var rol = tokenDecod["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        console.log(rol);
        if(rol=="True"){
          this._userService.Administrador = true;
          console.log("Administrador");
          this.router.navigate(['/start'])
        }else{
          this._userService.Administrador = false;
          console.log("Estudiante");
          this.router.navigate(['/start'])
        }
      },
      error: (e) => {
        this._errorService.mensajError(e);
      }
    })
  }
}
