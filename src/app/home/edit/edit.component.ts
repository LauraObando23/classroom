import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  form: FormGroup;
  numero_i: number;

  constructor(private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService){
      this.form = this.fb.group({
        name_user: ['', Validators.required],
        email: ['', Validators.required],
        numero_idt: ['', Validators.required],
        tipo_usuario: ['', Validators.required],
        password: ['', Validators.required]
      })
      this.numero_i = Number( aRouter.snapshot.paramMap.get('numero_idt'));
      console.log(this.numero_i);
  }
  ngOnInit(): void {
    this.getOneUser(this.numero_i);
  }
  getOneUser(numero_i: number){
    this._userService.getOneUser(numero_i).subscribe(data => {
      console.log(data);
      this.form.setValue({
        name_user: data.name_user,
        email: data.email,
        numero_idt: data.numero_idt,
        tipo_usuario: data.tipo_usuario,
        password: ''
      })
    })
  }
  updateUsers(){
    const user: User={
        name_user: this.form.value.name_user,
        email: this.form.value.email,
        numero_idt: this.form.value.numero_idt,
        tipo_usuario: this.form.value.tipo_usuario,
        password: this.form.value.password
    }
    this._userService.updateUsers(this.numero_i, user).subscribe(() =>{
        this.toastr.info(`El usuario ${user.name_user} fue actualizado con exito`, 'Usuario actualizado');
        this.router.navigate(['/start']);
    })
  }
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
