import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { Offer, OffersService } from "../../offers.service";

@Component({
  selector: "app-update-client-helper-range",
  templateUrl: "./update-client-helper-range.component.html",
  styleUrls: ["./update-client-helper-range.component.scss"],
})
export class UpdateClientHelperRangeComponent implements OnInit {
  formClientHelper: FormGroup;
  offerData: Offer;
  loading = false;

  constructor(
    private infoPopup: InfoPopupComponent,
    public ref: DynamicDialogRef,
    private offerService: OffersService,
    public config: DynamicDialogConfig
  ) {
    this.offerData = config.data;
  }

  ngOnInit(): void {
    this.formClientHelper = new FormGroup({
      helper_pcv_mEasyTo50: new FormControl(""),
      helper_pcv_mEasyTo150: new FormControl(""),
      helper_pcv_mEasyTo500: new FormControl(""),
      helper_pcv_mEasyAbove500: new FormControl(""),
      helper_pcv_mHardTo50: new FormControl(""),
      helper_pcv_mHardTo150: new FormControl(""),
      helper_pcv_mHardTo500: new FormControl(""),
      helper_pcv_mHardAbove500: new FormControl(""),

      helper_alu_mEasyTo50: new FormControl(""),
      helper_alu_mEasyTo150: new FormControl(""),
      helper_alu_mEasyTo500: new FormControl(""),
      helper_alu_mEasyAbove500: new FormControl(""),
      helper_alu_mHardTo50: new FormControl(""),
      helper_alu_mHardTo150: new FormControl(""),
      helper_alu_mHardTo500: new FormControl(""),
      helper_alu_mHardAbove500: new FormControl(""),
    });
    this.formClientHelper.patchValue(this.offerData.client);
  }

  updateHelpers() {
    this.loading = true;
    this.offerService
      .updateClientHelpersRange(
        this.offerData.client.id,
        this.formClientHelper.value
      )
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("parametry");
          this.ref.close(1);
        },
        error: (err) => {
          this.infoPopup.showErrorUpdate("parametry");
          console.log(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  exit(id) {
    this.ref.close(id);
  }
}
