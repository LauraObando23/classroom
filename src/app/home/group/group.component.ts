import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/interfaces/cursos';
import { Grupo } from 'src/app/interfaces/grupo';
import { User } from 'src/app/interfaces/user';
import { CursosService } from 'src/app/services/cursos.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { group } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit{
  numero_idt: string = '';
  code: string = '';
  name_user: string = '';
  name:string = '';
  numero_i:Number;

  listGrupo: Grupo[] = []
  listUsers: User[] = []
  listCurso: Curso[] = []

// Formulario
  form!: FormGroup;
 

  constructor(private _grupoService: GrupoService,
    private _userService: UserService,
    private _cursosService: CursosService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private fb: FormBuilder){
      this.buildForm();
      this.form = this.fb.group({
        numero_i: ['', Validators.required]
      })
      this.numero_i = Number( aRouter.snapshot.paramMap.get('numero_idt'));
      console.log(this.numero_i);
    }
    filterPost = '';
    filterPostD = '';
  ngOnInit(): void {
    this.getGrupos();
  }
  getGrupos(){
    this._grupoService.getGrupos().subscribe(data => {
      this.listGrupo = data;
    })
  }
  updateGroup(){
    console.log();
    /*this._userService.updateUsers(this.user).subscribe(
      res
    )*/
  }
  deleteGroup(id_group: Number){
    this._grupoService.deleteGroup(id_group).subscribe(data => {
      console.log(data);
      this.getGrupos();
      this.toastr.warning('Grupo eliminado','Eliminación');
    })
  }
  getUsers(){
    this._userService.getUsers().subscribe(data => {
     this.listUsers = data;
     console.log(data);
   })
  }
  getCursos(){
  this._cursosService.getCursos().subscribe(data => {
   this.listCurso = data;
   console.log(data);
    })
  }
  @ViewChild('content',{static:false}) el!: ElementRef
  public openPDF(): void {{
    /*let pdf = new jsPDF()
    pdf.html(this.el.nativeElement, {
      callback:(pdf) => {
        pdf.save("Usuarios.pdf")
      }
    })*/
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Grupos.pdf');
    });
  }
}
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

// Formulario
  private buildForm(){
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      namecourse: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
    })
  }
  save(event:Event){
    event.preventDefault();
    const value=this.form.value;
    console.log(value)

  }
}
