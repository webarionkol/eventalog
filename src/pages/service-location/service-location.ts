import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, App, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiProvider } from '../../providers/api/api';
import { Network } from '@ionic-native/network';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ServiceLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-service-location',
  templateUrl: 'service-location.html',
})
export class ServiceLocationPage {
  UserData: any;
  accessToken: any;
  token_type: any;
  id: any;
  userId: any;
  constructor(public alertCtrl:AlertController,public app: App,public network:Network,public rest: ApiProvider, public toastCtrl: ToastController, public platform: Platform, private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
   
    this.UserData = JSON.parse(localStorage.getItem('userdata'));
    this.accessToken = this.UserData.access_token;
    this.token_type = this.UserData.token_type;
    this.userId = this.UserData.userId;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceLocationPage');
  }
  loc() {
    if(this.network.type!="none"){
    this.platform.ready().then(() => {

      // get current position
      this.geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        let data = {
          "Id": 1,
          "userId": this.userId,
          "longitude": pos.coords.longitude,
          "latitude": pos.coords.latitude
        }

        this.rest.ServiceLocation(data,this.accessToken).subscribe(resp => {
          console.log(resp)
        })
        const toast = this.toastCtrl.create({
          message: 'Thank you for choosing your address',
          duration: 3000
        });
        toast.present();
        this.navCtrl.pop();


      }).catch(err => {
        alert("Error getting location pleash check your GPS settings")
      })

      const watch = this.geolocation.watchPosition().subscribe(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      });

      // to stop watching
      watch.unsubscribe();

    });
  }
  else{
    this.rest.showToastOffline();
  }

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
