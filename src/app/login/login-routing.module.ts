import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from '../home/start/start.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'Login', component: LoginComponent},
  {path:'start', component:StartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
