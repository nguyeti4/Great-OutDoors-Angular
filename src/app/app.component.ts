import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { StorageService } from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'outdoors-app';
  isLoggedIn = false;
  

  constructor(private storageService: StorageService, private authService: AuthService) { }
  //First, we check isLoggedIn status using StorageService, if it is true, we get user’s roles and set value for showAdminBoard & showModeratorBoard flag.
  // They will control how template navbar displays its items.
  
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
    }
  }
  
  //The App Component template also has a Logout button link that call logout() method and reload the window.
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.isLoggedIn = false;
      },
      error: err => {
        console.log(err);
      }
    });
    
    window.location.reload();
  }
  

}


