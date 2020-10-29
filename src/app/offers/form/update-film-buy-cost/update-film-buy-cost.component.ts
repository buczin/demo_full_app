import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { Offer, OffersService } from "../../offers.service";

@Component({
  selector: "app-update-film-buy-cost",
  templateUrl: "./update-film-buy-cost.component.html",
  styleUrls: ["./update-film-buy-cost.component.scss"],
})
export class UpdateFilmBuyCostComponent implements OnInit {
  formCost: FormGroup;
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
    this.formCost = new FormGroup({
      costNettoBuyFilm: new FormControl(""),
      buyFilmComment: new FormControl("Okleina potrzebna do okleinowania "),
    });
    this.formCost
      .get("costNettoBuyFilm")
      .setValue(this.offerData.costNettoBuyFilm);
    if (this.offerData.buyFilmComment) {
      this.formCost
        .get("buyFilmComment")
        .setValue(this.offerData.buyFilmComment);
    }
  }

  saveCost() {
    this.loading = true;
    this.offerService
      .updateFilmBuyCost(this.offerData.offerNumber, this.formCost.value)
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("koszt zakupu okleiny");
          this.loading = false;
          this.ref.close(1);
        },
        error: (err) => {
          this.loading = false;
          this.infoPopup.showErrorUpdate("koszt zakupu okleiny");
          console.log(err);
        },
        complete: () => {},
      });
  }

  exit(id) {
    this.ref.close(id);
  }
}
