import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Product[];
  constructor(private pserv:ProductService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      let categoryName = this.route.snapshot.paramMap.get("category");
      if(categoryName==null){
        categoryName="Accessories";
      }
      this.listProduct(categoryName);
    }
    );
  }

  listProduct(cat:string){
    this.pserv.getProductList(cat).subscribe(
      data=>{
        this.products=data;
      }
    );
  }

  
}
