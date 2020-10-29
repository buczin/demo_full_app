import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SettingsService } from "../../settings.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { User } from "src/app/_class/user";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-form-users",
  templateUrl: "./form-users.component.html",
  styleUrls: ["./form-users.component.scss"],
})
export class FormUsersComponent implements OnInit {
  formUser: FormGroup;
  user: User;
  loading = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private settingService: SettingsService,
    private info: InfoPopupComponent
  ) {
    this.user = config.data;
  }

  ngOnInit() {
    if (this.user) {
      this.formUser = new FormGroup({
        name: new FormControl("", { validators: Validators.required }),
        username: new FormControl("", { validators: Validators.required }),
        active: new FormControl(false),
        role: new FormControl("", { validators: Validators.required }),
        catalogRead: new FormControl(false),
        catalogWrite: new FormControl(false),
        catalogDelete: new FormControl(false),
        systemRead: new FormControl(false),
        systemWrite: new FormControl(false),
        systemDelete: new FormControl(false),
        clientRead: new FormControl(false),
        clientWrite: new FormControl(false),
        clientDelete: new FormControl(false),
        filmRead: new FormControl(false),
        filmWrite: new FormControl(false),
        filmDelete: new FormControl(false),
        producerRead: new FormControl(false),
        producerWrite: new FormControl(false),
        producerDelete: new FormControl(false),
        offerRead: new FormControl(false),
        offerWrite: new FormControl(false),
        offerDelete: new FormControl(false),
        productionRead: new FormControl(false),
        productionWrite: new FormControl(false),
        productionDelete: new FormControl(false),
      });
      this.formUser.patchValue(this.user);
    } else {
      this.formUser = new FormGroup({
        name: new FormControl("", { validators: Validators.required }),
        username: new FormControl("", { validators: Validators.required }),
        password: new FormControl("", { validators: Validators.required }),
        active: new FormControl(false),
        role: new FormControl("", { validators: Validators.required }),

        catalogRead: new FormControl(false),
        catalogWrite: new FormControl(false),
        catalogDelete: new FormControl(false),
        systemRead: new FormControl(false),
        systemWrite: new FormControl(false),
        systemDelete: new FormControl(false),
        clientRead: new FormControl(false),
        clientWrite: new FormControl(false),
        clientDelete: new FormControl(false),
        filmRead: new FormControl(false),
        filmWrite: new FormControl(false),
        filmDelete: new FormControl(false),
        producerRead: new FormControl(false),
        producerWrite: new FormControl(false),
        producerDelete: new FormControl(false),
        offerRead: new FormControl(false),
        offerWrite: new FormControl(false),
        offerDelete: new FormControl(false),
        productionRead: new FormControl(false),
        productionWrite: new FormControl(false),
        productionDelete: new FormControl(false),
      });
    }
  }

  exit(id) {
    this.ref.close(id);
  }

  addUser() {
    this.loading = true;
    this.settingService.addUser(this.formUser.value).subscribe({
      next: (res) => {
        this.info.showSuccessAdd("użytkownika");
        this.loading = false;
        this.ref.close(1);
      },
      error: (err) => {
        this.info.showErrorAdd("użytkownika");
        this.loading = false;
      },
      complete: () => {},
    });
  }

  updateUser() {
    this.loading = true;
    this.settingService
      .updateUser(this.user.id, this.formUser.value)
      .subscribe({
        next: (res) => {
          this.info.showSuccessUpdate("użytkownika");
          this.loading = false;
          this.ref.close(1);
        },
        error: (err) => {
          console.log(err);
          this.info.showErrorUpdate("użytkownika");
          this.loading = false;
        },
        complete: () => {},
      });
  }
}
