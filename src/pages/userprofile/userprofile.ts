import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { WelcomePage } from '../welcome/welcome';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the UserprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {
  pass : any;
  rate: any;
  imagelist: any;
  constructor(public plat: Platform,public socialSharing:SocialSharing,public alertCtrl: AlertController,public rest:ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
  this.pass=this.navParams.get('pass');
  this.rate="4";
  console.log(this.pass)
this.rest.PartnerPastWork(this.pass.userId).subscribe(data=>{
  this.imagelist=data
console.log(data)
})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
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
            this.navCtrl.setRoot(WelcomePage);
            localStorage.clear();
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }


  share(){
    this.plat.ready().then(() =>{
      this.socialSharing.share(" Please share  the service with all of your friends and family?", "Download Eventalog app now!", null , "http://eventalog.com/");
   });
  }
}
