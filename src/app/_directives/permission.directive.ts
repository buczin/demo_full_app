import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {

  @Input('permission') permission: string;

  constructor(private el: ElementRef, private auth: AuthService) {
  }
  ngOnInit() {
    switch (this.permission) {
      case "catalogDelete":
        if(this.auth.userValue.catalogDelete == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "catalogWrite":
        if(this.auth.userValue.catalogWrite == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "catalogRead":
        if(this.auth.userValue.catalogRead == false) {this.el.nativeElement.style.display = "none";}
      break;

      case "systemDelete":
        if(this.auth.userValue.systemDelete == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "systemWrite":
        if(this.auth.userValue.systemWrite == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "systemRead":
        if(this.auth.userValue.systemRead == false) {this.el.nativeElement.style.display = "none";}
      break;

      case "clientDelete":
        if(this.auth.userValue.clientDelete == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "clientWrite":
        if(this.auth.userValue.clientWrite == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "clientRead":
        if(this.auth.userValue.clientRead == false) {this.el.nativeElement.style.display = "none";}
      break;

      case "filmDelete":
        if(this.auth.userValue.filmDelete == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "filmWrite":
        if(this.auth.userValue.filmWrite == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "filmRead":
        if(this.auth.userValue.filmRead == false) {this.el.nativeElement.style.display = "none";}
      break;

      case "producerDelete":
        if(this.auth.userValue.producerDelete == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "producerWrite":
        if(this.auth.userValue.producerWrite == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "producerRead":
        if(this.auth.userValue.producerRead == false) {this.el.nativeElement.style.display = "none";}
      break;

      
      case "offerDelete":
        if(this.auth.userValue.offerDelete == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "offerWrite":
        if(this.auth.userValue.offerWrite == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "offerRead":
        if(this.auth.userValue.offerRead == false) {this.el.nativeElement.style.display = "none";}
      break;

      case "productionDelete":
        if(this.auth.userValue.productionDelete == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "productionWrite":
        if(this.auth.userValue.productionWrite == false) {this.el.nativeElement.style.display = "none";}
      break;
      case "productionRead":
        if(this.auth.userValue.productionRead == false) {this.el.nativeElement.style.display = "none";}
      break;

      default:
        break;
    }
  }

}
