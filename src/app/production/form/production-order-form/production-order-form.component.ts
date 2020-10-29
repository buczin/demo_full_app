import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import {
  ProductionServiceService,
} from "../../production-service/production-service.service";
import { ThemePalette } from "@angular/material/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-production-order-form",
  templateUrl: "./production-order-form.component.html",
  styleUrls: ["./production-order-form.component.scss"],
})
export class ProductionOrderFormComponent implements OnInit {
  blockSpecial: RegExp = /^[^!@#$%^&*()/\\_|{}[\]+=?:;"',.<>\s]+$/;
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

  color: ThemePalette = "warn";

  formProductionOrder: FormGroup;

  constructor(
    public productionService: ProductionServiceService,
    private infoPopup: InfoPopupComponent,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.formProductionOrder = new FormGroup({
      orderNumber: new FormControl(""),
      numberClientOrder: new FormControl(""),
      dateAcceptanceOrder: new FormControl(new Date()),
      myCompany: new FormControl("", { validators: [Validators.required] }),
      client: new FormControl("", { validators: [Validators.required] }),
    });
    this.productionService.loadDataToService();
  }

  exit(id) {
    this.dialogRef.close(id);
  }

  addProductionOrder() {
    if (!this.formProductionOrder.invalid) {
      this.loading = true;
      this.productionService
        .addProductionOrder(this.formProductionOrder.value)
        .subscribe({
          next: (res) => {
            this.router.navigate(["../produkcja/zlecenie/", res.orderNumber], {
              relativeTo: this.route,
            });
            this.infoPopup.showSuccessAdd("zlecenie");
            this.exit(1);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }
}
