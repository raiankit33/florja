import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubadminService } from '../../service/subadmin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  //  user = [{ id: '31d322eca5cd404ab437c39451df5c1e', name: 'test', email: 'test', phone: 'Test', permission: 'User' }];

  form = new FormGroup({

    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    permission: new FormControl('All Access', Validators.required),


  })


  active: Boolean = true;
  Inactive: boolean = false;
  allMember : boolean =false;
  p: number = +1;
  count = 5;
  userDetails = [];

  error: string;
  user: any;
  AuthToken: any;
  tenant = false;
  editTenant = false;
  Details = [];


  userObj = {
    token: "",
    updated_at: "",
    delete_at: "",
    password: "",
    t_id: "",
    t_name: "",
    id: "",
    name: "",
    email: "",
    phone: "",
    permission: "",
    created_at: "",
  };
  InactiveDetail: any[];
  err1: string;
  open: boolean;
  err2: string;
  mess: boolean;

  constructor(private subadminService: SubadminService,
    private router: Router) {
    this.subadminService.listen().subscribe((m: any) => {
      console.log(m);
      this.getUserDetails();

    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.getUserDetails();

    if (this.user.permission == 'ALL') {
      this.tenant = true;
    } else {
      if (this.user.permission == 'VIEW') {
        this.tenant = false
      } else if (this.user.permission == 'EDIT') {

        this.editTenant = true;
      }
    }
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

  AllTab(){
    this.allMember = true;
    this.active =false;
    this.Inactive =false;
  }

  ActiveTab(){
    this.active =true;
    this.Inactive = false;
    this.allMember =false;
  }
  
    InActiveTab(){
    this.Inactive =true;
    this.active =false;
    this.allMember = false;
    }
    
  onAddSubmit() {
    if (this.form.valid) {
      let createUserPayload = {

        id: this.user.id,
        name: this.form.value.name,
        email: this.form.value.email,
        phone: this.form.value.phone,
        permission: this.form.value.permission,
        token:this.user.token,
      }
      console.log(createUserPayload);
      this.subadminService.registerUser(createUserPayload).subscribe(  (res:any) => {
        if (res.statusCode== 200) {
          this.subadminService.filter('');
        this.form.reset();
        Swal.fire(
          'User added successfully!',
          '',
          'success'
        )
        }else if(res.statusCode== 403){
          this.err1 = "This email is already registered."
          this.open = true;
          setTimeout(() => {
            this.open = false
          }, 3000);
        }else{
          this.err2 = "This Phone no is already registered."
          this.mess = true;
          setTimeout(() => {
            this.mess = false
          }, 3000);
        }
      })

    } else {
      this.validateAllFormFields(this.form);
    }
  }

array =[];

  getUserDetails() {
    let createToken = {
      AuthToken: this.user.token,
      t_id: this.user.id
    }
    this.subadminService.getUserDetails(createToken).subscribe((res: any) => {
      this.Details = res.data;

      this.userDetails = this.Details.filter(data => data.deleted_at === '');

       this.InactiveDetail = this.Details.filter(data => data.deleted_at !== '' )

  

    }, (error) => {
      this.error = 'Server Down Please try After Sometime ..! '
    }

    );
  }

delete :any;

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
        
        this.subadminService.deleteUser(createToken).subscribe(() => {
          this.getUserDetails();
        })


        Swal.fire(
          'Deleted!',
          'Tenant has been deleted.',
          'success'
        )
      }
    })
  }



  editUser(user) {
    this.userObj = user;


    // this.sharedData.updateSharedData(tenant);
    // this.router.navigate(['superadmin/edit',{id:tenant._id}]);
  }
  updateUser() {
    let createToken = {
      AuthToken: this.user.token,

    }
    this.subadminService.UpdateUser(this.userObj).subscribe(() => {
      Swal.fire(
        'Success!',
        'User has Updated.',
        'success'
      )
    })
  }

  ActivateUser(user) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Activate this User!",
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
       
        this.subadminService.activateU(activate).subscribe(() => {
          this.getUserDetails();
          Swal.fire(
            'Success!',
            'Tenant Activated.',
            'success'
          )
        });

        
      }})
  }




}
