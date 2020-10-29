import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  ProductionServiceService,
} from "../../production-service/production-service.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { ThemePalette } from "@angular/material/core";
import { SelectItem } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
@Component({
  selector: "app-production-order-form-update",
  templateUrl: "./production-order-form-update.component.html",
  styleUrls: ["./production-order-form-update.component.scss"],
})
export class ProductionOrderFormUpdateComponent implements OnInit {
  color: ThemePalette = "primary";
  _statusOrder: SelectItem[] = [];
  myCompanyData = [];
  clientData = [];
  loading = false;
  orderData: any;

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
  formProductionOrderUpdate: FormGroup;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,

    private productionService: ProductionServiceService,
    private infoPopup: InfoPopupComponent
  ) {
    this.orderData = config.data;

    this.formProductionOrderUpdate = new FormGroup({
      numberClientOrder: new FormControl(""),
      myCompany: new FormControl("", { validators: [Validators.required] }),
      client: new FormControl("", { validators: [Validators.required] }),
      orderNumber: new FormControl(""),
      completed: new FormControl(false),
      statusOrder: new FormControl(""),
      dateAcceptanceOrder: new FormControl(""),
      dateCompletedOrder: new FormControl(""),
      dateReceiptOrder: new FormControl(""),
    });
  }

  ngOnInit() {
    this.productionService.getMyCompaniesSub().subscribe({
      next: (res) => {
        res.forEach((element) => {
          let el: SelectItem = { label: element.name, value: element };
          this.myCompanyData.push(el);
        });
      },
      error: (err) => {
        console.error("Can`t download myCompanies");
      },
      complete: () => {
        this.formProductionOrderUpdate.patchValue(this.orderData);
      },
    });

    this.productionService.getClientsSub().subscribe({
      next: (res) => {
        res.forEach((element) => {
          let el: SelectItem = { label: element.name, value: element };
          this.clientData.push(el);
        });
      },
      error: (err) => {
        console.error("Can`t download clients");
      },
      complete: () => {
        this.formProductionOrderUpdate.patchValue(this.orderData);
      },
    });
  }

  changeCompleted() {
    if (this.formProductionOrderUpdate.value.completed == true) {
      this.formProductionOrderUpdate.controls.dateCompletedOrder.setValue(
        new Date()
      );
    } else {
      this.formProductionOrderUpdate.controls.dateCompletedOrder.setValue("");
      this.formProductionOrderUpdate.controls.dateReceiptOrder.setValue("");
    }
  }

  exit(id) {
    this.dialogRef.close(id);
  }

  updateProductionOrder() {
    if (!this.formProductionOrderUpdate.invalid) {
      this.loading = true;
      this.productionService
        .updateProductionOrder(
          this.orderData.orderNumber,
          this.formProductionOrderUpdate.value
        )
        .subscribe({
          next: (res) => {
            this.infoPopup.showSuccessUpdate("zlecenie");
            this.exit(1);
          },
          error: (err) => {
            this.infoPopup.showErrorUpdate("zlecenie");
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }
}
