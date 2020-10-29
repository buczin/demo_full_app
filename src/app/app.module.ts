import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injectable } from "@angular/core";
import { ToastModule } from "primeng/toast";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";
import { SidebarComponent } from "./main/sidebar/sidebar.component";
import { MenuItemsComponent } from "./main/sidebar/menu-items/menu-items.component";
import { PageContainerComponent } from "./main/page-container/page-container.component";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./main/dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import {
  HttpClientModule,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { AuthService } from "./_services/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InfoPopupComponent } from "./info-popup/info-popup.component";
import { MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatInputModule } from "@angular/material/input";
import { DialogModule } from "primeng/dialog";
import { RippleModule } from "primeng/ripple";
import { SharedModule } from "./_shared/shared/shared.module";
import { PrintOfferComponent } from "./print/print-offer/print-offer.component";
import { PrintOfferCostsComponent } from "./print/print-offer-costs/print-offer-costs.component";
import { RemoveCommaPipe } from "./_pipe/remove-comma.pipe";
import { PrintOrderProductionComponent } from "./print/print-order-production/print-order-production.component";

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set("X-Requested-With", "XMLHttpRequest"),
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    RemoveCommaPipe,
    AppComponent,
    MainComponent,
    SidebarComponent,
    MenuItemsComponent,
    PageContainerComponent,
    DashboardComponent,
    LoginComponent,
    InfoPopupComponent,
    PrintOfferComponent,
    PrintOfferCostsComponent,
    PrintOrderProductionComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    DialogModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    RippleModule,
    SharedModule,
  ],
  providers: [
    InfoPopupComponent,
    MessageService,
    AuthService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
