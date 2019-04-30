import { NgModule } from '@angular/core';


import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, UsersComponent],
  imports: [
    SharedModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
