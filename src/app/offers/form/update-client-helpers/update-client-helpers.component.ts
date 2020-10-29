import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { Offer, OffersService } from "../../offers.service";

@Component({
  selector: "app-update-client-helpers",
  templateUrl: "./update-client-helpers.component.html",
  styleUrls: ["./update-client-helpers.component.scss"],
})
export class UpdateClientHelpersComponent implements OnInit {
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
      helper_cost: new FormControl(""),
      helper_setUpCost: new FormControl(""),
      helper_costChangeColor: new FormControl(""),
    });
    this.formClientHelper.patchValue(this.offerData.client);
  }

  updateHelpers() {
    this.loading = true;
    this.offerService
      .updateClientHelpers(
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
