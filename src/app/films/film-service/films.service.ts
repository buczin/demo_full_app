import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SelectItem } from "primeng/api";

export enum OkleinaEnum {
  DOSTEPNA = "DOSTEPNA",
  NIEDOSTEPNA = "NIEDOSTEPNA",
  DOSTEPNOSCOGRANICZONA = "DOSTEPNOSCOGRANICZONA",
}

export interface Okleina {
  id?: number;
  number?: string;
  name?: string;
  producer?: string;
  ecoPlastNumber?: string;
  ralNumber?: string;
  imgLink?: string;
  status?: OkleinaEnum;
}

export interface Producent {
  id?: number;
  producerName?: string;
}

@Injectable({
  providedIn: "root",
})
export class FilmsService {
  public allFilms: Okleina[];
  public producers: Producent[] = [];
  public producersSelect: SelectItem[] = [];

  constructor(private http: HttpClient) {}

  loadProducersSelect() {
    console.log("Load producers in service");
    this.producersSelect = [];
    this.getProducers().subscribe({
      next: (res) => {
        res.forEach((element) => {
          this.producers = res;
          let el: SelectItem = { label: element.producerName, value: element };
          this.producersSelect.push(el);
        });
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  getOklieny(): Observable<Okleina[]> {
    return this.http.get<Okleina[]>("api/films");
  }
  getOklina(id): Observable<Okleina> {
    return this.http.get<Okleina>("api/film/" + id);
  }
  getCountOkleina(): Observable<number> {
    return this.http.get<number>("api/film/count");
  }
  addOklina(data): Observable<Okleina> {
    return this.http.post<Okleina>("api/film", data);
  }
  updateOkleina(id, data): Observable<Okleina> {
    return this.http.put<Okleina>("api/film/" + id, data);
  }
  deleteOklina(id) {
    return this.http.delete("api/film/" + id, { responseType: "text" });
  }

  // PRODUCERS

  getProducers(): Observable<Producent[]> {
    return this.http.get<Producent[]>("api/film/producers");
  }
  getProducer(id): Observable<Producent> {
    return this.http.get<Producent>("api/film/producer/" + id);
  }
  getCountProducer(): Observable<number> {
    return this.http.get<number>("api/film/producer/count");
  }
  addProducer(data): Observable<Producent> {
    return this.http.post<Producent>("api/film/producer", data);
  }
  updateProducer(id, data): Observable<Producent> {
    return this.http.put<Producent>("api/film/producer/" + id, data);
  }
  deleteProducer(id) {
    return this.http.delete("api/film/producer/" + id, {
      responseType: "text",
    });
  }
}
