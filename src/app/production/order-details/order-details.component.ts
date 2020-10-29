import { Component, OnInit, Injectable, Input } from "@angular/core";
import {
  ActivatedRoute,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import {
  ProductionServiceService,
  OrderPosition,
  StatusOrder,
} from "../production-service/production-service.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { Observable, BehaviorSubject } from "rxjs";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { CookieService } from "ngx-cookie-service";
import { ProductionOrderFormUpdateComponent } from "../form/production-order-form-update/production-order-form-update.component";
import { OrderPositionFormComponent } from "../form/order-position-form/order-position-form.component";
import { TreeNode, ConfirmationService } from "primeng/api";
import { OrderPositionFormUpdateComponent } from "../form/order-position-form-update/order-position-form-update.component";
import { MenuItem } from "primeng/api";
import { PrintService } from "src/app/print/print.service";
import { FormAddUpdateUsedFilmComponent } from "../form/form-add-update-used-film/form-add-update-used-film.component";
import { FormDonePositionComponent } from "../form/form-done-position/form-done-position.component";
import { FormFvNumberComponent } from "../form/form-fv-number/form-fv-number.component";
import { FormAfterCompletePositionComponent } from "../form/form-after-complete-position/form-after-complete-position.component";
import { FormChangeOrderStatusComponent } from "../form/form-change-order-status/form-change-order-status.component";
import { FormAddFromExcelComponent } from "../form/form-add-from-excel/form-add-from-excel.component";
import { ContextMenu } from "primeng/contextmenu";
import { DialogService } from "primeng/dynamicdialog";
import { GlobalService } from "src/app/_services/global.service";
import { AuthService } from "src/app/_services/auth.service";
import { PrintOfferService } from "src/app/print/print-offer.service";

@Injectable()
export class OrderResolver implements Resolve<any> {
  constructor(private productionService: ProductionServiceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    console.log("Resolve Order with id: " + route.paramMap.get("id"));
    return this.productionService.getProductionOrder(route.paramMap.get("id"));
  }
}

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
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
export class OrderDetailsComponent implements OnInit {
  printDialog = false;
  doneDialog = false;

  orderNumber: string;
  productionOrder: any;
  orderPosition: OrderPosition[];
  loading = new BehaviorSubject<boolean>(false);
  _selectedColumns: any[];
  _sideSelectedColumns: any[];
  length = 3;
  rowSideLength = 2;
  sideMenuItems: MenuItem[];
  positionMenuItems: MenuItem[];
  usedMenuItems: MenuItem[];
  selectedSide: any;
  menuContextSideOpened = false;
  loadingPrint = false;
  frozenCols = [
    { field: "profilNumber", header: "Numer kształ." },
    { field: "profilType", header: "Rodzaj kształ." },
  ];

  selectedPosition: OrderPosition;

  deleteOrderIf = new BehaviorSubject<boolean>(false);
  canDelete = false;
  orderPosition2: TreeNode[];
  orderMap = {};

  printColumnPosition = [
    { field: "numberFv", label: "Numer faktury", show: false },
    { field: "accepted", label: "Zaakceptowana", show: false },
    { field: "statusOrderPosition", label: "Status", show: false },
    { field: "completed", label: "Zakończono", show: false },
    { field: "dateCompletedPosition", label: "Data Zakończenia", show: false },
    { field: "warranty", label: "Gwarancja", show: false },
    { field: "comment", label: "Uwagi", show: true },
    { field: "footer", label: "Stopka", show: true },
  ];

  printColumnSide = [
    { field: "usedFilm", label: "Zużycie", show: true },
    { field: "sumAllDimensions", label: "Łącznie mb", show: true },
    { field: "plnMb", label: "pln/mb", show: true },
    { field: "costSet", label: "kpl.6", show: true },
    { field: "costSetup", label: "Ustawienie", show: true },
    { field: "costChangeColor", label: "Zmiana koloru", show: true },
    { field: "employees", label: "Pracownicy", show: false },
    { field: "glue", label: "Klej", show: false },
    { field: "filmEntrusted", label: "Okl. powierzona", show: false },
    { field: "hard", label: "Trudne", show: false },
    { field: "statusPositionSide", label: "Status", show: false },
  ];

  columns = [
    { field: "numberFv", label: "Numer faktury", show: false },
    { field: "accepted", label: "Zaakceptowana", show: false },
    { field: "statusOrderPosition", label: "Status", show: false },
    { field: "completed", label: "Zakończono", show: false },
    { field: "dateCompletedPosition", label: "Data Zakończenia", show: false },
    { field: "warranty", label: "Gwarancja", show: false },
    { field: "comment", label: "Uwagi", show: true },
  ];

  sideColumns = [
    { field: "usedFilm", label: "Zużycie", show: true },
    { field: "sumAllDimensions", label: "Łącznie mb", show: true },
    { field: "plnMb", label: "pln/mb", show: true },
    { field: "costSet", label: "kpl.6", show: true },
    { field: "costSetup", label: "Ustawienie", show: true },
    { field: "costChangeColor", label: "Zmiana koloru", show: true },
    { field: "employees", label: "Pracownicy", show: false },
    { field: "glue", label: "Klej", show: false },
    { field: "filmEntrusted", label: "Okl. powierzona", show: false },
    { field: "hard", label: "Trudne", show: false },
    { field: "statusPositionSide", label: "Status", show: false },
  ];

  constructor(
    private route: ActivatedRoute,
    public dialog: DialogService,
    public auth: AuthService,
    private infoPopup: InfoPopupComponent,
    public productionService: ProductionServiceService,
    private cookieService: CookieService,
    private confirmationService: ConfirmationService,
    public printService: PrintService,
    private printOfferService: PrintOfferService,
    private router: Router,
    public globalService: GlobalService
  ) {}

  ngOnInit() {
    this.productionService.loadCatalogSuggestions();
    this.productionService.loadFilmSuggestions();
    this.productionService.loadAllSystems();
    this.loading.next(true);
    this.orderNumber = this.route.snapshot.params["id"];
    this.globalService.loadingGlobal = false;
    //=====================

    this.route.data.subscribe({
      next: (res) => {
        this.productionOrder = res.order;
        this.checkStatus();
      },
      error: (err) => {
        console.log(err);
        this.infoPopup.showErrorDownload("zlecenia");
      },
      complete: () => {},
    });

    this.productionService.getOrderPositions(this.orderNumber).subscribe({
      next: (res) => {
        this.orderPosition = [];
        this.orderPosition = res.sort(
          (a, b) => a.positionNumber - b.positionNumber
        );
        this.orderPosition.forEach((x) => {
          x = x.postionSide.sort((a, b) => {
            if (
              a.side == "zew" ||
              a.side == "wew" ||
              a.side == "obu-wew" ||
              a.side == "obu-zew" ||
              a.side == "obu"
            ) {
              if (a.side > b.side) {
                return -1;
              }
              if (a.side < b.side) {
                return 1;
              }
            } else {
              if (a.side < b.side) {
                return -1;
              }
              if (a.side > b.side) {
                return 1;
              }
            }
            return 0;
          });
        });
      },
      error: (err) => {
        console.log(err);
        this.infoPopup.showErrorDownload("pozycji zlecenia");
      },
      complete: () => {
        this.loading.next(false);
      },
    });

    // ============== SETTING COOKIES SELECTED COLUMNS =============
    if (!this.cookieService.check("pOrderColumns")) {
      this.cookieService.set("pOrderColumns", JSON.stringify(this.columns));
      this._selectedColumns = this.columns;
    } else {
      this.columns = JSON.parse(this.cookieService.get("pOrderColumns"));
      this._selectedColumns = this.columns.filter((col) => col.show == true);
    }

    // Side
    if (!this.cookieService.check("pSideColumns")) {
      this.cookieService.set("pSideColumns", JSON.stringify(this.sideColumns));
      this._sideSelectedColumns = this.sideColumns;
    } else {
      this.sideColumns = JSON.parse(this.cookieService.get("pSideColumns"));
      this._sideSelectedColumns = this.sideColumns.filter(
        (col) => col.show == true
      );
    }

    this.length =
      5 + this._selectedColumns.length + this._sideSelectedColumns.length;

    // ============== SETTING COOKIES PRINT COLUMNS =============
    if (!this.cookieService.check("printPositionColumns")) {
      console.log("set cookie position");
      this.cookieService.set(
        "printPositionColumns",
        JSON.stringify(this.printColumnPosition)
      );
    } else {
      this.printColumnPosition = JSON.parse(
        this.cookieService.get("printPositionColumns")
      );
    }
    // Side
    if (!this.cookieService.check("printSideColumns")) {
      console.log("set cookie side");
      this.cookieService.set(
        "printSideColumns",
        JSON.stringify(this.printColumnSide)
      );
    } else {
      this.printColumnSide = JSON.parse(
        this.cookieService.get("printSideColumns")
      );
    }

    this.positionMenuItems = [
      { label: "Pozycja", styleClass: "contextMenuHeader" },
      { separator: true },
      {
        label: "Aktualizacja pozycji",
        icon: "pi pi-cog",
        disabled: !this.deleteOrderIf.getValue(),
        command: (event) =>
          this.showDialogToUpdateOrderPosition(this.selectedPosition),
      },

      {
        label: "Akceptacja pozycji",
        icon: "pi pi-chevron-circle-down",
        items: [
          {
            label: "Tak",
            icon: "pi pi-check",
            visible: true,
            command: (event) =>
              this.updateOrderPositionAccepted(this.selectedPosition.id, true),
          },
          {
            label: "Nie",
            icon: "pi pi-times",
            visible: true,
            command: (event) =>
              this.updateOrderPositionAccepted(this.selectedPosition.id, false),
          },
        ],
      },

      { separator: true },
      {
        label: "Wykonano",
        icon: "pi pi-check",
        command: (event) => this.showDialogDonePosition(this.selectedPosition),
      },
      {
        label: "Numer faktury",
        icon: "pi pi-align-justify",
        command: (event) =>
          this.showDialogToUpdateFvNumber(this.selectedPosition),
      },

      {
        label: "Gwarancja",
        icon: "pi pi-star",
        items: [
          {
            label: "Tak",
            icon: "pi pi-check",
            visible: true,
            command: (event) =>
              this.updateOrderPositionWarranty(this.selectedPosition.id, true),
          },
          {
            label: "Nie",
            icon: "pi pi-times",
            visible: true,
            command: (event) =>
              this.updateOrderPositionWarranty(this.selectedPosition.id, false),
          },
        ],
      },

      { separator: true },
      {
        label: "Usuń pozycję",
        icon: "pi pi-trash",
        styleClass: "context-menu-danger",
        disabled: !this.deleteOrderIf.getValue(),
        command: (event) => this.confirmDeletePosition(this.selectedPosition),
      },
    ];

    this.sideMenuItems = [
      { label: "Strony", styleClass: "contextMenuHeader" },
      { separator: true },
      // { label: 'Zużycie Okleiny', icon: 'pi pi-sliders-h', command: (event) => this.showDialogToUpdateUsedFilm(this.selectedPosition) },
      {
        label: "Aktualizuj koszty",
        icon: "pi pi-pencil",
        command: (event) =>
          this.showDialogToAddAfterComplete(this.selectedPosition),
      },
    ];

    this.usedMenuItems = [
      { label: "Zużycie", styleClass: "contextMenuHeader" },
      { separator: true },
      {
        label: "Aktualizuj zużycie",
        icon: "pi pi-pencil",
        command: (event) =>
          this.showDialogToUpdateUsedFilm(this.selectedPosition),
      },
      // { label: 'Uzupełnienie danych', icon: 'pi pi-plus-circle', command: (event) => this.showDialogToAddAfterComplete(this.selectedPosition) },
    ];
  } // Init end

  usedContextMenu(
    cmUsed: ContextMenu,
    cmSide: ContextMenu,
    cmPos: ContextMenu,
    event,
    row
  ) {
    if (
      event.target.offsetParent.classList.contains("usedMenu") ||
      event.srcElement.parentElement.classList.contains("positionUse")
    ) {
      console.log("show used");
      cmSide.hide();
      cmPos.hide();
      cmUsed.show(event);
      this.selectedPosition = row;
    } else {
      cmUsed.hide();
    }
  }

  sideContextMenu(
    cmUsed: ContextMenu,
    cmSide: ContextMenu,
    cmPos: ContextMenu,
    event,
    row
  ) {
    if (event.srcElement.parentElement.classList.contains("sideMenu")) {
      cmUsed.hide();
      cmPos.hide();
      cmSide.show(event);
      this.selectedPosition = row;
    } else {
      cmSide.hide();
    }
  }

  positionContextMenu(
    cmUsed: ContextMenu,
    cmSide: ContextMenu,
    cmPos: ContextMenu,
    event,
    row
  ) {
    if (
      !event.srcElement.parentElement.classList.contains("sideMenu") &&
      !event.target.offsetParent.classList.contains("usedMenu") &&
      !event.srcElement.parentElement.classList.contains("positionUse")
    ) {
      cmSide.hide();
      cmUsed.hide();
      cmPos.show(event);

      if (row.accepted) {
        cmPos.model[3].items[0].visible = false;
        cmPos.model[3].items[1].visible = true;
      } else {
        cmPos.model[3].items[0].visible = true;
        cmPos.model[3].items[1].visible = false;
      }

      if (row.warranty) {
        cmPos.model[7].items[0].visible = false;
        cmPos.model[7].items[1].visible = true;
      } else {
        cmPos.model[7].items[0].visible = true;
        cmPos.model[7].items[1].visible = false;
      }

      this.selectedPosition = row;
    } else {
      cmPos.hide();
    }
  }

  printDialgOptions() {
    this.printDialog = true;
    console.log("Choose printing columns");
  }

  printDialogExit() {
    this.printDialog = false;
  }

  // printOrder() {
  //   this.cookieService.set(
  //     "printPositionColumns",
  //     JSON.stringify(this.printColumnPosition)
  //   );
  //   this.cookieService.set(
  //     "printSideColumns",
  //     JSON.stringify(this.printColumnSide)
  //   );
  //   this.printDialogExit();
  //   this.printService.printDocument("production-order", this.orderNumber);

  // }

  printOrderProd() {
    this.printOfferService.initPrint("orderProd", this.orderNumber);
    this.printDialogExit();
  }

  printOrderProd2() {
    this.printOfferService.initPrint("orderProd2", this.orderNumber);
    this.printDialogExit();
  }

  checkStatus() {
    if (this.productionOrder?.statusOrder == StatusOrder.NEW) {
      this.deleteOrderIf.next(true);
      if (this.positionMenuItems) {
        this.positionMenuItems[1].disabled = false;
      }
    } else {
      this.deleteOrderIf.next(false);
      if (this.positionMenuItems) {
        this.positionMenuItems[1].disabled = true;
      }
    }
  }

  yesNo(or) {
    return or ? "TAK" : "NIE";
  }

  checkShow(sw) {
    return this.columns.find((e) => e.field === sw).show;
  }

  checkShowSide(sw) {
    return this.sideColumns.find((e) => e.field === sw).show;
  }

  // ============== COOKIES SELECTED COLUMNS =============
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    this.columns.filter((col) => val.includes(col)).map((x) => (x.show = true));
    this.columns
      .filter((col) => !val.includes(col))
      .map((x) => (x.show = false));
    this.cookieService.set("pOrderColumns", JSON.stringify(this.columns));
    this._selectedColumns = this.columns.filter((col) => val.includes(col));
    this.length =
      5 + this._selectedColumns.length + this._sideSelectedColumns.length;
  }

  // SIDE
  @Input() get sideSelectedColumns(): any[] {
    return this._sideSelectedColumns;
  }
  set sideSelectedColumns(val: any[]) {
    this.sideColumns
      .filter((col) => val.includes(col))
      .map((x) => (x.show = true));
    this.sideColumns
      .filter((col) => !val.includes(col))
      .map((x) => (x.show = false));
    this.cookieService.set("pSideColumns", JSON.stringify(this.sideColumns));
    this._sideSelectedColumns = this.sideColumns.filter((col) =>
      val.includes(col)
    );
    this.length =
      5 + this._selectedColumns.length + this._sideSelectedColumns.length;
  }
  // ======================================================

  loadData() {
    this.productionService.getProductionOrder(this.orderNumber).subscribe({
      next: (res) => {
        this.productionOrder = res;
        this.checkStatus();
      },
      error: (err) => {
        console.log(err);
        this.infoPopup.showErrorDownload("zlecenia");
      },
      complete: () => {},
    });
    this.productionService.getOrderPositions(this.orderNumber).subscribe({
      next: (res) => {
        this.orderPosition = [];
        this.orderPosition = res.sort(
          (a, b) => a.positionNumber - b.positionNumber
        );
      },
      error: (err) => {
        console.log(err);
        this.infoPopup.showErrorDownload("pozycji zlecenia");
      },
      complete: () => {},
    });
  }

  confirmDeletePosition(poz) {
    this.confirmationService.confirm({
      message:
        "Na pewno chcesz usunąć pozycję kształtownika: " +
        poz.profilNumber +
        " ?",
      header: "Potwierdzenie",
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      acceptIcon: "pi pi-trash",
      acceptButtonStyleClass: "p-button-raised p-button-sm p-button-danger",
      rejectButtonStyleClass:
        "p-button-raised p-button-outlined p-button-secondary p-button-sm",
      accept: () => {
        this.productionService
          .deleteOrderPositions(poz.productionOrder.orderNumber, poz.id)
          .subscribe({
            next: (res) => {
              this.infoPopup.showSuccessDelete("pozycję");
            },
            error: (err) => {
              this.infoPopup.showErrorDelete("pozycję");
            },
            complete: () => {
              this.loadData();
            },
          });
      },
    });
  }

  confirmDeleteOrder(orderid) {
    this.confirmationService.confirm({
      message: "Na pewno chcesz usunąć zlecenie: " + orderid + " ?",
      header: "Potwierdzenie",
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      acceptIcon: "pi pi-trash",
      acceptButtonStyleClass: "p-button-raised p-button-sm p-button-danger",
      rejectButtonStyleClass:
        "p-button-raised p-button-outlined p-button-secondary p-button-sm",
      accept: () => {
        this.productionService.deleteProductionOrder(orderid).subscribe({
          next: (res) => {
            this.infoPopup.showSuccessDelete("zlecenie");
            this.backClicked();
          },
          error: (err) => {
            this.infoPopup.showErrorDelete("zlecenie");
          },
          complete: () => {},
        });
      },
    });
  }

  updateOrderPositionWarranty(idPosition, option) {
    this.productionService
      .updateOrderPositionWarranty(this.orderNumber, idPosition, option)
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("gwarancja");
          this.loadData();
        },
        error: (err) => {
          console.log(err);
          this.infoPopup.showErrorUpdate("gwarancja");
        },
        complete: () => {},
      });
  }

  updateOrderPositionAccepted(idPosition, option) {
    this.productionService
      .updateOrderPositionAccepted(this.orderNumber, idPosition, option)
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("akceptacja");
          this.loadData();
        },
        error: (err) => {
          console.log(err);
          this.infoPopup.showErrorUpdate("akceptacja");
        },
        complete: () => {},
      });
  }

  backClicked() {
    this.router.navigateByUrl("/produkcja");
  }

  reOrder(e) {
    this.orderPosition.forEach((x, index) => {
      x.positionNumber = index + 1;
    });
    let map = new Map();
    this.orderPosition.forEach((x) => {
      let key = x.id;
      let value = x.positionNumber;
      map.set(key, value);
    });
    map.forEach((val: string, key: string) => {
      this.orderMap[key] = val;
    });
    this.globalService.loadingGlobal = true;
    this.productionService.reOrderPositions(this.orderMap).subscribe({
      next: (res) => {
        this.infoPopup.showSuccessUpdate("kolejność");
        this.globalService.loadingGlobal = false;
      },
      error: (err) => {
        this.infoPopup.showErrorUpdate("kolejność");
        this.globalService.loadingGlobal = false;
        console.log(err);
      },
    });
  }

  saveReOrder(tab) {
    tab.value.forEach((x, index) => {
      x.positionNumber = index + 1;
    });
    let map = new Map();

    tab.value.forEach((x) => {
      let key = x.id;
      let value = x.positionNumber;
      map.set(key, value);
    });
    map.forEach((val: string, key: string) => {
      this.orderMap[key] = val;
    });

    this.globalService.loadingGlobal = true;
    this.productionService.reOrderPositions(this.orderMap).subscribe({
      next: (res) => {
        this.infoPopup.showSuccessUpdate("kolejność");
        this.globalService.loadingGlobal = false;
      },
      error: (err) => {
        this.infoPopup.showErrorUpdate("kolejność");
        this.globalService.loadingGlobal = false;
        console.log(err);
      },
    });
  }

  // ========================  DIALOGS ====================

  showDialogToUpdateFvNumber(position) {
    const dialogRef = this.dialog.open(FormFvNumberComponent, {
      header: "Aktualizacja numeru FV",
      data: position,
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog update position fv number was closed");
    });
  }

  showDialogToUpdateUsedFilm(orderData) {
    const dialogRef = this.dialog.open(FormAddUpdateUsedFilmComponent, {
      header: "Aktualizacja zużycia",
      data: orderData,
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog update position film was closed");
    });
  }

  showDialogToUpdateOrder(orderData) {
    const dialogRef = this.dialog.open(ProductionOrderFormUpdateComponent, {
      header: "Aktualizacja zlecenia",
      data: orderData,
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog update production order was closed");
    });
  }

  showDialogToAddAfterComplete(position) {
    const dialogRef = this.dialog.open(FormAfterCompletePositionComponent, {
      header: "Aktualizacja pozycji",
      data: position,
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog add after complete information was closed");
    });
  }

  showDialogToAddOrderPosition() {
    const dialogRef = this.dialog.open(OrderPositionFormComponent, {
      header: "Dodanie pozycji",
      data: this.orderNumber,
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog add production order was closed");
    });
  }

  showDialogToUpdateOrderPosition(position) {
    const dialogRef = this.dialog.open(OrderPositionFormUpdateComponent, {
      header: "Aktualizacja pozycji",
      data: position,
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog add production order was closed");
    });
  }

  showDialogDonePosition(position) {
    const dialogRef = this.dialog.open(FormDonePositionComponent, {
      header: "Aktualizacja danych",
      data: position,
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog update done information was closed");
    });
  }

  showDialogAddFromExcel() {
    const dialogRef = this.dialog.open(FormAddFromExcelComponent, {
      header: "Dodanie pozycji z excela",
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog update done information was closed");
    });
  }

  showChangeOrderStatusForm() {
    const dialogRef = this.dialog.open(FormChangeOrderStatusComponent, {
      header: "Zmiana pozycji",
      data: this.productionOrder,
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog change status was closed");
    });
  }

  standardView() {
    this.columns = [
      { field: "numberFv", label: "Numer faktury", show: false },
      { field: "accepted", label: "Zaakceptowana", show: false },
      { field: "statusOrderPosition", label: "Status", show: false },
      { field: "completed", label: "Zakończono", show: false },
      {
        field: "dateCompletedPosition",
        label: "Data Zakończenia",
        show: false,
      },
      { field: "warranty", label: "Gwarancja", show: false },
      { field: "comment", label: "Uwagi", show: true },
    ];
    this.sideColumns = [
      { field: "usedFilm", label: "Zużycie", show: true },
      { field: "sumAllDimensions", label: "Łącznie mb", show: false },
      { field: "plnMb", label: "pln/mb", show: true },
      { field: "costSet", label: "kpl.6", show: true },
      { field: "costSetup", label: "Ustawienie", show: true },
      { field: "costChangeColor", label: "Zmiana koloru", show: true },
      { field: "employees", label: "Pracownicy", show: false },
      { field: "glue", label: "Klej", show: false },
      { field: "filmEntrusted", label: "Okl. powierzona", show: false },
      { field: "hard", label: "Trudne", show: false },
      { field: "statusPositionSide", label: "Status", show: false },
    ];
    this._selectedColumns = this.columns.filter((col) => col.show == true);
    this._sideSelectedColumns = this.sideColumns.filter(
      (col) => col.show == true
    );
    this.cookieService.set("pOrderColumns", JSON.stringify(this.columns));
    this.cookieService.set("pSideColumns", JSON.stringify(this.sideColumns));
  }
}
