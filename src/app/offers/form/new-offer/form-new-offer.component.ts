import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { reduce } from "rxjs/operators";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { OffersService } from "../../offers.service";

@Component({
  selector: "app-form-new-offer",
  templateUrl: "./form-new-offer.component.html",
  styleUrls: ["./form-new-offer.component.scss"],
})
export class FormNewOfferComponent implements OnInit {
  color: ThemePalette = "warn";
  formOffer: FormGroup;
  loading = false;
  pl = {
    firstDayOfWeek: 1,
    dayNames: [
      "Niedziela",
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota",
    ],
    dayNamesShort: ["Niedz", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"],
    dayNamesMin: ["Ni", "Po", "Wt", "Śr", "Cz", "Pt", "So"],
    monthNames: [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ],
    monthNamesShort: [
      "Sty",
      "Lut",
      "Mar",
      "Kwi",
      "Maj",
      "Cze",
      "Lip",
      "Sie",
      "Wrz",
      "Paź",
      "Lis",
      "Gru",
    ],
    today: "Dziś",
    clear: "Wyczyść",
    dateFormat: "dd-mm-yy",
    weekHeader: "Wk",
  };

  constructor(
    public offerService: OffersService,
    private infoPopup: InfoPopupComponent,
    private route: ActivatedRoute,
    private router: Router,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.formOffer = new FormGroup({
      offerNumber: new FormControl(""),
      offerDate: new FormControl(new Date()),
      myCompany: new FormControl("", { validators: [Validators.required] }),
      client: new FormControl("", { validators: [Validators.required] }),
    });
    this.offerService.getMyCompanies();
    this.offerService.getClients();
  }

  addOffer() {
    this.loading = true;
    this.offerService.addNewOffer(this.formOffer.value).subscribe({
      next: (res) => {
        this.router.navigate(["../marketing/oferta/", res.offerNumber], {
          relativeTo: this.route,
        });
        this.infoPopup.showSuccessAdd("oferta");
        this.exit(1);
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.infoPopup.showErrorAdd("oferta");
        this.loading = false;
      },
      complete: () => {},
    });
  }
  exit(id) {
    this.ref.close(id);
  }
}
