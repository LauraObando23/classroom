import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  form: FormGroup;
  numero_i: number;

  constructor(private _userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private aRouter: ActivatedRoute){
      this.form = this.fb.group({
        name_user: ['', Validators.required],
        email: ['', Validators.required],
        numero_idt: ['', Validators.required],
        tipo_usuario: ['', Validators.required]        
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
        tipo_usuario: data.tipo_usuario
      })
    })
  }
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
