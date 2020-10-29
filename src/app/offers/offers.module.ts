import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OffersRoutingModule } from "./offers-routing.module";
import { MainOffersComponent } from "./main-offers/main-offers.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";
import { CodeHighlighterModule } from "primeng/codehighlighter";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ContextMenuModule } from "primeng/contextmenu";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { EditorModule } from "primeng/editor";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { KeyFilterModule } from "primeng/keyfilter";
import { MultiSelectModule } from "primeng/multiselect";
import { PasswordModule } from "primeng/password";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { RippleModule } from "primeng/ripple";
import { StepsModule } from "primeng/steps";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { TooltipModule } from "primeng/tooltip";
import { TreeTableModule } from "primeng/treetable";
import { FormNewOfferComponent } from "./form/new-offer/form-new-offer.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import {
  DetailsOfferComponent,
  OfferResolver,
} from "./details-offer/details-offer.component";
import { AddOfferPositionComponent } from "./form/add-offer-position/add-offer-position.component";
import { UpdateClientHelpersComponent } from "./form/update-client-helpers/update-client-helpers.component";
import { UpdateOfferPositionComponent } from "./form/update-offer-position/update-offer-position.component";
import { ToolbarModule } from "primeng/toolbar";
import { UpdateClientHelperRangeComponent } from "./form/update-client-helper-range/update-client-helper-range.component";
import { ViewOfferComponent } from "./view-offer/view-offer.component";
import { TimelineWidgetComponent } from "./timeline-widget/timeline-widget.component";
import { PrintOfferSettingsComponent } from "./print-offer-settings/print-offer-settings.component";
import { UpdateFilmBuyCostComponent } from "./form/update-film-buy-cost/update-film-buy-cost.component";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    MainOffersComponent,
    FormNewOfferComponent,
    DetailsOfferComponent,
    AddOfferPositionComponent,
    UpdateClientHelpersComponent,
    UpdateOfferPositionComponent,
    UpdateClientHelperRangeComponent,
    ViewOfferComponent,
    TimelineWidgetComponent,
    PrintOfferSettingsComponent,
    UpdateFilmBuyCostComponent,
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    MatIconModule,
    DragDropModule,
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
  ],
  providers: [DialogService, OfferResolver],
})
export class OffersModule {}
