import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogMainComponent } from './catalog-main/catalog-main.component';

const routes: Routes = [

  { path: '', component: CatalogMainComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
