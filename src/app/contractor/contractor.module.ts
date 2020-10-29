import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientMainComponent } from './client-main/client-main.component';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { MessageService } from 'primeng/api';
import { ContractorRoutingModule } from './contractor-routing.module';
import { ClientAddFormComponent } from './client-add-form/client-add-form.component'
import { MatDialogModule } from '@angular/material/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from '../_shared/shared/shared.module'
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [ClientMainComponent, ClientAddFormComponent],
  imports: [
    CommonModule,
    ContractorRoutingModule,
    MatIconModule,
    TableModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    DialogModule,
    FieldsetModule,
    CodeHighlighterModule,
    ReactiveFormsModule,
    MatDialogModule,
    InputTextModule,
    RippleModule,
    SharedModule,
    ProgressSpinnerModule,
    TooltipModule
  ],
  providers: [MessageService,DialogService],
  entryComponents:[ClientAddFormComponent]
})
export class ContractorModule { }
