import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/interfaces/cursos';
import { Grupo } from 'src/app/interfaces/grupo';
import { CursosService } from 'src/app/services/cursos.service';
import { GrupoService } from 'src/app/services/grupo.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  listCurso: Curso[] = []

  constructor(private _cursosService: CursosService,
    private router: Router){
  }
  ngOnInit(): void {
    this.getCursos();
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
      PDF.save('Cursos.pdf');
    });
  }
}
 logOut(){
   localStorage.removeItem('token');
   this.router.navigate(['/login']);
 }
}
