import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MultiSelectModule } from "primeng/multiselect";
import { ProductionRoutingModule } from "./production-routing.module";
import { ProductionMainComponent } from "./production-main/production-main.component";
import { MatIconModule } from "@angular/material/icon";
import { TableModule } from "primeng/table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DialogModule } from "primeng/dialog";
import { FieldsetModule } from "primeng/fieldset";
import { CodeHighlighterModule } from "primeng/codehighlighter";
import { TabViewModule } from "primeng/tabview";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { PasswordModule } from "primeng/password";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ProductionOrderFormComponent } from "./form/production-order-form/production-order-form.component";
import { OrderPositionFormComponent } from "./form/order-position-form/order-position-form.component";
import { CalendarModule } from "primeng/calendar";
import { CookieService } from "ngx-cookie-service";
import { ProductionOrderFormUpdateComponent } from "./form/production-order-form-update/production-order-form-update.component";
import { EditorModule } from "primeng/editor";
import { TreeTableModule } from "primeng/treetable";
import { AutoCompleteModule } from "primeng/autocomplete";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { OrderPositionFormUpdateComponent } from "./form/order-position-form-update/order-position-form-update.component";
import { ContextMenuModule } from "primeng/contextmenu";
import { PrintService } from "../print/print.service";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { CheckboxModule } from "primeng/checkbox";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { FormAddUpdateUsedFilmComponent } from "./form/form-add-update-used-film/form-add-update-used-film.component";
import { FormDonePositionComponent } from "./form/form-done-position/form-done-position.component";
import { FormFvNumberComponent } from "./form/form-fv-number/form-fv-number.component";
import { FormAfterCompletePositionComponent } from "./form/form-after-complete-position/form-after-complete-position.component";
import { FormChangeOrderStatusComponent } from "./form/form-change-order-status/form-change-order-status.component";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { FormAddFromExcelComponent } from "./form/form-add-from-excel/form-add-from-excel.component";
import { FileUploadModule } from "primeng/fileupload";
import { StepsModule } from "primeng/steps";
import { DragDropModule } from "primeng/dragdrop";
import { CardModule } from "primeng/card";
import { InputNumberModule } from "primeng/inputnumber";
import { DynamicDialogModule, DialogService } from "primeng/dynamicdialog";
import { TooltipModule } from "primeng/tooltip";
import { KeyFilterModule } from "primeng/keyfilter";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ToolbarModule } from "primeng/toolbar";
import { ViewOrderComponent } from "./view-order/view-order.component";
import { ToggleButtonModule } from "primeng/togglebutton";
@NgModule({
  declarations: [
    ProductionMainComponent,
    OrderDetailsComponent,
    ProductionOrderFormComponent,
    OrderPositionFormComponent,
    ProductionOrderFormUpdateComponent,
    OrderPositionFormUpdateComponent,
    FormAddUpdateUsedFilmComponent,
    FormDonePositionComponent,
    FormFvNumberComponent,
    FormAfterCompletePositionComponent,
    FormChangeOrderStatusComponent,
    FormAddFromExcelComponent,
    ViewOrderComponent,
  ],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    MatIconModule,
    TableModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    MatTooltipModule,
    DialogModule,
    FieldsetModule,
    CodeHighlighterModule,
    ReactiveFormsModule,
    TabViewModule,
    MatButtonModule,
    MatDialogModule,
    PasswordModule,
    MatSlideToggleModule,
    CalendarModule,
    MultiSelectModule,
    EditorModule,
    TreeTableModule,
    RadioButtonModule,
    AutoCompleteModule,
    MatAutocompleteModule,
    ContextMenuModule,
    ConfirmDialogModule,
    CheckboxModule,
    ProgressBarModule,
    InputTextModule,
    RippleModule,
    FileUploadModule,
    StepsModule,
    DragDropModule,
    CardModule,
    InputNumberModule,
    DynamicDialogModule,
    TooltipModule,
    KeyFilterModule,
    ProgressSpinnerModule,
    ToolbarModule,
    ToggleButtonModule,
  ],
  entryComponents: [
    ProductionOrderFormComponent,
    FormAddFromExcelComponent,
    FormChangeOrderStatusComponent,
    FormAfterCompletePositionComponent,
    FormFvNumberComponent,
    FormDonePositionComponent,
    FormAddUpdateUsedFilmComponent,
    OrderPositionFormComponent,
    ProductionOrderFormUpdateComponent,
    OrderPositionFormComponent,
    OrderPositionFormUpdateComponent,
  ],
  providers: [CookieService, PrintService, DialogService],
})
export class ProductionModule {}
