import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ViewController, App } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { WelcomePage } from '../welcome/welcome';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoginPage } from '../login/login';
import { SubcatagoryPage } from '../subcatagory/subcatagory';
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
  id: number;
  UserData : any;
  accessToken : any;
  constructor(public app:App,public viewCtrl: ViewController,public plat: Platform,public socialSharing:SocialSharing,public alertCtrl: AlertController,public rest:ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.UserData=JSON.parse(localStorage.getItem('userdata'));
     this.accessToken=this.UserData.access_token;

    console.log('Passed params', navParams.data.userId);


    this.rest.getUserByid(navParams.data.userId,this.accessToken).subscribe(data=>{
      this.pass=data;
      this.coverpic=data.coverPicturePath;
      this.name=data.name
      this.partnerDescription=data.partnerDescription;
      this.mobileNo=data.mobileNo;
      console.log(data)
    })
  this.rest.PartnerPastWork(navParams.data.userId,this.accessToken).subscribe(data=>{
    this.imagelist=data
  // console.log(data)
  })
  }

  ionViewDidLoad() {
    this.user=JSON.parse(localStorage.getItem('userdata'));
  
    this.rate="4";
  
 
    console.log('ionViewDidLoad UserprofilePage');
  }
  public onClickCancel() {
    this.app.getRootNav().setRoot(SubcatagoryPage);
    // this.navCtrl.setRoot(SubcatagoryPage);
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
