import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AuthService } from "src/app/_services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu-items",
  templateUrl: "./menu-items.component.html",
  styleUrls: ["./menu-items.component.scss"],
})
export class MenuItemsComponent implements OnInit {
  @Output() open = new EventEmitter();

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
  }
  logout() {
    this.auth.logout();
  }

  ngOnInit() {}

  openLink() {
    this.open.emit(true);
  }
}
