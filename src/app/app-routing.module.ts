import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SensorsComponent } from './sensors/sensors.component';
import { DashboadComponent } from './dashboad/dashboad.component';
import { LoginsignupComponent } from './loginsignup/loginsignup.component';
import { UserprofileComponent } from './component/userprofile/userprofile.component';
import { SignupComponent } from './component/signup/signup.component';



import { MeasurementComponent } from './component/measurement/measurement.component';

import { IrrigationComponent } from './component/irrigation/irrigation.component';
import { PlantdetailsComponent } from './component/plantdetails/plantdetails.component';
import { PlantsComponent } from './component/plants/plants.component';
import { VisualizationComponent } from './component/visualization/visualization.component';
import { AutomationComponent } from './component/automation/automation.component';
import { NotificationComponent } from './component/notification/notification.component';
import { SoicalpageComponent } from './component/soicalpage/soicalpage.component';
import { ContactComponent } from './component/contact/contact.component';
import { TenantloginComponent } from './tenantlogin/tenantlogin.component';


const routes: Routes = [
  {path:'',component:LoginsignupComponent},
  {path:'tlogin',component:TenantloginComponent},
  {path:'home',component:HomeComponent,
  children: [
    {path:'dashboad',component:DashboadComponent},
    {path:'profile',component:UserprofileComponent},
   
  

    {path:'measurement',component:MeasurementComponent},
    {path:'sensors',component:SensorsComponent},
    
    {path:'irrigation',component:IrrigationComponent},
    {path:'plant',component:PlantsComponent},
    {path:'details',component:PlantdetailsComponent},
    {path:'visualization',component:VisualizationComponent},
    {path:'automation',component:AutomationComponent},
    {path:'notification',component:NotificationComponent},
    {path:'social',component:SoicalpageComponent},
    {path:'contact',component:ContactComponent},

  ]


},

{path:'signup',component:SignupComponent},

  { path: 'superadmin', loadChildren: () => import('./superadmin/superadmin.module').then(m => m.SuperadminModule) },
  { path: 'subadmin', loadChildren: () => import('./subadmin/subadmin.module').then(m => m.SubadminModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
