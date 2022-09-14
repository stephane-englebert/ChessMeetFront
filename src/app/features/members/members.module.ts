import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../tools/auth/interceptor';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectButton, SelectButtonModule } from 'primeng/selectbutton';


@NgModule({
  declarations: [
    AddComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    ReactiveFormsModule,
    SelectButtonModule,
    FormsModule
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class MembersModule { }
