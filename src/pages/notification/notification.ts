import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  constructor(public alertCtrl:AlertController,public app:App,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
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
