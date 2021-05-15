import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-tenantlogin',
  templateUrl: './tenantlogin.component.html',
  styleUrls: ['./tenantlogin.component.css']
})
export class TenantloginComponent implements OnInit {
  error: string;

  email: String;
  password: String;

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
      this.authService.authenticateTenant(this.form.value)
        .subscribe(
          (data) => {
            if (data.statusCode == 200) {
              if (data.user.parent_id == 'null') {
                this.authService.storeUserData(data.token, data.user);
              this.router.navigate(['subadmin']);
              this.toastr.success('Success ! logged In');
              } else {
                this.authService.storeUserData(data.token, data.user);
              this.router.navigate(['subadmin']);
              this.toastr.success('Success ! logged In');
              }
            
            } else {
              if(data.statusCode == 406){
                this.error = 'Oops Login fail Inactive Tenant' 
              }
          
              this.toastr.error('Oops', 'Failed to logged In');
              this.router.navigate(['login']);
            }
          },
          (error) => {
            this.error = 'Server Down Please try After Sometime ..! '


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

