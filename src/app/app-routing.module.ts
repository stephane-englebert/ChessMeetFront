import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'members', loadChildren: () => import('./features/members/members.module').then(m => m.MembersModule)},
  {path: 'tournaments', loadChildren: () => import('./features/tournaments/tournaments.module').then(m => m.TournamentsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
