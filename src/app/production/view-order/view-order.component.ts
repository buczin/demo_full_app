import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { OrderPosition, ProductionOrder } from '../production-service/production-service.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewOrderComponent implements OnInit {

  @Input() productionOrder: ProductionOrder;
  @Input() orderPosition: OrderPosition[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.productionOrder);
    console.log(this.orderPosition);
  }
}
