import { Component, OnInit } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { OfferHelpers, SettingsService } from "../settings.service";
import { Location } from "@angular/common";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-offer-param",
  templateUrl: "./offer-param.component.html",
  styleUrls: ["./offer-param.component.scss"],
})
export class OfferParamComponent implements OnInit {
  helpers: OfferHelpers;

  loadingSaveHelper = false;
  displayFormExchange = false;
  displayFormSetCost = false;
  displayFormSetUpCost = false;
  displayFormPrintText = false;
  displayFormChangeColor = false;
  displayCostsRange = false;
  formHelpers: FormGroup;

  constructor(
    private infoPopup: InfoPopupComponent,
    private confirmationService: ConfirmationService,
    private location: Location,
    private settingService: SettingsService
  ) {
    console.log(this.helpers);
  }

  ngOnInit(): void {
    this.loadData();
  }

  backClicked() {
    this.location.back();
  }

  loadData() {
    this.loadingSaveHelper = true;

    this.formHelpers = new FormGroup({
      id: new FormControl(""),
      exchangeRateAlu: new FormControl(""),
      exchangeRatePcv: new FormControl(""),
      defaultClientSetUpCost: new FormControl(""),
      defaultSetCost: new FormControl(""),
      defaultPrintTextHeader: new FormControl(""),
      defaultPrintTextTableFotter: new FormControl(""),
      defaultCostChangeColor: new FormControl(""),

      default_helper_pcv_mEasyTo50: new FormControl(""),
      default_helper_pcv_mEasyTo150: new FormControl(""),
      default_helper_pcv_mEasyTo500: new FormControl(""),
      default_helper_pcv_mEasyAbove500: new FormControl(""),
      default_helper_pcv_mHardTo50: new FormControl(""),
      default_helper_pcv_mHardTo150: new FormControl(""),
      default_helper_pcv_mHardTo500: new FormControl(""),
      default_helper_pcv_mHardAbove500: new FormControl(""),

      default_helper_alu_mEasyTo50: new FormControl(""),
      default_helper_alu_mEasyTo150: new FormControl(""),
      default_helper_alu_mEasyTo500: new FormControl(""),
      default_helper_alu_mEasyAbove500: new FormControl(""),
      default_helper_alu_mHardTo50: new FormControl(""),
      default_helper_alu_mHardTo150: new FormControl(""),
      default_helper_alu_mHardTo500: new FormControl(""),
      default_helper_alu_mHardAbove500: new FormControl(""),
    });

    this.settingService.getHelpers().subscribe({
      next: (res) => {
        this.helpers = res[0];
        if (this.helpers) {
          this.formHelpers.patchValue(this.helpers);
        }
        this.loadingSaveHelper = false;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  updateCostsRange() {
    console.log(this.formHelpers.value);
    this.loadingSaveHelper = true;
    this.settingService
      .updateHelpersCostsRange(this.formHelpers.value)
      .subscribe({
        next: (res) => {
          this.loadData();
          this.exit();
          this.loadingSaveHelper = false;
        },
        error: (err) => {
          console.log(err);
          this.loadingSaveHelper = false;
        },
        complete: () => {},
      });
  }

  updateHelpersExchange() {
    console.log(this.formHelpers.value);
    this.loadingSaveHelper = true;
    this.settingService
      .updateHelpersExchange(this.formHelpers.value)
      .subscribe({
        next: (res) => {
          this.loadData();
          this.exit();
          this.loadingSaveHelper = false;
        },
        error: (err) => {
          console.log(err);
          this.loadingSaveHelper = false;
        },
        complete: () => {},
      });
  }

  updateHelpersSetCost() {
    this.loadingSaveHelper = true;
    this.settingService.updateHelpersSetCost(this.formHelpers.value).subscribe({
      next: (res) => {
        this.helpers = res;
        this.loadData();
        this.exit();
        this.loadingSaveHelper = false;
      },
      error: (err) => {
        console.log(err);
        this.loadingSaveHelper = false;
      },
      complete: () => {},
    });
  }

  updateHelpersSetUpCost() {
    this.loadingSaveHelper = true;
    this.settingService
      .updateHelpersSetUpCost(this.formHelpers.value)
      .subscribe({
        next: (res) => {
          this.helpers = res;
          this.loadData();
          this.exit();
          this.loadingSaveHelper = false;
        },
        error: (err) => {
          console.log(err);
          this.loadingSaveHelper = false;
        },
        complete: () => {},
      });
  }

  updateHelpersPrintText() {
    this.loadingSaveHelper = true;
    this.settingService.updatePrintText(this.formHelpers.value).subscribe({
      next: (res) => {
        this.helpers = res;
        this.loadData();
        this.exit();
        this.loadingSaveHelper = false;
      },
      error: (err) => {
        console.log(err);
        this.loadingSaveHelper = false;
      },
      complete: () => {},
    });
  }

  updateHelpersColorChange() {
    console.log("test");
    console.log(this.formHelpers.value);
    this.loadingSaveHelper = true;
    this.settingService
      .updateHelpersColorChange(this.formHelpers.value)
      .subscribe({
        next: (res) => {
          this.helpers = res;
          this.loadData();
          this.exit();
          this.loadingSaveHelper = false;
        },
        error: (err) => {
          console.log(err);
          this.loadingSaveHelper = false;
        },
        complete: () => {},
      });
  }

  exit() {
    this.displayFormExchange = false;
    this.displayFormSetCost = false;
    this.displayFormSetUpCost = false;
    this.displayFormPrintText = false;
    this.displayFormChangeColor = false;
    this.displayCostsRange = false;
  }
}
