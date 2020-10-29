import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  OrderPosition,
  PositionSide,
  ProductionServiceService,
} from "../../production-service/production-service.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {
  OfferHelpers,
  SettingsService,
} from "src/app/settings/settings.service";
import { GlobalService } from "src/app/_services/global.service";

@Component({
  selector: "app-form-after-complete-position",
  templateUrl: "./form-after-complete-position.component.html",
  styleUrls: ["./form-after-complete-position.component.scss"],
})
export class FormAfterCompletePositionComponent implements OnInit {
  loading = false;

  formAfterDone: FormGroup = new FormGroup({
    side: new FormControl(""),
    hard: new FormControl(false),
    filmEntrusted: new FormControl(false),
    changeColor: new FormControl(false),

    cost: new FormControl("", Validators.required),
    mIs: new FormControl("", Validators.required),
    exchangeRate: new FormControl("", Validators.required),
    bicolor: new FormControl(""),
    costChangeColor: new FormControl(""),
    comment: new FormControl(""),
  });

  orderId: any;
  positionId: any;
  helper: OfferHelpers;
  calculated = false;
  commentUpdate: string;

  positionData: OrderPosition;
  updateCostsSide: PositionSide;
  clientData: any;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private productionService: ProductionServiceService,
    private infoPopup: InfoPopupComponent,
    private settingService: SettingsService,
    private globalService: GlobalService
  ) {
    this.positionData = config.data;
  }

  ngOnInit() {
    this.orderId = this.positionData.productionOrder.orderNumber;
    this.clientData = this.positionData.productionOrder.client;
    this.positionId = this.positionData.id;
    if (this.positionData.comment) {
      this.commentUpdate = this.positionData.comment;
    } else {
      this.commentUpdate = " ";
    }

    this.settingService.getHelpers().subscribe({
      next: (res) => {
        this.helper = res[0];
        this.changeAlu(this.positionData.alu);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  selectSide(item) {
    this.updateCostsSide = item;
    this.loadDataToForm(item);
    console.log(item);
  }

  loadDataToForm(side) {
    this.formAfterDone.get("hard").setValue(side.hard);
    this.formAfterDone.get("side").setValue(side.side);
    this.formAfterDone.get("filmEntrusted").setValue(side.filmEntrusted);
    this.formAfterDone.get("costChangeColor").setValue(side.costChangeColor);
    this.formAfterDone.get("changeColor").setValue(side.changeColor);
    this.formAfterDone.get("bicolor").setValue(side.bicolor);
    this.costSet();
    this.loadM(side.sumAllDimensions);
  }

  costSet() {
    console.log("cost set");
    if (this.formAfterDone.get("filmEntrusted").value) {
      this.formAfterDone.get("cost").setValue(this.helper.entrustedCost);
    } else {
      this.formAfterDone.get("cost").setValue(this.helper.mainCost);
    }
  }

  changeHard() {
    console.log("change hard");
    this.loadM(this.updateCostsSide.sumAllDimensions);
  }

  changeAlu(event) {
    if (event.checked || event) {
      this.formAfterDone
        .get("exchangeRate")
        .setValue(this.helper.exchangeRateAlu);
      this.loadM(this.updateCostsSide.sumAllDimensions);
    } else {
      this.formAfterDone
        .get("exchangeRate")
        .setValue(this.helper.exchangeRatePcv);
      this.loadM(this.updateCostsSide.sumAllDimensions);
    }
  }

  colorFieldChange(event) {
    console.log("color field change");
    if (event) {
      this.formAfterDone.get("changeColor").setValue(true);
    } else {
      this.formAfterDone.get("changeColor").setValue(false);
    }
  }

  changeColorChangebox(event) {
    console.log("change color box");
    if (event.checked) {
      this.formAfterDone
        .get("costChangeColor")
        .setValue(this.clientData.helper_costChangeColor);
    } else {
      this.formAfterDone.get("costChangeColor").setValue("");
    }
  }

  loadM(event) {
    console.log("calc m");
    let tmpHard = this.formAfterDone.get("hard").value;
    let tmpAlu = this.positionData.alu;
    if (tmpAlu) {
      if (event <= 50) {
        if (tmpHard) {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_alu_mHardTo50);
        } else {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_alu_mEasyTo50);
        }
      } else if (event > 50 && event <= 150) {
        if (tmpHard) {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_alu_mHardTo150);
        } else {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_alu_mEasyTo150);
        }
      } else if (event > 150 && event <= 500) {
        if (tmpHard) {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_alu_mHardTo500);
        } else {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_alu_mEasyTo500);
        }
      } else if (event > 500) {
        if (tmpHard) {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_alu_mHardAbove500);
        } else {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_alu_mEasyAbove500);
        }
      }
    } else {
      if (event <= 50) {
        if (tmpHard) {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_pcv_mHardTo50);
        } else {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_pcv_mEasyTo50);
        }
      } else if (event > 50 && event <= 150) {
        if (tmpHard) {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_pcv_mHardTo150);
        } else {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_pcv_mEasyTo150);
        }
      } else if (event > 150 && event <= 500) {
        if (tmpHard) {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_pcv_mHardTo500);
        } else {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_pcv_mEasyTo500);
        }
      } else if (event > 500) {
        if (tmpHard) {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_pcv_mHardAbove500);
        } else {
          this.formAfterDone
            .get("mIs")
            .setValue(this.clientData.helper_pcv_mEasyAbove500);
        }
      }
    }
  }

  calculateSide() {
    this.globalService.loadingGlobal = true;
    this.productionService
      .calculateProductionSide(
        this.orderId,
        this.positionId,
        this.updateCostsSide.id,
        this.formAfterDone.value
      )
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("Obliczono");
          this.updateCostsSide = res;
          console.log(res);
          this.calculated = true;
          this.globalService.loadingGlobal = false;
        },
        error: (err) => {
          this.infoPopup.showErrorUpdate("nie obliczono");
          this.globalService.loadingGlobal = false;
          console.log(err);
        },
        complete: () => {},
      });
  }

  updateInfoAfterDone() {
    this.loading = true;

    this.productionService
      .updateCommentOnPosition(
        this.orderId,
        this.positionId,
        this.commentUpdate
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.infoPopup.showSuccessUpdate("uwagi");
          this.exit(1);
        },
        error: (err) => {
          this.infoPopup.showErrorUpdate("uwagi");
          console.log(err);
        },
        complete: () => {
          this.loading = false;
        },
      });

    this.productionService
      .calculateProductionSideSave(
        this.orderId,
        this.positionId,
        this.updateCostsSide.id,
        this.updateCostsSide
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.infoPopup.showSuccessAdd("obliczenia");
          this.exit(1);
        },
        error: (err) => {
          this.infoPopup.showErrorAdd("obliczenia");
          console.log(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  exit(id) {
    this.dialogRef.close(id);
  }
}
