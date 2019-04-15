import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SubcatagoryPage } from '../subcatagory/subcatagory';

/**
 * Generated class for the TabuserprofilePage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-tabuserprofile',
  templateUrl: 'tabuserprofile.html'
})
export class TabuserprofilePage {

  notificationuserRoot = 'NotificationuserPage'
  chatuserRoot = 'ChatuserPage'
  profileuserRoot = 'ProfileuserPage'
  scarchuserRoot = 'ScarchuserPage'
  data: any;
  datapass:any;
 
 // set some user information on chatParams
 
 chatParams: any = {
  
};
  constructor(public viewCtrl:ViewController,public navCtrl: NavController,public navParams: NavParams) {
    this.chatParams = 
      this.navParams.get('pass')
   
  }

}
