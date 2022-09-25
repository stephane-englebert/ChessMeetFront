import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './features/home/pages/index/index.component';

const routes: Routes = [
  {path: '', component: IndexComponent, pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
  {path: 'members', loadChildren: () => import('./features/members/members.module').then(m => m.MembersModule)},
  {path: 'tournaments', loadChildren: () => import('./features/tournaments/tournaments.module').then(m => m.TournamentsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
