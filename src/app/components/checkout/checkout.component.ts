import {Component, OnInit} from '@angular/core';
import {CartModelServer} from "../../model/cart.model";
import {CartService} from "../../Services/cart.service";
import {OrderService} from "../../Services/order.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: number;

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  onCheckout() {

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.show();
      this.cartService.chackOutFromCart(2);
    }, 5000);
  }
}
