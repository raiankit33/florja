import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  error: string;

  email: String;
  password: String;
  mess: boolean;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  form = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),


  })

  onLoginSubmit() {
    // const user = {
    //   email: this.email,
    //   password: this.password

    // }
    if (this.form.valid) {
      this.authService.authenticateAdmin(this.form.value)
        .subscribe(
          (data) => {
            if (data.statusCode == 200)   
            {
              if (data.user.parent_id == "owner") {
                this.authService.storeUserData(data.token, data.user);
                this.router.navigate(['superadmin/adminDash']);
               
                this.toastr.success('Success ! logged In');
              } else {
                this.authService.storeUserData(data.token, data.user);
                this.router.navigate(['superadmin']);
                this.toastr.success('Success ! logged In');
               
              } 

            } else {
               if(data.statusCode == 406){
                this.error = 'Oops Login fail Inactive Admin' 
               }else{
             
              this.toastr.error('Oops', 'Invalid Email/Password ');
              this.router.navigate(['login']);
            }}
          },
          (error) => {
            this.error = 'Server Down Please try After Sometime ..! '
            setTimeout(() => {
            
            }, 3000);

          }
        );
    }
  }

}




class Response {
  success: string;
  token: string;
  user: Object;
  msg: string;
}

