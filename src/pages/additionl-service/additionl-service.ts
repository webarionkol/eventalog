import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { MybookingPage } from '../mybooking/mybooking';

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
  constructor(public rest:ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.UserData = JSON.parse(localStorage.getItem('userdata'));
    this.accessToken = this.UserData.access_token;
    this.token_type = this.UserData.token_type;
    this.userId = this.UserData.userId;
    console.log(this.userId)
    this.rest.patnerdiry(this.userId).subscribe(data=>{
      this.servicelist=data;
      console.log(data)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdditionlServicePage');
  }
  onChange(item){
    this.rest.patnerdirydate(this.userId,item).subscribe(data=>{
      this.servicelist=data;
    })
console.log(item)
  }

  list(item){
    this.navCtrl.push(MybookingPage,{"id":item})
    console.log(item)
  }
}
