import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AppValidators } from "src/app/_validators/AppValidators";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {
  CatalogService,
  KatalogSystem,
} from "../../catalog-service/catalog.service";

@Component({
  selector: "app-system-add-form",
  templateUrl: "./system-add-form.component.html",
  styleUrls: ["./system-add-form.component.scss"],
})
export class SystemAddFormComponent implements OnInit {
  formSystem: FormGroup;
  loading = false;
  systemData: KatalogSystem;

  constructor(
    public ref: DynamicDialogRef,
    private catalogService: CatalogService,
    private infoPopup: InfoPopupComponent,
    public config: DynamicDialogConfig
  ) {
    this.systemData = config.data;
  }

  ngOnInit() {
    if (this.systemData) {
      this.formSystem = new FormGroup({
        name: new FormControl("", { validators: [Validators.required] }),
        comment: new FormControl(""),
      });
      this.formSystem.patchValue(this.systemData);
    } else {
      this.formSystem = new FormGroup({
        name: new FormControl("", {
          validators: [Validators.required],
          asyncValidators: [AppValidators.systemExists],
          updateOn: "blur",
        }),
        comment: new FormControl(""),
      });
    }
  }

  exit(id) {
    this.ref.close(id);
  }

  addNewSystem() {
    this.loading = true;
    this.catalogService.addSystem(this.formSystem.value).subscribe({
      next: (res) => {
        this.infoPopup.showSuccessAdd("systemu");
        this.loading = false;
        this.exit(1);
      },
      error: (err) => {
        this.infoPopup.showErrorAdd("systemu");
        this.loading = false;
      },
      complete: () => {},
    });
  }

  updateSystem() {
    this.loading = true;
    this.catalogService
      .updateSystem(this.systemData.id, this.formSystem.value)
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("systemu");
          this.loading = false;
          this.exit(1);
        },
        error: (err) => {
          this.infoPopup.showErrorUpdate("systemu");
          this.loading = false;
        },
        complete: () => {},
      });
  }
}
