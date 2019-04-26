import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ApiProvider } from '../../providers/api/api';
import { Network } from '@ionic-native/network';
import { LoginPage } from '../login/login';

/**
 * Generated class for the VendorServiceSelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-vendor-service-selection',
  templateUrl: 'vendor-service-selection.html',
})
export class VendorServiceSelectionPage {
  UserData: any;
  accessToken: any;
  token_type: any;
  SearchValueCompontent: any;
  listService: any = [];
  productcatid: any;
  id: any;
  userId: any;
  constructor(public alertCtrl :AlertController,public network:Network,public rest: ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.UserData = JSON.parse(localStorage.getItem('userdata'));
    this.accessToken = this.UserData.access_token;
    this.token_type = this.UserData.token_type;
    this.userId = this.UserData.userId;
    console.log(this.UserData)

    if (this.network.type != "none") {
      let dataArr = [
        { "token": this.accessToken, "token_type": this.token_type }
      ]
      this.rest.getServiceList(dataArr).subscribe(data => {

        this.listService = data;
        console.log(this.listService)

      })
    }
    else {

    }
  }
  getComponent() {
    if (this.network.type != "none") {
      this.rest.scarchdata(this.SearchValueCompontent, this.accessToken).subscribe(data => {
        this.listService = data;
        console.log(this.listService)
      })
    } else {

    }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorServiceSelectionPage');
  }
  submit() {
    if (this.network.type != "none") {
      console.log(this.id)
      let item = [{
        "productCategoryId": this.productcatid,
        "userId": this.userId,
        "isDefault": 1
      }]

      console.log(item[0])
      this.rest.getServiceListSubmit(item, this.accessToken).subscribe(data => {
        console.log(data)
      })
      this.navCtrl.push(TabsPage)
    }
    else {

    }
  }
  comselect(ok) {
    this.productcatid = ok
    console.log(ok)
  }

  runTimeChange(ev) {
    if (this.network.type != "none") {
      console.log(ev._value.length)
      if (ev._value.length == 0) {
        let dataArr = [
          { "token": this.accessToken, "token_type": this.token_type }
        ]
        this.rest.getServiceList(dataArr).subscribe(data => {

          this.listService = data;
          console.log(this.listService)

        })
      }
    }
    else {
this.rest.showToastOffline();
    }
  }
  showPrompt(){
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
}
