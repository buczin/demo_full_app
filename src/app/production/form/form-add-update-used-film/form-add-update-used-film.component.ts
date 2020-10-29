import { Component, OnInit } from "@angular/core";
import {
  PositionSide,
  ProductionServiceService,
} from "../../production-service/production-service.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ConfirmationService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-form-add-update-used-film",
  templateUrl: "./form-add-update-used-film.component.html",
  styleUrls: ["./form-add-update-used-film.component.scss"],
})
export class FormAddUpdateUsedFilmComponent implements OnInit {
  loading = false;
  formUsedFilm: FormGroup;
  orderNumber: any;
  iUseTmp: any;
  orderData: any;

  updateUsedSide: PositionSide;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private productionService: ProductionServiceService,
    private infoPopup: InfoPopupComponent,
    private confirmationService: ConfirmationService
  ) {
    this.orderData = config.data;

    this.formUsedFilm = new FormGroup({
      id: new FormControl(""),
      side: new FormControl(""),
      usedFilm: new FormArray([
        new FormGroup({
          id: new FormControl(null),
          width: new FormControl(null, Validators.required),
          length: new FormControl(null, Validators.required),
        }),
      ]),
    });
  }

  ngOnInit() {
    this.orderNumber = this.orderData.productionOrder.orderNumber;
  }

  selectSide(side) {
    this.updateUsedSide = side;
    this.loadStructure(side);
  }

  loadStructure(side) {
    side.usedFilm.forEach((u, dindex) => {
      if (dindex != 0) {
        this.addUsedFilm();
      }
    });
    this.formUsedFilm.patchValue(side);

    this.usedFilm.controls.forEach((u) => {
      if (u.get("width").value == null || u.get("width").value == 0) {
        u.get("width").setValue(side.filmWidth);
      }
    });
  }

  get usedFilm(): FormArray {
    return this.formUsedFilm.get("usedFilm") as FormArray;
  }

  addUsedFilm() {
    this.usedFilm.push(
      new FormGroup({
        id: new FormControl(null),
        width: new FormControl(null, Validators.required),
        length: new FormControl(null, Validators.required),
      })
    );
  }

  removeUsedFilm(index) {
    if (this.usedFilm.value[index].id != "") {
      this.confirmationService.confirm({
        message: "Na pewno chcesz usunąć pozycję zużycia?",
        header: "Potwierdzenie",
        acceptLabel: "Tak",
        rejectLabel: "Nie",
        acceptIcon: "pi pi-trash",
        acceptButtonStyleClass: "p-button-raised p-button-sm p-button-danger",
        rejectButtonStyleClass:
          "p-button-raised p-button-outlined p-button-secondary p-button-sm",
        accept: () => {
          this.usedFilm.removeAt(index);
        },
      });
    } else {
      this.usedFilm.removeAt(index);
    }
  }

  exit(id) {
    this.dialogRef.close(id);
  }

  updateUsedFilmInfoOnSide() {
    this.loading = true;
    this.productionService
      .addOrderPositionSideUsedFilm(
        this.orderNumber,
        this.orderData.id,
        this.formUsedFilm.value
      )
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("zużycie");
          this.exit(1);
        },
        error: (err) => {
          this.infoPopup.showErrorUpdate("zużycie");
          console.log(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
