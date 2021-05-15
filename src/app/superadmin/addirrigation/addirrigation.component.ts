import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { MessagingService } from '../../service/messaging.service';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service/service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addirrigation',
  templateUrl: './addirrigation.component.html',
  styleUrls: ['./addirrigation.component.css']
})
export class AddirrigationComponent implements OnInit {

  p: number = 1;
  count: number = 5;
  afterClick = false;
  checks = false;
  irrigationDetails = [];
  user: any;
  plantDetails: any;
parent=false;
  editParent= false;

  

  constructor(
    private service: ServiceService,
    private sharedData: SharedService,
    private toastr: ToastrService,
private messagingService: MessagingService,
    private router: Router,
  ) {
    this.service.listen().subscribe((m: any) => {
      console.log(m);
      this.getIrrigationDetails();
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getIrrigationDetails();
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

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    watering_duration: new FormControl('', [Validators.required]),
    irrigation_ping_interval: new FormControl(null, [Validators.required,]),
    last_ping_date: new FormControl('', Validators.required),
    last_ping_time: new FormControl('', Validators.required),
    water_usage: new FormControl('', [Validators.required]),
    sync_system_date: new FormControl(null, [Validators.required,]),
    sync_system_time: new FormControl(null, [Validators.required,]),
    irrigation_unit_cluster: new FormControl('', Validators.required),
    irrigation_unit_latitude: new FormControl('', [Validators.required]),
    irrigation_unit_longitude: new FormControl(null, [Validators.required,]),
    payload: new FormControl('', Validators.required),
    schedule: new FormControl('', Validators.required),
    valve: new FormControl('', Validators.required),
    vent_type: new FormControl('', Validators.required),
    strega_URL: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    plant_id: new FormControl('', Validators.required),
   
  })


  bulk(e) {
    if (e.target.checked == true) {
      this.checks = true;
      this.afterClick = true;
    }
    else {
      this.checks = false;
      this.afterClick = false;
    }
  }

  powerButton(e) {
    if (e.target.checked == true) {
      
      this.afterClick = true;
    }
    else {
      
      this.afterClick = false;
    }
  }


  adhoc() {
    Swal.fire({
      text: "are you sure you want to start one irrigation cycle? Irrigation black-out times will not be considered and irrigation will start at next cycle !!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'success'
        )
      }
    })
  }


  userObj = {
    id:"",
    name: "",
    watering_duration: "",
    irrigation_ping_interval: "",
    last_ping_date: "",
    last_ping_time: "",
    water_usage: "",
    sync_system_date: "",
    sync_system_time: "",
    irrigation_unit_cluster: "",
    irrigation_unit_latitude: "",
    irrigation_unit_longitude: "",
    payload: "",
    schedule: "",
    valve: "",
    vent_type: "",
    strega_URL: "",
    status: "",
    plant_id: "",
    plant_name:""
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




  onAddSubmit() {
    if (this.form.valid) {
     
      let token = {
        name: this.form.value.name,
        watering_duration: this.form.value.watering_duration,
        irrigation_ping_interval: this.form.value.irrigation_ping_interval,
        last_ping_date: this.form.value.last_ping_date,
        last_ping_time:this.form.value.last_ping_time,
        water_usage: this.form.value.water_usage,
        sync_system_date:this.form.value.sync_system_date,
        sync_system_time:this.form.value.sync_system_time,
        irrigation_unit_cluster:this.form.value.irrigation_unit_cluster,
        irrigation_unit_latitude:this.form.value.irrigation_unit_latitude,
        irrigation_unit_longitude: this.form.value.irrigation_unit_longitude,
        payload: this.form.value.payload,
        schedule: this.form.value.schedule,
        valve:this.form.value.valve,
        vent_type:this.form.value.vent_type,
        strega_URL: this.form.value.strega_URL,
        status: this.form.value.status,
        plant_id: this.form.value.plant_id,
        AuthToken:this.user.token
      }

      this.service.addIrrigation(token).subscribe(res => {
        this.service.filter('');
        this.form.reset();
        Swal.fire(
          'Irrigation has added successfully!',
          '',
          'success'
        )
      })

    } else {
      this.validateAllFormFields(this.form);
    }
  }


  pushNotification(e,irrigation){
    if (e.target.checked == true) {
      this.toastr.success('Success', 'Message Sent ');
      this.messagingService.sendPushToIrrigation(irrigation.name);
     
    }
    else {
         
    }
   }


  getIrrigationDetails() {
    let createToken = {
      AuthToken: this.user.token,
    }
    this.service.getIrrigation(createToken).subscribe((res: any) => {
      this.irrigationDetails = res.data;
    }
    );
  }

  deleteIrrigation(id) {
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
        this.service.deleteIrrigation(id).subscribe((res: any) => {
          this.getIrrigationDetails();
        });

        Swal.fire(
          'Deleted!',
          ' Deleted .',
          'success'
        )
      }
    })
  }


  irrigationPage(irrigation) {
    this.sharedData.updateSharedData(irrigation);
    this.router.navigate(['superadmin/irrigationDetail', { id: irrigation.id }]);
  }

  editIrrigation(irrigation) {
    this.userObj = irrigation;
    

    // this.sharedData.updateSharedData(tenant);
    // this.router.navigate(['superadmin/edit',{id:tenant._id}]);
  }

  updateTen() {
    this.service.updateIrrigation(this.userObj).subscribe(() => {
      this.service.filter('');
      Swal.fire(
        'Success!',
        'Irrigation has been Updated.',
        'success'
      )
    })
  }



  getPlantDetails() {
    let createToken = {
      AuthToken: this.user.token,
    }
    this.service.getPlantDetails(createToken).subscribe((res: any) => {
      this.plantDetails = res.data;

    }

    );
  }
}
