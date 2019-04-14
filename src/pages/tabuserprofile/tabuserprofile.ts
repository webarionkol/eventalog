import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabuserprofilePage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabuserprofile',
  templateUrl: 'tabuserprofile.html'
})
export class TabuserprofilePage {

  notificationuserRoot = 'NotificationuserPage'
  chatuserRoot = 'ChatuserPage'
  profileuserRoot = 'ProfileuserPage'
  scarchuserRoot = 'ScarchuserPage'

  datapass:any;
  constructor(public navCtrl: NavController,public navParams: NavParams) {
  
  }

}
