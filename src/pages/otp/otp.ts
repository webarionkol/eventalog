import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the OtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
otp:any;
registerArr: any=[];
userData:any;
  constructor(public navCtrl: NavController, public toastCtrl:ToastController, public navParams: NavParams,private api: ApiProvider) {
    this.userData = this.navParams.get('data');
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }
  registration(){
    this.registerArr ={
  "password": this.userData.password,
   "confirmPassword":  this.userData.confirmPassword,
   "firstName": this.userData.firstName,
   "lastName": this.userData.lastName,
   "otp": this.otp,
   "mobileNo": this.userData.mobileNo,
   "deviceId": "stri988908ng",
   "deviceType": "string",
   "operationSystem": "string",
   "osVersion": "string",
   "modelNo": "string",
   "imeiNo": "string",
   "manufacturingCompany": "string",
   "manufacturingDate": "string",
   "longitude": 0,
   "latitude": 0

    }
    console.log(this.navParams.get('page'))
     if(this.navParams.get('page')){
      this.api.userReg(this.registerArr).then(resp => {
        console.log(resp)
        const toast = this.toastCtrl.create({
          message: 'You are now successfully registered',
          duration: 3000
        });
        toast.present();
         this.navCtrl.setRoot(WelcomePage)
        },
        err => {
          const toast = this.toastCtrl.create({
            message: JSON.stringify(err.error.message),
            duration: 3000
          });
          toast.present();
          // alert(JSON.stringify(err));
        });
     }else{
      this.api.PartnerRegistration(this.registerArr).then(resp => {
        console.log(resp)
        const toast = this.toastCtrl.create({
          message: 'You are now successfully registered',
          duration: 3000
        });
        toast.present();
         this.navCtrl.setRoot(WelcomePage)
        },
        err => {
          const toast = this.toastCtrl.create({
            message: JSON.stringify(err.error.message),
            duration: 3000
          });
          toast.present();
          // alert(JSON.stringify(err));
        });
     }
   
  
  }

}
