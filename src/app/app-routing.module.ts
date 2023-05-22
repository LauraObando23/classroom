import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { StartComponent } from './home/start/start.component';
import { AuthGuard } from './utils/auth.guard';
import { GroupComponent } from './home/group/group.component';
import { CursosComponent } from './home/cursos/cursos.component';
import { CentrofComponent } from './home/centrof/centrof.component';
import { EditComponent } from './home/edit/edit.component';
import { EditgroupComponent } from './home/editgroup/editgroup.component';
import { PasswordResetComponent } from './login/password-reset/password-reset.component';
import { FichaComponent } from './home/ficha/ficha.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'login', component:LoginComponent  },
  {path:'start', component:StartComponent, canActivate: [AuthGuard]},
  {path:'signIn', component:SignInComponent, canActivate: [AuthGuard]},
  {path:'group', component:GroupComponent},
  {path:'cursos', component:CursosComponent},
  {path:'centrof', component:CentrofComponent},
  {path:'edit/:numero_idt', component:EditComponent, canActivate: [AuthGuard]},
  {path:'editgroup/:id_group', component:EditgroupComponent, canActivate: [AuthGuard]},
  {path:'ficha/:numero_idt', component:FichaComponent, canActivate: [AuthGuard]},
  {path:'password-reset', component:PasswordResetComponent},
  {path:'**', redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
