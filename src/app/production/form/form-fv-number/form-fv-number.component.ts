import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductionServiceService } from "../../production-service/production-service.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-form-fv-number",
  templateUrl: "./form-fv-number.component.html",
  styleUrls: ["./form-fv-number.component.scss"],
})
export class FormFvNumberComponent implements OnInit {
  formFvPosition: FormGroup;
  orderId: any;
  positionId: any;
  loading = false;
  positionData: any;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private productionService: ProductionServiceService,
    private infoPopup: InfoPopupComponent
  ) {
    this.positionData = config.data;
  }

  ngOnInit() {
    this.orderId = this.positionData.productionOrder.orderNumber;
    this.positionId = this.positionData.id;
    this.formFvPosition = new FormGroup({
      id: new FormControl(""),
      numberFv: new FormControl("", { validators: [Validators.required] }),
    });
    this.loadDataToForm();
  }

  loadDataToForm() {
    this.formFvPosition.patchValue(this.positionData);
  }

  updateFv() {
    if (!this.formFvPosition.invalid) {
      this.loading = true;
      this.productionService
        .updateOrderPositionFvNumber(
          this.orderId,
          this.positionId,
          this.formFvPosition.value.numberFv
        )
        .subscribe({
          next: (res) => {
            this.infoPopup.showSuccessUpdate("");
            this.exit(1);
          },
          error: (err) => {
            this.infoPopup.showErrorUpdate("informacji");
            console.log(err);
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }

  exit(id) {
    this.dialogRef.close(id);
  }
}
