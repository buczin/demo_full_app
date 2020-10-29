import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { OrderPosition, ProductionOrder, ProductionServiceService } from '../production/production-service/production-service.service';
import { CookieService } from 'ngx-cookie-service';
import * as pdfMake from '../../../node_modules/pdfmake/build/pdfmake';
import * as pdfFonts from '../../../node_modules/pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  domElem: HTMLElement;
  isPrinting = false;
  url: string;
  idOrder: string;
  productionOrder: ProductionOrder;
  orderPosition: OrderPosition[];
  printPosition: any[];
  printSide: any[];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private productionService: ProductionServiceService,
    private cookieService: CookieService,
  ) { }
 
}
