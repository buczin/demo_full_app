import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsMainComponent } from "./settings-main/settings-main.component";
import { UsersComponent } from "./users/users.component";
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
import { MycompanyComponent } from "./mycompany/mycompany.component";
import { FormMycompanyComponent } from "./mycompany/form-mycompany/form-mycompany.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { FormUsersComponent } from "./users/form-users/form-users.component";
import { PasswordModule } from "primeng/password";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormPasswordComponent } from "./users/form-password/form-password.component";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { KeyFilterModule } from "primeng/keyfilter";
import { OfferParamComponent } from "./offer-param/offer-param.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ContextMenuModule } from "primeng/contextmenu";
import { DragDropModule } from "primeng/dragdrop";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { EditorModule } from "primeng/editor";
import { FileUploadModule } from "primeng/fileupload";
import { InputNumberModule } from "primeng/inputnumber";
import { MultiSelectModule } from "primeng/multiselect";
import { ProgressBarModule } from "primeng/progressbar";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { RadioButtonModule } from "primeng/radiobutton";
import { StepsModule } from "primeng/steps";
import { TooltipModule } from "primeng/tooltip";
import { TreeTableModule } from "primeng/treetable";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ToggleButtonModule } from "primeng/togglebutton";

@NgModule({
  declarations: [
    SettingsMainComponent,
    UsersComponent,
    MycompanyComponent,
    FormMycompanyComponent,
    FormUsersComponent,
    FormPasswordComponent,
    OfferParamComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
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
    InputTextareaModule,
    ToggleButtonModule,
  ],
  providers: [DialogService],
})
export class SettingsModule {}
