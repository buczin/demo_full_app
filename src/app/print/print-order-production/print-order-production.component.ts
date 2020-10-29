import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  OrderPosition,
  ProductionOrder,
  ProductionServiceService,
} from "src/app/production/production-service/production-service.service";
import { PrintOfferService } from "../print-offer.service";

@Component({
  selector: "app-print-order-production",
  templateUrl: "./print-order-production.component.html",
  styleUrls: ["./print-order-production.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PrintOrderProductionComponent implements OnInit {
  @ViewChild("printOrderData") printOrderData: ElementRef;
  idOrder: string;

  productionOrder: ProductionOrder;
  orderPosition: OrderPosition[];

  constructor(
    private productionService: ProductionServiceService,
    private printOfferService: PrintOfferService
  ) {}

  ngOnInit(): void {
    console.log("Starting loading data...");
    this.productionService.getProductionOrder(this.idOrder).subscribe({
      next: (res) => {
        this.productionOrder = res;
      },
    });
    this.productionService.getOrderPositions(this.idOrder).subscribe({
      next: (res) => {
        this.orderPosition = res;
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
        this.onDataReady();
      },
    });
  }

  onDataReady() {
    setTimeout(() => {
      console.log("Creating layout - offer...");

      let css = "@page {size: a4 landscape;}",
        head = document.head || document.getElementsByTagName("head")[0],
        style = document.createElement("style");
      style.type = "text/css";
      style.media = "print";
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);

      window.print();
      this.printOfferService.removePrintProductionOrder2();
    });
  }
}
