import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  form = new FormGroup({
  
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    permission: new FormControl('All Access', Validators.required),
  


  })

  
  isEdit = false;
  p: number = 1;
  count : number = 5;

  adminDetails= [];
  active:boolean = true;
  Inactive:boolean = false;
  allMember:boolean = false;

  error: string;
  user: any;
  AuthToken: any;
  tenantDetails: any;
  err: string;
  open= false;
  mess =false;
  message: string;
  parent=false;
  editParent = false;


  userObj = {
  id :"",
    name: "",
    email: "",
    phone: "",
    permission: "",
    admin: "",
    created_by: "",
    created_at: "",
    lastlogin:"",
    updated_at:"",
    updated_by:"",
    parent_id:"",
    password: "",
    token: "",
 
    
  };
  InactiveDetail=[];
  Details=[];

  constructor(
    private serviceService : ServiceService,
   
    private router: Router) {
    this.serviceService.listen().subscribe((m: any) => {
      console.log(m);
      this.getUserDetails();
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getUserDetails();
    if(this.user.permission=='all' && this.user.parent_id=="owner"){
      this.parent = true;
        }else{
         if (this.user.permission=='VIEW') {
           this.parent = false
         } else if (this.user.permission=='EDIT') {
           this.parent = false;
           this.editParent =true;
         }
        }
  }

  openModel() {
    this.isEdit = false;
  }


  validateAllFormFields(formGroup: FormGroup) {         //{1}
  Object.keys(formGroup.controls).forEach(field => {  //{2}
    const control = formGroup.get(field);             //{3}
    if (control instanceof FormControl) {             //{4}
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {        //{5}
      this.validateAllFormFields(control);            //{6}
    }
  });
}

refresh(){
  this.form.reset();
}


AllData(){
  this.allMember = true;
  this.active =false;
  this.Inactive =false;
 
   }
 
   ActiveTab(){
 this.active =true;
 this.Inactive =false;
 this.allMember =false;
   }
 
   InActiveTab(){
   this.Inactive =true;
   this.active =false;
   this.allMember =false;
   }

  onAddSubmit() {
    if (this.form.valid) {
  let createUserPayload = {
  
  parent_id: this.user.id,
    name: this.form.value.name,
    email: this.form.value.email,
    phone:this.form.value.phone,
    permission:this.form.value.permission
  }
      this.serviceService.adminUser(createUserPayload).subscribe( (res:any) => {
        if (res.statusCode== 200) {
          this.serviceService.filter('');
        this.form.reset();
        Swal.fire(
          'Admin added successfully!',
          '',
          'success'
        )
        }else{

        }
       
      })

    }else{
      this.validateAllFormFields(this.form);
    }(error)=> {
      this.error = 'Server Down Please try After Sometime ..! '
    }
  }




  getUserDetails() {
    let createToken ={
      AuthToken:this.user.token,
  id: this.user.id
    }
    this.serviceService.getAdminDetails(createToken).subscribe((res: any) => {
      this.Details = res.data;

      
      this.adminDetails = this.Details.filter(data => data.deleted_at === '');

      this.InactiveDetail = this.Details.filter(data => data.deleted_at !== '' );

      if(res.statusCode==404){
        this.error = "unauthorized "
      }

    },(error)=> {
      this.error = 'Server Down Please try After Sometime ..! '
    }

    );
  }
 
 

  deleteUser(user) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
      let createToken ={
        id: user.id,
        AuthToken : this.user.token,
      }
        this.serviceService.deleteAdminUser(createToken).subscribe((res: any) => {
          this.getUserDetails();
          Swal.fire(
            'Deleted!',
            ' Admin user deleted.',
            'success'
          )

        });
      }(error)=> {
        this.error = 'Server Down Please try After Sometime ..! '
      }
    })
  }

 


  editUser(user) {
    this.userObj = user;
    this.isEdit = true;
  }

  updateUser() {
    this.serviceService.UpdateAdminUser(this.userObj).subscribe(() => {
      Swal.fire(
        'Success!',
        'User Updated.',
        'success'
      )
    })
  }

activatedUser(user){

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Activate user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Activate!'
    }).then((result) => {
      if (result.isConfirmed) {
      let createToken ={
        id: user.id,
        AuthToken : this.user.token,
      }
        this.serviceService.activateU(createToken).subscribe((res: any) => {
          this.getUserDetails();
          Swal.fire(
            'Activated!',
            ' Admin Activated.',
            'success'
          )

        });
      }(error)=> {
        this.error = 'Server Down Please try After Sometime ..! '
      }
    })
  }
   



}


