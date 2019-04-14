import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserprofilePage } from '../userprofile/userprofile';
import { ThrowStmt } from '@angular/compiler';
import { UserTabPage } from '../user-tab/user-tab';
import { TabuserprofilePage } from '../tabuserprofile/tabuserprofile';

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
  dataget : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.rate=4;
  this.dataget=this.navParams.get("data");
  console.log(this.dataget)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListmainPage');
  }
  Next(item){
    this.navCtrl.push(TabuserprofilePage,{pass:item})
  }
}
