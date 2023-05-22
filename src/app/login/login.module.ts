import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from '../home/home.module';
import { HomeRoutingModule } from '../home/home-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { PasswordResetComponent } from './password-reset/password-reset.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignInComponent,
    PasswordResetComponent
  ],
  imports:[
    CommonModule,
    LoginRoutingModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule
  
  ],
  exports:[
    LoginComponent
  ]
})
export class LoginModule { }
