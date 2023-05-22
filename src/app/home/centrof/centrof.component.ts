import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Centrofor } from 'src/app/interfaces/centrof';
import { CentrofService } from 'src/app/services/centrof.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-centrof',
  templateUrl: './centrof.component.html',
  styleUrls: ['./centrof.component.css']
})
export class CentrofComponent implements OnInit {
  listCentro: Centrofor[] = []

  centro: string = '';
  direccion: string = '';
  sede: string = '';
  numero_comunicacion: string = '';

  constructor(private router: Router,
              private _centrofService: CentrofService,
              private toastr: ToastrService,
              private _errorService: ErrorService){
  }

  ngOnInit(): void {
    this.getCentrofor();
  }
  getCentrofor(){
    this._centrofService.getCentrofor().subscribe(data => {
     this.listCentro = data;
     console.log(data);
   })
  }
  newCenter() {
    //validar llenado
    if (this.centro == '' || this.direccion == '' || this.sede == '' || this.numero_comunicacion == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    //crear body
    const centrofor: Centrofor={
       centro: this.centro,
       direccion: this.direccion,
       sede: this.sede,
       numero_comunicacion: this.numero_comunicacion
    }

    this._centrofService.newCenter(centrofor).subscribe({
      next: (v) => {
        this.toastr.success(`Centro ${this.centro} registrado`, 'EXITO');
        this.router.navigate(['/centrof']);
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
