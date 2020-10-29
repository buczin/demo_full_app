import { Component, OnInit, Inject } from "@angular/core";
import { SettingsService } from "../../settings.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { User } from "src/app/_class/user";
import { AppValidators } from "src/app/_validators/AppValidators";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-form-password",
  templateUrl: "./form-password.component.html",
  styleUrls: ["./form-password.component.scss"],
})
export class FormPasswordComponent implements OnInit {
  formPassword: FormGroup;
  user: User;
  loading = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private settingService: SettingsService,
    private info: InfoPopupComponent,
    private fb: FormBuilder
  ) {
    this.user = config.data;
  }

  ngOnInit() {
    this.formPassword = this.fb.group(
      {
        password: ["", { validators: Validators.required }],
        confirmPassword: ["", { validators: Validators.required }],
      },
      { validator: AppValidators.nomatch("password", "confirmPassword") }
    );
  }

  exit(id) {
    this.ref.close(id);
  }

  onChangePass() {
    this.loading = true;
    this.settingService
      .changePassword(this.user.id, this.formPassword.value)
      .subscribe({
        next: (res) => {
          this.info.showSuccessUpdate("hasło użytkownika");
          this.loading = false;
          this.exit(1);
        },
        error: (err) => {
          this.loading = false;
          this.info.showErrorUpdate("hasło użytkownika");
        },
        complete: () => {},
      });
  }
}
