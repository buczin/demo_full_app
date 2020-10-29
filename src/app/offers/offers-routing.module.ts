import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsOfferComponent, OfferResolver } from './details-offer/details-offer.component';
import { MainOffersComponent } from './main-offers/main-offers.component';


const routes: Routes = [
  { path: '', component: MainOffersComponent },
  {
    path: 'oferta/:id', component: DetailsOfferComponent,
    resolve: {
      offer: OfferResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
