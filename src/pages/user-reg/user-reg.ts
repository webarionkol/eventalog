import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SubcatagoryPage } from '../subcatagory/subcatagory';
import { ApiProvider } from '../../providers/api/api';
import { OtpPage } from '../otp/otp';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the UserRegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-user-reg',
  templateUrl: 'user-reg.html',
})
export class UserRegPage {
  user: any;
  fname: any;
  lname : any;
  mobile : any;
  pass : any;
  cpass : any;
  dataArr : any=[];

  constructor(public network:Network,public toastCtrl:ToastController,public api : ApiProvider,public rest:ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegPage');
  }
  registration(){
    if(this.network.type!="none"){
    this.user={
      "password": this.pass,
      "confirmPassword": this.cpass,
      "firstName": this.fname,
      "lastName": this.cpass,
      "mobileNo": this.mobile,
      "deviceId": "string",
      "deviceType": "string",
      "operationSystem": "string",
      "osVersion": "string",
      "modelNo": "string",
      "imeiNo": "string",
      "manufacturingCompany": "string",
      "manufacturingDate": "string",
      "longitude": 0,
      "latitude": 0,
   }
   this.dataArr = {
    password: this.pass,
    confirmPassword: this.cpass,
    firstName: this.fname,
    lastName: this.lname,
    mobileNo: this.mobile,
   };


   this.api.RegistrationOTP(this.dataArr).subscribe(resp => {
   
    const toast = this.toastCtrl.create({
      message: "OTP send successfully",
      duration: 3000
    });
    toast.present();
      this.navCtrl.push(OtpPage,{
        data:this.dataArr,page:"User"
      })
    }), error => {
      let toast = this.toastCtrl.create({
        message: 'Invalid Mobile or Password',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    
    }
  }
  else{

  }

  }
}
