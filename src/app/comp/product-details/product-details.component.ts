import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:Product;
  cart:Cart;
  isLoggedIn = false;
  message = null;
  user = null;
  constructor(private pserv:ProductService, private route:ActivatedRoute, private userService:UserService, private storageService: StorageService, private router:Router) { }
/*
  get quant(){
    console.log(`the value ${this._quant} was accessed`)
    return this._quant;
  }

  set quant(quantity){
    this._quant = quantity;
    console.log(`the value ${this._quant} was set`);
  }
*/
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
     //whenever there is a change in the parameter route
     this.route.paramMap.subscribe(()=>{
      var productId =+ this.route.snapshot.paramMap.get("id");
      if(productId==0){
        productId=1;
      }
      this.viewProduct(productId);
    }
    );
  }

  viewProduct(id:number){
    this.pserv.getProductDetails(id).subscribe(
      data=>{
        this.product=data;
        console.log(data);
      }
    );
    this.user = this.storageService.getUser();

  }

  BuyProduct(){
    if(this.user.id == undefined){
      this.message = "You cannot buy yet. Login first";
    }
    else{
      let quantity = <HTMLInputElement> document.getElementById("quantity");
      console.log("quantity: ",quantity.value);
    //  this.router.navigate([`/buy/${this.product.id}/${ quantity.value }/${ this.user.id }`]);
      this.router.navigate([`/buy/${this.product.id}/${ quantity.value }/0/0`]);

    }
  }
/*
  AddProduct(){
    if (this.isLoggedIn) {
      const currentUser = this.storageService.getUser();
      this.userService.getUserCart(currentUser.id).subscribe(
        data=>{
          console.log("cart: ",data);
          this.viewConfirm(data.cartId);
        }
      );
    }
    else{
      this.message = "You can't add to your cart. Login first";
    }
  }*/

  AddProduct(){
    if (this.isLoggedIn) {
      let quantity = <HTMLInputElement> document.getElementById("quantity");
      console.log("quantity: ",quantity.value);
      const currentUser = this.storageService.getUser();
      this.userService.addProduct(this.product.id,currentUser.id,parseInt(quantity.value)).subscribe(
        data=>{
          this.message=data.message;
          console.log(this.message);
        }
      );
    }
    else{
      this.message = "You can't add to your cart. Login first";
    }
  }

  /*
  viewConfirm(cartid:number){
    this.userService.addProduct(this.product.id,cartid,this._quant).subscribe(
      data=>{
        this.message=data.message;
        console.log(this.message);
      }
    );
  }*/


}
