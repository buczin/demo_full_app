import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "src/app/_services/auth.service";
import { version } from "../../../../package.json";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  @ViewChild("menu_content") menu: ElementRef;
  @ViewChild("menu_icon") menuicon: ElementRef;

  public username: string;
  public version: string = version;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.username = this.authService.userValue.name;
  }

  openMenu() {
    if (this.menu.nativeElement.classList.contains("open_menu")) {
      this.menu.nativeElement.classList.remove("open_menu");
      this.menuicon.nativeElement.classList.remove("open_menu");
    } else {
      this.menu.nativeElement.classList.add("open_menu");
      this.menuicon.nativeElement.classList.add("open_menu");
    }
  }

  closeMenu() {
    this.menu.nativeElement.classList.remove("open_menu");
    this.menuicon.nativeElement.classList.remove("open_menu");
  }
}
