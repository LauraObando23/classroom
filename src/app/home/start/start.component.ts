import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/interfaces/cursos';
import { User } from 'src/app/interfaces/user';
import { CursosService } from 'src/app/services/cursos.service';
import { UserService } from 'src/app/services/user.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  listUsers: User[] = []
  user: User={
    //id_user: '',
    name_user: '',
    email: '',
    tipo_usuario: '',
    numero_idt: '',
    password: ''
  }

  constructor(private _userService: UserService,
    private router: Router,
    private toastr: ToastrService){
  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
     this._userService.getUsers().subscribe(data => {
      this.listUsers = data;
      console.log(data);
    })
  }
  updateUsers(){
    console.log(this.user);
    /*this._userService.updateUsers(this.user).subscribe()*/
  }
  deleteUsers(numero_idt: String){
    this._userService.deleteUsers(numero_idt).subscribe(data => {
      console.log(data);
      this.getUsers();
      this.toastr.warning('Usuario eliminado','Eliminación');
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
      PDF.save('Usuarios.pdf');
    });
  }
}
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
