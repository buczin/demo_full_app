import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../settings.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { FormUsersComponent } from "./form-users/form-users.component";
import { Location } from "@angular/common";
import { FormPasswordComponent } from "./form-password/form-password.component";
import { User } from "src/app/_class/user";
import { ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  users: any;

  constructor(
    public dialogService: DialogService,
    private location: Location,
    private settingService: SettingsService,
    private infoPopup: InfoPopupComponent,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.settingService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        console.log(this.users);
      },
      error: (err) => {
        this.infoPopup.showErrorDownload("użytkowników");
      },
      complete: () => {},
    });
  }

  yesNo(is) {
    return is ? "TAK" : "NIE";
  }

  openDialogAddUser() {
    const dialogRef = this.dialogService.open(FormUsersComponent, {
      header: "Nowy użytkownik",
      width: "500px",
    });
    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog was closed");
    });
  }

  openDialogUpdateUser(rowData) {
    const dialogRef = this.dialogService.open(FormUsersComponent, {
      header: "Aktualizacja użytkownika",
      data: rowData,
      width: "500px",
    });
    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog was closed");
    });
  }

  openDialogChangePass(usr): void {
    const dialogRef = this.dialogService.open(FormPasswordComponent, {
      header: "Aktualizacja hasła",
      data: usr,
      width: "450px",
    });
    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog pass was closed");
    });
  }

  onDeleteUser(user: User) {
    this.confirmationService.confirm({
      message: "Na pewno chcesz usunąć " + user.name + "?",
      header: "Potwierdzenie",
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      acceptIcon: "pi pi-trash",
      acceptButtonStyleClass: "p-button-sm sb-button red",
      rejectButtonStyleClass: "p-button-sm sb-button o-gray",
      accept: () => {
        this.settingService.deleteUser(user.id).subscribe({
          next: (res) => {
            this.infoPopup.showSuccessDelete("użytkownia");
          },
          error: (err) => {
            this.infoPopup.showErrorDelete("użytkownika");
          },
          complete: () => {
            this.loadData();
          },
        });
      },
    });
  }

  backClicked() {
    this.location.back();
  }
}
