import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {
  pass : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.pass=this.navParams.get('pass');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
  }

}
