import { Component, OnInit } from "@angular/core";
import { MyCompany, SettingsService } from "../settings.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { FormMycompanyComponent } from "./form-mycompany/form-mycompany.component";
import { Location } from "@angular/common";
import { ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";

@Component({
  selector: "app-mycompany",
  templateUrl: "./mycompany.component.html",
  styleUrls: ["./mycompany.component.scss"],
})
export class MycompanyComponent implements OnInit {
  mycompanies: MyCompany[];

  constructor(
    private location: Location,
    public dialogService: DialogService,
    private settingService: SettingsService,
    private infoPopup: InfoPopupComponent,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.settingService.getMyCompanies().subscribe({
      next: (res) => {
        this.mycompanies = res;
      },
      error: (err) => {
        this.infoPopup.showErrorDownload("firm");
      },
      complete: () => {},
    });
  }

  openDialogAddCompany(): void {
    const dialogRef = this.dialogService.open(FormMycompanyComponent, {
      header: "Nowa moja firma",
      width: "900px",
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog was closed");
    });
  }

  openDialogUpdateCompany(rowData): void {
    const dialogRef = this.dialogService.open(FormMycompanyComponent, {
      header: "Aktualizacja mojej firmy",
      data: rowData,
      width: "900px",
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog was closed");
    });
  }

  backClicked() {
    this.location.back();
  }

  onDeleteMyCompant(company) {
    this.confirmationService.confirm({
      message: "Na pewno chcesz usunąć " + company.name + "?",
      header: "Potwierdzenie",
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      acceptIcon: "pi pi-trash",
      acceptButtonStyleClass: "p-button-sm sb-button red",
      rejectButtonStyleClass: "p-button-sm sb-button o-gray",
      accept: () => {
        this.settingService.deleteMyCompany(company.id).subscribe({
          next: (res) => {
            this.infoPopup.showSuccessDelete("moja firma");
          },
          error: (err) => {
            this.infoPopup.showErrorDelete("moja firma");
          },
          complete: () => {
            this.loadData();
          },
        });
      },
    });
  }
}
