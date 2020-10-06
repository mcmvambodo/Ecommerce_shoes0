import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../Services/product.service";
import {CartService} from "../../Services/cart.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {map} from "rxjs/operators";


declare let $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit , AfterViewInit{

  id: number;
  products;
  thumbImages:any[] = [];

  @ViewChild('quantity') quantityInput;
  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(map((param: ParamMap) =>{
        // @ts-ignore
        return param.params.id;
      }))
      .subscribe(prodId =>{
        this.id = prodId;
        this.productService.getSingleProduct(this.id).subscribe(prod =>{
          this.products = prod;

          if (prod.images !== null){
            this.thumbImages = prod.images.split(';')
          }
        });
      });
  }

  ngAfterViewInit(): void {
    // Product Main img Slick
    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    var zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }
  }

  addToCart(id: number) {
    this.cartService.AddProductToCart(id, this.quantityInput.nativeElement.value);
  }

  increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.products.quantity >= 1){
      value++;

      if (value > this.products.quantity) {
        // @ts-ignore
        value = this.product.quantity;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.products.quantity > 0){
      value--;

      if (value <= 1) {
        // @ts-ignore
        value = 1;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }
}
