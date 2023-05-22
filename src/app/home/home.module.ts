import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { StartComponent } from './start/start.component';
import { LoginModule } from '../login/login.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { GroupComponent } from './group/group.component';
import { CursosComponent } from './cursos/cursos.component';
import { FormsModule } from '@angular/forms';
import { CentrofComponent } from './centrof/centrof.component';
import { EditComponent } from './edit/edit.component';
import { EditgroupComponent } from './editgroup/editgroup.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { FichaComponent } from './ficha/ficha.component';

@NgModule({
  declarations: [
    StartComponent,
    GroupComponent,
    CursosComponent,
    CentrofComponent,
    EditComponent,
    EditgroupComponent,
    FilterPipe,
    FichaComponent,
  ],
  exports:[
    StartComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LoginModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
