import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductModelServer, ServerResponse} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient) { }


  /* this is to fetch all products from the backend server */
  getAllProducts(numberOfResult = 10): Observable<ServerResponse>{

    return this.http.get<ServerResponse>(this.SERVER_URL + '/products', {
      params: {
        limit: numberOfResult.toString()
      }
    })
  }

  /* This methods return a single product from the backend server*/
  getSingleProduct(id: number):Observable<ProductModelServer>{
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/' + id);
  }

  /* This methods return product of the same category from the backend server*/
  getProductCategory(catName: string): Observable<ProductModelServer[]>{
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + 'products/category/' + catName);
  }
}
