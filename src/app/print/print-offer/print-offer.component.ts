import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  Offer,
  OfferPosition,
  OffersService,
} from "src/app/offers/offers.service";
import { AuthService } from "src/app/_services/auth.service";
import { PrintOfferService } from "../print-offer.service";

@Component({
  selector: "app-print-offer",
  templateUrl: "./print-offer.component.html",
  styleUrls: ["./print-offer.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PrintOfferComponent implements OnInit {
  @ViewChild("printOfferData") printOfferData: ElementRef;

  offer: Offer;
  offerPositions: OfferPosition[];
  offerComments: any;
  offerId: string;
  headerText = "";
  footerInfo = "";
  hideWarranty = true;
  hideZM = true;
  username: string;

  constructor(
    private offerService: OffersService,
    private printOfferService: PrintOfferService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log("Starting loading data...");
    this.username = this.authService.userValue.name;
    this.offerService.getOfferById(this.offerId).subscribe({
      next: (res) => {
        this.offer = res;
        this.headerText = this.offer.printTextHeader;
        this.footerInfo = this.offer.printTextTableFotter;
        this.offerComments = this.offer.offerComments.sort((a, b) => {
          if (a.number > b.number) {
            return 1;
          } else if (a.number < b.number) {
            return -1;
          } else {
            return 0;
          }
        });
        this.offerPositions = this.offer.offerPosition.sort(
          (a, b) => a.positionNumber - b.positionNumber
        );
        this.offerPositions.forEach((x) => {
          x = x.offerPositionSides.sort((a, b) => {
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
      },
      complete: () => {
        if (this.checkIfWarranty(this.offerPositions)) {
          this.hideWarranty = true;
        } else {
          this.hideWarranty = false;
        }

        if (this.checkIfZM(this.offerPositions)) {
          this.hideZM = false;
        } else {
          this.hideZM = true;
        }
        console.log("Complete load data.");
        this.onDataReady();
      },
    });
  }

  checkIfWarranty(positions: OfferPosition[]) {
    let tmp = positions.find((x) => x.warranty == false);
    if (tmp) {
      return false;
    } else {
      return true;
    }
  }

  checkIfZM(positions: OfferPosition[]) {
    let test = positions.find((x) => {
      let tmp = x.offerPositionSides.find((s) => s.changeColor == true);
      if (tmp) {
        return true;
      } else {
        return false;
      }
    });

    if (test) {
      return true;
    } else {
      return false;
    }
  }

  onDataReady() {
    setTimeout(() => {
      console.log("Creating layout - offer...");

      window.print();
      this.printOfferService.removePrintOffer();
    });
  }
}
