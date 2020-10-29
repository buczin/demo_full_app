import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  ProductionServiceService,
  StatusOrder,
} from "../../production-service/production-service.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { FormGroup, FormControl } from "@angular/forms";
import { SelectItem } from "primeng/api";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-form-change-order-status",
  templateUrl: "./form-change-order-status.component.html",
  styleUrls: ["./form-change-order-status.component.scss"],
})
export class FormChangeOrderStatusComponent implements OnInit {
  loading = false;
  formChangeStatus: FormGroup;
  _statusOrder: SelectItem[] = [];
  order: any;
  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private productionService: ProductionServiceService,
    private infoPopup: InfoPopupComponent
  ) {
    this.order = config.data;
  }

  ngOnInit() {
    this._statusOrder = [
      { label: "Nowe", value: StatusOrder.NEW },
      { label: "Oczekuje", value: StatusOrder.WAITING },
      { label: "Realizacja", value: StatusOrder.INPROGRESS },
      { label: "Zakończone", value: StatusOrder.DONE },
      { label: "Wydano wszystkie pozycje", value: StatusOrder.ISSUEDALL },
      { label: "Anulowano", value: StatusOrder.CANCELED },
      { label: "Archiwum", value: StatusOrder.ARCHIVED },
    ];

    this.formChangeStatus = new FormGroup({
      orderNumber: new FormControl(""),
      statusOrder: new FormControl(""),
    });
    this.formChangeStatus.patchValue(this.order);
  }

  changeStatus() {
    this.loading = true;
    this.productionService
      .changeProductionOrderStatus(
        this.order.orderNumber,
        this.formChangeStatus.value
      )
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("status");
          this.exit(1);
        },
        error: (err) => {
          console.log(err);
          this.infoPopup.showErrorUpdate("status");
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
