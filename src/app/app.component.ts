import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { GlobalService } from './_services/global.service'
import { version } from '../../package.json';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Herakles';
  public version: string = version;

  constructor(
    public globalService: GlobalService,
    public auth: AuthService,
    private cookieService: CookieService
    ){
      console.log(version);
      if (!this.cookieService.check('app_version')) {
        this.cookieService.set('app_version', version)
      } else {
        if(version != this.cookieService.get('app_version')){
          console.log("wersja niezgodna");
          this.cookieService.set('app_version', version)
          this.auth.logout();
        }else{
          console.log("wersja zgodna");
        }
      }
  }

}
