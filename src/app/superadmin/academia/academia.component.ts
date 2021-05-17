import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { SharedService } from 'src/app/service/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-academia',
  templateUrl: './academia.component.html',
  styleUrls: ['./academia.component.css']
})
export class AcademiaComponent implements OnInit {


 


p: number = 1;
count =5;
  academiaDetails=[];
name:any;
  error: string;
  err: string;
  user: any;
  parent=false;
  editParent=false;
  open=false;
  message: string;
  mess=false;


  userObj = {
   
    name :"",
    email : "",
    phone: "",
    permission :""
  };



  constructor(
    private serviceService : ServiceService,
    private sharedData : SharedService,
    private router: Router
  ) { 
    this.serviceService.listen().subscribe((m:any)=>{
      console.log(m);
      this.getAcademiaDetails();
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getAcademiaDetails();
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
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    permission: new FormControl('',Validators.required),
   

  })


  Search(){
    if(this.name == ""){
      this.getAcademiaDetails();
    }else{
      this.academiaDetails = this.academiaDetails.filter(res =>{
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

  onAddSubmit(){

  
    if(this.form.valid){
     
      this.serviceService.registerAcademia(this.form.value).subscribe( (res:any)=> {
        if (res.statusCode== 200) {
        this.serviceService.filter('added click');
    this.form.reset();
    Swal.fire(
      'Academia added Successfully!',
      '',
      'success'
    )
  } else if (res.statusCode == 403) {
    this.err = "This email is already registered. ",
      this.open = true;
    setTimeout(() => {
      this.open = false
    }, 3000);
  } else {
    this.message = "This Phone no is already registered.",
      this.mess = true;
    setTimeout(() => {
      this.mess = false
    }, 3000);
  }
      })
    }else{
      this.validateAllFormFields(this.form);
    }

  
      
  }


  getAcademiaDetails(){
    this.serviceService.getAcademiaDetails().subscribe((res:any)=>{
      this.academiaDetails = res.data;
     console.log(this.academiaDetails)
    },(error)=> {
      this.error = 'Server Down Please try After Sometime ..! '
    }
    
    );
  } 

  editAcademia(academia){
    this.userObj = academia;
 
 
  }
  

  updateAcademia(){
   
    this.serviceService.updateAcademia(this.userObj).subscribe(()=>{

      Swal.fire(
       'Success!',
       'Academia  Updated.',
       'success'
     )
       })
     
  }

  deleteAcademia(id){
   


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
        this.serviceService.deleteAcademia(id).subscribe( (res:any)=>{
          this.getAcademiaDetails();
          
        
        });
      
        Swal.fire(
          'Deleted!',
          'Academia Deleted.',
          'success'
        )
      }
    })
  }
}
