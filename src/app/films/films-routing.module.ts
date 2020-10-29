import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmMainComponent } from './film-main/film-main.component';


const routes: Routes = [

  { path: '', component: FilmMainComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
