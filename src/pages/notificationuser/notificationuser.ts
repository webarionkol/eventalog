import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { SubcatagoryPage } from '../subcatagory/subcatagory';
import { LoginPage } from '../login/login';

/**
 * Generated class for the NotificationuserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificationuser',
  templateUrl: 'notificationuser.html',
})
export class NotificationuserPage {

  constructor(public app:App,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationuserPage');
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
}
