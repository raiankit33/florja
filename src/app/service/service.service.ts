import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpClientModule } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  tenant: any;
  academia: any;

  httpRegisterOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })

  }

  constructor(private http: HttpClient) { }

  handleError(error) {
    return throwError(error.message || "server Error...........!")
  }

  // for page refresh 
  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy: string) {
    this._listners.next(filterBy);
  }




  // Tenant api start 

  registerTenant(tenant) {

    return this.http.post('https://9368fefpvb.execute-api.us-east-2.amazonaws.com/insertTenant/insertTenant', tenant)
      .pipe(catchError(this.handleError));
  }

  getTenantDetails(createToken) {

    return this.http.post('https://9368fefpvb.execute-api.us-east-2.amazonaws.com/getTenant/getTenant', createToken)
      .pipe(catchError(this.handleError));
  }


  deleteTenant(token) {
    return this.http.post('https://9368fefpvb.execute-api.us-east-2.amazonaws.com/deleteTenant/deleteTenant/', token)
      .pipe(catchError(this.handleError));
  }

  updateTenant(tenant) {
    return this.http.put('https://9368fefpvb.execute-api.us-east-2.amazonaws.com/updateTenant/updateTenant?id=' + tenant.id, tenant)
    .pipe(catchError(this.handleError));
  }

  activateTen(ten) {

    return this.http.post('https://9368fefpvb.execute-api.us-east-2.amazonaws.com/activateTenant/activateTenant', ten)
      .pipe(catchError(this.handleError));


  }

  // Tenant api end


  // add user api start
  registerUser(user) {


    return this.http.post('https://7lp2aoag6f.execute-api.us-east-2.amazonaws.com/insertUser/insertUser', user)
      .pipe(catchError(this.handleError));
  }

  getUserDetails(createToken) {


    return this.http.post('https://tquaq9cwkj.execute-api.us-east-2.amazonaws.com/getSuperAdmin/getSuperAdmin', createToken)
    .pipe(catchError(this.handleError));

  }

  deleteUser(token) {

    return this.http.post('https://7lp2aoag6f.execute-api.us-east-2.amazonaws.com/deleteUser/deleteUser/', token)
    .pipe(catchError(this.handleError));
  }



  UpdateUser(user) {

    return this.http.put('https://7lp2aoag6f.execute-api.us-east-2.amazonaws.com/updateUser/updateUser?id=' + user.id, user)
    .pipe(catchError(this.handleError));
  }

  activateU(token) {

    return this.http.post('https://7v1k2gjk6k.execute-api.us-east-2.amazonaws.com/activateUser/activateUser', token)
    .pipe(catchError(this.handleError));
  }

   // add user api end


  // admin user api start
  adminUser(admin) {

    return this.http.post('https://tquaq9cwkj.execute-api.us-east-2.amazonaws.com/AdminUser/AdminUser ', admin)
      .pipe(catchError(this.handleError));
  }

  getAdminDetails(createToken) {


    return this.http.post('https://tquaq9cwkj.execute-api.us-east-2.amazonaws.com/getAdminUser/getAdminUser', createToken)
    .pipe(catchError(this.handleError));

  }

  deleteAdminUser(token) {

    return this.http.post('https://tquaq9cwkj.execute-api.us-east-2.amazonaws.com/deleteSuperAdmin/deleteSuperAdmin/',token)
    .pipe(catchError(this.handleError));
  }



  UpdateAdminUser(user) {

    return this.http.put('https://tquaq9cwkj.execute-api.us-east-2.amazonaws.com/updateSuperAdmin/updateSuperAdmin?id=' + user.id, user)
    .pipe(catchError(this.handleError));
  }

  activateUser(user) {

    return this.http.post('', user)
    .pipe(catchError(this.handleError));
  }

  // admin user api end



  // Academia Api start
  registerAcademia(academia) {

    return this.http.post('https://615daw6n88.execute-api.us-east-2.amazonaws.com/insertAcademia/insertAcademia', academia)
      .pipe(catchError(this.handleError));
  }

  getAcademiaDetails() {

    return this.http.get('https://615daw6n88.execute-api.us-east-2.amazonaws.com/getAcademia/getAcademia')
    .pipe(catchError(this.handleError));

  }


  deleteAcademia(id) {

    return this.http.post('https://615daw6n88.execute-api.us-east-2.amazonaws.com/deleteAcademia/deleteAcademia/', { 'id': id })
    .pipe(catchError(this.handleError));
  }

  updateAcademia(academia) {
    return this.http.put('https://615daw6n88.execute-api.us-east-2.amazonaws.com/updateAcademia/updateAcademia?id=' + academia.id, academia)
    .pipe(catchError(this.handleError));
  }
 // Academia Api end


  // sensor type api start
  addSensor(sensor) {

    return this.http.post('https://h074tqxcm0.execute-api.us-east-2.amazonaws.com/insertSensorType/insertSensorType', sensor)
      .pipe(catchError(this.handleError));
  }


  getSensorDetails(createToken) {

    return this.http.post('https://h074tqxcm0.execute-api.us-east-2.amazonaws.com/getSensorType/getSensorType', createToken)
    .pipe(catchError(this.handleError));

  }

  deleteSensorType(id) {

    return this.http.post('https://h074tqxcm0.execute-api.us-east-2.amazonaws.com/deleteSensorType/deleteSensorType/', { 'id': id })
    .pipe(catchError(this.handleError));
  }

  updateSensorType(sensor) {
    return this.http.put('https://h074tqxcm0.execute-api.us-east-2.amazonaws.com/updateSensorType/updateSensorType?id=' + sensor.id, sensor)
    .pipe(catchError(this.handleError));
  }
 // sensor type api end



  // plant api start 
  registerPlant(plant) {

    return this.http.post('https://jd3bl8nyyf.execute-api.us-east-2.amazonaws.com/insertPlant/insertPlant', plant)
    .pipe(catchError(this.handleError));
  }

  getPlantDetails(createToken) {

    return this.http.post('https://tquaq9cwkj.execute-api.us-east-2.amazonaws.com/getSuperAdminPlant/getSuperAdminPlant', createToken)
    .pipe(catchError(this.handleError));

  }

  updatePlant(plant) {
    return this.http.put('https://jd3bl8nyyf.execute-api.us-east-2.amazonaws.com/updatePlant/updatePlant?id=' + plant.id, plant)
    .pipe(catchError(this.handleError));
  }

  deletePlant(id) {

    return this.http.post('https://jd3bl8nyyf.execute-api.us-east-2.amazonaws.com/deletePlant/deletePlant/', { 'id': id })
    .pipe(catchError(this.handleError));

  }
 
  getTenant(id) {
    return this.http.post('https://tquaq9cwkj.execute-api.us-east-2.amazonaws.com/coneection/coneection ', id)
    .pipe(catchError(this.handleError));
  }
// plant api end



  // sensors  api start
  registerSensor(sens) {

    return this.http.post('https://7eb1a6tus5.execute-api.us-east-2.amazonaws.com/insertSensor/insertSensor', sens)
      .pipe(catchError(this.handleError));
  }


  getSensors(createToken) {

    return this.http.post('https://7eb1a6tus5.execute-api.us-east-2.amazonaws.com/getSensor/getSensor', createToken)
    .pipe(catchError(this.handleError));

  }

  deleteSensor(id) {

    return this.http.post('https://7eb1a6tus5.execute-api.us-east-2.amazonaws.com/deleteSensor/deleteSensor/', { 'id': id })
    .pipe(catchError(this.handleError));
  }

  updateSensor(sens) {
    return this.http.put('https://7eb1a6tus5.execute-api.us-east-2.amazonaws.com/updateSensor/updateSensor?id=' + sens.id, sens)
    .pipe(catchError(this.handleError));
  }



  getUser(id) {
    return this.http.post('https://tquaq9cwkj.execute-api.us-east-2.amazonaws.com/connectTenantwithUser/connectTenantwithUser', id)
    .pipe(catchError(this.handleError));
  }


  isEmailRegisterd(email) {

    return this.http.get('https://9368fefpvb.execute-api.us-east-2.amazonaws.com/getTenant/getTenant/', email)
    .pipe(catchError(this.handleError));
  }
 // sensors  api end



  //irrigation api start
  addIrrigation( token) {

    return this.http.post('https://7cebxqik7b.execute-api.us-east-2.amazonaws.com/insertIrrigation/insertIrrigation',token)
    .pipe(catchError(this.handleError));
  }

  getIrrigation(createToken) {

    return this.http.post('https://tquaq9cwkj.execute-api.us-east-2.amazonaws.com/getSuperAdminIrrigation/getSuperAdminIrrigation', createToken)
    .pipe(catchError(this.handleError));

  }

  deleteIrrigation(id) {

    return this.http.post('https://7cebxqik7b.execute-api.us-east-2.amazonaws.com/deleteIrrigation/deleteIrrigation/', { 'id': id })
    .pipe(catchError(this.handleError));

  }

  updateIrrigation(irrigation) {
    return this.http.put('https://7cebxqik7b.execute-api.us-east-2.amazonaws.com/updateIrrigation/updateIrrigation?id=' + irrigation.id, irrigation)
    .pipe(catchError(this.handleError));
  }
 //irrigation api start



  // notification api start
  addNotification(notification) {

    return this.http.post('https://x6szas6o91.execute-api.us-east-2.amazonaws.com/insertNotification/insertNotification', notification)
    .pipe(catchError(this.handleError));
  }

  getNotification(createToken) {

    return this.http.post('https://x6szas6o91.execute-api.us-east-2.amazonaws.com/getNotification/getNotification', createToken)
    .pipe(catchError(this.handleError));

  }

  deleteNotification(id) {

    return this.http.post('https://x6szas6o91.execute-api.us-east-2.amazonaws.com/deleteNotification/deleteNotification/', { 'id': id })
    .pipe(catchError(this.handleError));

  }

  updateNotification(notification) {
    return this.http.put('https://7cebxqik7b.execute-api.us-east-2.amazonaws.com/updateIrrigation/updateIrrigation?id=' + notification.id, notification)
    .pipe(catchError(this.handleError));
  }
  // notification api end


  // social page api start
  addPost(social) {

    return this.http.post('https://z4ln9rgil4.execute-api.us-east-2.amazonaws.com/insertFeed/insertFeed', social)
      .pipe(catchError(this.handleError));
  }

  getFeedDetails(createToken) {

    return this.http.post('https://z4ln9rgil4.execute-api.us-east-2.amazonaws.com/getFeed/getFeed', createToken)
    .pipe(catchError(this.handleError));

  }


  deletePost(id) {

    return this.http.post('https://z4ln9rgil4.execute-api.us-east-2.amazonaws.com/deleteFeed/deleteFeed/', { 'id': id })
    .pipe(catchError(this.handleError));

  }
 // social page api end 


}
