import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { SharedService } from 'src/app/service/shared.service';
import * as $ from 'jquery'

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { MessagingService } from '../../service/messaging.service';

@Component({
  selector: 'app-senrequest',
  templateUrl: './senrequest.component.html',
  styleUrls: ['./senrequest.component.css']
})
export class SenrequestComponent implements OnInit {

  p:number = 1;
  count:number =5;
  user: any;
  plantDetails: any;
  isEdit=false;
  sensorDetails: any;
  error: string;
  sensorType: any;
isShow=false;
  isLoading: boolean= false;
  parent =false;
  editParent=false;

  
  constructor(
    private serviceService : ServiceService,
    private toastr: ToastrService,
    private messagingService: MessagingService,
        private sharedData : SharedService,
     private router: Router, )
   {
     this.serviceService.listen().subscribe((m:any)=>{
       console.log(m);
      this.getSensorDetails();
     })
    }

  form = new FormGroup({
  name: new FormControl('',Validators.required),
  sensor_type: new FormControl('',Validators.required),
  plant_name: new FormControl('',Validators.required),
  url: new FormControl('',Validators.required),
  interval: new FormControl('',Validators.required),
  latitude: new FormControl(''),
  longitude: new FormControl(''),
 
  
})

userObj ={
  name: "",
  sensor_type:"",
  soil_humidity_max: "",
  plant_name: "",
  url: "",
  interval:"",
  latitude: "",
  longitude: "",
  interval_moist_sensor:""
  
}




  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getPlantDetails();
    this.getSensorDetails();
    this.getSensorType();
 
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

  showField(event)
  {
    if(event.target.value =="GPS Sensor" ){
       this.isShow = true;
    }else{
      this.isShow = false;
    }
  }

  toggleLoading = () => {
    this.isLoading = true;

    //Faking an API call
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  };

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



 

  onAddSubmit(){
 
    if(this.form.valid){

     
     let sens ={
       name: this.form.value.name,
       sensor_type: this.form.value.sensor_type,
       plant_name: this.form.value.plant_name,
       url: this.form.value.url,
       interval: this.form.value.interval,
       latitude: this.form.value.latitude,
       longitude: this.form.value.longitude,
       token:this.user.token
     
     }

    this.serviceService.registerSensor(sens).subscribe( res=> {
      
      this.serviceService.filter('');
      this.form.reset();
    
      Swal.fire(
        'Sensor added successfully!',
        '',
        'success'
      )
    })
   

  } else{
    this.validateAllFormFields(this.form);
  }
  }


  pushNotification(e,sens){
    if (e.target.checked == true) {
      this.toastr.success('Success', 'Message Sent ');
      this.messagingService.sendPushToSensor(sens.name);
     
    }
    else {
        
    }   
   }

  getSensorDetails(){
    let createToken ={
      AuthToken:this.user.token,
      
    }
     this.serviceService.getSensors(createToken).subscribe((res:any)=>{
       this.sensorDetails = res.data;
      
     }
     
     );
   } 


  

   editSens(sens){
    this.userObj = sens;
  
  
   // this.sharedData.updateSharedData(tenant);
   // this.router.navigate(['superadmin/edit',{id:tenant._id}]);
   }
 
   updateSens(){
    
     this.serviceService.updateSensor(this.userObj).subscribe((res)=>{
   
    Swal.fire(
      
     'Success!',
     'Sensor Updated.',
     'success',
     
   )
  
     })
   }

   deleteSensor(id){
    
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
        this.serviceService.deleteSensor(id).subscribe( (res:any)=>{
          this.getSensorDetails
          
        
        });
      
        Swal.fire(
          'Deleted!',
          'Sensor  Deleted.',
          'success'
        )
      }
    })
  }


 


  getPlantDetails(){
    let createToken ={
      AuthToken:this.user.token,
      
    }
     this.serviceService.getPlantDetails(createToken).subscribe((res:any)=>{
       this.plantDetails = res.data;
      
     }
     
     );
   }


   getSensorType(){
    let createToken ={
      AuthToken:this.user.token,
      
    }
    this.serviceService.getSensorDetails(createToken).subscribe((res:any)=>{
      this.sensorType = res.data;
     
    },(error)=> {
      this.error = 'Server Down Please try After Sometime ..! '
    }
    );
  } 




  // clearInputFields(e){
  //   let all = e.target.querySelectorAll('input');
  //    Object.keys(all).forEach(key => {
  //        console.log(all[key].value = '');   
  //    });    
  //  }
}
