import { Component, OnInit, Inject } from "@angular/core";
import { ProductionServiceService } from "../../production-service/production-service.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { FormGroup, FormControl } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-form-done-position",
  templateUrl: "./form-done-position.component.html",
  styleUrls: ["./form-done-position.component.scss"],
})
export class FormDonePositionComponent implements OnInit {
  color: ThemePalette = "primary";
  formDonePosition: FormGroup;
  orderId: any;
  positionId: any;
  loading = false;
  positionData: any;
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
    this.formDonePosition = new FormGroup({
      id: new FormControl(""),
      completed: new FormControl(false),
      dateCompletedPosition: new FormControl(""),
    });
    this.loadDataToForm();
    this.changeCompleted();
  }

  loadDataToForm() {
    this.formDonePosition.patchValue(this.positionData);
  }

  changeCompleted() {
    if (this.formDonePosition.value.completed == true) {
      this.formDonePosition.controls.dateCompletedPosition.enable();
      this.formDonePosition.controls.dateCompletedPosition.patchValue(
        new Date()
      );
    } else {
      this.formDonePosition.controls.dateCompletedPosition.disable();
    }
  }

  updateDoneInformation() {
    this.loading = true;
    this.productionService
      .updateOrderPositionDoneInfo(
        this.orderId,
        this.positionId,
        this.formDonePosition.value
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

  exit(id) {
    this.dialogRef.close(id);
  }
}
