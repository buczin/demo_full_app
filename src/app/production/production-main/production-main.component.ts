import { Component, OnInit } from "@angular/core";
import {
  ProductionServiceService,
  ProductionOrder,
  StatusOrder,
} from "../production-service/production-service.service";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { SortEvent, SelectItem } from "primeng/api";
import { ProductionOrderFormComponent } from "../form/production-order-form/production-order-form.component";
import { DialogService } from "primeng/dynamicdialog";
import { GlobalService } from "src/app/_services/global.service";

@Component({
  selector: "app-production-main",
  templateUrl: "./production-main.component.html",
  styleUrls: ["./production-main.component.scss"],
})
export class ProductionMainComponent implements OnInit {
  ordersCount: number;
  optionsSort: SelectItem[] = [];

  allOrders: ProductionOrder[];
  allOrdersNew: ProductionOrder[];
  allOrdersWaiting: ProductionOrder[];
  allOrdersInProgress: ProductionOrder[];
  allOrdersDone: ProductionOrder[];
  allOrdersOut: ProductionOrder[];

  constructor(
    public productionService: ProductionServiceService,
    private infoPopup: InfoPopupComponent,
    public dialogService: DialogService,
    public globalService: GlobalService
  ) {}

  ngOnInit() {
    this.optionsSort = [
      { label: "WSZYSTKIE", value: "-1" },
      { label: "NOWE", value: StatusOrder.NEW },
      { label: "OCZEKUJE NA REALIZACJE", value: StatusOrder.WAITING },
      { label: "REALIZACJA", value: StatusOrder.INPROGRESS },
      { label: "ZAKONCZONE", value: StatusOrder.DONE },
      { label: "WYDANE WSZYSTKIE", value: StatusOrder.ISSUEDALL },
      { label: "ANULOWANO", value: StatusOrder.CANCELED },
      { label: "ARCHIWUM", value: StatusOrder.ARCHIVED },
    ];
    this.loadData();
  }

  loadData() {
    this.globalService.loadingGlobal = true;

    this.productionService.getCountProductionOrders().subscribe({
      next: (res) => {
        this.ordersCount = res;
      },
      error: (err) => {
        this.ordersCount = 0;
        this.infoPopup.showErrorDownload("ilości zleceń");
      },
      complete: () => {},
    });

    this.productionService.getProductionOrders().subscribe({
      next: (res) => {
        this.allOrders = [];
        this.allOrders = res;
        this.allOrdersNew = res.filter((x) => x.statusOrder == StatusOrder.NEW);
        this.allOrdersWaiting = res.filter(
          (x) => x.statusOrder == StatusOrder.WAITING
        );
        this.allOrdersInProgress = res.filter(
          (x) => x.statusOrder == StatusOrder.INPROGRESS
        );
        this.allOrdersDone = res.filter(
          (x) => x.statusOrder == StatusOrder.DONE
        );
        this.allOrdersOut = res.filter(
          (x) => x.statusOrder == StatusOrder.ISSUEDALL
        );
      },
      error: (err) => {
        this.infoPopup.showErrorDownload("zleceń");
      },
      complete: () => {
        this.globalService.loadingGlobal = false;
      },
    });

    this.productionService.loadDataToService();
  }

  showDialogToAddOrder() {
    const ref = this.dialogService.open(ProductionOrderFormComponent, {
      header: "Nowe zlecenie",
      styleClass: "no-padding-dialog",
      width: "500px",
    });

    ref.onClose.subscribe((result) => {
      this.loadData();
      console.log("The dialog add production order was closed");
    });
  }

  loadByStatus(value) {
    if (value != "-1") {
      this.productionService.getProductionOrdersByStatus(value).subscribe({
        next: (res) => {
          this.allOrders = [];
          this.allOrders = res;
        },
        error: (err) => {
          this.infoPopup.showErrorDownload("zleceń");
        },
        complete: () => {},
      });
    } else {
      this.loadData();
    }
  }

  // SORT FUNCTION
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;
      let result2 = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (
        typeof value1 === "string" &&
        typeof value2 === "string" &&
        event.field != "orderNumber"
      )
        result = value1.localeCompare(value2);
      else if (event.field == "orderNumber") {
        if (
          Math.abs(value1.substring(value1.length - 4)) <
          Math.abs(value2.substring(value2.length - 4))
        )
          return event.order * -1;
        if (
          Math.abs(value1.substring(value1.length - 4)) >
          Math.abs(value2.substring(value2.length - 4))
        )
          return event.order * 1;
        if (
          Math.abs(value1.substring(0, value1.length - 4)) <
          Math.abs(value2.substring(0, value2.length - 4))
        )
          return event.order * -1;
        if (
          Math.abs(value1.substring(0, value1.length - 4)) >
          Math.abs(value2.substring(0, value2.length - 4))
        )
          return event.order * 1;
      } else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      return event.order * result;
    });
  }
}
