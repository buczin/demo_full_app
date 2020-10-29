import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SelectItem } from "primeng/api";
import { Observable } from "rxjs";

export enum OfferStatus {
  NEW = "NEW",
  INPREPARATION = "INPREPARATION",
  SENT = "SENT",
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
}

export interface Offer {
  offerNumber: string;
  offerStatus: OfferStatus;
  offerPosition: OfferPosition[];
  offerDate: Date;
  completed: boolean;
  myCompany: any;
  client: any;
  offerNotes: any;
  sumAllPositionsPln: number;
  sumSetUpCost: number;
  sumSetCost: number;
  sumCostChangeColor: number;
  sumAllNetto: number;
  offerComments: any;
  createdBy: string;
  createdDate: string;
  buyFilmComment: string;
  costNettoBuyFilm: number;

  printTextHeader: string;
  printTextTableFotter: string;
}

export interface OfferPosition {
  id: number;
  positionNumber: any;
  profilType: any;
  profilNumber: any;
  warranty: any;
  alu: any;
  acceped: any;
  catalogIdHelper: any;
  offerStatus: any;
  offer: any;
  offerPositionSides: any;
}

export interface OfferPositionSide {
  id: number;
  side: string;
  filmNumber: string;
  filmWidth: number;
  quantityMb: number;
  plnMb: number;
  sumInPln: number;

  costSetup: number;
  costSet: number;

  hard: boolean;
  bicolor: number;
  exchangeRate: number;
  additional: number;
  cost: number;
  mIs: number;
}

@Injectable({
  providedIn: "root",
})
export class OffersService {
  myCompanyData: SelectItem[] = [];
  clientData: SelectItem[] = [];
  public allOffersNew: any;

  constructor(private http: HttpClient) {}

  getAllOffers(): Observable<any[]> {
    return this.http.get<any[]>("api/marketing/offers/all");
  }
  getAllOffersByStatus(stat): Observable<any[]> {
    return this.http.get<any[]>("api/marketing/offers/by?status=" + stat);
  }

  getOfferById(id): Observable<any> {
    return this.http.get<any>("api/marketing/offer/" + id);
  }
  addNewOffer(data): Observable<any> {
    return this.http.post<any>("api/marketing/offer", data);
  }

  updateFilmBuyCost(idOffer, data) {
    return this.http.put<any>(
      "api/marketing/offer/" + idOffer + "/cost-buy-film",
      data
    );
  }

  // updateOffer(id, data) {
  //   return this.http.put("api/marketing/offer/" + id, data, { responseType: 'text' });
  // }

  deleteOffer(id) {
    return this.http.delete("api/marketing/offer/" + id, {
      responseType: "text",
    });
  }
  getCountOffers(): Observable<number> {
    return this.http.get<number>("api/marketing/offers/count");
  }

  updateClientHelpers(id, data) {
    return this.http.put("api/client/" + id + "/helpers", data);
  }

  updateClientHelpersRange(id: any, data: any) {
    return this.http.put("api/client/" + id + "/helpers-range", data);
  }

  updateOfferStatus(id, status: OfferStatus) {
    return this.http.put("api/marketing/offer/" + id + "/status", status, {
      responseType: "text",
    });
  }

  // ============ POSITIONs =============

  addNewOfferPosition(id, data) {
    return this.http.post("api/marketing/offer/" + id + "/position", data);
  }

  updateOfferPosition(idOffer, id, data) {
    return this.http.put(
      "api/marketing/offer/" + idOffer + "/position/" + id,
      data
    );
  }

  deleteOfferPosition(idOffer, id) {
    return this.http.delete(
      "api/marketing/offer/" + idOffer + "/position/" + id,
      { responseType: "text" }
    );
  }

  // ============ NOTES =============

  getOfferNotes(idOffer) {
    return this.http.get("api/marketing/offer/" + idOffer + "/notes");
  }

  addNewOfferNote(idOffer, data: string) {
    return this.http.post("api/marketing/offer/" + idOffer + "/notes", data);
  }

  updateOfferNote(idOffer, id, data: string) {
    return this.http.put(
      "api/marketing/offer/" + idOffer + "/notes/" + id,
      data
    );
  }

  deleteOfferNote(idOffer, id) {
    return this.http.delete("api/marketing/offer/" + idOffer + "/notes/" + id, {
      responseType: "text",
    });
  }

  // ============ PRINT TEXT =============

  updatePrintHeaderInOffer(idOffer, data) {
    return this.http.put(
      "api/marketing/offer/" + idOffer + "/print-text-header",
      data,
      { responseType: "text" }
    );
  }

  updatePrintTableFooterInOffer(idOffer, data) {
    return this.http.put(
      "api/marketing/offer/" + idOffer + "/print-text-table-footer",
      data,
      { responseType: "text" }
    );
  }

  // ============ COMMENTS =============

  getAllComments() {
    return this.http.get<any[]>("api/marketing/offer/comments");
  }

  newComment(data: string) {
    return this.http.post("api/marketing/offer/comments", data);
  }

  updateComment(id, data: string) {
    return this.http.put("api/marketing/offer/comments/" + id, data);
  }

  deleteComment(id) {
    return this.http.delete("api/marketing/offer/comments/" + id, {
      responseType: "text",
    });
  }

  updateCommentsListInOffer(idOffer, data) {
    return this.http.put(
      "api/marketing/offer/" + idOffer + "/offer-comments",
      data
    );
  }

  updatePositionComments(data) {
    return this.http.put("api/marketing/offer/comments/reposition", data);
  }

  // ============ LOAD DATA =============

  getAllOrdersNew() {
    this.getAllOffersByStatus(OfferStatus.NEW).subscribe({
      next: (res) => {
        this.allOffersNew = [];
        this.allOffersNew = res;
      },
      error: (err) => {
        console.error("Can`t download new");
      },
      complete: () => {},
    });
  }

  // ===============================================================

  getMyCompanies() {
    return this.http.get<any[]>("api/mycompanies").subscribe({
      next: (res) => {
        this.myCompanyData = [];
        res.forEach((element) => {
          let el: SelectItem = { label: element.name, value: element };
          this.myCompanyData.push(el);
        });
      },
      error: (err) => {
        console.error("Can`t download myCompanies");
      },
      complete: () => {},
    });
  }

  getClients() {
    return this.http.get<any[]>("api/clients").subscribe({
      next: (res) => {
        this.clientData = [];
        res.forEach((element) => {
          let el: SelectItem = { label: element.name, value: element };
          this.clientData.push(el);
        });
      },
      error: (err) => {
        console.error("Can`t download clients");
      },
      complete: () => {},
    });
  }
}
