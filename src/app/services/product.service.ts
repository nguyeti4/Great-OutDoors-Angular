import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000/api';
  headers = new HttpHeaders({
    "Content-Type":"application/json"
  });
  
  constructor(private http:HttpClient) {  }

  getProductList(cat:string):Observable<Product[]>{
    const url=`${this.baseUrl}/products/search/findByCategory?category=${cat}`;
    return this.http.get<ProductListResponse>(url).pipe(map(res=>res._embedded.products));
  }

  getProductDetails(id:number):Observable<Product>{
    const url=`${this.baseUrl}/products/search/findByProductId?id=${id}`;
    return this.http.get<Product>(url);
  }


}

interface ProductListResponse{
  _embedded:{
    products:Product[];
  }
}

