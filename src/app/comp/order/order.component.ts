import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/model/address';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  product: Product;
  quantity: number;
  userId: number;
  message: string;
  addresses: Address[];
  cartId: number

  constructor(private pserv:ProductService, private route:ActivatedRoute, private userService: UserService, private userStorage: StorageService) { }
  

  ngOnInit(): void {
       //whenever there is a change in the parameter route
        this.route.paramMap.subscribe(()=>{
        this.cartId =+ this.route.snapshot.paramMap.get("cartId")
        var productId =+ this.route.snapshot.paramMap.get("productId");
        this.quantity =+ this.route.snapshot.paramMap.get("quantity");
        let quantity_changed =+ this.route.snapshot.paramMap.get("changed");
        this.userId =+ this.userStorage.getUser().id;
        console.log("userId: ",this.userId);
        //this.userId =+ this.route.snapshot.paramMap.get("userId");
        if(quantity_changed){
          console.log("I changed!");
          console.log("quant: ",this.quantity);
          this.userService.changeQuantity(this.cartId,this.quantity).subscribe(
            data=>{
              console.log(data);
            }
          );
        }
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
    let addr = new Address();
    console.log("addr: ",addr);
    this.addresses = new Array<Address>;
    this.addresses.push(addr);
    console.log("addresses: ",this.addresses);

    //this.addresses.push(addr);
  }

  PlaceOrder(){
    if (this.userStorage.isLoggedIn()) {
      let currentUser = this.userStorage.getUser();
      let productId = this.product.id;
      let price = this.product.price * this.quantity + 10;
      this.userService.addOrder(productId,this.quantity,currentUser.id,this.addresses,price).subscribe(
        data=>{
          this.message = data.message;
          console.log(this.message);
          if(this.cartId){
            this.userService.removeProduct(this.cartId,this.userId).subscribe(
              data=>{
                console.log("rmv message: ",data.message);
              }
            );
          }
        }
      );
    }
    else{
      this.message = "Login first";
    }
  }

  AddAddress(){
    let addr = new Address();
    this.addresses.push(addr);
  }


}
