import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserRegPage } from '../user-reg/user-reg';
import { PartnerRegPage } from '../partner-reg/partner-reg';
import { LoginPage } from '../login/login';
import { SubcatagoryPage } from '../subcatagory/subcatagory';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  register_user(){
    // this.navCtrl.push(SubcatagoryPage)

    this.navCtrl.push(UserRegPage)
  }
  register_partner(){
    this.navCtrl.push(PartnerRegPage)
  }
  login(){
    this.navCtrl.push(LoginPage)
  }


}
