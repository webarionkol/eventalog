import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  UserData: any;
  accessToken : any;
  token_type: any;
  userId : any;
  textin: any;
  constructor(public toastCtrl:ToastController,public loadingCtrl: LoadingController,public rest: ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.UserData=JSON.parse(localStorage.getItem('userdata'));
    this.accessToken=this.UserData.access_token;
    this.token_type=this.UserData.token_type;
    this.userId=this.UserData.userId;
     
    this.rest.getAbout(this.userId).subscribe(data=>{
      this.textin=data.about;
      console.log(data)
    })


  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
  submit(){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    let data=
    {
      "userId": this.userId,
      "about": this.textin
   }
    this.rest.PartnerAbout(data).subscribe(then=>{
      console.log(then)
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Data was added successfully',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.pop();
    })
      

  }
}
