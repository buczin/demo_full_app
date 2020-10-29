import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FilmsService } from "../film-service/films.service";
import { AppValidators } from "../../_validators/AppValidators";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-producer-add-form",
  templateUrl: "./producer-add-form.component.html",
  styleUrls: ["./producer-add-form.component.scss"],
})
export class ProducerAddFormComponent implements OnInit {
  formProducer: FormGroup;
  producerData: any;
  loading = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private filmService: FilmsService,
    private infoPopup: InfoPopupComponent
  ) {
    this.producerData = config.data;
  }

  ngOnInit() {
    this.formProducer = new FormGroup({
      producerName: new FormControl("", {
        validators: [Validators.required],
        asyncValidators: [AppValidators.producerExists],
        updateOn: "blur",
      }),
    });
    if (this.producerData) {
      this.formProducer.patchValue(this.producerData);
    }
  }

  exit(id) {
    this.ref.close(id);
  }

  addNewProducer() {
    this.loading = true;
    this.filmService.addProducer(this.formProducer.value).subscribe({
      next: (res) => {
        this.infoPopup.showSuccessAdd("producenta");
        this.loading = false;
        this.exit(1);
      },
      error: (err) => {
        this.infoPopup.showErrorAdd("producenta");
        this.loading = false;
      },
      complete: () => {},
    });
  }

  updateProducer() {
    this.loading = true;
    this.filmService
      .updateProducer(this.producerData.id, this.formProducer.value)
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("producenta");
          this.loading = false;
          this.exit(1);
        },
        error: (err) => {
          this.infoPopup.showErrorUpdate("producenta");
          this.loading = false;
        },
        complete: () => {},
      });
  }
}
