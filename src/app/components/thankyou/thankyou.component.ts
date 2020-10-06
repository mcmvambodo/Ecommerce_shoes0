import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../Services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  message : string;
  orderId: number;
  products;
  cartTotal:number;

  constructor(private router: Router,
              private orderService: OrderService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      message: string,
      products: ProductResponsesModel[],
      orderId: number,
      total: number
    };

    this.message = state.message;
    this.products = state.products;
    this.orderId = state.orderId;
    this.cartTotal = state.total;

  }

  ngOnInit() {
  }

}

interface ProductResponsesModel{
  id: number;
  name: string;
  description: string;
  price: number;
  quantityOrdered: number;
  image: string;
}
