import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ApiProvider } from '../../providers/api/api';

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
  UserData : any;
  accessToken: any;
  token_type : any;
  listService: any=[];
  id : any;
  userId : any;
  constructor(public rest: ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
     this.UserData=JSON.parse(localStorage.getItem('userdata'));
     this.accessToken=this.UserData.access_token;
     this.token_type=this.UserData.token_type;
     this.userId=this.UserData.userId;
     console.log(this.UserData)
     let dataArr=[
      { "token":this.accessToken,"token_type":this.token_type}
     ]
      this.rest.getServiceList(dataArr).subscribe(data=>{
     
       this.listService=data;
        console.log(this.listService)

      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorServiceSelectionPage');
  }
submit(){
  console.log(this.id)
  let item=[{
    "productCategoryId": this.id.id,
    "userId": this.userId,
    "isDefault": 1
  }]

  console.log(item[0])
  this.rest.getServiceListSubmit(item).subscribe(data=>{
    console.log(data)
  })
  this.navCtrl.push(TabsPage)
}
}
