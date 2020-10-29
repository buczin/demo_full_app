import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CatalogMainComponent } from "./catalog-main/catalog-main.component";
import { CatalogAddFormComponent } from "./form/catalog-add-form/catalog-add-form.component";
import { SystemAddFormComponent } from "./form/system-add-form/system-add-form.component";
import { TableModule } from "primeng/table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { TabViewModule } from "primeng/tabview";
import { FieldsetModule } from "primeng/fieldset";
import { CodeHighlighterModule } from "primeng/codehighlighter";
import { MatIconModule } from "@angular/material/icon";
import { CatalogRoutingModule } from "./catalog-routing.module";
import { InputTextareaModule } from "primeng/inputtextarea";
import { AutoCompleteModule } from "primeng/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { SharedModule } from "../_shared/shared/shared.module";
import { DialogService } from "primeng/dynamicdialog";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { EditorModule } from "primeng/editor";
import { TooltipModule } from "primeng/tooltip";
import { KeyFilterModule } from "primeng/keyfilter";
import { InputNumberModule } from "primeng/inputnumber";
@NgModule({
  declarations: [
    CatalogMainComponent,
    CatalogAddFormComponent,
    SystemAddFormComponent,
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    MatIconModule,
    TableModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    TabViewModule,
    FieldsetModule,
    CodeHighlighterModule,
    ReactiveFormsModule,
    InputTextareaModule,
    AutoCompleteModule,
    MatDialogModule,
    CheckboxModule,
    InputTextModule,
    RippleModule,
    SharedModule,
    EditorModule,
    ProgressSpinnerModule,
    KeyFilterModule,
    TooltipModule,
    InputNumberModule,
  ],
  providers: [DialogService],
  entryComponents: [SystemAddFormComponent, CatalogAddFormComponent],
})
export class CatalogModule {}
