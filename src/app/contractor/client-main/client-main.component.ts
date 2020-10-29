import { Component, OnInit } from "@angular/core";
import { Client, ClientService } from "../client-service/client.service";
import { SelectItem, ConfirmationService } from "primeng/api";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { AuthService } from "src/app/_services/auth.service";
import { ClientAddFormComponent } from "../client-add-form/client-add-form.component";
import { DialogService } from "primeng/dynamicdialog";

@Component({
  selector: "app-client-main",
  templateUrl: "./client-main.component.html",
  styleUrls: ["./client-main.component.scss"],
})
export class ClientMainComponent implements OnInit {
  client: Client[] = [];

  onErr: Client = {
    id: 0,
    name: "---",
    nip: "---",
    regon: "---",
    email: "---",
    phonenumber: "---",
  };
  clientCount: number;
  err: boolean;
  newclient: boolean;
  available: SelectItem[];
  clonedclients: { [s: string]: Client } = {};
  loading = false;
  selectedClient: any;

  constructor(
    public dialog: DialogService,
    public auth: AuthService,
    private clientService: ClientService,
    private infoPopup: InfoPopupComponent,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.err = false;
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.clientService.getClients().subscribe({
      next: (res) => {
        this.client = res;
        this.err = false;
      },
      error: (err) => {
        this.infoPopup.showErrorDownload("kontrahenci");
        this.err = true;
        this.client.push(this.onErr);
      },
      complete: () => {
        this.loading = false;
      },
    });

    this.clientService.getCountClient().subscribe({
      next: (res) => {
        this.clientCount = res;
      },
      error: (err) => {
        this.infoPopup.showErrorCount("klientów");
      },
      complete: () => {},
    });
  }

  showDialogToAddClient() {
    const dialogRef = this.dialog.open(ClientAddFormComponent, {
      header: "Nowy kontrahent",
      width: "1000px",
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog client add was closed");
    });
  }

  showDialogToUpdateClient(selected) {
    const dialogRef = this.dialog.open(ClientAddFormComponent, {
      header: "Aktualizacja kontrahenta",
      width: "1000px",
      data: selected,
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog update client was closed");
    });
  }

  onRowDeleteClient(client: Client) {
    this.confirmationService.confirm({
      message: "Na pewno chcesz usunąć " + client.name + "?",
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      acceptIcon: "pi pi-trash",
      acceptButtonStyleClass: "p-button-sm sb-button red",
      rejectButtonStyleClass: "p-button-sm sb-button o-gray",
      accept: () => {
        this.clientService.deleteClient(client.id).subscribe({
          next: (res) => {
            this.infoPopup.showSuccessDelete("klienta");
          },
          error: (err) => {
            this.infoPopup.showErrorDelete("klient");
          },
          complete: () => {
            this.loadData();
          },
        });
      },
    });
  }
}
