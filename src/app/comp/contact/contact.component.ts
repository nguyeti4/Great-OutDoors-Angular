import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  form: any = {
    firstName: null,
    lastName: null,
    email:null,
    query:null
  };
  message=null;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.sendQuery(this.form.firstName,this.form.lastName,this.form.email,this.form.query).subscribe(
      data=>{
          this.message = data;
          if(!data){
            this.message = "Successfully sent message";
          }
          console.log("data: ",data);
      }
    );
  }

}
