import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SelectItem } from "primeng/api";

export interface KatalogSystem {
  id?: number;
  name?: string;
}

export interface KatalogProfili {
  id?: number;
  systemProfil?: KatalogSystem;
  number?: string;
  dimOuter?: string;
  dimInner?: string;
  dimOneSide?: string;
  dimCenterSide?: string;
  dimTwoSide?: string;
  dimTwoSideInner?: string;
  dimTwoSideOuter?: string;
  offerName?: string;
  actualMeasurement?: boolean;
  alu?: boolean;
  hard?: boolean;
  profileType?: string;
  comments?: string;
}

@Injectable({
  providedIn: "root",
})
export class CatalogService {
  public systems: KatalogSystem[] = [];
  public systemsSelect: SelectItem[] = [];
  public systemsSelectTable: SelectItem[] = [];
  constructor(private http: HttpClient) {}

  loadSystems() {
    this.systemsSelect = [];
    this.systemsSelectTable = [{ label: "Wszystkie", value: -1 }];
    this.getSystems().subscribe({
      next: (res) => {
        res.forEach((element) => {
          this.systems = res;
          let el: SelectItem = { label: element.name, value: element };
          this.systemsSelectTable.push(el);
          this.systemsSelect.push(el);
        });
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  // ================ KATALOG ==================

  getCatalogs(): Observable<KatalogProfili[]> {
    return this.http.get<KatalogProfili[]>("api/catalog/profiles");
  }

  getCatalog(id): Observable<KatalogProfili> {
    return this.http.get<KatalogProfili>("api/catalog/profil/" + id);
  }

  getCatalogsBySystem(id): Observable<KatalogProfili[]> {
    return this.http.get<KatalogProfili[]>("api/catalog/profil/system/" + id);
  }

  getCountCatalog(): Observable<number> {
    return this.http.get<number>("api/catalog/profil/count");
  }

  addCatalog(data): Observable<KatalogProfili> {
    return this.http.post<KatalogProfili>("api/catalog/profil", data);
  }

  updateCatalog(id, data): Observable<KatalogProfili> {
    return this.http.put<KatalogProfili>("api/catalog/profil/" + id, data);
  }

  deleteCatalog(id) {
    return this.http.delete("api/catalog/profil/" + id, {
      responseType: "text",
    });
  }

  // ================= SYSTEM ==================

  getSystems(): Observable<KatalogSystem[]> {
    return this.http.get<KatalogSystem[]>("api/catalog/systems");
  }

  getSystem(id): Observable<KatalogSystem> {
    return this.http.get<KatalogSystem>("api/catalog/system/" + id);
  }

  getCountSystem(): Observable<number> {
    return this.http.get<number>("api/catalog/system/count");
  }

  addSystem(data): Observable<KatalogSystem> {
    return this.http.post<KatalogSystem>("api/catalog/system", data);
  }

  updateSystem(id, data): Observable<KatalogSystem> {
    return this.http.put<KatalogSystem>("api/catalog/system/" + id, data);
  }

  deleteSystem(id) {
    return this.http.delete("api/catalog/system/" + id, {
      responseType: "text",
    });
  }
}
