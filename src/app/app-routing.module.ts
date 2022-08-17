import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './comp/about/about.component';
import { CartComponent } from './comp/cart/cart.component';
import { ContactComponent } from './comp/contact/contact.component';
import { HomeComponent } from './comp/home/home.component';
import { LoginComponent } from './comp/login/login.component';
import { OrderComponent } from './comp/order/order.component';
import { ProductDetailsComponent } from './comp/product-details/product-details.component';
import { ProductListComponent } from './comp/product-list/product-list.component';
import { RegisterComponent } from './comp/register/register.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'category/:category', component:ProductListComponent},
  {path: 'cart', component: CartComponent},
  {path: 'buy/:productId/:quantity/:userId', component:OrderComponent},
  {path: 'product/:id', component:ProductDetailsComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
