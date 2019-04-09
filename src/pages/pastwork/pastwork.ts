import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the PastworkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pastwork',
  templateUrl: 'pastwork.html',
})
export class PastworkPage {
  image: any;
  UserData : any;
  accessToken: any;
  token_type : any;
  id : any;
  userId : any;
  pastworklist: any;
  inputvalue : any;
  constructor(public rest: ApiProvider,public loadingCtrl:LoadingController,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
 
    this.UserData=JSON.parse(localStorage.getItem('userdata'));
    this.accessToken=this.UserData.access_token;
    this.token_type=this.UserData.token_type;
    this.userId=this.UserData.userId; 
  }

  ionViewDidLoad() {

    this.rest.pastWord(this.userId).subscribe(res=>{
      this.pastworklist=res;
      console.log(res)
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
    formData.append('Id', '0');
    formData.append('Remark', this.inputvalue);
    formData.append('UserId', this.userId);

    //     let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data;boundary='+Math.random());
    // headers.append('Authorization',  `Bearer ${JSON.parse(localStorage.getItem('userdata')).access_token}`);


    let headers = new HttpHeaders({

      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userdata')).access_token}`
    });
    this.http.post('http://mobile.eventalog.com/api/PartnerPastWork/Insert', formData, { headers })
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
          this.rest.pastWord(this.userId).subscribe(res=>{
            this.pastworklist=res;
            console.log(res)
          })
          this.inputvalue=""
        },
        error => {
          loading.dismiss();
          alert("failed to upload");
        }
      )
  }
}
