import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the IdentityVerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-identity-verification',
  templateUrl: 'identity-verification.html',
})
export class IdentityVerificationPage {
  image: any;
  UserData: any;
  accessToken: any;
  token_type: any;
  listService: any = [];
  id: any;
  userId: any;
  CatId: any;
  ports : any;
  doctID: any;
  docList : any;
  flag:boolean= false;
  constructor(public rest: ApiProvider,public loadingCtrl:LoadingController,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.UserData = JSON.parse(localStorage.getItem('userdata'));
    this.accessToken = this.UserData.access_token;
    this.token_type = this.UserData.token_type;
    this.userId = this.UserData.userId;
  }

  ionViewDidLoad() {
    console.log("HI")
    this.rest.patnerDoc(this.accessToken).subscribe(data=>{
      this.ports=data;
    console.log(this.ports)
    })

    this.rest.PartnerDocumentByid(this.userId,this.accessToken).subscribe(data=>{
     this.docList=data;
     
    })
    console.log('ionViewDidLoad IdentityVerificationPage');
  }
  public uploadFile(event) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    console.log(event)
    let formData: FormData = new FormData();
    formData.append("image", event.target.files[0]);
    formData.append('Id',"0");
    formData.append('DocumentTypeId', this.doctID);
    formData.append('UserId', this.userId);

    let headers = new HttpHeaders({

      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userdata')).access_token}`
    });
    this.http.post('http://mobile.eventalog.com/api/PartnerDocument/Insert', formData, { headers })
      .subscribe(
        data => {
          this.image = 'http://' + data['url']
          console.log(this.image)
          loading.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Image Save Successfully',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        ///dddd
       
       
          this.rest.PartnerDocumentByid(this.userId,this.accessToken).subscribe(data=>{
            this.docList=data;
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
           })

           
        },
        error => {
          loading.dismiss();
          alert("failed to upload");
        }
      )
  }

 
  portChange(item){
    this.doctID=item.value.id;
    
    console.log(item.value.documentTypeName)
  }
}
