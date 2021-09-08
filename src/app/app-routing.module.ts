import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserformComponent } from './userform/userform.component';
import { ListofusersComponent } from './listofusers/listofusers.component';

const routes: Routes = [
  {
    path: 'userform',
    component: UserformComponent
  },
  {
    path: 'users',
    component: ListofusersComponent
  },
  {
    path: '**',
    component: ListofusersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
