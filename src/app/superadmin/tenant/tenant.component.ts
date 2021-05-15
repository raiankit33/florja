import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { SharedService } from "../../service/shared.service";
import Swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {

  p: number = 1;
  count: number = 5;
  index: any;

  isEdit = false;
  active:boolean = true;
  Inactive:boolean = false;
  allMember:boolean = false;
  tenantDetails = [];
  tenant: any;
  statusCode: string;
  name: any;
  error: string;
  user: any;
  err: string;
  open = false;
  message: string;
  mess = false;
  parent = false;
  editParent=false;


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
  AuthToken:""


  };
  Details =[];
  InactiveDetail=[];

  constructor(
    private serviceService: ServiceService,
    private sharedData: SharedService,
    private router: Router
  ) {
    this.serviceService.listen().subscribe((m: any) => {
      console.log(m);
      this.getTenantDetails();
    })
  }

 

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getTenantDetails();
  
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


  
  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{10}")]),

  })

  key: string = "tenant_id";
  reverse: boolean;


  sortData(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  openModel() {
    this.isEdit = false;

  }

 

  Search() {
    if (this.name == "") {
      this.getTenantDetails();
    } else {
      this.tenantDetails = this.tenantDetails.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
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

  refresh() {
    this.form.reset()
  }

  hide : boolean = true;
  AllData(){
 this.allMember = true;
 this.active =false;
 this.Inactive =false;
 this.hide = false

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
      const tenant = {
        id: this.user.id,
        name: this.form.value.name,
        email: this.form.value.email,
        phone: this.form.value.phone,
        t_name: this.form.value.t_name,
        AuthToken : this.user.token
       

      }
      this.serviceService.registerTenant(tenant).subscribe((data: any) => {
        if (data.statusCode == 200) {
          this.form.reset();
          this.serviceService.filter('');
          Swal.fire(
            'Tenant added successfully!',
            '',
            'success'
          )

        } else if (data.statusCode == 403) {
          this.err = "This email is already registered. ",
            this.open = true;
          setTimeout(() => {
            this.open = false
          }, 3000);
        } else if(data.statusCode == 404) {
          this.message = "This Phone no is already registered.",
            this.mess = true;
          setTimeout(() => {
            this.mess = false
          }, 3000);
        }else{
          
        }
      })
    } else {
      this.validateAllFormFields(this.form);
    } (error) => {
      this.error = 'Server Down Please try After Sometime ..! '
    }
  }

  close() {

  }

  parentF(parent){
    if(parent == 'null'){
      return null
    }else{
      return parent
    }
  }

  getTenantDetails() {
    let createToken ={
      AuthToken:this.user.token,

    }
    this.serviceService.getTenantDetails(createToken).subscribe((res: any) => {
      this.Details = res.data;

      this.tenantDetails = this.Details.filter(data => data.deleted_at == '');

      this.InactiveDetail = this.Details.filter(data => data.deleted_at != '' );

    }, (error) => {
      this.error = 'Server Down Please try After Sometime ..! '
      // Swal.fire(
        
        
      //  'Server Down Please try After Sometime ..! ',
      //   'success'
      // )
    }
    );
  }


  timer() {
    setTimeout(() => {
      console.log("Hello from setTimeout");
    }, 1000);
  }

  deleteTen(tenant) {
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
          id : tenant.id,
          AuthToken:this.user.token,
          
        }
        console.log(createToken)
        this.serviceService.deleteTenant(createToken).subscribe((res: any) => {
          this.getTenantDetails();
        });

        Swal.fire(
          'Deleted!',
          'Tenant has been deleted.',
          'success'
        )
      } (error) => {
        this.error = 'Server Down Please try After Sometime ..! '
      }
    })
  }





  editTen(tenant) {
    this.userObj = tenant;
    this.isEdit = true;

    // this.sharedData.updateSharedData(tenant);
    // this.router.navigate(['superadmin/edit',{id:tenant._id}]);
  }

  updateTen() {
    this.serviceService.updateTenant(this.userObj).subscribe(() => {
      Swal.fire(
        'Success!',
        'Tenant has Updated.',
        'success'
      )
    },(error) => {
      this.error = 'Server Down Please try After Sometime ..! '
    })
  }
  


  Ten(tenant) {
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
          id :tenant.id,
          AuthToken:this.user.token
        }
       
        this.serviceService.activateTen(activate).subscribe(() => {
          this.getTenantDetails();
          Swal.fire(
            'Success!',
            'Tenant Activated.',
            'success'
          )
        });

        
      }})
  }


  




}
