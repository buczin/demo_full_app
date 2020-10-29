import { Component, ComponentRef, OnInit } from '@angular/core';
import { Offer, OffersService } from 'src/app/offers/offers.service';
import { PrintOfferService } from '../print-offer.service';

@Component({
  selector: 'app-print-offer-costs',
  templateUrl: './print-offer-costs.component.html',
  styleUrls: ['./print-offer-costs.component.scss']
})
export class PrintOfferCostsComponent implements OnInit {

  offer: Offer;
  offerId: string;

  constructor(
    private offerService: OffersService,
    private printOfferService: PrintOfferService
  ) { }

  ngOnInit(): void {
    console.log("Starting loading data...")
    this.offerService.getOfferById(this.offerId).subscribe({
      next: (res) => {
        this.offer = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Complete load data.")
        this.onDataReady();
      }
    })
  }

  onDataReady() {
    setTimeout(() => {
      console.log("Creating layout - offer costs...");
      this.printOfferService.removePrintOfferCost();
    })
  }
}