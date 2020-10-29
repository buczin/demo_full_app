import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {
  KatalogProfili,
  KatalogSystem,
} from "src/app/catalog/catalog-service/catalog.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { ProductionServiceService } from "src/app/production/production-service/production-service.service";
import {
  OfferHelpers,
  SettingsService,
} from "src/app/settings/settings.service";
import { Offer, OffersService } from "../../offers.service";

@Component({
  selector: "app-add-offer-position",
  templateUrl: "./add-offer-position.component.html",
  styleUrls: ["./add-offer-position.component.scss"],
})
export class AddOfferPositionComponent implements OnInit {
  catalogSugFiltered: any;
  helper: OfferHelpers;
  selectedSystem: KatalogSystem = null;
  selectedCatalog: KatalogProfili = null;
  allCatalog: KatalogProfili[];
  filmSugFiltered: any;
  sideSugFiltered: any;
  formOfferPosition: FormGroup;
  searchBy = ["number"];
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
  offerData: Offer;
  exchange: any;
  loading = false;
  changeSetUpCost = false;

  constructor(
    public productionService: ProductionServiceService,
    public settingService: SettingsService,
    public offerService: OffersService,
    private cookieService: CookieService,
    private infoPopup: InfoPopupComponent,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.offerData = config.data;
  }

  ngOnInit(): void {
    if (!this.cookieService.check("creatorSelectedSystemOffer")) {
      this.cookieService.set(
        "creatorSelectedSystemOffer",
        JSON.stringify(this.selectedSystem)
      );
    } else {
      this.selectedSystem = JSON.parse(
        this.cookieService.get("creatorSelectedSystemOffer")
      );
    }
    this.filterBySystem();

    this.settingService.getHelpers().subscribe({
      next: (res) => {
        this.helper = res[0];
        this.changeAlu(false);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });

    this.formOfferPosition = new FormGroup({
      profilType: new FormControl("", { validators: [Validators.required] }),
      profilNumber: new FormControl("", { validators: [Validators.required] }),
      alu: new FormControl(false),
      catalogIdHelper: new FormControl(""),
      warranty: new FormControl(true),
      offerPositionSides: new FormArray([
        new FormGroup({
          side: new FormControl(""),
          filmNumber: new FormControl(null),
          filmWidth: new FormControl(null, {
            validators: [Validators.required, Validators.nullValidator],
          }),
          filmEntrusted: new FormControl(false),
          quantityMb: new FormControl(6.5, {
            validators: [Validators.required, Validators.nullValidator],
          }),
          hard: new FormControl(false),
          changeColor: new FormControl(false),
          bicolor: new FormControl(0),
          costChangeColor: new FormControl(0),
          costSetupAdditional: new FormControl(0),
          exchangeRate: new FormControl(null, {
            validators: [Validators.required, Validators.nullValidator],
          }),
          additional: new FormControl(0, {
            validators: [Validators.required, Validators.nullValidator],
          }),
          cost: new FormControl(this.offerData.client.helper_cost, {
            validators: [Validators.required, Validators.nullValidator],
          }),
          mIs: new FormControl(null, {
            validators: [Validators.required, Validators.nullValidator],
          }),
        }),
      ]),
    });
    // this.offerService.getExchangeHelper().subscribe({
    //   next: (res) => {
    //     this.exchange = res[0];
    //     this.formOfferPosition.controls.offerPositionSides['controls'][0]['controls'].exchangeRate.setValue(this.exchange.exchangeRate);
    //   }
    // });
    if (this.cookieService.check("lastUsedFilm")) {
      let okl = JSON.parse(this.cookieService.get("lastUsedFilm"));
      this.formOfferPosition.controls.offerPositionSides["controls"][0]
        .get("filmNumber")
        .setValue(okl.number);
      this.formOfferPosition.controls.offerPositionSides["controls"][0]
        .get("bicolor")
        .setValue(okl.surchargePercentage);
    }
    this.calculateSides();
  }

  filterBySystem() {
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
        "creatorSelectedSystemOffer",
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

  exit(id) {
    this.ref.close(id);
  }

  get sides(): FormArray {
    return this.formOfferPosition.get("offerPositionSides") as FormArray;
  }

  addSide() {
    const group = new FormGroup({
      side: new FormControl(""),
      filmNumber: new FormControl(null),
      filmWidth: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      filmEntrusted: new FormControl(false),
      quantityMb: new FormControl(6.5, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      hard: new FormControl(false),
      changeColor: new FormControl(false),
      bicolor: new FormControl(0),
      costSetupAdditional: new FormControl(0),
      costChangeColor: new FormControl(0),
      exchangeRate: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      additional: new FormControl(0, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      cost: new FormControl(this.offerData.client.helper_cost, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      mIs: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
    });
    this.sides.push(group);
    if (this.cookieService.check("lastUsedFilm")) {
      let okl = JSON.parse(this.cookieService.get("lastUsedFilm"));
      this.formOfferPosition.controls.offerPositionSides["controls"][
        this.sides.length - 1
      ]
        .get("filmNumber")
        .setValue(okl.number);
      this.formOfferPosition.controls.offerPositionSides["controls"][
        this.sides.length - 1
      ]
        .get("bicolor")
        .setValue(okl.surchargePercentage);
    }
    this.calculateSides();
    this.changeAlu(this.formOfferPosition.get("alu").value);
  }

  duplicateLastSide() {
    let tmp = this.sides.at(this.sides.length - 1);
    this.addSide();
    this.sides.at(this.sides.length - 1).patchValue(tmp.value);
  }

  removeSide(i: number) {
    this.sides.removeAt(i);
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

  onSelectCatalog(event: KatalogProfili) {
    this.selectedCatalog = event;
    this.formOfferPosition.get("profilNumber").setValue(event.number);
    this.formOfferPosition.get("profilType").setValue(event.offerName);
    this.formOfferPosition.get("alu").setValue(event.alu);
    this.formOfferPosition.get("catalogIdHelper").setValue(event.id);
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
  calculateSides() {
    for (let index = 0; index < this.sides.length; index++) {
      this.changeHard(index);
    }
  }

  changeHard(i) {
    let event = this.sides.controls[i]["controls"]["quantityMb"].value;
    this.loadM(event, i);
  }

  changeAlu(event) {
    if (event.checked) {
      this.sides.controls.forEach((x, index) => {
        x["controls"]["exchangeRate"].setValue(this.helper.exchangeRateAlu);
        this.loadM(x.get("quantityMb").value, index);
      });
    } else {
      this.sides.controls.forEach((x, index) => {
        x["controls"]["exchangeRate"].setValue(this.helper.exchangeRatePcv);
        this.loadM(x.get("quantityMb").value, index);
      });
    }
  }

  colorFieldChange(i, event) {
    if (event) {
      this.sides.controls[i]["controls"]["changeColor"].setValue(true);
    } else {
      this.sides.controls[i]["controls"]["changeColor"].setValue(false);
    }
  }

  changeColorChangebox(i, event) {
    if (event.checked) {
      this.sides.controls[i]["controls"]["costChangeColor"].setValue(
        this.offerData.client.helper_costChangeColor
      );
    } else {
      this.sides.controls[i]["controls"]["costChangeColor"].setValue("");
    }
  }

  loadM(event, i) {
    let tmpHard = this.sides.controls[i]["controls"]["hard"].value;
    let tmpAlu = this.formOfferPosition.get("alu").value;

    if (tmpAlu) {
      if (event <= 50) {
        if (tmpHard) {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_alu_mHardTo50
          );
        } else {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_alu_mEasyTo50
          );
        }
      } else if (event > 50 && event <= 150) {
        if (tmpHard) {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_alu_mHardTo150
          );
        } else {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_alu_mEasyTo150
          );
        }
      } else if (event > 150 && event <= 500) {
        if (tmpHard) {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_alu_mHardTo500
          );
        } else {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_alu_mEasyTo500
          );
        }
      } else if (event > 500) {
        if (tmpHard) {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_alu_mHardAbove500
          );
        } else {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_alu_mEasyAbove500
          );
        }
      }
    } else {
      if (event <= 50) {
        if (tmpHard) {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_pcv_mHardTo50
          );
        } else {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_pcv_mEasyTo50
          );
        }
      } else if (event > 50 && event <= 150) {
        if (tmpHard) {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_pcv_mHardTo150
          );
        } else {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_pcv_mEasyTo150
          );
        }
      } else if (event > 150 && event <= 500) {
        if (tmpHard) {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_pcv_mHardTo500
          );
        } else {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_pcv_mEasyTo500
          );
        }
      } else if (event > 500) {
        if (tmpHard) {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_pcv_mHardAbove500
          );
        } else {
          this.sides.controls[i]["controls"]["mIs"].setValue(
            this.offerData.client.helper_pcv_mEasyAbove500
          );
        }
      }
    }
  }

  addOfferPosition() {
    this.loading = true;
    this.offerService
      .addNewOfferPosition(
        this.offerData.offerNumber,
        this.formOfferPosition.value
      )
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessAdd("pozycja");
          this.loading = false;
          this.exit(1);
        },
        error: (err) => {
          this.infoPopup.showErrorAdd("pozycja");
          this.loading = false;
          console.log(err);
        },
      });
  }
}
