import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { SharedService } from 'src/app/service/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sensortype',
  templateUrl: './sensortype.component.html',
  styleUrls: ['./sensortype.component.css']
})
export class SensortypeComponent implements OnInit {

  searchString:any;
  p: number = 1;
  count: number = 5;
  index: any;
  isEdit = false;
  sensorDetails = [];
  tenant: any;
  name: any;
  error: string;




  userObj = {
    name: "",
    sensor_type: "",
    sensor_code: "",
    manufacture: "",
    sensor_description: ""
  };
  user: any;
  parent =false;
  editParent= false;

  constructor(
    private serviceService: ServiceService,
    private sharedData: SharedService,
    private router: Router
  ) {
    this.serviceService.listen().subscribe((m: any) => {
      console.log(m);
      this.getSensorDetails();
    })
  }



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getSensorDetails();
    

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
    sensor_type: new FormControl('', Validators.required),
    sensor_code: new FormControl('', Validators.required),
    manufacture: new FormControl(null, Validators.required),
    sensor_description: new FormControl('', Validators.required),
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

  // Search(){
  //   if(this.name == ""){
  //     this.getSensorDetails();
  //   }else{
  //     this.sensorDetails = this.tenantDetails.filter(res =>{
  //       return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
  //     })
  //   }
  // }


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
    this.form.reset();
  }



  onAddSubmit() {
    if (this.form.valid) {
      let type = {
        name:this.form.value.name,
        sensor_type:this.form.value.sensor_type,
        sensor_code:this.form.value.sensor_code,
        manufacture: this.form.value.manufacture,
        sensor_description: this.form.value.sensor_description,
        token : this.user.token
      }
      this.serviceService.addSensor(type).subscribe(res => {
        console.log(res);
        this.serviceService.filter('');
        this.form.reset();
        Swal.fire(
          'Sensor added successfully!',
          '',
          'success'
        )
      })
    } else {
      this.validateAllFormFields(this.form);
    }
  }


  getSensorDetails() {
    let createToken ={
      AuthToken:this.user.token,
      
    }
    this.serviceService.getSensorDetails(createToken).subscribe((res: any) => {
      this.sensorDetails = res.data;


    }, (error) => {
      this.error = 'Server Down Please try After Sometime ..! '
    }
    );
  }

  deleteSensor(id) {
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
        this.serviceService.deleteSensor(id).subscribe((res: any) => {
          this.getSensorDetails();
        });

        Swal.fire(
          'Deleted!',
          'Tenant Deleted.',
          'success'
        )
      }
    })
  }

  editSensor(tenant) {
    this.userObj = tenant;
    this.isEdit = true;

    // this.sharedData.updateSharedData(tenant);
    // this.router.navigate(['superadmin/edit',{id:tenant._id}]);
  }

  updateTen() {
    this.serviceService.updateSensor(this.userObj).subscribe(() => {
      Swal.fire(
        'Success!',
        'Sensor Updated.',
        'success'
      )
    })
  }



}
