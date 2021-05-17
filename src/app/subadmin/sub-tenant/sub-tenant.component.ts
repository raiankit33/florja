import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubadminService } from 'src/app/service/subadmin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-tenant',
  templateUrl: './sub-tenant.component.html',
  styleUrls: ['./sub-tenant.component.css']
})
export class SubTenantComponent implements OnInit {


 
  p: number = +1;
  count=5;
  tenantDetails =[];
  error: string;
  user: any;
  AuthToken: any;
  tenant = false;
  editTenant = false;
  active:boolean =true;
  Inactive:boolean = false;
  allMember: boolean =false;
hide :boolean=true;

  userObj = {
    id: "",
    name: "",
    email: "",
    phone: "",
  updated_at:"",
  updated_by:"",
  token:"",
  permission:"",
  password:"",
  parent_name:"",
  parent_id:"",
  lastlogin:"",
  created_by:"",
  created_at:"",
  Super_Admin_name:"",
  Super_Admin_id:"",


  };
  InactiveDetail = [];
  Details =[];
  

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
    } else if (this.user.permission == 'VIEW') {
    
      this.tenant = false
    } else if (this.user.permission == 'EDIT') {

      this.editTenant = true;
    } 

  }


  form = new FormGroup({

    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    permission: new FormControl('All Access', Validators.required),


  })

 


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
        AuthToken:this.user.token
      }
   
      this.subadminService.addSubTenant(createUserPayload).subscribe(res => {
       
        this.subadminService.filter('');
        this.form.reset();
        Swal.fire(
          'User added successfully!',
          '',
          'success'
        )
      })

    } else {
      this.validateAllFormFields(this.form);
    }
  }


  refresh() {
    this.form.reset();
  }

  getUserDetails() {
    let createToken = {
      AuthToken: this.user.token,
    }
    this.subadminService.gettenantDetails(createToken).subscribe((res: any) => {
      this.Details = res.data;

      this.tenantDetails = this.Details.filter(data => data.deleted_at == '');

      this.InactiveDetail = this.Details.filter(data => data.deleted_at !== '' )

    }, (error) => {
      this.error = 'Server Down Please try After Sometime ..! '
    }

    );
  }

delete : any;

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
       
    
       let token ={
         id:user.id,
         AuthToken :this.user.token
       }
           
       
        this.subadminService.deleteSubTenant(token).subscribe((res: any) => {
          this.getUserDetails();


        });

        Swal.fire(
          'Deleted!',
          'Sub Tenant  deleted.',
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
    this.subadminService.UpdateSubTenant(this.userObj).subscribe(() => {
      Swal.fire(
        'Success!',
        'Sub Tenant has Updated.',
        'success'
      )
    })
  }


  ActiveLink(user) {
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
       
        this.subadminService.activateTenant(activate).subscribe(() => {
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
