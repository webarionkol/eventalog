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
  user:any;
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
    let headers = new HttpHeaders({
      'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',
      
     
    });
    return this.http.get(this.apiUrl+'api/ProductCategory/GetAll',{headers});
  }
  
  getServiceListSubmit(data): Observable<any>  {
    let headers = new HttpHeaders({
      'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
       'Content-Type':'application/json',
      
     
    });
    return this.http.post(this.apiUrl+'api/PartnerWiseProduct/Insert',JSON.stringify(data),{headers});
  }

  getUserByid(data): Observable<any>  {
    let headers = new HttpHeaders({
      'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',
      
     
    });
    return this.http.get(this.apiUrl+'api/PartnerDetails/GetByUserId/' + data,{headers});
  }
  
  PartnerAbout(data): Observable<any>  {
    let headers = new HttpHeaders({
      'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',
      
     
    });
    return this.http.post(this.apiUrl+'api/PartnerAbout/Insert',JSON.stringify(data),{headers});
  }
  approv(data): Observable<any>  {

    let headers = new HttpHeaders({
      'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',

    });
    return this.http.post(this.apiUrl+'api/PartnerPayment/MakePayment',data,{headers});

  }

  adddetiels(data): Observable<any>  {

    let headers = new HttpHeaders({
      'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
        'Content-Type':'application/json',

    });
    return this.http.post(this.apiUrl+'api/PartnerDetails/Insert',JSON.stringify(data),{headers});

  }
  // getadddetiels(){
  //   http://mobile.eventalog.com/api/PartnerDetails/GetById/1
  // }
  ServiceLocation(data): Observable<any>  {  
    let headers = new HttpHeaders({
      'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',

    });
    return this.http.post(this.apiUrl+'api/PartnerServiceLocation/Insert',JSON.stringify(data),{headers});

    
  }

  getAbout(data): Observable<any>  {
    let headers = new HttpHeaders({
      'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',
      
     
    });
    return this.http.get(this.apiUrl+'api/PartnerAbout/GetByUserId/'+data,{headers});
  }
  patnerDoc(): Observable<any>{

    let headers = new HttpHeaders({
      'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',
      
     
    });
    return this.http.get(this.apiUrl+'api/DocumentType/GetAll',{headers});
  
  
  }
pastWord(data): Observable<any>{
  

  let headers = new HttpHeaders({
    'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
    'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'api/PartnerPastWork/GetByUserId/'+data,{headers});

}

PartnerDocumentByid(data): Observable<any>{
  

  let headers = new HttpHeaders({
    'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',
    
   
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

resendApprov(data): Observable<any>
{
  let headers = new HttpHeaders({
    'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
    'Content-Type':'application/json',
    
   
  });

  return this.http.post(this.apiUrl+'api/PartnerApproval/ReSendApproval',data,{headers});

  
}
dairyInsert(data): Observable<any>{

  let headers = new HttpHeaders({
     'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
    'Content-Type':'application/json',
    
   
  });

  return this.http.post(this.apiUrl+'api/PartnerDiary/Insert',data,{headers});

  
}

dairyUpdate(data): Observable<any>{

  let headers = new HttpHeaders({
     'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
    'Content-Type':'application/json',
    
   
  });

  return this.http.post(this.apiUrl+'api/PartnerDiary/Update',data,{headers});

  
}


city(data): Observable<any>{

console.log(data)
  let headers = new HttpHeaders({
    'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',
    
   
  });
  
  return this.http.get(this.apiUrl+'/api/City/GetAllByStateId/'+data,{headers});


}

StateGet(): Observable<any>{


  let headers = new HttpHeaders({
    'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'/api/State/GetAllByCountryId/1',{headers});

}

checkApproval(data): Observable<any>{


  let headers = new HttpHeaders({
    'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'api/PartnerDetails/CheckApproval/'+data,{headers});

}
patnerdiry(data): Observable<any>{
  console.log(data)
  let headers = new HttpHeaders({
    'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'/api/PartnerDiary/GetAllByUserId/'+data,{headers});

}

patnerWiseProduct(data): Observable<any>{
  console.log(data)
  let headers = new HttpHeaders({
    'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'api/PartnerWiseProduct/GetAllByProductId/'+data,{headers});

}
patnerdirydate(data,bookingDate): Observable<any>{
  console.log(data)
  console.log(bookingDate)
  let headers = new HttpHeaders({
    'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',
    
   
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

PartnerPastWork(data): Observable<any>{
 
  let headers = new HttpHeaders({
    'Authorization':'bearer iH-bI3K6_j2xiXkIynHK4U2s6zrDR4AENNWjq_UUVJ8B3yWUTy_aTF73QLxb0wf1G2L-o24TI-p_eDCDV1aBBwqc-KCxY2PeDqJ1D88sd-yV1RLxyS44ufAOCd0Lo8ibo_Zije0poOVEO2g5M-iNorSsMeuBe90yOEgLb3LBybMfH5Eo8DZ50S7-m6haeFhlYOkXicGFsgPz8apOezWDkSwwcAi156WOCCvKXAzP2urHSqidc-pifTHU40zkH76mIfDkozL5ODkJN7lYqnUo_Z2dCF9Ycmc6z_1OkhirOpe1dDARPnaoEseiUl9RFFBEaImmVTwNc8UfWfJd0L1Zn39CmuI1amNrMJMnK6qT8nvjze3wWHa8Vu6ni_1uXcCR_NSFz-Z4JZ2Yqha5J6yXfQ',
      'Content-Type':'application/json',
    
   
  });
  return this.http.get(this.apiUrl+'/api/PartnerPastWork/GetByUserId/'+data,{headers});

}

}

