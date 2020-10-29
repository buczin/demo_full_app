import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {
  CatalogService,
  KatalogProfili,
  KatalogSystem,
} from "../../catalog-service/catalog.service";

@Component({
  selector: "app-catalog-add-form",
  templateUrl: "./catalog-add-form.component.html",
  styleUrls: ["./catalog-add-form.component.scss"],
})
export class CatalogAddFormComponent implements OnInit {
  formCatalog: FormGroup;
  systems: SelectItem[];
  filteredSystems: any[];
  loading = false;
  catalogData: KatalogProfili;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private catalogService: CatalogService,
    private infoPopup: InfoPopupComponent
  ) {
    this.catalogData = config.data;
  }

  ngOnInit() {
    this.filteredSystems = this.catalogService.systems;
    this.formCatalog = new FormGroup({
      number: new FormControl("", { validators: [Validators.required] }),
      profileType: new FormControl("", { validators: [Validators.required] }),
      systemProfil: new FormControl("", { validators: [Validators.required] }),
      offerName: new FormControl("", { validators: [Validators.required] }),
      dimOuter: new FormControl(""),
      dimInner: new FormControl(""),
      dimOneSide: new FormControl(""),
      dimCenterSide: new FormControl(""),
      dimTwoSide: new FormControl(""),
      dimTwoSideInner: new FormControl(""),
      dimTwoSideOuter: new FormControl(""),
      actualMeasurement: new FormControl(false),
      hard: new FormControl(false),
      alu: new FormControl(false),
      comments: new FormControl(""),
    });

    if (this.catalogData) {
      this.formCatalog.patchValue(this.catalogData);
    }
  }

  filterSystems(event) {
    this.filteredSystems = [];
    for (let i = 0; i < this.catalogService.systems.length; i++) {
      let sys = this.catalogService.systems[i];
      if (sys.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredSystems.push(sys);
      }
    }
  }

  exit(id) {
    this.ref.close(id);
  }

  addNewCatalog() {
    this.loading = true;
    if (this.isString(this.formCatalog.value.systemProfil)) {
      let tmpSys: KatalogSystem = {
        id: null,
        name: this.formCatalog.value.systemProfil,
      };
      this.formCatalog.value.systemProfil = tmpSys;
    }
    this.catalogService.addCatalog(this.formCatalog.value).subscribe({
      next: (res) => {
        this.infoPopup.showSuccessAdd("katalogu");
        this.loading = false;
        this.exit(1);
      },
      error: (err) => {
        this.infoPopup.showErrorAdd("katalogu");
        this.loading = false;
      },
      complete: () => {},
    });
  }

  updateCatalog() {
    this.loading = true;
    this.catalogService
      .updateCatalog(this.catalogData.id, this.formCatalog.value)
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("katalogu");
          this.loading = false;
          this.exit(1);
        },
        error: (err) => {
          this.infoPopup.showErrorUpdate("katalogu");
          this.loading = false;
        },
        complete: () => {},
      });
  }

  dupliName(event) {
    this.formCatalog.get("offerName").setValue(event);
  }

  isString(value) {
    return typeof value === "string" || value instanceof String;
  }
}
