import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpClientModule } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { AuthService} from '../service/auth.service';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubadminService {

  user:any;

  httpRegisterOptions = {
    headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
       
    })
};



  constructor(private http:HttpClient,
    private authService: AuthService) { }

  //for page refresh on user page 
  private _listners = new Subject<any>();
  listen(): Observable<any>{
     return this._listners.asObservable();
  }
   filter(filterBy: string){
     this._listners.next(filterBy);
   }
 

   handleError(error){
    return throwError(error.message || "server error...........!")
}


// user API 
  registerUser(user){
   
    
    return this.http.post('https://7lp2aoag6f.execute-api.us-east-2.amazonaws.com/insertUser/insertUser',user).pipe(map(res => res));
}

getUserDetails(createToken){

     
  return this.http.post('https://7lp2aoag6f.execute-api.us-east-2.amazonaws.com/getUserPost/getUser',createToken) .pipe(catchError(this.handleError)); 

}

deleteUser(token){
        
  return this.http.post('https://7lp2aoag6f.execute-api.us-east-2.amazonaws.com/deleteUser/deleteUser/',token).pipe(map(res => res));

}

UpdateUser(user){
        
  return this.http.put('https://7lp2aoag6f.execute-api.us-east-2.amazonaws.com/updateUser/updateUser?id='+user.id,user).pipe(map(res => res));

}

activateU(token) {

  return this.http.post('https://7v1k2gjk6k.execute-api.us-east-2.amazonaws.com/activateUser/activateUser', token)
  .pipe(catchError(this.handleError));
}


// sub tenant Api 

addSubTenant(user){
   
    
  return this.http.post('https://9368fefpvb.execute-api.us-east-2.amazonaws.com/addTenantbyTenant/addTenantbyTenant',user).pipe(map(res => res));
}

gettenantDetails(createToken){

   
return this.http.post('https://9368fefpvb.execute-api.us-east-2.amazonaws.com/getSubTeanant/getSubTeanant',createToken) .pipe(catchError(this.handleError)); 

}

deleteSubTenant(createToken){
      
return this.http.post('https://9368fefpvb.execute-api.us-east-2.amazonaws.com/deleteTenant/deleteTenant/',createToken).pipe(map(res => res));

}

UpdateSubTenant(user){
      
return this.http.put('https://9368fefpvb.execute-api.us-east-2.amazonaws.com/updateTenant/updateTenant?id='+user.id,user).pipe(map(res => res));

}

activateTenant(user){
    return this.http.post('https://9368fefpvb.execute-api.us-east-2.amazonaws.com/activateTenant/activateTenant', user)
      .pipe(catchError(this.handleError));
  }


// notification api



addNotification(notification){
        
  return this.http.post('https://x6szas6o91.execute-api.us-east-2.amazonaws.com/insertNotification/insertNotification',notification)
}

getNotification(createToken){
      
  return this.http.post('https://x6szas6o91.execute-api.us-east-2.amazonaws.com/getTenantNotification/getTenantNotification',createToken)
  
  }

  deleteNotification(id){
        
    return this.http.post('https://7cebxqik7b.execute-api.us-east-2.amazonaws.com/deleteIrrigation/deleteIrrigation/',{'id':id})
  
  }

  updateNotification(notification){
    return this.http.put('https://7cebxqik7b.execute-api.us-east-2.amazonaws.com/updateIrrigation/updateIrrigation?id='+notification.id,notification)
  }


  addPost(social){
        
    return this.http.post('https://z4ln9rgil4.execute-api.us-east-2.amazonaws.com/insertFeed/insertFeed',social).pipe(map(res => res))
    .pipe(catchError(this.handleError));
   }
  
   getFeedDetails(createToken){
          
    return this.http.post('https://z4ln9rgil4.execute-api.us-east-2.amazonaws.com/getFeed/getFeed',createToken)
    
    }
  
  
    deletePost(id){
            
      return this.http.post('https://z4ln9rgil4.execute-api.us-east-2.amazonaws.com/deleteFeed/deleteFeed/',{'id':id})
    
    }
    // social page api //

}