import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/interfaces/cursos';
import { Grupo } from 'src/app/interfaces/grupo';
import { CursosService } from 'src/app/services/cursos.service';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.component.html',
  styleUrls: ['./editgroup.component.css']
})
export class EditgroupComponent implements OnInit {
  form: FormGroup;
  id_group: number;
  listCurso: Curso[] = []

  constructor(private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private _grupoService: GrupoService,
    private _cursosService: CursosService,
    private router: Router,
    private toastr: ToastrService){
      this.form = this.fb.group({
        id_group:['', Validators.required],
        group: ['', Validators.required],
        cursoId: ['', Validators.required],
        userIdUser: ['', Validators.required]
      })
    this.id_group = Number( aRouter.snapshot.paramMap.get('id_group'));
    console.log(this.id_group);
  }

  ngOnInit(): void {
    this.getOneGroup(this.id_group);
    this.getCursos();
  }
  getOneGroup(id_group: number){
    this._grupoService.getOneGroup(id_group).subscribe(data => {
      console.log(data);
      this.form.setValue({
        id_group: data.id_group,
        group: data.group,
        cursoId: data.cursoId,
        userIdUser: data.userIdUser
      })
    })
  }
  updateGroup(){
    const grupo: Grupo={
        id_group: this.form.value.id_group,
        group: this.form.value.group,
        cursoId: this.form.value.cursoId,
        userIdUser: this.form.value.userIdUser,
        name_user: '',
        name: '',
        numero_idt: '',
        code:''
      }
    this._grupoService.updateGroup(this.id_group, grupo).subscribe(() =>{
        this.toastr.info(`El grupo ${grupo.group} fue actualizado con exito`, 'Grupo actualizado');
        this.router.navigate(['/group']);
    })
  }
  getCursos(){
    this._cursosService.getCursos().subscribe(data => {
     this.listCurso = data;
     console.log(data);
   })
  }
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
