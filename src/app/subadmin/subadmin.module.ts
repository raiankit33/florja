import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubadminRoutingModule } from './subadmin-routing.module';
import { SubadminComponent } from './subadmin.component';
import { TenantdashComponent } from './tenantdash/tenantdash.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubadminService } from '../service/subadmin.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { TenprofileComponent } from './tenprofile/tenprofile.component';
import { SubTenantComponent } from './sub-tenant/sub-tenant.component';

import { SubNotificationComponent } from './sub-notification/sub-notification.component';
import { MessagingService } from '../service/messaging.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import {NgxImageCompressService} from 'ngx-image-compress';
import { environment } from '../../environments/environment';
import { SubSocialComponent } from './sub-social/sub-social.component';


@NgModule({
  declarations: [
    SubadminComponent,
     TenantdashComponent,
     
      UsersComponent,
     
      TenprofileComponent,
     
      SubTenantComponent,
     
   
     
      SubNotificationComponent,
     
   
     
      SubSocialComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SubadminRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [SubadminService,MessagingService,NgxImageCompressService],
})
export class SubadminModule { }
