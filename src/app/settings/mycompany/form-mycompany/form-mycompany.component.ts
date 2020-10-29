import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AppValidators } from "src/app/_validators/AppValidators";
import { SettingsService } from "../../settings.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-form-mycompany",
  templateUrl: "./form-mycompany.component.html",
  styleUrls: ["./form-mycompany.component.scss"],
})
export class FormMycompanyComponent implements OnInit {
  formMyCompany: FormGroup;
  company: any;
  loading = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private settingService: SettingsService,
    private infoPopup: InfoPopupComponent
  ) {
    this.company = config.data;
  }

  ngOnInit(): void {
    if (this.company) {
      this.formMyCompany = new FormGroup({
        id: new FormControl(""),
        name: new FormControl("", { validators: [Validators.required] }),
        shortName: new FormControl("", { validators: [Validators.required] }),
        shortId: new FormControl("", { validators: [Validators.required] }),

        nip: new FormControl("", {
          validators: [Validators.required, AppValidators.validatenip],
        }),
        regon: new FormControl("", {
          validators: [AppValidators.validateregon9],
          updateOn: "blur",
        }),

        fvemail: new FormControl("", { validators: [Validators.email] }),
        logoLink: new FormControl(""),
        email: new FormControl("", { validators: [Validators.email] }),
        www: new FormControl(""),

        phonenumber: new FormControl("", {
          validators: [Validators.minLength(9)],
        }),
        phonenumber2: new FormControl("", {
          validators: [Validators.minLength(9)],
        }),

        town: new FormControl(""),
        street: new FormControl(""),
        houseNumber: new FormControl(""),
        flatNumber: new FormControl(""),
        postalCode: new FormControl(""),
        province: new FormControl(""),
        country: new FormControl(""),
      });
      this.formMyCompany.patchValue(this.company);
      console.log(this.formMyCompany);
    } else {
      this.formMyCompany = new FormGroup({
        name: new FormControl("", { validators: [Validators.required] }),
        shortName: new FormControl("", { validators: [Validators.required] }),
        shortId: new FormControl("", { validators: [Validators.required] }),

        nip: new FormControl("", {
          validators: [Validators.required, AppValidators.validatenip],
          asyncValidators: [AppValidators.myCompanyExists],
          updateOn: "blur",
        }),
        regon: new FormControl("", {
          validators: [AppValidators.validateregon9],
          updateOn: "blur",
        }),

        fvemail: new FormControl("", { validators: [Validators.email] }),
        logoLink: new FormControl(""),
        email: new FormControl("", { validators: [Validators.email] }),
        www: new FormControl(""),

        phonenumber: new FormControl("", {
          validators: [Validators.minLength(9)],
        }),
        phonenumber2: new FormControl("", {
          validators: [Validators.minLength(9)],
        }),

        town: new FormControl(""),
        street: new FormControl(""),
        houseNumber: new FormControl(""),
        flatNumber: new FormControl(""),
        postalCode: new FormControl(""),
        province: new FormControl(""),
        country: new FormControl(""),
      });
    }
  }

  exit(id) {
    this.ref.close(id);
  }

  onAddMyCompany() {
    this.loading = true;
    this.settingService.addMyCompany(this.formMyCompany.value).subscribe({
      next: (res) => {
        this.infoPopup.showSuccessAdd("moja firma");
        this.loading = false;
        this.exit(1);
      },
      error: (err) => {
        this.loading = false;
        this.infoPopup.showErrorAdd("moja firma");
      },
      complete: () => {},
    });
  }

  onUpdateMyCompany() {
    this.loading = true;
    this.settingService
      .updateMyCompany(this.company.id, this.formMyCompany.value)
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("moja firma");
          this.loading = false;
          this.exit(1);
        },
        error: (err) => {
          this.loading = false;
          this.infoPopup.showErrorUpdate("moja firma");
        },
        complete: () => {},
      });
  }
}
