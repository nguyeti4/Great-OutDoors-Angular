import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Address } from '../model/address';
import { Cart } from '../model/cart';
import { CartItem } from '../model/cart-item';
import { Product } from '../model/product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000/api';
  headers = new HttpHeaders({
    "Content-Type":"application/json"
  });
  
  constructor(private http: HttpClient) { }
/*
  getUserCart(userId: number, productId:number): Observable<any>{
    const url = `${this.baseUrl}/test/getCart/${userId}/${productId}`;
    return this.http.get<Cart>(url);
  }*/

  //use
  getUserCartItems(userId: number):Observable<any>{
    const url = `${this.baseUrl}/users/${userId}/carts`;
    return this.http.get<CartListResponse>(url).pipe(map(res=>res._embedded.carts))
  }

  getCartProducts(cartId: number): Observable<any>{
    const url = `${this.baseUrl}/carts/${cartId}/products`;
    return this.http.get<ProductListResponse>(url).pipe(map(res=>res._embedded.products));
  }

  //use
  getCartProduct(cartId: number): Observable<any>{
    const url = `${this.baseUrl}/carts/${cartId}/product`;
    return this.http.get<Product>(url);
  }

  /*
  addProduct(productId: number, cartId: number): Observable<any> {
    const url = `${this.baseUrl}/test/addProduct/${productId}/${cartId}`;
    return this.http.post(url, { responseType: 'text' });
  }*/
  addProduct(productId:number,userId:number,quantity:number):Observable<any>{
    const url = `${this.baseUrl}/test/addProduct/${productId}/${userId}/${quantity}`;
    return this.http.post(url, { responseType: 'text' });
  }
/*
  removeProduct(productId: number, cartId: number): Observable<any> {
    const url = `${this.baseUrl}/test/removeProduct/${productId}/${cartId}`;
    return this.http.delete(url, { responseType: 'text' });
  }*/

  
  removeProduct(cartId:number,userId:number) : Observable<any>{
    const url = `${this.baseUrl}/test/removeProduct/${userId}/${cartId}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  addOrder(productId: number, quantity: number, userId: number, addresses: Address[], price:number): Observable<any>{
    const url = `${this.baseUrl}/test/addOrder/${productId}/${quantity}/${userId}`;
    return this.http.post(
      url, 
      {
        addresses,
        price
      },
      httpOptions
    );
  }

  
  changeQuantity(cartId:number,quantity:number){
    console.log("cartIdnew", cartId);
    console.log("qnew", quantity);
    const url = `${this.baseUrl}/test/changeQuantity/${cartId}/${quantity}`;
    return this.http.post(url,{ responseType: 'text' });
  }

  sendQuery(firstName: string,lastName: string,email: string,query: string){
    const url = `${this.baseUrl}/auth/sendMail`;
    return this.http.post(
      url, 
      {
        firstName,
        lastName,
        email,
        query
      },
      {responseType: 'text'}
    );
  }

}

interface ProductListResponse{
  _embedded:{
    products:Product[];
  }
}

interface CartListResponse{
  _embedded:{
    carts:CartItem[];
  }
}
