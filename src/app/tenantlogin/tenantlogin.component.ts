import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tenantlogin',
  templateUrl: './tenantlogin.component.html',
  styleUrls: ['./tenantlogin.component.css']
})
export class TenantloginComponent implements OnInit {
  error :string;

  email: String;
  password: String;

  constructor(
    private authService: AuthService,


    private router: Router,) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password

    }

    this.authService.authenticateTenant(user)
      .subscribe(
        (data) => {
          if(data.statusCode==200){
          localStorage.setItem('TenantToken', data.token);
          this.router.navigate(['subadmin']);
          alert('Success ! logged In')
          }else{
            console.log('error');
            alert("fail to logged In")
            this.router.navigate(['login']);
          }
        },
        (error) => {
          this.error = 'Server Down Please try After Sometime ..! '
          
         
        }
      );
  }

}




class Response {
  success: string;
  token: string;
  user: Object;
  msg: string;
}

