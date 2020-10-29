import { Component, OnInit } from "@angular/core";
import { FormControl, FormArray, FormGroup } from "@angular/forms";
import {
  KatalogSystem,
  KatalogProfili,
} from "src/app/catalog/catalog-service/catalog.service";
import { ProductionServiceService } from "../../production-service/production-service.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-order-position-form-update",
  templateUrl: "./order-position-form-update.component.html",
  styleUrls: ["./order-position-form-update.component.scss"],
})
export class OrderPositionFormUpdateComponent implements OnInit {
  formOrderPosition = new FormGroup({
    id: new FormControl(""),
    profilType: new FormControl(""),
    profilNumber: new FormControl(""),
    alu: new FormControl(false),
    warranty: new FormControl(true),
    comment: new FormControl(""),
    postionSide: new FormArray([
      new FormGroup({
        id: new FormControl(""),
        side: new FormControl(""),
        filmNumber: new FormControl(""),
        filmWidth: new FormControl(""),
        filmEntrusted: new FormControl(false),
        hard: new FormControl(false),
        bicolor: new FormControl(""),
        profilDimensions: new FormArray([
          new FormGroup({
            id: new FormControl(""),
            quantity: new FormControl(""),
            length: new FormControl(""),
          }),
        ]),
      }),
    ]),
  });
  positionData: any;

  iDimTmp: any;
  dimSug = [
    { label: "6 mb", value: "6" },
    { label: "6,5 mb", value: "6.5" },
    { label: "7 mb", value: "7" },
    { label: "8 mb", value: "8" },
  ];
  sideSug = ["zew", "wew", "jedno", "środek", "obu", "obu-zew", "obu-wew"];
  searchBy = ["number"];
  dimSugFiltered: any;
  filmSugFiltered: any;
  sideSugFiltered: any;
  catalogSugFiltered: any;
  selectedSystem: KatalogSystem = null;
  selectedCatalog: KatalogProfili = null;
  allCatalog: KatalogProfili[];
  loading = false;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public productionService: ProductionServiceService,
    private infoPopup: InfoPopupComponent
  ) {
    this.positionData = config.data;
  }

  ngOnInit() {
    this.findSystem(this.positionData.catalogIdHelper);
    this.loadDataToForm();
  }

  loadDataToForm() {
    console.log(this.positionData);

    this.positionData.postionSide.forEach((el, index) => {
      if (index != 0) {
        this.addSide();
        console.log("add side");
      }
      el.profilDimensions.forEach((d, dindex) => {
        if (dindex != 0) {
          this.addDimensions(index);
          console.log("add dim");
        }
      });
    });

    if (this.positionData.catalogIdHelper != null) {
      this.selectedSystem = this.productionService.catalogSuggestions.find(
        (x) => x.id == this.positionData.catalogIdHelper
      ).systemProfil;
    }
    this.filterBySystem();
    this.formOrderPosition.patchValue(this.positionData);
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
        id: new FormControl(""),
        quantity: new FormControl(1),
        length: new FormControl(6.5),
      })
    );
  }

  addSide() {
    const group = new FormGroup({
      id: new FormControl(""),
      side: new FormControl(""),
      filmNumber: new FormControl(""),
      filmWidth: new FormControl(""),
      bicolor: new FormControl(""),
      hard: new FormControl(false),
      filmEntrusted: new FormControl(false),
      profilDimensions: new FormArray([
        new FormGroup({
          id: new FormControl(""),
          quantity: new FormControl(1),
          length: new FormControl(6.5),
        }),
      ]),
    });
    this.sides.push(group);
  }

  removeSide(i: number) {
    this.sides.removeAt(i);
  }

  removeDimension(row, index) {
    this.iDimTmp = row;
    this.profilDimensions.removeAt(index);
  }

  duplicateLastSide() {
    let tmp = this.sides.at(this.sides.length - 1);
    this.addSide();
    this.sides.at(this.sides.length - 1).patchValue(tmp.value);
    this.sides
      .at(this.sides.length - 1)
      .get("id")
      .patchValue(null);
    this.sides
      .at(this.sides.length - 1)
      ["controls"]["profilDimensions"].controls.forEach((element) => {
        element.get("id").patchValue(null);
      });
  }

  // ======== ON SELECT =======

  onSelectFilm(event, i) {
    this.sides.controls[i].get("filmNumber").setValue(event.number);
    this.sides.controls[i].get("bicolor").setValue(event.surchargePercentage);
    //this.cookieService.set('lastUsedFilm', JSON.stringify(event));
  }

  selectDim(i, j, e) {
    this.sides.controls[i]["controls"].profilDimensions.controls[j]
      .get("length")
      .setValue(e);
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
        .get("isHard")
        .setValue(this.selectedCatalog.hard);
      this.sides.controls[index].get("filmWidth").setValue(res);
    }
  }

  onSelectCatalog(event) {
    this.selectedCatalog = event;
    this.formOrderPosition.get("profilNumber").setValue(event.number);
    this.formOrderPosition.get("profilType").setValue(event.profileType);
    this.formOrderPosition.get("alu").setValue(event.alu);
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
        .get("isHard")
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

  // ============ FIND ===========

  searchFilm(event) {
    this.filmSugFiltered = [];
    for (let i = 0; i < this.productionService.filmSuggestions.length; i++) {
      let film = this.productionService.filmSuggestions[i];
      if (film.number.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
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
    } else {
      this.allCatalog = this.productionService.catalogSuggestions;
    }
  }

  findSystem(id) {
    if (id != null && id != "") {
      let cat = this.productionService.catalogSuggestions.find(
        (x) => x.id == id
      );
      this.selectedSystem = cat.systemProfil;
      this.selectedCatalog = cat;
    }
  }

  searchCatalog(event) {
    this.catalogSugFiltered = [];
    if (event.query != "") {
      console.log("loading");
      for (let i = 0; i < this.allCatalog.length; i++) {
        let cat = this.allCatalog[i];
        if (cat.number != null) {
          if (
            cat.number.toLowerCase().indexOf(event.query.toLowerCase()) == 0
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

  updateOrderPosition() {
    console.log(this.formOrderPosition.value);
    if (!this.formOrderPosition.invalid) {
      this.loading = true;
      this.productionService
        .updateOrderPositions(
          this.positionData.productionOrder.orderNumber,
          this.positionData.id,
          this.formOrderPosition.value
        )
        .subscribe({
          next: (res) => {
            this.infoPopup.showSuccessUpdate("pozycja zlecenia");
            this.loading = false;
            this.exit(1);
          },
          error: (err) => {
            this.loading = false;
            this.infoPopup.showErrorUpdate("pozycja zlecenia");
          },
          complete: () => {},
        });
    }
  }
}
