import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/model/cart';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentUser: any;
  cart:Cart;
  products: Product[];
  message = null;
  hasProducts = null;
  carts:CartItem[] = null;
  constructor(private storageService: StorageService, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    console.log("currentUser: ", this.currentUser);
    //this.viewCart(this.currentUser.id);
    this.viewCarts(this.currentUser.id);
  }

  viewCarts(userId:number){
    if(userId!=undefined){
      this.userService.getUserCartItems(userId).subscribe(
        data=>{
          //for each cartItem, set its product
          this.carts = data;
          console.log("CartItems: ", this.carts);
          if(this.carts.length==0){
            this.hasProducts = false;
          }
          else{
            this.hasProducts = true;
          }
          this.carts.map(cartItem => {
            this.userService.getCartProduct(cartItem.cartId).subscribe(
              data=>{
                 //map the product to the corresponding cartItem
                 let p:Product = data;
                 console.log("Product: ",p);
                 cartItem.product = p;
                 console.log("CartItem product: ",cartItem.product);
              }
            );
          });
          console.log("Cart2: ",this.carts);
        }
      );
    }
  }

  /*
  viewCart(userid:number){
    if(userid!=undefined){
      this.userService.getUserCart(userid).subscribe(
        data=>{
          this.cart=data;
          this.viewCartProducts(this.cart.cartId);
        }
      );
    }
    else{
      this.currentUser = null;
    }
  }

  viewCartProducts(cartid:number){
    this.userService.getCartProducts(cartid).subscribe(
      data=>{
        this.products=data;
        console.log(this.products);
        if(this.products.length==0){
          this.hasProducts = false;
        }
        else{
          this.hasProducts = true;
        }
      }
    );
  }*/

  viewConfirm(cartId:number){
    console.log("cartId: ",cartId);
    this.userService.removeProduct(cartId,this.currentUser.id).subscribe(
      data=>{
        this.message=data.message;
        console.log(this.message);
      }
    );
    window.location.reload();
  }

  
  Buy(cartId: number, itemQuantity: number, productId:number){
      let quantity_changed = 0;
      let quantity = <HTMLInputElement> document.getElementById(`quantity${cartId}`);
      console.log("New quantity: ",parseInt(quantity.value));
      console.log("Old quantity: ",itemQuantity);
      if(itemQuantity != parseInt(quantity.value)){
         quantity_changed = 1;
      }
      console.log("cartId: "+cartId);
      this.router.navigate([`/buy/${productId}/${ quantity.value }/${ cartId }/${ quantity_changed }`]);
  }

}
