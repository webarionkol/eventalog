import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserprofilePage } from '../userprofile/userprofile';
import { ThrowStmt } from '@angular/compiler';
import { UserTabPage } from '../user-tab/user-tab';
import { TabuserprofilePage } from '../tabuserprofile/tabuserprofile';
import { LoginPage } from '../login/login';

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
  filterItems : any;
  headerName: any;
  searchTerm : any;
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  this.rate=4;
  this.headerName=this.navParams.get('name')
  this.dataget=this.navParams.get("data");
  this.filterItems=this.dataget;

  console.log(this.filterItems)
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListmainPage');
  }
  Next(item){
    this.navCtrl.push(TabuserprofilePage,{pass:item})
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
            this.navCtrl.setRoot(LoginPage);
         
            localStorage.clear();
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  scarchitem(item) {
    console.log(item)
    this.filterItems = this.dataget.filter(item => (item.name).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
  }

}
