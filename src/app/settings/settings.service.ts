import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface MyCompany {
  id: number;
  name: string;
  shortName: string;
  nip: string;
  regon: string;
  town: string;
  street: string;
  houseNumber: string;
  flatNumber: string;
  postalCode: string;
  province: string;
  country: string;
  phonenumber: string;
  phonenumber2: string;
  email: string;
  www: string;
  fvemail: string;
  logoLink: string;
  shortId: string;
}

export interface OfferHelpers {
  exchangeRateAlu: number;
  exchangeRatePcv: number;
  defaultClientSetUpCost: number;
  defaultSetCost: number;
  defaultPrintTextHeader: string;
  defaultPrintTextTableFotter: string;
  defaultCostChangeColor: number;

  mainCost: number;
  entrustedCost: number;

  default_helper_pcv_mEasyTo50: number;
  default_helper_pcv_mEasyTo150: number;
  default_helper_pcv_mEasyTo500: number;
  default_helper_pcv_mEasyAbove500: number;
  default_helper_pcv_mHardTo50: number;
  default_helper_pcv_mHardTo150: number;
  default_helper_pcv_mHardTo500: number;
  default_helper_pcv_mHardAbove500: number;

  default_helper_alu_mEasyTo50: number;
  default_helper_alu_mEasyTo150: number;
  default_helper_alu_mEasyTo500: number;
  default_helper_alu_mEasyAbove500: number;
  default_helper_alu_mHardTo50: number;
  default_helper_alu_mHardTo150: number;
  default_helper_alu_mHardTo500: number;
  default_helper_alu_mHardAbove500: number;
}

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  constructor(private http: HttpClient) {}

  // =============== USERS ============
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>("api/users");
  }
  addUser(data): Observable<any> {
    return this.http.post<any>("api/user", data);
  }
  updateUser(id, data) {
    return this.http.put("api/user/" + id, data, { responseType: "text" });
  }
  deleteUser(id) {
    return this.http.delete("api/user/" + id, { responseType: "text" });
  }
  changePassword(id, data) {
    return this.http.put<any>("api/user/pass/" + id, data);
  }
  //============== MY COMPANY ===============

  getMyCompanies(): Observable<any[]> {
    return this.http.get<any[]>("api/mycompanies");
  }
  getMyCompanyById(id): Observable<any> {
    return this.http.get<any[]>("api/mycompany/" + id);
  }
  addMyCompany(data): Observable<any> {
    return this.http.post<any>("api/mycompany", data);
  }
  updateMyCompany(id, data) {
    return this.http.put("api/mycompany/" + id, data, { responseType: "text" });
  }
  deleteMyCompany(id) {
    return this.http.delete("api/mycompany/" + id, { responseType: "text" });
  }

  getHelpers() {
    return this.http.get("api/helpers");
  }

  updateHelpersExchange(data) {
    return this.http.post<OfferHelpers>("api/helpers/exchange", data);
  }

  updateHelpersSetUpCost(data) {
    return this.http.post<OfferHelpers>("api/helpers/clientsetupcost", data);
  }

  updateHelpersSetCost(data) {
    return this.http.post<OfferHelpers>("api/helpers/setcost", data);
  }

  updateHelpersColorChange(data) {
    return this.http.post<OfferHelpers>("api/helpers/color-change", data);
  }

  updateHelpersCostsRange(data) {
    return this.http.put<OfferHelpers>("api/helpers/costs-range", data);
  }

  // ============ PRINT OFFER TEXT =============

  updatePrintText(data) {
    return this.http.post<OfferHelpers>("api/helpers/default-print-text", data);
  }
}
