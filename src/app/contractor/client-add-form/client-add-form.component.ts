import { Component, OnInit, Inject } from "@angular/core";
import { Client, ClientService } from "../client-service/client.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AppValidators } from "src/app/_validators/AppValidators";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-client-add-form",
  templateUrl: "./client-add-form.component.html",
  styleUrls: ["./client-add-form.component.scss"],
})
export class ClientAddFormComponent implements OnInit {
  formClient: FormGroup;
  clientData: Client;
  loading = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private clientService: ClientService,
    private infoPopup: InfoPopupComponent
  ) {
    this.clientData = config.data;
  }

  ngOnInit() {
    this.formClient = new FormGroup({
      id: new FormControl(""),
      symfoniaId: new FormControl(""),
      shortName: new FormControl(""),
      name: new FormControl("", { validators: [Validators.required] }),
      nip: new FormControl("", { validators: [AppValidators.validatenip] }),
      pesel: new FormControl(""),
      regon: new FormControl("", {
        validators: [AppValidators.validateregon9],
        updateOn: "blur",
      }),

      town: new FormControl(""),
      street: new FormControl(""),
      houseNumber: new FormControl(""),
      flatNumber: new FormControl(""),
      postalCode: new FormControl(""),
      province: new FormControl(""),
      country: new FormControl(""),

      phonenumber: new FormControl(""),
      phonenumber2: new FormControl(""),
      email: new FormControl("", { validators: [Validators.email] }),
      www: new FormControl(""),
    });

    if (this.clientData) {
      this.formClient.patchValue(this.clientData);
    }
  }

  exit(id) {
    this.ref.close(id);
  }

  addNewClient() {
    this.loading = true;
    this.clientService.addClient(this.formClient.value).subscribe({
      next: (res) => {
        this.infoPopup.showSuccessAdd("klienta");
        this.loading = false;
        this.exit(1);
      },
      error: (err) => {
        this.infoPopup.showErrorAdd("klienta");
        this.loading = false;
      },
      complete: () => {},
    });
  }

  updateClient() {
    this.loading = true;
    this.clientService
      .updateClient(this.formClient.value.id, this.formClient.value)
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("klienta");
          this.loading = false;
          this.exit(1);
        },
        error: (err) => {
          this.infoPopup.showErrorUpdate("klienta");
          this.loading = false;
        },
        complete: () => {},
      });
  }
}
