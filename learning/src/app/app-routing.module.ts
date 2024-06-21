import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/cours/list/list.component';
import { AddcoursComponent } from './components/cours/addcours/addcours.component';
import { UpdatecoursComponent } from './components/cours/updatecours/updatecours.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'addcours', component: AddcoursComponent },
  { path: 'update-cours', component: UpdatecoursComponent },
  { path: 'list-cours', component: ListComponent },
  { path: '', redirectTo: '/list-cours', pathMatch: 'full' },
  { path: '**', redirectTo: '/list-cours' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
