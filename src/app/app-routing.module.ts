import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./main/dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService as AuthGuard } from "./_services/auth-guard.service";

const routes: Routes = [
  {
    path: "okleiny",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./films/films.module").then((m) => m.FilmsModule),
  },
  {
    path: "kontrahent",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./contractor/contractor.module").then((m) => m.ContractorModule),
  },

  {
    path: "katalog",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./catalog/catalog.module").then((m) => m.CatalogModule),
  },
  {
    path: "settings",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsModule),
  },
  {
    path: "produkcja",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./production/production.module").then((m) => m.ProductionModule),
  },
  {
    path: "marketing",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./offers/offers.module").then((m) => m.OffersModule),
  },

  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
