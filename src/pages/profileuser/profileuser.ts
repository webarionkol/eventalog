import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { WelcomePage } from '../welcome/welcome';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoginPage } from '../login/login';
/**
 * Generated class for the ProfileuserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profileuser',
  templateUrl: 'profileuser.html',
})
export class ProfileuserPage {
  pass : any;
  rate: any;
  imagelist: any;
  user: any;
  coverpic:any;
  name: any;
  partnerDescription:any;
  mobileNo: any;

  constructor(public plat: Platform,public socialSharing:SocialSharing,public alertCtrl: AlertController,public rest:ApiProvider,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.user=JSON.parse(localStorage.getItem('userdata'));
  
    this.rate="4";
  
    this.rest.getUserByid(this.user.userId).subscribe(data=>{
      this.pass=data;
      this.coverpic=data.coverPicturePath;
      this.name=data.name
      this.partnerDescription=data.partnerDescription;
      this.mobileNo=data.mobileNo;
      console.log(data)
    })
  this.rest.PartnerPastWork(this.user.userId).subscribe(data=>{
    this.imagelist=data
  // console.log(data)
  })
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
            this.navCtrl.setRoot(LoginPage);
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
