import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from "@angular/core";
import { PrintOfferService } from "src/app/print/print-offer.service";
import { AuthService } from "src/app/_services/auth.service";
import { Offer, OfferPosition, OffersService } from "../offers.service";

@Component({
  selector: "app-view-offer",
  templateUrl: "./view-offer.component.html",
  styleUrls: ["./view-offer.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ViewOfferComponent implements OnInit {
  @Input() offer: Offer;
  offerPositions: OfferPosition[];
  offerId: string;
  headerText = "";
  footerInfo = "";
  offerComments: any;
  hideWarranty = true;
  hideZM = true;
  username: string;

  constructor(
    private offerService: OffersService,
    private printOfferService: PrintOfferService,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.username = this.authService.userValue.name;
    for (let propName in changes) {
      if (propName === "offer") {
        this.offer = changes[propName].currentValue;
        this.offerPositions = this.offer.offerPosition;
        this.offerComments = this.offer.offerComments.sort((a, b) => {
          if (a.number > b.number) {
            return 1;
          } else if (a.number < b.number) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    }

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
  }

  ngOnInit(): void {
    this.offerPositions = this.offer.offerPosition;
    this.offerId = this.offer.offerNumber;
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
  checkComments() {
    if (this.offerComments === undefined || this.offerComments.length == 0) {
      return false;
    } else {
      return true;
    }
  }
}
