import { ComponentRef, EmbeddedViewRef } from "@angular/core";
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
} from "@angular/core";
import { PrintOfferCostsComponent } from "./print-offer-costs/print-offer-costs.component";
import { PrintOfferComponent } from "./print-offer/print-offer.component";
import { PrintOrderProductionComponent } from "./print-order-production/print-order-production.component";

@Injectable({
  providedIn: "root",
})
export class PrintOfferService {
  private id: string;
  private dialogComponentRefOffer: ComponentRef<PrintOfferComponent>;
  private dialogComponentRefOfferCost: ComponentRef<PrintOfferCostsComponent>;
  private dialogComponentRefOrder2: ComponentRef<PrintOrderProductionComponent>;
  private domElem: HTMLElement;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  initPrint(printType: string, id: string) {
    this.id = id;
    console.log("Init printing: " + this.id);

    switch (printType) {
      case "offer":
        this.printOffer(id);
        break;
      case "offerCost":
        this.printOfferCost(id);
        break;
      case "orderProd2":
        this.printProductionOrder2(id);
        break;
    }
  }

  private printOffer(id) {
    console.log("print offer");
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      PrintOfferComponent
    );
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.offerId = id;

    this.appRef.attachView(componentRef.hostView);
    this.domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(this.domElem);
    this.dialogComponentRefOffer = componentRef;
  }

  removePrintOffer() {
    console.log("Close offer print");
    this.appRef.detachView(this.dialogComponentRefOffer.hostView);
    this.dialogComponentRefOffer.destroy();
  }

  private printOfferCost(id) {
    console.log("print offer cost");
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      PrintOfferCostsComponent
    );
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.offerId = id;

    this.appRef.attachView(componentRef.hostView);
    this.domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(this.domElem);
    this.dialogComponentRefOfferCost = componentRef;
  }

  removePrintOfferCost() {
    console.log("Close offer cost print");
    this.appRef.detachView(this.dialogComponentRefOfferCost.hostView);
    this.dialogComponentRefOfferCost.destroy();
  }

  private printProductionOrder2(id) {
    console.log("print prod order");
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      PrintOrderProductionComponent
    );
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.idOrder = id;

    this.appRef.attachView(componentRef.hostView);
    this.domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(this.domElem);
    this.dialogComponentRefOrder2 = componentRef;
  }

  removePrintProductionOrder2() {
    console.log("Close order print");
    this.appRef.detachView(this.dialogComponentRefOrder2.hostView);
    this.dialogComponentRefOrder2.destroy();
  }
}
