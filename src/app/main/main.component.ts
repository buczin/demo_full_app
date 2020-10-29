import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { PrintService } from "../print/print.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  constructor(public auth: AuthService, public printService: PrintService) {}

  ngOnInit() {}
}
