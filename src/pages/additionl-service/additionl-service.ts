import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { MybookingPage } from '../mybooking/mybooking';
import { Network } from '@ionic-native/network';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AdditionlServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-additionl-service',
  templateUrl: 'additionl-service.html',
})
export class AdditionlServicePage {
  userId : any;
  accessToken : any;
  UserData : any;
  token_type : any;
  servicelist: any;
  constructor(public app:App,public alertCtrl:AlertController,public network:Network,public rest:ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.UserData = JSON.parse(localStorage.getItem('userdata'));
    this.accessToken = this.UserData.access_token;
    this.token_type = this.UserData.token_type;
    this.userId = this.UserData.userId;
    console.log(this.userId)
    if(this.network.type!="none"){
    this.rest.patnerdiry(this.userId,this.accessToken).subscribe(data=>{
      this.servicelist=data;
      console.log(data)
    })
  }
  else{
    this.rest.showToastOffline();
  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdditionlServicePage');
  }
  onChange(item){
    if(this.network.type!="none"){
    this.rest.patnerdirydate(this.userId,item,this.accessToken).subscribe(data=>{
      this.servicelist=data;
    })
  }
  else{
    this.rest.showToastOffline();
  }
  }

  list(item){
    if(this.network.type!="none"){
    this.navCtrl.push(MybookingPage,{"id":item})
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
