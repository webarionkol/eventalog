import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { ApiResponse, signupResponse, loginResponse, feedResponse} from '../../models/api.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()  
export class ApiProvider {
  apiUrl: any;    

  usertoke: any;
  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController) {  
    this.apiUrl = 'http://mobile.eventalog.com/';

    

   
    
  }




    
  /* Show Toast*/ 
  RegistrationOTP(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
     
    });
    return  this.http.post(this.apiUrl+'api/RegistrationOTP', JSON.stringify(data),{headers})
  }
  
  showToast(msg, position, type) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,   
      position: position,
      cssClass: 'toast-' + type
    });
    toast.present();
  }


  token(data): Observable<any>{
    console.log(data)
    let headersApi = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   
    });
    var datad="grant_type=password&username="+data[0].username+"&password="+data[0].password;

    return this.http.post(this.apiUrl+'token', datad,{headers:headersApi})
      
  }

  PartnerRegistration(data)  
  {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
     
    });

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'api/PartnerRegistration', JSON.stringify(data),{headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  getServiceList(data): Observable<any>  {
    console.log(data[0].token)
    let headers = new HttpHeaders({
      'Authorization':'bearer'+" "+data[0].token,
      'Content-Type':'application/json',
      
     
    });
    return this.http.get(this.apiUrl+'api/ProductCategory/GetAll',{headers});
  }
  
  getServiceListSubmit(data,token): Observable<any>  {
    let headers = new HttpHeaders({
      'Authorization':'bearer'+" "+token,  'Content-Type':'application/json',
      
     
    });
    return this.http.post(this.apiUrl+'api/PartnerWiseProduct/Insert',JSON.stringify(data),{headers});
  }

  getUserByid(data,token): Observable<any>  {
    console.log(data)
    let headers = new HttpHeaders({
      'Authorization':'bearer'+" "+token,
       'Content-Type':'application/json',
      
     
    });
    return this.http.get(this.apiUrl+'api/PartnerDetails/GetByUserId/' + data,{headers});
  }
  getUserByids(data,tto): Observable<any>  {
    let headers = new HttpHeaders({
      'Authorization':'bearer'+" "+tto,
       'Content-Type':'application/json',
      
     
    });
    return this.http.get(this.apiUrl+'api/PartnerDetails/GetByUserId/' + data,{headers});
  }
  PartnerAbout(data,tokne): Observable<any>  {
    let headers = new HttpHeaders({
      'Authorization':'bearer'+" "+tokne,  'Content-Type':'application/json',
      
     
    });
    return this.http.post(this.apiUrl+'api/PartnerAbout/Insert',JSON.stringify(data),{headers});
  }
  approv(data,token): Observable<any>  {

    let headers = new HttpHeaders({
      'Authorization':'bearer'+" "+token,  'Content-Type':'application/json',

    });
    return this.http.post(this.apiUrl+'api/PartnerPayment/MakePayment',data,{headers});

  }

  adddetiels(data,token): Observable<any>  {

    let headers = new HttpHeaders({
      'Authorization':'bearer'+" "+token,   'Content-Type':'application/json',

    });
    return this.http.post(this.apiUrl+'api/PartnerDetails/Insert',JSON.stringify(data),{headers});

  }
  // getadddetiels(){
  //   http://mobile.eventalog.com/api/PartnerDetails/GetById/1
  // }
  ServiceLocation(data,token): Observable<any>  {  
    let headers = new HttpHeaders({
      'Authorization':'bearer'+" "+token,  'Content-Type':'application/json',

    });
    return this.http.post(this.apiUrl+'api/PartnerServiceLocation/Insert',JSON.stringify(data),{headers});

    
  }

  getAbout(data,token): Observable<any>  {
    let headers = new HttpHeaders({
      'Authorization':'bearer'+" "+token, 'Content-Type':'application/json',
      
     
    });
    return this.http.get(this.apiUrl+'api/PartnerAbout/GetByUserId/'+data,{headers});
  }
  patnerDoc(token): Observable<any>{

    let headers = new HttpHeaders({
      'Authorization':'bearer'+" "+token,  'Content-Type':'application/json',
      
     
    });
    return this.http.get(this.apiUrl+'api/DocumentType/GetAll',{headers});
  
  
  }
pastWord(data,token): Observable<any>{
  

  let headers = new HttpHeaders({
    'Authorization':'bearer'+" "+token,  'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'api/PartnerPastWork/GetByUserId/'+data,{headers});

}

PartnerDocumentByid(data,token): Observable<any>{
  

  let headers = new HttpHeaders({
    'Authorization':'bearer'+" "+token,    'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'api/PartnerDocument/GetAllByUserId/'+data,{headers});

}
resetCheck(data): Observable<any>
{
  let headers = new HttpHeaders({
    // 'Authorization':'bearer S3iD-BNBw02-Iwm_NYAOvPHbrJMYUnz75GesjhMR78uyc5E3SJGb_oLBEQfT_KFZh7cXMio4pdJ8Wp3SYm0JRZ6gtDdb098IHKcwbFf3Z5NV9kMfNfajxkND0MRBRyT_Avc-OKBQqK9OJurstUbfkBFNJ3SISTYdLXsxsJDLocI4Rna4nK55eJFmJM6MvDquvItJBycAEFUmFTACMybR7QxTMx1krIDEKyGnCs9EGwSLbS3KpSspCFVV5k1VD-TrLVysylMjf6_6Ese73EN_DTRKu_t4nheRBTDBsOIv7kstOzUH89_jW3gyPuFAZyCUzk19LvJVlOcgDkR0dr9VJw',
    'Content-Type':'application/json',
    
   
  });

  return this.http.post(this.apiUrl+'api/SendPasswordResetOTP',data,{headers});

  
}
resetSubmit(data): Observable<any>
{
  let headers = new HttpHeaders({
    // 'Authorization':'bearer S3iD-BNBw02-Iwm_NYAOvPHbrJMYUnz75GesjhMR78uyc5E3SJGb_oLBEQfT_KFZh7cXMio4pdJ8Wp3SYm0JRZ6gtDdb098IHKcwbFf3Z5NV9kMfNfajxkND0MRBRyT_Avc-OKBQqK9OJurstUbfkBFNJ3SISTYdLXsxsJDLocI4Rna4nK55eJFmJM6MvDquvItJBycAEFUmFTACMybR7QxTMx1krIDEKyGnCs9EGwSLbS3KpSspCFVV5k1VD-TrLVysylMjf6_6Ese73EN_DTRKu_t4nheRBTDBsOIv7kstOzUH89_jW3gyPuFAZyCUzk19LvJVlOcgDkR0dr9VJw',
    'Content-Type':'application/json',
    
   
  });

  return this.http.post(this.apiUrl+'api/ResetPassword',data,{headers});

  
}

resendApprov(data,token): Observable<any>
{
  let headers = new HttpHeaders({
    'Authorization':'bearer'+" "+token,   'Content-Type':'application/json',
    
   
  });

  return this.http.post(this.apiUrl+'api/PartnerApproval/ReSendApproval',data,{headers});

  
}
dairyInsert(data,token): Observable<any>{

  let headers = new HttpHeaders({
    'Authorization':'bearer'+" "+token, 'Content-Type':'application/json',
    
   
  });

  return this.http.post(this.apiUrl+'api/PartnerDiary/Insert',data,{headers});

  
}

dairyUpdate(data,token): Observable<any>{

  let headers = new HttpHeaders({
    'Authorization':'bearer'+" "+token,    'Content-Type':'application/json',
    
   
  });

  return this.http.post(this.apiUrl+'api/PartnerDiary/Update',data,{headers});

  
}


city(data,token): Observable<any>{

console.log(data)
  let headers = new HttpHeaders({
    'Authorization':'bearer'+" "+token,   'Content-Type':'application/json',
    
   
  });
  
  return this.http.get(this.apiUrl+'/api/City/GetAllByStateId/'+data,{headers});


}

StateGet(token): Observable<any>{


  let headers = new HttpHeaders({
    'Authorization':'bearer'+" "+token,   'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'/api/State/GetAllByCountryId/1',{headers});

}

checkApproval(data,token): Observable<any>{


  let headers = new HttpHeaders({
    'Authorization':'bearer'+" "+token,   'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'api/PartnerDetails/CheckApproval/'+data,{headers});

}
patnerdiry(data,token): Observable<any>{
  console.log(data)
  let headers = new HttpHeaders({
    'Authorization':'bearer'+" "+token,    'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'/api/PartnerDiary/GetAllByUserId/'+data,{headers});

}

patnerWiseProduct(data,token): Observable<any>{
  console.log(data)
  let headers = new HttpHeaders({
    'Authorization':'bearer'+" "+token,   'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'api/PartnerWiseProduct/GetAllByProductId/'+data,{headers});

}
patnerdirydate(data,bookingDate,token): Observable<any>{
  console.log(data)
  console.log(bookingDate)
  let headers = new HttpHeaders({
    'Authorization':'bearer'+" "+token,    'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'/api/PartnerDiary/GetAllBySearch/'+data/bookingDate,{headers});

}


userReg(data)  
{
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
   
  });

  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'api/UserRegistration', JSON.stringify(data),{headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

PartnerPastWork(data,token): Observable<any>{
 
  let headers = new HttpHeaders({
    'Authorization':'bearer'+" "+token,   'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'/api/PartnerPastWork/GetByUserId/'+data,{headers});

}
coupun(data,token):Observable<any>{
  let headers = new HttpHeaders({
    'Authorization':'bearer'+" "+token,    'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'/api/ProductCoupon/IsValide/'+data,{headers});

  // APR1504OFFER
}
}

