import { Component, OnInit } from "@angular/core";
import { FilmsService, OkleinaEnum } from "../film-service/films.service";
import { SelectItem } from "primeng/api";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AppValidators } from "src/app/_validators/AppValidators";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-film-add-form",
  templateUrl: "./film-add-form.component.html",
  styleUrls: ["./film-add-form.component.scss"],
})
export class FilmAddFormComponent implements OnInit {
  formFilm: FormGroup;
  filmData: any;
  loading = false;

  available: SelectItem[] = [
    { label: "Dostępna", value: OkleinaEnum.DOSTEPNA },
    { label: "Niedostępna", value: OkleinaEnum.NIEDOSTEPNA },
    { label: "Dost. Ograniczona", value: OkleinaEnum.DOSTEPNOSCOGRANICZONA },
  ];
  selectedFilm: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public filmService: FilmsService,
    private infoPopup: InfoPopupComponent
  ) {
    this.filmData = config.data;
  }

  ngOnInit() {
    if (this.filmData) {
      this.formFilm = new FormGroup({
        number: new FormControl("", { validators: [Validators.required] }),
        name: new FormControl("", { validators: [Validators.required] }),
        producer: new FormControl("", { validators: [Validators.required] }),
        imgLink: new FormControl(""),
        status: new FormControl("", { validators: [Validators.required] }),
        ralNumber: new FormControl(""),
        otherNumber: new FormControl(""),
        surchargePercentage: new FormControl(""),
        maxWidth: new FormControl(""),
      });
      let test = this.available.find((x) => x.value == this.filmData.status);
      this.filmData.status = test;
      this.formFilm.patchValue(this.filmData);
    } else {
      this.formFilm = new FormGroup({
        number: new FormControl("", {
          validators: [Validators.required],
          asyncValidators: [AppValidators.filmExists],
          updateOn: "blur",
        }),
        name: new FormControl("", { validators: [Validators.required] }),
        producer: new FormControl("", { validators: [Validators.required] }),
        imgLink: new FormControl(""),
        status: new FormControl(this.available[0], {
          validators: [Validators.required],
        }),
        ralNumber: new FormControl(""),
        otherNumber: new FormControl(""),
        surchargePercentage: new FormControl(""),
        maxWidth: new FormControl(""),
      });
    }
  }

  selectFilm(event: Event) {
    this.selectedFilm = (event.target as HTMLSelectElement).value;
  }

  exit(id) {
    this.ref.close(id);
  }

  addNewFilm() {
    this.loading = true;
    this.formFilm.value.status = this.formFilm.value.status.value;
    this.filmService.addOklina(this.formFilm.value).subscribe({
      next: (res) => {
        this.infoPopup.showSuccessAdd("okleiny");
        this.loading = false;
        this.exit(1);
      },
      error: (err) => {
        this.loading = false;
        this.infoPopup.showErrorAdd("okleiny");
      },
      complete: () => {},
    });
  }

  updateFilm() {
    this.loading = true;
    this.formFilm.value.status = this.formFilm.value.status.value;
    this.filmService
      .updateOkleina(this.filmData.id, this.formFilm.value)
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("okleiny");
          this.loading = false;
          this.exit(1);
        },
        error: (err) => {
          this.infoPopup.showErrorUpdate("okleiny");
          this.loading = false;
        },
        complete: () => {},
      });
  }
}
