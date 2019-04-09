import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserprofilePage } from '../userprofile/userprofile';

/**
 * Generated class for the ListmainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-listmain',
  templateUrl: 'listmain.html',
})
export class ListmainPage {
  rate: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.rate=4;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListmainPage');
  }
  Next(){
    this.navCtrl.push(UserprofilePage)
  }
}
