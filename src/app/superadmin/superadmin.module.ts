import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SuperadminComponent } from './superadmin.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { SenrequestComponent } from './senrequest/senrequest.component';
import { AcademiaComponent } from './academia/academia.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ServiceService } from '../service/service.service';
import {MessagingService} from '../service/messaging.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TenantComponent } from './tenant/tenant.component';
import { EdittenComponent } from '../superadmin/editten/editten.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SensortypeComponent } from './sensortype/sensortype.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddplantComponent } from './addplant/addplant.component';
import { PlantdetailComponent } from './addplant/plantdetail/plantdetail.component';
import { AddirrigationComponent } from './addirrigation/addirrigation.component';
import {UniqueEmailValidatiorDirective } from '../service/unique-email-validator.directive';
import { IrrigationdetailsComponent } from './addirrigation/irrigationdetails/irrigationdetails.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { NotificationComponent } from './notification/notification.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { environment } from '../../environments/environment';
import { SocialsComponent } from './socials/socials.component';

import {NgxImageCompressService} from 'ngx-image-compress';
// import { AsyncPipe } from '../../../node_modules/@angular/common';

@NgModule({
  declarations: [
    SuperadminComponent,
     AdmindashComponent,
      SenrequestComponent,
       AcademiaComponent,
        TenantComponent,
        EdittenComponent,
        SensortypeComponent,
        AdduserComponent,
        AddplantComponent,
        UniqueEmailValidatiorDirective,
        PlantdetailComponent,
        AddirrigationComponent,
        IrrigationdetailsComponent,
        AdminUserComponent,
        NotificationComponent,
        SocialsComponent
      ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    SuperadminRoutingModule
  ],
  providers: [ServiceService,MessagingService,NgxImageCompressService],
})
export class SuperadminModule { }
