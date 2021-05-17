import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagingService } from '../../service/messaging.service';
import { SubadminService } from 'src/app/service/subadmin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-notification',
  templateUrl: './sub-notification.component.html',
  styleUrls: ['./sub-notification.component.css']
})
export class SubNotificationComponent implements OnInit {


 
  p: number = +1;
 count=5;
  error: string;
  user: any;
  AuthToken: any;
  tenant = false;
  editTenant = false;


  notificationDetails=[];
  

  userObj = {
     
    name :"",
    title : "",
    description :""
  };
  userDetails: any;

  constructor(private subadminService: SubadminService,
    private messagingService: MessagingService,
    private router: Router) {
    this.subadminService.listen().subscribe((m: any) => {
      console.log(m);
      this.getNotificationDetails()
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getNotificationDetails()
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
     
    name: new FormControl('',Validators.required),
    title: new FormControl('',Validators.required),
   
    description: new FormControl('',Validators.required),
    u_id: new FormControl('',Validators.required),

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

  onAddSubmit() {
    if (this.form.valid) {
      let notification = {

        id: this.user.id,
        name: this.form.value.name,
        title: this.form.value.title,
        description: this.form.value.description,
        u_id: this.form.value.u_id,
        AuthToken:this.user.id
       
      }
      console.log(notification)
      this.messagingService.sendPushMessage(this.form.value.name, this.form.value.title, this.form.value.description);
      this.subadminService.addNotification(notification).subscribe(res => {
        console.log(res);
        this.subadminService.filter('');
        this.form.reset();
        Swal.fire(
          'Notification Sent Successfully!',
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

  getNotificationDetails() {
    let createToken = {
      AuthToken: this.user.token,
      id:this.user.id
    }
    this.subadminService.getNotification(createToken).subscribe((res: any) => {
      this.notificationDetails = res.data;

    }, (error) => {
      this.error = 'Server Down Please try After Sometime ..! '
    }

    );
  }


  deleteUser(id) {
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
        this.subadminService.deleteSubTenant(id).subscribe((res: any) => {
          this.getNotificationDetails()


        });

        Swal.fire(
          'Deleted!',
          'Notification has been deleted.',
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


  

  update() {
    this.subadminService.UpdateSubTenant(this.userObj).subscribe(() => {
      this.messagingService.sendPushMessage(this.userObj.name,this.userObj.title,this.userObj.description);
      Swal.fire(
        'Success!',
        'Notification Resend .',
        'success'
      )
    })
  }


  
  getUserDetails() {
    let createToken = {
      AuthToken: this.user.token,
      t_id: this.user.id
    }
    this.subadminService.getUserDetails(createToken).subscribe((res: any) => {
      this.userDetails = res.data;

    }, (error) => {
      this.error = 'Server Down Please try After Sometime ..! '
    }

    );
  }


}
