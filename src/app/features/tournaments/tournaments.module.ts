import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentsRoutingModule } from './tournaments-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { AddComponent } from './pages/add/add.component';
import { ToolsModule } from '../tools/tools.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../tools/auth/interceptor';


@NgModule({
  declarations: [
    IndexComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    ToolsModule,
    TableModule,
    ButtonModule,
    TooltipModule
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class TournamentsModule { }
