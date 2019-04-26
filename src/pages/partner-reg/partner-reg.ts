import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ApiProvider } from '../../providers/api/api';
import { OtpPage } from '../otp/otp';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the PartnerRegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-partner-reg',
  templateUrl: 'partner-reg.html',
})
export class PartnerRegPage {
fname:any = '';
lname:any = '';
mobile:any = '';
pass:any ='';
cpass:any ='';
dataArr:any=[];
  constructor(public network:Network,public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerRegPage');
  }
  goToLogin(){
    this.navCtrl.push(LoginPage)
  }
  registration(){
    if(this.network.type!="none"){
    if(this.fname == '' || this.lname == ''){
      this.api.showToast('please fill all field', 'top', 'error');
    } else if(this.mobile.length != 10){
      this.api.showToast('please put valid mobile number', 'top', 'error');
    } else if(this.pass.length < 7) {
      this.api.showToast('password should more then seven charecter', 'top', 'error');
    } else if(this.pass !== this.cpass) {
      this.api.showToast('password and confirm password should match', 'top', 'error');
    } else{
      this.dataArr = {
        password: this.pass,
        confirmPassword: this.cpass,
        firstName: this.fname,
        lastName: this.lname,
        mobileNo: this.mobile,
              };
  this.api.RegistrationOTP(this.dataArr).subscribe(resp => {
    console.log(resp)
  
      this.navCtrl.push(OtpPage,{
        data:this.dataArr
      })
    })
    
  }
}
else{
  this.api.showToastOffline();
}
}
}
