import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { MenubarModule } from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { LoginComponent } from './login/login.component';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptor';

@NgModule({
  declarations: [  
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    MenubarModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class ToolsModule { }
