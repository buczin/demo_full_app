import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { ProductionServiceService } from "../../production-service/production-service.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import {
  KatalogSystem,
  KatalogProfili,
} from "src/app/catalog/catalog-service/catalog.service";
import { CookieService } from "ngx-cookie-service";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-order-position-form",
  templateUrl: "./order-position-form.component.html",
  styleUrls: ["./order-position-form.component.scss"],
})
export class OrderPositionFormComponent implements OnInit {
  formOrderPosition: FormGroup = new FormGroup({
    profilType: new FormControl("", { validators: [Validators.required] }),
    profilNumber: new FormControl("", { validators: [Validators.required] }),
    comment: new FormControl(""),
    catalogIdHelper: new FormControl(""),
    alu: new FormControl(false),
    warranty: new FormControl(true),
    postionSide: new FormArray([
      new FormGroup({
        side: new FormControl(""),
        filmNumber: new FormControl(""),
        filmWidth: new FormControl(""),
        hard: new FormControl(false),
        filmEntrusted: new FormControl(false),
        bicolor: new FormControl(""),
        profilDimensions: new FormArray([
          new FormGroup({
            quantity: new FormControl(1),
            length: new FormControl(6.5),
          }),
        ]),
      }),
    ]),
  });

  iDimTmp: any;
  dimSug = [
    { label: "6 mb", value: "6" },
    { label: "6,5 mb", value: "6.5" },
    { label: "7 mb", value: "7" },
    { label: "8 mb", value: "8" },
  ];
  sideSug = [
    "zew",
    "wew",
    "jedno",
    "środek",
    "obu",
    "obu-zew",
    "obu-wew",
    "I strona",
    "II strona",
    "III strona",
  ];
  dimSugFiltered: any;
  filmSugFiltered: any;
  sideSugFiltered: any;
  catalogSugFiltered: any;
  selectedSystem: KatalogSystem = null;
  selectedCatalog: KatalogProfili = null;
  allCatalog: KatalogProfili[];
  searchBy = ["number"];
  loading = false;
  orderNumber: any;
  errMessage: string = "";

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public productionService: ProductionServiceService,
    private cookieService: CookieService,
    private infoPopup: InfoPopupComponent
  ) {
    this.orderNumber = config.data;
  }
  ngOnInit() {
    // Check cookie
    if (!this.cookieService.check("creatorSelectedSystem")) {
      this.cookieService.set(
        "creatorSelectedSystem",
        JSON.stringify(this.selectedSystem)
      );
    } else {
      this.selectedSystem = JSON.parse(
        this.cookieService.get("creatorSelectedSystem")
      );
    }

    this.filterBySystem();
    //=============

    if (this.cookieService.check("lastUsedFilm")) {
      let okl = JSON.parse(this.cookieService.get("lastUsedFilm"));
      this.formOrderPosition.controls.postionSide["controls"][
        this.sides.length - 1
      ]
        .get("filmNumber")
        .setValue(okl.number);
    }
  }

  get sides(): FormArray {
    return this.formOrderPosition.get("postionSide") as FormArray;
  }

  get profilDimensions(): FormArray {
    return this.sides.controls[this.iDimTmp].get(
      "profilDimensions"
    ) as FormArray;
  }

  addDimensions(row) {
    this.iDimTmp = row;
    this.profilDimensions.push(
      new FormGroup({
        quantity: new FormControl(1),
        length: new FormControl(6.5),
      })
    );
  }

  addSide() {
    const group = new FormGroup({
      side: new FormControl(""),
      filmNumber: new FormControl(""),
      filmWidth: new FormControl(""),
      bicolor: new FormControl(""),
      hard: new FormControl(false),
      filmEntrusted: new FormControl(false),
      profilDimensions: new FormArray([
        new FormGroup({
          quantity: new FormControl(1),
          length: new FormControl(6.5),
        }),
      ]),
    });
    this.sides.push(group);

    if (this.cookieService.check("lastUsedFilm")) {
      let okl = JSON.parse(this.cookieService.get("lastUsedFilm"));
      this.formOrderPosition.controls.postionSide["controls"][
        this.sides.length - 1
      ]
        .get("filmNumber")
        .setValue(okl.number);
    }
  }

  removeSide(i: number) {
    this.sides.removeAt(i);
  }

  removeDimension(row, index) {
    this.iDimTmp = row;
    this.profilDimensions.removeAt(index);
  }

  selectDim(i, j, e) {
    this.sides.controls[i]["controls"].profilDimensions.controls[j]
      .get("length")
      .setValue(e);
  }

  duplicateLastSide() {
    let tmp = this.sides.at(this.sides.length - 1);
    this.addSide();
    this.sides.at(this.sides.length - 1).patchValue(tmp.value);
  }

  onSelectFilm(event, i) {
    this.sides.controls[i].get("filmNumber").setValue(event.number);
    this.sides.controls[i].get("bicolor").setValue(event.surchargePercentage);
    this.cookieService.set("lastUsedFilm", JSON.stringify(event));
  }

  onSelectSide(e, index) {
    if (this.selectedCatalog != null) {
      let res = "";
      switch (e) {
        case "jedno":
          res = this.selectedCatalog.dimOneSide;
          break;
        case "środek":
          res = this.selectedCatalog.dimCenterSide;
          break;
        case "obu":
          res = this.selectedCatalog.dimTwoSide;
          break;
        case "obu-zew":
          res = this.selectedCatalog.dimTwoSideOuter;
          break;
        case "obu-wew":
          res = this.selectedCatalog.dimTwoSideInner;
          break;
        case "zew":
          res = this.selectedCatalog.dimOuter;
          break;
        case "wew":
          res = this.selectedCatalog.dimInner;
          break;
      }
      this.sides.controls[index]
        .get("hard")
        .setValue(this.selectedCatalog.hard);
      this.sides.controls[index].get("filmWidth").setValue(res);
    }
  }

  onSelectCatalog(event) {
    this.selectedCatalog = event;
    this.formOrderPosition.get("profilNumber").setValue(event.number);
    this.formOrderPosition.get("profilType").setValue(event.profileType);
    this.formOrderPosition.get("alu").setValue(event.alu);
    if (!this.selectedSystem) {
      this.selectedSystem = event.systemProfil;
      this.filterBySystem();
    }
    this.sides.controls.forEach((x, index) => {
      let e = x.get("side").value;
      let res = "";
      switch (e) {
        case "jedno":
          res = this.selectedCatalog.dimOneSide;
          break;
        case "środek":
          res = this.selectedCatalog.dimCenterSide;
          break;
        case "obu":
          res = this.selectedCatalog.dimTwoSide;
          break;
        case "obu-zew":
          res = this.selectedCatalog.dimTwoSideOuter;
          break;
        case "obu-wew":
          res = this.selectedCatalog.dimTwoSideInner;
          break;
        case "zew":
          res = this.selectedCatalog.dimOuter;
          break;
        case "wew":
          res = this.selectedCatalog.dimInner;
          break;
      }
      this.sides.controls[index]
        .get("hard")
        .setValue(this.selectedCatalog.hard);
      this.sides.controls[index].get("filmWidth").setValue(res);
    });
  }

  copyCommentsToPosition() {
    this.formOrderPosition.controls["comment"].setValue(
      this.formOrderPosition.controls["comment"].value +
        " " +
        this.selectedCatalog.comments
    );
  }

  searchFilm(event) {
    this.filmSugFiltered = [];
    for (let i = 0; i < this.productionService.filmSuggestions.length; i++) {
      let film = this.productionService.filmSuggestions[i];
      if (
        film.number.toLowerCase().includes(event.query.toLowerCase()) ||
        film.name.toLowerCase().includes(event.query.toLowerCase())
      ) {
        this.filmSugFiltered.push(film);
      }
    }
  }

  searchSide(event) {
    this.sideSugFiltered = [];
    for (let i = 0; i < this.sideSug.length; i++) {
      let side = this.sideSug[i];
      if (side.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.sideSugFiltered.push(side);
      }
    }
  }

  filterBySystem() {
    console.log("by system");
    this.allCatalog = [];
    if (this.selectedSystem != null) {
      for (
        let i = 0;
        i < this.productionService.catalogSuggestions.length;
        i++
      ) {
        let cat = this.productionService.catalogSuggestions[i];
        if (cat.systemProfil.name != null) {
          if (cat.systemProfil.id === this.selectedSystem.id) {
            this.allCatalog.push(cat);
          }
        }
      }
      this.cookieService.set(
        "creatorSelectedSystem",
        JSON.stringify(this.selectedSystem)
      );
    } else {
      this.allCatalog = this.productionService.catalogSuggestions;
    }
  }

  searchCatalog(event) {
    this.catalogSugFiltered = [];
    if (event.query != "") {
      console.log("loading");
      for (let i = 0; i < this.allCatalog.length; i++) {
        let cat = this.allCatalog[i];
        if (cat.number != null && this.searchBy.includes("number")) {
          if (cat.number.toLowerCase().includes(event.query.toLowerCase())) {
            this.catalogSugFiltered.push(cat);
          }
        }
        if (cat.profileType != null && this.searchBy.includes("name")) {
          if (
            cat.profileType.toLowerCase().includes(event.query.toLowerCase())
          ) {
            this.catalogSugFiltered.push(cat);
          }
        }
      }
    } else {
      this.allCatalog.forEach((x) => this.catalogSugFiltered.push(x));
    }
  }

  searchDim(event) {
    this.dimSugFiltered = [];
    for (let i = 0; i < this.dimSug.length; i++) {
      let dim = this.dimSug[i];
      if (dim.label.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.dimSugFiltered.push(dim);
      }
    }
  }

  exit(id) {
    this.dialogRef.close(id);
  }

  addOrderPosition() {
    if (!this.formOrderPosition.invalid) {
      if (this.selectedCatalog != null) {
        this.formOrderPosition
          .get("catalogIdHelper")
          .patchValue(this.selectedCatalog.id);
      }
      this.loading = true;
      this.productionService
        .addOrderPositions(this.orderNumber, this.formOrderPosition.value)
        .subscribe({
          next: (res) => {
            this.infoPopup.showSuccessAdd("pozycja zlecenia");
            this.loading = false;
            this.exit(1);
          },
          error: (err) => {
            this.infoPopup.showErrorAdd("pozycja zlecenia");
            this.loading = false;
          },
          complete: () => {},
        });
    }
  }
}
