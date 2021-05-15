import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { SharedService } from 'src/app/service/shared.service';
import { UserService } from 'src/app/service/user.service';
import { MessagingService } from '../../service/messaging.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addplant',
  templateUrl: './addplant.component.html',
  styleUrls: ['./addplant.component.css']
})
export class AddplantComponent implements OnInit {
  plantDetails = [];
  name:any;
  isEdit=false;
  p: number =1 ;
  count:number = 5;
  user: any;
  tenantDetails: any;
  error: string;
  userDetails: [];
  active:boolean = true;
  Inactive:boolean = false;
  allMember:boolean = false;

  userObj ={
    id:"",
    name: "",
    soil_humidity_min:"",
    soil_humidity_max: "",
    soil_temp_max: "",
    soil_temp_min: "",
    air_humidity_min:"",
    air_humidity_max: "",
    ec_min: "",
    ec_max:"",
    air_temp_max: "",
    air_temp_min: "",
    fertilization_interval: "",
    autumn_end: "",
    autumn_start: "",
    spring_end:"",
    spring_start: "",
    summer_end: "",
    summer_start:"",
    winter_end:"",
    winter_start: "",
    t_id:"",
    t_name:"",
    u_id:"",
    u_name:"",
    latitude:"",
    longitude:"",
    created_at:"",
  }
  parent=false;
  editParent =false;
 
   constructor(
    private serviceService : ServiceService,
     private userService : UserService,
     private toastr: ToastrService,
     private messagingService: MessagingService,
        private sharedData : SharedService,
     private router: Router, )
   {
     this.serviceService.listen().subscribe((m:any)=>{
       console.log(m);
       this.getPlantDetails();
     })
    }
 
 
 
   ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getTenantDetails();
     this.getPlantDetails();
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
 
   plantPage(plant){
    this.sharedData.updateSharedData(plant);
   
    this.router.navigate(['superadmin/plantD',{id:plant.id}]);
     
   }
 
 
   form = new FormGroup({
     // P_ID: new FormControl(''),
     
     name: new FormControl('',Validators.required),
   
     soil_humidity_min: new FormControl('',Validators.required),
     soil_humidity_max: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{2}")]),
     soil_temp_max: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{2}")]),
     soil_temp_min: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{2}")]),
     air_humidity_min: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{2}")]),
     air_humidity_max: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{2}")]),
     ec_min: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{2}")]),
     ec_max: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{2}")]),
     air_temp_max: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{2}")]),
     air_temp_min: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{2}")]),
     fertilization_interval: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{2}")]),
     autumn_end: new FormControl('',Validators.required),
     autumn_start: new FormControl('',Validators.required),
     spring_end: new FormControl('',Validators.required),
     spring_start: new FormControl('',Validators.required),
     summer_end: new FormControl('',Validators.required),
     summer_start: new FormControl('',Validators.required),
     winter_end: new FormControl('',Validators.required),
     winter_start: new FormControl('',Validators.required),
     t_id: new FormControl('',Validators.required),
     u_id: new FormControl('',Validators.required),
     latitude: new FormControl('',Validators.required),
     longitude: new FormControl('',Validators.required),
     
 
   })
 
 
   Search(){
     if(this.name == ""){
       this.getPlantDetails();
     }else{
       this.plantDetails = this.plantDetails.filter(res =>{
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
 
   onAddSubmit(){
 
     if(this.form.valid){

      let createPlant ={
        t_id: this.form.value.t_id,
        u_id: this.form.value.u_id,
        name: this.form.value.name,
        soil_humidity_min: this.form.value.soil_humidity_min,
        soil_humidity_max: this.form.value.soil_humidity_max,
        soil_temp_max: this.form.value.soil_temp_max,
        soil_temp_min: this.form.value.soil_temp_min,
        air_humidity_min:this.form.value.air_humidity_min,
        air_humidity_max: this.form.value.soil_humidity_max,
        ec_min: this.form.value.ec_min,
        ec_max:this.form.value.ec_max,
        air_temp_max: this.form.value.air_temp_max,
        air_temp_min: this.form.value.air_temp_min,
        fertilization_interval: this.form.value.fertilization_interval,
        autumn_end: this.form.value.autumn_end,
        autumn_start: this.form.value.autumn_start,
        spring_end: this.form.value.spring_end,
        spring_start: this.form.value.spring_start,
        summer_end: this.form.value.summer_end,
        summer_start:this.form.value.summer_start,
        winter_end:this.form.value.winter_end,
        winter_start: this.form.value.winter_start,
        latitude: this.form.value.latitude,
        longitude: this.form.value.longitude,
        AuthToken:this.user.token
      }
console.log(createPlant)
     this.serviceService.registerPlant(createPlant).subscribe( res=> {
       console.log(res);
       this.serviceService.filter('');
       this.form.reset();
       Swal.fire(
         'Plant has added successfully!',
         '',
         'success'
       )
     })
 
   } else{
    this.validateAllFormFields(this.form);
  }
   }
 
   getPlantDetails(){
    let createToken ={
      AuthToken:this.user.token,
      
    }
     this.serviceService.getPlantDetails(createToken).subscribe((res:any)=>{
       this.plantDetails = res.data;
      console.log(this.plantDetails)
      //  this.tenantDetails = this.Details.filter(data => data.deleted_at === '');

      //  this.InactiveDetail = this.Details.filter(data => data.deleted_at !== '' );
     }
     
     );
   } 
 
   deletePlant(id){
    
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
         this.serviceService.deletePlant(id).subscribe( (res:any)=>{
           this.getPlantDetails();
           
         
         });
       
         Swal.fire(
           'Deleted!',
           'Plant has been deleted.',
           'success'
         )
       }
     })
   }
    
   pushNotification(e,plant){
    if (e.target.checked == true) {
      this.toastr.success('Success', 'Message Sent ');
      this.messagingService.sendPushToPlant(plant.name);
     
    }
    else {
      
      
    }
    
   
   }
   
   editPlant(plant){
    this.userObj = plant;
    this.isEdit =true;
  
   // this.sharedData.updateSharedData(tenant);
   // this.router.navigate(['superadmin/edit',{id:tenant._id}]);
   }
 
   updateTen(){
    
     this.serviceService.updatePlant(this.userObj).subscribe(()=>{
 
    Swal.fire(
     'Success!',
     'plant has been Updated.',
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


  onChange(event){
  
 let  eT ={
    id: event.target.value,
   
 } 
 

   this.serviceService.getUser(eT).subscribe((res: any) => {
      this.userDetails = res.data;

    }

    );



}


  



 
}
