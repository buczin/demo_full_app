import { Component, OnInit } from "@angular/core";
import {
  FilmsService,
  Okleina,
  OkleinaEnum,
  Producent,
} from "../film-service/films.service";
import { SelectItem, ConfirmationService } from "primeng/api";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { AuthService } from "src/app/_services/auth.service";
import { FilmAddFormComponent } from "../film-add-form/film-add-form.component";
import { ProducerAddFormComponent } from "../producer-add-form/producer-add-form.component";
import { DialogService } from "primeng/dynamicdialog";

@Component({
  selector: "app-film-main",
  templateUrl: "./film-main.component.html",
  styleUrls: ["./film-main.component.scss"],
})
export class FilmMainComponent implements OnInit {
  film: Okleina[] = [];
  producer: Producent[] = [];
  positionpersite = 10;

  onErr: Okleina = {
    id: 0,
    number: "---",
    name: "---",
    producer: "---",
    ecoPlastNumber: "---",
    ralNumber: "---",
    imgLink: "---",
    status: OkleinaEnum.NIEDOSTEPNA,
  };
  filmCount: number;
  producerCount: number;
  err: boolean;
  newFilm: boolean;
  available: SelectItem[];
  displayDialogOkleina: boolean;
  selectedOkleina: any;
  loading = false;

  constructor(
    public dialogService: DialogService,
    public auth: AuthService,
    public filmService: FilmsService,
    private infoPopup: InfoPopupComponent,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.err = false;
    this.loadData();
    this.available = [
      { label: "Dostępna", value: OkleinaEnum.DOSTEPNA },
      { label: "Niedostępna", value: OkleinaEnum.NIEDOSTEPNA },
      { label: "Dost. Ograniczona", value: OkleinaEnum.DOSTEPNOSCOGRANICZONA },
    ];
  }

  loadData() {
    this.loading = true;
    this.displayDialogOkleina = false;
    this.filmService.loadProducersSelect();

    this.filmService.getOklieny().subscribe({
      next: (res) => {
        this.film = res;
        this.err = false;
      },
      error: (err) => {
        this.infoPopup.showErrorDownload("okleiny");
        this.err = true;
        this.film.push(this.onErr);
      },
      complete: () => {
        this.loading = false;
      },
    });

    this.filmService.getCountOkleina().subscribe({
      next: (res) => {
        this.filmCount = res;
      },
      error: (err) => {
        this.infoPopup.showErrorCount("oklein");
      },
      complete: () => {},
    });

    this.filmService.getCountProducer().subscribe({
      next: (res) => {
        this.producerCount = res;
      },
      error: (err) => {
        this.infoPopup.showErrorCount("producentów");
      },
      complete: () => {},
    });
  }

  onDialogHide() {
    this.displayDialogOkleina = false;
    this.selectedOkleina = null;
  }

  showDialogFilm(data) {
    this.displayDialogOkleina = true;
    this.selectedOkleina = data;
  }

  showDialogToAddFilm() {
    const dialogRef = this.dialogService.open(FilmAddFormComponent, {
      header: "Nowa okleina",
      // width: '550px'
    });
    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog add film was closed");
    });
  }

  showDialogToUpdateFilm(rowData) {
    const dialogRef = this.dialogService.open(FilmAddFormComponent, {
      header: "Aktualizacja okleiny",
      data: rowData,
      //  width: '550px',
    });
    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog update film was closed");
    });
  }

  showDialogToAddProducer() {
    const dialogRef = this.dialogService.open(ProducerAddFormComponent, {
      header: "Nowy producent",
      width: "450px",
    });
    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog add producer was closed");
    });
  }

  showDialogToUpdateProducer(rowData) {
    const dialogRef = this.dialogService.open(ProducerAddFormComponent, {
      header: "Aktualizacja producenta",
      data: rowData,
      width: "450px",
    });
    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog update producer was closed");
    });
  }

  onRowDeleteFilm(film: Okleina) {
    this.confirmationService.confirm({
      message: "Na pewno chcesz usunąć " + film.name + "?",
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      acceptIcon: "pi pi-trash",
      acceptButtonStyleClass: "p-button-sm sb-button red",
      rejectButtonStyleClass: "p-button-sm sb-button o-gray",
      accept: () => {
        this.filmService.deleteOklina(film.id).subscribe({
          next: (res) => {
            this.infoPopup.showSuccessDelete("okleiny");
          },
          error: (err) => {
            console.log(err);
            this.infoPopup.showErrorDelete("okleiny");
          },
          complete: () => {
            this.loadData();
          },
        });
      },
    });
  }

  onRowDeleteProducer(producer: Producent) {
    this.confirmationService.confirm({
      message: "Na pewno chcesz usunąć " + producer.producerName + "?",
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      acceptIcon: "pi pi-trash",
      acceptButtonStyleClass: "p-button-sm sb-button red",
      rejectButtonStyleClass: "p-button-sm sb-button o-gray",
      accept: () => {
        this.filmService.deleteProducer(producer.id).subscribe({
          next: (res) => {
            this.infoPopup.showSuccessDelete("producent");
          },
          error: (err) => {
            this.infoPopup.showErrorDelete("producent");
          },
          complete: () => {
            this.loadData();
          },
        });
      },
    });
  }
}
