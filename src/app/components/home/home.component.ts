import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../Services/product.service";
import {any} from "codelyzer/util/function";
import {Router} from "@angular/router";
import {ProductModelServer, ServerResponse} from "../../model/product.model";
import {CartService} from "../../Services/cart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];
  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: Router){
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.product;
      console.log(this.products);
    })
  }

  selectedProduct(id: number) {
    this.route.navigate(['/products', id]).then();

  }

  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }
}
