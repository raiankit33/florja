import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { SubadminService } from 'src/app/service/subadmin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  form = new FormGroup({
  
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    permission: new FormControl('All Access', Validators.required),
    id: new FormControl('', Validators.required),


  })

  
  isEdit = false;
  p: number = 1;
  count : number = 5;
  active: Boolean = true;
  Inactive: boolean = false;
  allMember : boolean =false;
  userDetails= [];

 
  error: string;
  user: any;
  AuthToken: any;
  tenantDetails: any;
  err: string;
  open= false;
  mess =false;
  message: string;
  parent=false;
  editParent= false;

  userObj = {

    name: "",
    email: "",
    phone: "",
    id:"",
    permission: ""
  };
  InactiveDetail = [];
  Details = [];

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
    this.getTenantDetails();
    // this.parent_id= this.user.parent_id;
    if(this.user.permission=='all' && this.user.parent_id=="owner"){
      this.parent = true;
        }else{
         if (this.user.permission=='VIEW') {
           this.parent = false
         } else if (this.user.permission=='EDIT') {
          
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
  
  
    name: this.form.value.name,
    email: this.form.value.email,
    phone:this.form.value.phone,
    id:this.form.value.id,
    permission:this.form.value.permission,
    AuthToken:this.user.token
  }
  

      this.serviceService.registerUser(createUserPayload).subscribe( (res:any) => {
        if (res.statusCode== 200) {
          this.serviceService.filter('');
        this.form.reset();
        Swal.fire(
          'User added successfully!',
          '',
          'success'
        )
        }else if(res.statusCode== 403){
          this.err = "This email is already registered."
          this.open = true;
          setTimeout(() => {
            this.open = false
          }, 3000);
        }else if(res.statusCode == 404){
          this.message = "This Phone no is already registered."
          this.mess = true;
          setTimeout(() => {
            this.mess = false
          }, 3000);
        }else{
          this.message = "Token Mismatch"
        }
      })

    }else{
      this.validateAllFormFields(this.form);
    }
  }




  getUserDetails() {
    let createToken ={
      AuthToken:this.user.token,

    }
    this.serviceService.getUserDetails(createToken).subscribe((res: any) => {
      this.Details = res.data;

      this.userDetails = this.Details.filter(data => data.deleted_at === '');

      this.InactiveDetail = this.Details.filter(data => data.deleted_at !== '' );
      if(res.statusCode==404){
        this.error = "Token Mismatch "
      }

    },(error)=> {
      this.error = 'Server Down Please try After Sometime ..! '
    }

    );
  }

getSort(a,b){
     if(a.created_at > b.created_at){
      return 1
     }
    
 
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
        let createToken = {
          id : user.id,
          AuthToken : this.user.token
        }
        this.serviceService.deleteUser(createToken).subscribe((res: any) => {
          this.getUserDetails();


        });

        Swal.fire(
          'Deleted!',
          'Tenant Deleted.',
          'success'
        )
      }
    })
  }

 


  editUser(user) {
    this.userObj = user;
    this.isEdit = true;

    // this.sharedData.updateSharedData(tenant);
    // this.router.navigate(['superadmin/edit',{id:tenant._id}]);
  }
  updateUser() {
    let createToken ={
      AuthToken:this.user.token,

    }
    this.serviceService.UpdateUser(this.userObj).subscribe(() => {
      Swal.fire(
        'Success!',
        'User Updated.',
        'success'
      )
    })
  }


  getTenantDetails(){
    let createToken ={
      AuthToken:this.user.token,

    }
    this.serviceService.getTenantDetails(createToken).subscribe((res:any)=>{
      this.tenantDetails = res.data;
     
    },(error)=> {
      this.error = 'Server Down Please try After Sometime ..! '
    }
    );
  } 

  activateUser(user) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Activate this Tenant!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Activate!'
    }).then((result) => {
      if (result.isConfirmed) {
        let activate ={
          id :user.id,
          AuthToken:this.user.token
        }
       
        this.serviceService.activateU(activate).subscribe(() => {
        this.getUserDetails();
          Swal.fire(
            'Success!',
            'User Activated.',
            'success'
          )
        });

        
      }})
  }


}

