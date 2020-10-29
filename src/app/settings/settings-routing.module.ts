import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsMainComponent } from './settings-main/settings-main.component';
import { UsersComponent } from './users/users.component';
import { MycompanyComponent } from './mycompany/mycompany.component';
import { OfferParamComponent } from './offer-param/offer-param.component';


const routes: Routes = [
  { path: '', component: SettingsMainComponent},
  { path: 'users', component: UsersComponent},
  { path: 'mojafirma', component: MycompanyComponent},
  { path: 'parametry-oferty', component: OfferParamComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
