import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, App } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Network } from '@ionic-native/network';
import { LoginPage } from '../login/login';

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
  constructor(public alertCtrl:AlertController,public app:App,public network:Network,public toastCtrl:ToastController,public loadingCtrl: LoadingController,public rest: ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.UserData=JSON.parse(localStorage.getItem('userdata'));
    this.accessToken=this.UserData.access_token;
    this.token_type=this.UserData.token_type;
    this.userId=this.UserData.userId;
     if(this.network.type!="none"){
      this.rest.getAbout(this.userId,this.accessToken).subscribe(data=>{
        this.textin=data.about;
        console.log(data)
      })
     }
     else{
  this.rest.showToastOffline();
     }

   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
  submit(){
    if(this.network.type!="none"){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    let data=
    {
      "userId": this.userId,
      "about": this.textin
   }
    this.rest.PartnerAbout(data,this.accessToken).subscribe(then=>{
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
  else{
    this.rest.showToastOffline();
  }
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Alert',
      message: "Do you want to logout?",

      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.app.getRootNav().setRoot(LoginPage);
            // this.navCtrl.setRoot(WelcomePage);
            localStorage.clear();
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
