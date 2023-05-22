import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  name_user: string = '';
  email: string = '';
  numero_idt: string = '';
  tipo_usuario: string = '';
  password: string = ''; 
  confirmPassword: string = '';

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService){

  }
  ngOnInit(): void{

  }
  addUser() {
    //validar llenado
    if (this.name_user == '' || this.email == '' || this.numero_idt == '' || this.tipo_usuario == '' || this.password == '' || this.confirmPassword == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    //validar contraseñas
    if(this.password != this.confirmPassword){
      this.toastr.error('Las contraseñas no coinciden', 'ERROR');
      return;
    }
    //crear body
    const user: User={
       name_user: this.name_user,
       email: this.email,
       numero_idt: this.numero_idt,
       tipo_usuario: this.tipo_usuario,
       password: this.password
    }

    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.toastr.success(`Usuario ${this.name_user} registrado`, 'EXITO');
        this.router.navigate(['/start']);
      },
      error: (e) => {
        this._errorService.mensajError(e);
      }
    })
  }
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
