import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface Client {
  id?: number;
  symfoniaId?: number;
  shortName?: string;
  name?: string;
  town?: string;
  street?: string;
  houseNumber?: string;
  flatNumber?: string;
  postalCode?: string;
  province?: string;
  country?: string;
  phonenumber?: string;
  phonenumber2?: string;
  email?: string;
  nip?: string;
  pesel?: string;
  regon?: string;
  www?: string;

  helper_pcv_mEasyTo50?: number;
  helper_pcv_mEasyTo150?: number;
  helper_pcv_mEasyTo500?: number;
  helper_pcv_mEasyAbove500?: number;
  helper_pcv_mHardTo50?: number;
  helper_pcv_mHardTo150?: number;
  helper_pcv_mHardTo500?: number;
  helper_pcv_mHardAbove500?: number;

  helper_alu_mEasyTo50?: number;
  helper_alu_mEasyTo150?: number;
  helper_alu_mEasyTo500?: number;
  helper_alu_mEasyAbove500?: number;
  helper_alu_mHardTo50?: number;
  helper_alu_mHardTo150?: number;
  helper_alu_mHardTo500?: number;
  helper_alu_mHardAbove500?: number;
}

@Injectable({
  providedIn: "root",
})
export class ClientService {
  public allClients: Client[];

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>("api/clients");
  }
  getClient(id): Observable<Client> {
    return this.http.get<Client>("api/client/" + id);
  }
  getCountClient(): Observable<number> {
    return this.http.get<number>("api/client/count");
  }
  addClient(data): Observable<Client> {
    return this.http.post<Client>("api/client", data);
  }
  updateClient(id, data): Observable<Client> {
    return this.http.put<Client>("api/client/" + id, data);
  }

  deleteClient(id) {
    return this.http.delete("api/client/" + id, { responseType: "text" });
  }
}
