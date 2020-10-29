import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-info-popup",
  templateUrl: "./info-popup.component.html",
  styleUrls: ["./info-popup.component.scss"],
})
export class InfoPopupComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  // MESSAGES SUCCESS

  showSuccessAdd(detail) {
    this.messageService.add({
      severity: "success",
      summary: "Dodanie " + detail,
      detail: "Poprawnie dodano pozycję " + detail,
    });
  }

  showSuccessUpdate(detail) {
    this.messageService.add({
      severity: "success",
      summary: "Aktualizacja " + detail,
      detail: "Poprawnie zaktualizowano pozycję " + detail,
    });
  }

  showSuccessDelete(detail) {
    this.messageService.add({
      severity: "success",
      summary: "Usunięcie " + detail,
      detail: "Poprawnie usunięto pozycję " + detail,
    });
  }

  // MESSAGES ERROR

  showErrorAdd(detail) {
    this.messageService.add({
      severity: "error",
      summary: "ERROR Dodanie " + detail,
      detail: "Nie udało się dodać pozycji " + detail,
    });
  }

  showErrorAddExists(detail) {
    this.messageService.add({
      severity: "error",
      summary: "ERROR Dodanie " + detail,
      detail: "Pozycja o numerze " + detail + " istnieje.",
    });
  }

  showErrorUpdate(detail) {
    this.messageService.add({
      severity: "error",
      summary: "ERROR Aktualizajca " + detail,
      detail: "Nie udało się zaktualizować pozycji " + detail,
    });
  }

  showErrorDelete(detail) {
    this.messageService.add({
      severity: "error",
      summary: "ERROR Usunięcie " + detail,
      detail: "Nie udało się usunąć pozycji " + detail,
    });
  }

  showErrorCount(detail) {
    this.messageService.add({
      severity: "error",
      summary: "ERROR Pobrania ilości " + detail,
      detail: "Nie udało się pobrać ilości " + detail,
    });
  }

  showErrorDownload(detail) {
    this.messageService.add({
      severity: "error",
      summary: "ERROR Pobieranie " + detail,
      detail:
        "Nie udało się pobrać pozycji " + detail + ". Proszę odświeżyć stronę",
    });
  }

  // CLEAR

  clear() {
    this.messageService.clear();
  }
}
