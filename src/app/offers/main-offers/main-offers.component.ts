import { Component, OnInit } from "@angular/core";
import { SelectItem, SortEvent } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { GlobalService } from "src/app/_services/global.service";
import { FormNewOfferComponent } from "../form/new-offer/form-new-offer.component";
import { Offer, OffersService, OfferStatus } from "../offers.service";

@Component({
  selector: "app-main-offers",
  templateUrl: "./main-offers.component.html",
  styleUrls: ["./main-offers.component.scss"],
})
export class MainOffersComponent implements OnInit {
  offersCount = 0;
  loadingTable = false;
  optionsSort: SelectItem[] = [];

  allOffers: Offer[];
  offersNew: Offer[];
  offersInpreparation: Offer[];
  offersSent: Offer[];
  offersAccepted: Offer[];
  offersCanceled: Offer[];

  constructor(
    public dialogService: DialogService,
    public offerService: OffersService,
    private infoPopup: InfoPopupComponent,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.optionsSort = [
      { label: "Wszystkie", value: "-1" },
      { label: "Nowe", value: OfferStatus.NEW },
      { label: "W przygotowaniu", value: OfferStatus.INPREPARATION },
      { label: "Wysłana", value: OfferStatus.SENT },
      { label: "Zaakceptowana", value: OfferStatus.ACCEPTED },
      { label: "Anulowana", value: OfferStatus.CANCELED },
    ];
    this.loadData();
  }

  showDialogToAddOffer() {
    const ref = this.dialogService.open(FormNewOfferComponent, {
      header: "Nowa Oferta",
      styleClass: "no-padding-dialog",
      width: "500px",
    });

    ref.onClose.subscribe((result) => {
      console.log("The dialog add new offer was closed");
    });
  }

  loadData() {
    this.globalService.loadingGlobal = true;
    this.loadingTable = true;
    this.offerService.getCountOffers().subscribe({
      next: (res) => {
        this.offersCount = res;
      },
      error: (err) => {
        this.offersCount = 0;
        this.infoPopup.showErrorDownload("ilości zleceń");
      },
      complete: () => {},
    });

    this.offerService.getAllOffers().subscribe({
      next: (res) => {
        this.allOffers = [];
        this.allOffers = res;
        console.log(this.allOffers);
        this.offersNew = this.allOffers.filter(
          (x) => x.offerStatus == OfferStatus.NEW
        );
        this.offersInpreparation = this.allOffers.filter(
          (x) => x.offerStatus == OfferStatus.INPREPARATION
        );
        this.offersSent = this.allOffers.filter(
          (x) => x.offerStatus == OfferStatus.SENT
        );
        this.offersAccepted = this.allOffers.filter(
          (x) => x.offerStatus == OfferStatus.ACCEPTED
        );
        this.offersCanceled = this.allOffers.filter(
          (x) => x.offerStatus == OfferStatus.CANCELED
        );

        this.loadingTable = false;
      },
      error: (err) => {
        this.infoPopup.showErrorDownload("ofert");
      },
      complete: () => {
        this.globalService.loadingGlobal = false;
      },
    });
  }

  loadByStatus(value) {
    if (value != "-1") {
      this.offerService.getAllOffersByStatus(value).subscribe({
        next: (res) => {
          this.allOffers = [];
          this.allOffers = res;
        },
        error: (err) => {
          this.infoPopup.showErrorDownload("ofert");
        },
        complete: () => {},
      });
    } else {
      this.loadData();
    }
  }

  statusOfferSwitch(stat) {
    switch (stat) {
      case OfferStatus.NEW:
        return "Nowa";
      case OfferStatus.INPREPARATION:
        return "W przygotowaniu";
      case OfferStatus.SENT:
        return "Wysłana";
      case OfferStatus.ACCEPTED:
        return "Zaakceptowana";
      case OfferStatus.CANCELED:
        return "Anulowana";
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
        event.field != "offerNumber"
      )
        result = value1.localeCompare(value2);
      else if (event.field == "offerNumber") {
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
