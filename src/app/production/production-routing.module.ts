import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionMainComponent } from './production-main/production-main.component';
import { OrderDetailsComponent, OrderResolver } from './order-details/order-details.component';


const routes: Routes = [
  { path: '', component: ProductionMainComponent },
  { path: 'zlecenie/:id', component: OrderDetailsComponent,
  resolve:{
    order:OrderResolver
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [OrderResolver]
})
export class ProductionRoutingModule { }
