import { Component, OnInit } from "@angular/core";
import {
  CatalogService,
  KatalogProfili,
  KatalogSystem,
} from "../catalog-service/catalog.service";
import { SelectItem, ConfirmationService } from "primeng/api";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { AuthService } from "src/app/_services/auth.service";
import { ThemePalette } from "@angular/material/core";
import { DialogService } from "primeng/dynamicdialog";
import { CatalogAddFormComponent } from "../form/catalog-add-form/catalog-add-form.component";
import { SystemAddFormComponent } from "../form/system-add-form/system-add-form.component";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

@Component({
  selector: "app-catalog-main",
  templateUrl: "./catalog-main.component.html",
  styleUrls: ["./catalog-main.component.scss"],
  animations: [
    trigger("rowExpansionTrigger", [
      state(
        "void",
        style({
          transform: "translateX(-10%)",
          opacity: 0,
        })
      ),
      state(
        "active",
        style({
          transform: "translateX(0)",
          opacity: 1,
        })
      ),
      transition("* <=> *", animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")),
    ]),
  ],
})
export class CatalogMainComponent implements OnInit {
  color: ThemePalette = "primary";
  catalog: KatalogProfili[] = [];
  system: KatalogSystem[] = [];
  loadingCatalog = false;

  onErrSystem: KatalogSystem = {
    id: 0,
    name: "---",
  };
  catalogCount: number;
  systemCount: number;
  onErr: KatalogProfili = {
    id: 0,
    systemProfil: this.onErrSystem,
    number: "---",
    dimOuter: "---",
    dimInner: "---",
    dimOneSide: "---",
    dimTwoSide: "---",
    dimTwoSideInner: "---",
    dimTwoSideOuter: "---",
    actualMeasurement: false,
    hard: false,
    profileType: "---",
    comments: "---",
  };

  err: boolean;
  newCatalog: boolean;
  available: SelectItem[];
  clonedCatalogs: { [s: string]: KatalogProfili } = {};
  clonedSystem: { [s: string]: KatalogSystem } = {};

  constructor(
    public dialogService: DialogService,
    public catalogService: CatalogService,
    private infoPopup: InfoPopupComponent,
    public auth: AuthService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.err = false;
    this.loadData();
  }

  loadData() {
    this.loadingCatalog = true;
    this.catalogService.loadSystems();

    this.catalogService.getCatalogs().subscribe({
      next: (res) => {
        this.catalog = res;
        this.err = false;
      },
      error: (err) => {
        this.infoPopup.showErrorDownload("katalogu");
        this.err = true;
        this.catalog.push(this.onErr);
      },
      complete: () => {
        this.loadingCatalog = false;
      },
    });

    this.catalogService.getCountCatalog().subscribe({
      next: (res) => {
        this.catalogCount = res;
      },
      error: (err) => {
        this.infoPopup.showErrorCount("katalogu");
      },
      complete: () => {},
    });

    this.catalogService.getCountSystem().subscribe({
      next: (res) => {
        this.systemCount = res;
      },
      error: (err) => {
        this.infoPopup.showErrorCount("systemów");
      },
      complete: () => {},
    });
  }

  loadSelectedSystem(kat) {
    this.catalog = [];
    this.loadingCatalog = true;
    if (kat == -1) {
      this.catalogService.getCatalogs().subscribe({
        next: (res) => {
          this.catalog = res;
          this.err = false;
        },
        error: (err) => {
          this.infoPopup.showErrorDownload("katalogu");
          this.err = true;
          this.catalog.push(this.onErr);
        },
        complete: () => {
          this.loadingCatalog = false;
        },
      });
    } else {
      this.catalogService.getCatalogsBySystem(kat.id).subscribe({
        next: (res) => {
          this.catalog = res;
          this.err = false;
        },
        error: (err) => {
          this.infoPopup.showErrorDownload("katalogu");
          this.err = true;
          this.catalog.push(this.onErr);
        },
        complete: () => {
          this.loadingCatalog = false;
        },
      });
    }
  }

  onRowDeleteCatalog(katalog: KatalogProfili) {
    this.confirmationService.confirm({
      message: "Na pewno chcesz usunąć " + katalog.number + "?",
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      acceptIcon: "pi pi-trash",
      acceptButtonStyleClass: "p-button-sm sb-button red",
      rejectButtonStyleClass: "p-button-sm sb-button o-gray",
      accept: () => {
        this.catalogService.deleteCatalog(katalog.id).subscribe({
          next: (res) => {
            this.infoPopup.showSuccessDelete("katalogu");
          },
          error: (err) => {
            this.infoPopup.showErrorDelete("katalogu");
          },
          complete: () => {
            this.loadData();
          },
        });
      },
    });
  }

  showBoolean(val) {
    if (val) {
      return "TAK";
    } else {
      return "";
    }
  }

  onRowDeleteSystem(system: KatalogSystem) {
    this.confirmationService.confirm({
      message: "Na pewno chcesz usunąć " + system.name + "?",
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      acceptIcon: "pi pi-trash",
      acceptButtonStyleClass: "p-button-sm sb-button red",
      rejectButtonStyleClass: "p-button-sm sb-button o-gray",
      accept: () => {
        this.catalogService.deleteSystem(system.id).subscribe({
          next: (res) => {
            this.infoPopup.showSuccessDelete("systemu");
          },
          error: (err) => {
            this.infoPopup.showErrorDelete("systemu");
          },
          complete: () => {
            this.loadData();
          },
        });
      },
    });
  }

  // DIALOGS

  showDialogToAddCatalog() {
    const ref = this.dialogService.open(CatalogAddFormComponent, {
      header: "Nowa pozycja katalogu",
      width: "800px",
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog catalog add was closed");
    });
  }

  showDialogToUpdateCatalog(rowData) {
    const ref = this.dialogService.open(CatalogAddFormComponent, {
      header: "Aktualizacja pozycji katalogu",
      data: rowData,
      width: "800px",
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog catalog add was closed");
    });
  }

  showDialogToAddSystem() {
    const ref = this.dialogService.open(SystemAddFormComponent, {
      header: "Nowy system",
      width: "450px",
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog system add was closed");
    });
  }

  showDialogToUpdateSystem(rowData) {
    const ref = this.dialogService.open(SystemAddFormComponent, {
      header: "Aktualizacja systemu - " + rowData.name,
      data: rowData,
      width: "450px",
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog system update was closed");
    });
  }
}
