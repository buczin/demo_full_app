import { Component, Injectable, OnInit } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  Router,
} from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { Observable } from "rxjs";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { ProductionServiceService } from "src/app/production/production-service/production-service.service";
import {
  OfferHelpers,
  SettingsService,
} from "src/app/settings/settings.service";
import { AddOfferPositionComponent } from "../form/add-offer-position/add-offer-position.component";
import { UpdateClientHelpersComponent } from "../form/update-client-helpers/update-client-helpers.component";
import { UpdateClientHelperRangeComponent } from "../form/update-client-helper-range/update-client-helper-range.component";
import { UpdateOfferPositionComponent } from "../form/update-offer-position/update-offer-position.component";
import {
  Offer,
  OfferPosition,
  OffersService,
  OfferStatus,
} from "../offers.service";
import { PrintOfferService } from "../../print/print-offer.service";
import { GlobalService } from "src/app/_services/global.service";
import { UpdateFilmBuyCostComponent } from "../form/update-film-buy-cost/update-film-buy-cost.component";
import { AuthService } from "src/app/_services/auth.service";

@Injectable()
export class OfferResolver implements Resolve<any> {
  constructor(private offerService: OffersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    console.log("Resolve Offer with id: " + route.paramMap.get("id"));
    return this.offerService.getOfferById(route.paramMap.get("id"));
  }
}

@Component({
  selector: "app-details-offer",
  templateUrl: "./details-offer.component.html",
  styleUrls: ["./details-offer.component.scss"],
})
export class DetailsOfferComponent implements OnInit {
  offer: Offer;
  offerNumber: string;
  helper: OfferHelpers;
  loadingTable = false;
  loadingSaveHelper = false;
  displayFormExchange = false;
  displayPrintOffer = false;
  loadingPrintOffer = false;
  loadingChangeStatus = false;
  displayChangeStatus = false;
  modelStatusChange = null;
  offerPositions: OfferPosition[];
  totalPLN: number = 0;
  totalAdditionalU: number = 0;
  totalAdditionalP: number = 0;
  allTotalPLN: number = 0;
  offerNotes: any;
  allStatus = [
    { label: "Nowe", value: OfferStatus.NEW },
    { label: "W przygotowaniu", value: OfferStatus.INPREPARATION },
    { label: "Wysłana", value: OfferStatus.SENT },
    { label: "Zaakceptowana", value: OfferStatus.ACCEPTED },
    { label: "Anulowana", value: OfferStatus.CANCELED },
  ];

  constructor(
    private route: ActivatedRoute,
    private infoPopup: InfoPopupComponent,
    public auth: AuthService,
    private cookieService: CookieService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private offerService: OffersService,
    private settingService: SettingsService,
    public dialogService: DialogService,
    public productionService: ProductionServiceService,
    public printOfferService: PrintOfferService,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.loadingTable = true;
    this.route.data.subscribe({
      next: (res) => {
        this.offer = res.offer;
        this.offerNumber = res.offer.offerNumber;
        this.offerNotes = res.offer.offerNotes;
        this.offerNotes.sort((a, b) => {
          if (a.createdDate > b.createdDate) {
            return 1;
          }
          if (a.createdDate < b.createdDate) {
            return -1;
          }
          return 0;
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
        this.loadingTable = false;
        this.globalService.loadingGlobal = false;
      },
      error: (err) => {
        console.log(err);
        this.infoPopup.showErrorDownload("oferta");
      },
      complete: () => {},
    });

    this.settingService.getHelpers().subscribe({
      next: (res) => {
        this.helper = res[0];
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });

    this.productionService.loadCatalogSuggestions();
    this.productionService.loadFilmSuggestions();
    this.productionService.loadAllSystems();

    console.log(this.offer);
    this.modelStatusChange = this.offer.offerStatus;
  }

  loadData() {
    console.log("refresh");
    this.loadingTable = true;
    this.offerService.getOfferById(this.offerNumber).subscribe({
      next: (res) => {
        this.offer = res;
        this.offerNotes = this.offer.offerNotes;
        this.offerNotes.sort((a, b) => {
          if (a.createdDate > b.createdDate) {
            return 1;
          }
          if (a.createdDate < b.createdDate) {
            return -1;
          }
          return 0;
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
        this.loadingTable = false;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });

    this.settingService.getHelpers().subscribe({
      next: (res) => {
        this.helper = res[0];
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
    this.modelStatusChange = this.offer.offerStatus;
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

  showChangeStatusDialog() {
    this.displayChangeStatus = true;
  }

  updateOfferStatus() {
    this.loadingChangeStatus = true;
    console.log(this.modelStatusChange);
    this.offerService
      .updateOfferStatus(this.offerNumber, this.modelStatusChange)
      .subscribe({
        next: (res) => {
          this.infoPopup.showSuccessUpdate("status oferty");
          this.loadingChangeStatus = false;
          this.displayChangeStatus = false;
          this.loadData();
        },
        error: (err) => {
          console.log(err);
          this.infoPopup.showErrorUpdate("status oferty");
          this.loadingChangeStatus = false;
        },
      });
  }

  dupPosition(test: OfferPosition) {
    let tmp = test;
    tmp.id = null;
    tmp.offerPositionSides.forEach((element) => {
      element.id = null;
    });
    console.log(tmp);
    this.offerService.addNewOfferPosition(this.offerNumber, tmp).subscribe({
      next: (res) => {
        console.log(res);
        this.loadData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  backClicked() {
    this.router.navigateByUrl("/marketing");
  }

  deleteOffer() {
    this.confirmationService.confirm({
      message:
        "Na pewno chcesz usunąć oferte: " + this.offer.offerNumber + " ?",
      header: "Potwierdzenie",
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      acceptIcon: "pi pi-trash",
      acceptButtonStyleClass: "p-button-sm sb-button red",
      rejectButtonStyleClass: "p-button-sm sb-button o-gray",
      accept: () => {
        this.globalService.loadingGlobal = true;
        this.offerService.deleteOffer(this.offer.offerNumber).subscribe({
          next: (res) => {
            console.log(res);
            this.infoPopup.showSuccessDelete("oferta");
            this.globalService.loadingGlobal = false;
            this.backClicked();
          },
          error: (err) => {
            console.log(err);
            this.infoPopup.showErrorDelete("oferta");
          },
        });
      },
    });
  }

  deleteOfferRow(posData: OfferPosition) {
    this.confirmationService.confirm({
      message: "Na pewno chcesz usunąć pozycję: " + posData.profilNumber + " ?",
      header: "Potwierdzenie",
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      acceptIcon: "pi pi-trash",
      acceptButtonStyleClass: "p-button-sm sb-button red",
      rejectButtonStyleClass: "p-button-sm sb-button o-gray",
      accept: () => {
        this.globalService.loadingGlobal = true;
        this.offerService
          .deleteOfferPosition(this.offer.offerNumber, posData.id)
          .subscribe({
            next: (res) => {
              this.loadData();
              this.globalService.loadingGlobal = false;
              this.infoPopup.showSuccessDelete("pozycje");
            },
            error: (err) => {
              console.log(err);
              this.infoPopup.showErrorDelete("pozycje");
            },
          });
      },
    });
  }

  showDialogToAddCostBuyFilm() {
    const ref = this.dialogService.open(UpdateFilmBuyCostComponent, {
      header: "Aktualizacja kosztu zakupu okleiny",
      data: this.offer,
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog update cost buy film was closed");
    });
  }

  showDialogToAddOfferPosition() {
    const ref = this.dialogService.open(AddOfferPositionComponent, {
      header: "Nowa pozycja",
      data: this.offer,
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog add offer position was closed");
    });
  }

  showDialogToUpdateOfferPosition(posData) {
    const ref = this.dialogService.open(UpdateOfferPositionComponent, {
      header: "Aktualizacja pozycji",
      data: [this.offer, posData],
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog update offer position was closed");
    });
  }

  showDialogToUpdateHelperOffer() {
    const ref = this.dialogService.open(UpdateClientHelpersComponent, {
      header: "Aktualizacja ustawień dla firmy: " + this.offer.client.name,
      data: this.offer,
      width: "300px",
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog update helpers was closed");
    });
  }

  showDialogToUpdateHelperOfferRange() {
    const ref = this.dialogService.open(UpdateClientHelperRangeComponent, {
      header: "Aktualizacja ustawień dla firmy: " + this.offer.client.name,
      data: this.offer,
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
      console.log("The dialog update helpers range was closed");
    });
  }

  // ===============  PRINT  =================

  showDialogToSelectPrint() {
    this.displayPrintOffer = true;
  }

  closePrintOffer() {
    this.displayPrintOffer = false;
    this.loadingPrintOffer = false;
  }

  printOffer() {
    this.loadingPrintOffer = true;
    this.printOfferService.initPrint("offer", this.offer.offerNumber);
    this.closePrintOffer();
  }

  printOfferCosts() {
    this.loadingPrintOffer = true;
    this.printOfferService.initPrint("offerCost", this.offer.offerNumber);
    this.closePrintOffer();
  }
}
