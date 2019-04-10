import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../login/login';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the ResetnextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-resetnext',
  templateUrl: 'resetnext.html',
})
export class ResetnextPage {
otp: any;
mobileNo: any;
ConfirmPassword : any;
Password : any;

  constructor(public rest: ApiProvider,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams) {
  this.mobileNo=this.navParams.get('mobile')
  
  }


  submit(){
    if(this.mobileNo && this.otp && this.ConfirmPassword && this.Password){
      if(this.Password==this.ConfirmPassword){
        let data={
          "mobileNo": this.mobileNo,
          "OTP" : this.otp,
          "ConfirmPassword" : this.ConfirmPassword,
          "Password" : this.Password
  
       }
  
       this.rest.resetSubmit(JSON.stringify(data)).subscribe(data=>{
         console.log(data)
  
         let toast = this.toastCtrl.create({
          message: 'Password change successfully',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.setRoot(WelcomePage)
       }, error => {
        let toast = this.toastCtrl.create({
          message: 'Server Error pleash try again..',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.setRoot(WelcomePage)
      },)
      }
      else{
        let toast = this.toastCtrl.create({
          message: 'Password not match',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    }
    else{
      let toast = this.toastCtrl.create({
        message: '* fields are mandatory',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
 
 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetnextPage');
  }

}
