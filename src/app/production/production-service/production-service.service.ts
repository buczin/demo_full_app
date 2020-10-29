import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Client } from "src/app/contractor/client-service/client.service";
import { SelectItem } from "primeng/api";
import {
  FilmsService,
  Okleina,
} from "src/app/films/film-service/films.service";
import {
  KatalogProfili,
  CatalogService,
  KatalogSystem,
} from "src/app/catalog/catalog-service/catalog.service";
import { MyCompany } from "src/app/settings/settings.service";

export enum StatusOrder {
  NEW = "NEW",
  WAITING = "WAITING",
  INPROGRESS = "INPROGRESS",
  DONE = "DONE",
  ISSUEDALL = "ISSUEDALL",
  CANCELED = "CANCELED",
  ARCHIVED = "ARCHIVED",
}

export enum StatusOrderPosition {
  NEW = "NEW",
  WAITING = "WAITING",
  PARTINPROGRESS = "PARTINPROGRESS",
  PARTDONE = "PARTDONE",
  DONE = "DONE",
  SEASONING = "SEASONING",
  WAREHOUSE = "WAREHOUSE",
  ISSUED = "ISSUED",
  CANCELED = "CANCELED",
}

export enum StatusPositionSide {
  NEW = "NEW",
  WAITING = "WAITING",
  WRAPPING = "WRAPPING",
  DONE = "DONE",
  CANCELED = "CANCELED",
}

export interface ProductionOrder {
  orderNumber: string;
  numberClientOrder: string;
  completed: boolean;
  statusOrder: string;
  dateAcceptanceOrder: Date;
  dateCompletedOrder: Date;
  dateReceiptOrder: Date;
  myCompany: MyCompany;
  client: Client;
}

export interface OrderPosition {
  alu: boolean;
  id: number;
  positionNumber: number;
  profilType: string;
  profilNumber: string;
  comment: string;
  accepted: boolean;
  warranty: boolean;
  numberFv: string;
  dateCompletedPosition: Date;
  completed: boolean;
  statusOrderPosition: string;
  postionSide: any;
  productionOrder: any;
}

export interface PositionSide {
  id: number;
  side: string;
  filmNumber: string;
  filmWidth: number;
  dimensions: any;
  sumAllDimensions: number;
  plnMb: number;
  costSet: number;
  togetherPay: number;
  costSetup: number;
  filmEntrusted: boolean;
  colorChange: boolean;
  costChangeColor: number;
  employees: string;
  glue: string;
  statusOrderPosition: any;
  usedFilm: any;
  orderPosition: OrderPosition;
  profilDimensions: ProfilDimension[];
}

export interface UsedFilm {
  id: number;
  width: number;
  length: number;
  sumM2: number;
  positionSide: PositionSide;
}

export interface ProfilDimension {
  id: number;
  quantity: number;
  length: number;
  sumMb: number;
  positionSide: PositionSide;
}

@Injectable({
  providedIn: "root",
})
export class ProductionServiceService {
  myCompanyData: SelectItem[] = [];
  clientData: SelectItem[] = [];
  allSystems: KatalogSystem[];
  filmSuggestions: Okleina[];
  catalogSuggestions: KatalogProfili[];
  loadingDataValue: number = 0;

  constructor(
    private http: HttpClient,
    private filmService: FilmsService,
    private catalogService: CatalogService
  ) {}

  getProductionOrders(): Observable<ProductionOrder[]> {
    return this.http.get<ProductionOrder[]>("api/production/orders");
  }
  getProductionOrder(id): Observable<ProductionOrder> {
    return this.http.get<ProductionOrder>("api/production/order/" + id);
  }
  addProductionOrder(data): Observable<ProductionOrder> {
    return this.http.post<ProductionOrder>("api/production/order", data);
  }
  updateProductionOrder(id, data) {
    return this.http.put("api/production/order/" + id, data, {
      responseType: "text",
    });
  }
  deleteProductionOrder(id) {
    return this.http.delete("api/production/order/" + id, {
      responseType: "text",
    });
  }
  changeProductionOrderStatus(id, data) {
    return this.http.put("api/production/order/" + id + "/status", data, {
      responseType: "text",
    });
  }

  getProductionOrdersByStatus(sort): Observable<ProductionOrder[]> {
    return this.http.get<ProductionOrder[]>(
      "api/production/ordersBy?status=" + sort
    );
  }

  getCountProductionOrders(): Observable<number> {
    return this.http.get<number>("api/production/order/count");
  }

  //==========================================

  getAllOrdersPositions(): Observable<OrderPosition[]> {
    return this.http.get<OrderPosition[]>("api//production/orders/positions");
  }
  getOrderPositions(idOrder): Observable<OrderPosition[]> {
    return this.http.get<OrderPosition[]>(
      "api/production/order/" + idOrder + "/positions"
    );
  }
  getOrderPosition(idOrder, idPosition): Observable<OrderPosition> {
    return this.http.get<OrderPosition>(
      "api/production/order/" + idOrder + "/position/" + idPosition
    );
  }
  addOrderPositions(idOrder, data): Observable<OrderPosition> {
    return this.http.post<OrderPosition>(
      "api/production/order/" + idOrder + "/position",
      data
    );
  }
  updateOrderPositions(idOrder, idPosition, data) {
    return this.http.put(
      "api/production/order/" + idOrder + "/position/" + idPosition,
      data,
      { responseType: "text" }
    );
  }
  deleteOrderPositions(idOrder, idPosition) {
    return this.http.delete(
      "api/production/order/" + idOrder + "/position/" + idPosition,
      { responseType: "text" }
    );
  }

  reOrderPositions(map) {
    return this.http.patch("api/production/order/position/reorder", map, {
      responseType: "text",
    });
  }

  addOrderPositionSideUsedFilm(idOrder, idPosition, usedfilm) {
    return this.http.put(
      "api/production/order/" +
        idOrder +
        "/position/" +
        idPosition +
        "/usedfilm",
      usedfilm,
      { responseType: "text" }
    );
  }

  updateOrderPositionDoneInfo(idOrder, idPosition, done) {
    return this.http.put(
      "api/production/order/" + idOrder + "/position/" + idPosition + "/done",
      done,
      { responseType: "text" }
    );
  }

  updateOrderPositionAccepted(idOrder, idPosition, accepted) {
    return this.http.patch(
      "api/production/order/" +
        idOrder +
        "/position/" +
        idPosition +
        "/accepted?value=" +
        accepted,
      null,
      { responseType: "text" }
    );
  }

  updateOrderPositionWarranty(idOrder, idPosition, warranty) {
    return this.http.patch(
      "api/production/order/" +
        idOrder +
        "/position/" +
        idPosition +
        "/warranty?value=" +
        warranty,
      null,
      { responseType: "text" }
    );
  }

  updateOrderPositionFvNumber(idOrder, idPosition, fv) {
    return this.http.patch(
      "api/production/order/" +
        idOrder +
        "/position/" +
        idPosition +
        "/fvnumber",
      fv,
      { responseType: "text" }
    );
  }

  calculateProductionSide(idOrder, idPosition, idSide, data) {
    return this.http.post<PositionSide>(
      "api/production/order/" +
        idOrder +
        "/position/" +
        idPosition +
        "/side/" +
        idSide +
        "/calculate",
      data
    );
  }

  calculateProductionSideSave(idOrder, idPosition, idSide, data) {
    return this.http.put<PositionSide>(
      "api/production/order/" +
        idOrder +
        "/position/" +
        idPosition +
        "/side/" +
        idSide +
        "/calculate-save",
      data
    );
  }

  updateCommentOnPosition(idOrder, idPosition, data: string) {
    return this.http.put<PositionSide>(
      "api/production/order/" +
        idOrder +
        "/position/" +
        idPosition +
        "/comment",
      data
    );
  }

  //--------------------
  getMyCompaniesSub(): Observable<any[]> {
    return this.http.get<any[]>("api/mycompanies");
  }
  getClientsSub(): Observable<any[]> {
    return this.http.get<any[]>("api/clients");
  }

  //GET SERVICE DATA

  loadAllSystems() {
    if (this.loadingDataValue == 100) {
      this.loadingDataValue = 0;
    }
    var startFrom = new Date().getTime();
    console.log("LOADING -- SYSTEMS");
    this.catalogService.getSystems().subscribe({
      next: (res) => {
        this.allSystems = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.loadingDataValue = this.loadingDataValue + 33;
        console.log("DONE -- SYSTEMS: ", new Date().getTime() - startFrom);
      },
    });
  }

  loadFilmSuggestions() {
    if (this.loadingDataValue == 100) {
      this.loadingDataValue = 0;
    }
    var startFrom = new Date().getTime();
    console.log("LOADING -- FILM SUGGESTIONS");
    this.filmService.getOklieny().subscribe({
      next: (res) => {
        this.filmSuggestions = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.loadingDataValue = this.loadingDataValue + 33;
        console.log(
          "DONE -- FILM SUGGESTIONS: ",
          new Date().getTime() - startFrom
        );
      },
    });
  }

  loadCatalogSuggestions() {
    if (this.loadingDataValue == 100) {
      this.loadingDataValue = 0;
    }
    var startFrom = new Date().getTime();
    console.log("LOADING -- CATALOG SUGGESTIONS");
    this.catalogService.getCatalogs().subscribe({
      next: (res) => {
        this.catalogSuggestions = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.loadingDataValue = this.loadingDataValue + 34;
        console.log(
          "DONE -- CATALOG SUGGESTIONS: ",
          new Date().getTime() - startFrom
        );
      },
    });
  }

  loadDataToService() {
    console.log("loading data in service ...");
    this.getMyCompanies();
    this.getClients();
  }

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

  statusOrderSwitchLang(stat) {
    switch (stat) {
      case StatusOrder.NEW:
        return "NOWA";
      case StatusOrder.WAITING:
        return "OCZEKUJE NA REALIZACJE";
      case StatusOrder.INPROGRESS:
        return "REALIZACJA";
      case StatusOrder.DONE:
        return "ZAKONCZONE";
      case StatusOrder.ISSUEDALL:
        return "WYDANO WSZYSTKIE";
      case StatusOrder.CANCELED:
        return "ANULOWANA";
      case StatusOrder.ARCHIVED:
        return "ZARCHIWIZOWANA";
    }
  }

  statusOrderPositionSwitchLang(stat) {
    switch (stat) {
      case StatusOrderPosition.NEW:
        return "NOWA";
      case StatusOrderPosition.WAITING:
        return "OCZEKUJE NA REALIZACJE";
      case StatusOrderPosition.PARTINPROGRESS:
        return "REALIZACJA";
      case StatusOrderPosition.PARTDONE:
        return "CZĘŚĆ ZAKOŃCZONA";
      case StatusOrderPosition.DONE:
        return "ZAKONCZONE";
      case StatusOrderPosition.SEASONING:
        return "SEZONOWANIE";
      case StatusOrderPosition.WAREHOUSE:
        return "MAGAZYN";
      case StatusOrderPosition.ISSUED:
        return "WYDANO";
      case StatusOrderPosition.CANCELED:
        return "ANULOWANA";
    }
  }

  statusPositionSideSwitchLang(stat) {
    switch (stat) {
      case StatusPositionSide.NEW:
        return "NOWA";
      case StatusPositionSide.WAITING:
        return "OCZEKUJE NA REALIZACJE";
      case StatusPositionSide.WRAPPING:
        return "OKLEINOWANIE";
      case StatusPositionSide.DONE:
        return "ZAKONCZONE";
      case StatusPositionSide.CANCELED:
        return "ANULOWANA";
    }
  }
}
