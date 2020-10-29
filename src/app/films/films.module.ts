import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilmMainComponent } from "./film-main/film-main.component";
import { FilmsRoutingModule } from "./films-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { TableModule } from "primeng/table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FilmAddFormComponent } from "./film-add-form/film-add-form.component";
import { DialogModule } from "primeng/dialog";
import { FieldsetModule } from "primeng/fieldset";
import { CodeHighlighterModule } from "primeng/codehighlighter";
import { TabViewModule } from "primeng/tabview";
import { ProducerAddFormComponent } from "./producer-add-form/producer-add-form.component";
import { MatDialogModule } from "@angular/material/dialog";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { SharedModule } from "../_shared/shared/shared.module";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { DialogService } from "primeng/dynamicdialog";
import { InputNumberModule } from "primeng/inputnumber";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CheckboxModule } from "primeng/checkbox";
import { EditorModule } from "primeng/editor";
import { InputTextareaModule } from "primeng/inputtextarea";
import { KeyFilterModule } from "primeng/keyfilter";
import { TooltipModule } from "primeng/tooltip";

@NgModule({
  declarations: [
    FilmMainComponent,
    FilmAddFormComponent,
    ProducerAddFormComponent,
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
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
    MatDialogModule,
    InputTextModule,
    RippleModule,
    SharedModule,
    ProgressSpinnerModule,
    InputNumberModule,
    InputTextareaModule,
    AutoCompleteModule,
    CheckboxModule,
    EditorModule,
    KeyFilterModule,
    TooltipModule,
  ],
  providers: [DialogService],
  entryComponents: [FilmAddFormComponent, ProducerAddFormComponent],
})
export class FilmsModule {}
