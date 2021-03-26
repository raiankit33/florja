import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dashboad:boolean = true;
  user = false;
 
  tenentflag = false;
  academiaflag = false;
  flag = false;
  measurement = false;
  irrigation = false;
  
  plantflag = false;
  visualization = false;
  automation  = false;
  notification = false;
  social =false;
  contact = false;
  profile = false;

  constructor( public router: Router) { }



  ngOnInit() {
    
   
  }

  toggleflag1(){
  this.user = true;
  this.flag  = this.dashboad = this.tenentflag = this.profile = this.measurement =  this.notification =this.visualization = this.automation =this.contact =  this.academiaflag= this.irrigation = this.plantflag = false;
  }

  toggleflag2(){
    this.dashboad = true;
     this.flag  = this.user = this.tenentflag =  this.profile = this.measurement =  this.notification= this.visualization = this.automation = this.academiaflag=   this.contact = this.irrigation = this.plantflag = false;
  }

  toggleflag3(){
    this.tenentflag =true;
    this.flag  = this.user = this.dashboad = this.measurement =  this.profile =this.notification = this.visualization =this.automation =  this.academiaflag = this.contact = this.irrigation = this.plantflag = false;
  
  }
  toggleflag4(){
    this.measurement = true;
     this.dashboad  = this.user = this.flag = this.profile = this.tenentflag =this.visualization=this.notification = this.automation = this.academiaflag =  this.contact = this.irrigation = this.plantflag = false;
  }

  toggleflag5(){
    this.flag = true;
    this.dashboad  = this.measurement = this.tenentflag = this.profile= this.notification = this.user =this.automation =  this.academiaflag= this.visualization =  this.contact = this.irrigation = this.plantflag =  false;
  }
  toggleflag6(){
    this.plantflag = true;
     this.dashboad  = this.user = this.flag =this.social= this.profile =  this.notification =this.tenentflag =this.visualization =  this.academiaflag =this.automation = this.contact = this.irrigation = this.measurement =  false;
  }
  toggleflag7(){
    this.irrigation = true;
    this.dashboad  = this.user = this.flag =this.social= this.tenentflag =  this.profile = this.academiaflag =this.automation = this.visualization = this.contact = this.plantflag = this.measurement =  false;
  }
  toggleflag8(){
    this.visualization = true;
    this.dashboad  = this.user = this.flag = this.automation = this.contact =  this.profile = this.academiaflag = this.social = this.tenentflag = this.plantflag = this.irrigation = this.measurement =  false;
  }
  toggleflag9(){
    this.automation = true;
     this.dashboad  = this.user = this.flag = this.plantflag = this.social =  this.profile = this.notification  =  this.academiaflag = this.visualization = this.tenentflag = this.contact = this.irrigation = this.measurement =  false;
  }

  toggleflag10(){
    this.social = true;
     this.dashboad  = this.user = this.flag = this.plantflag = this.visualization = this.profile = this.notification  = this.academiaflag = this.automation = this.tenentflag = this.contact = this.irrigation = this.measurement =  false;
  }

  toggleflag11(){
    this.contact = true;
     this.dashboad  = this.user = this.flag =this.plantflag= this.notification = this.profile = this.academiaflag = this.tenentflag  = this.visualization = this.automation = this.social = this.irrigation = this.measurement =  false;
  }

  toggleflag12(){
    this.academiaflag = true;
     this.dashboad  = this.user = this.flag =this.plantflag= this.tenentflag = this.profile = this.notification = this.visualization = this.automation = this.social = this.irrigation = this.measurement =  false;
  }


  toggleflag13(){
    this.notification = true;
    this.dashboad  = this.user = this.flag =this.plantflag= this.tenentflag = this.profile = this.academiaflag  = this.contact = this.visualization = this.automation = this.social = this.irrigation = this.measurement =  false;
  }

  toggleflag14(){
    this.profile = true;
    this.dashboad  = this.user = this.flag =this.plantflag= this.tenentflag = this.notification =  this.academiaflag  = this.contact = this.visualization = this.automation = this.social = this.irrigation = this.measurement =  false;
  }
 

}