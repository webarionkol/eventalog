import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { ApiProvider } from '../../providers/api/api';
import { ListmainPage } from '../listmain/listmain';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the ScarchproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-scarchproduct',
  templateUrl: 'scarchproduct.html',
})
export class ScarchproductPage {

  UserData: any;
  accessToken: any;
  userId: any;
  filterItems: any;
  SearchValueCompontent: any;
  productcatid: any;
  constructor(public network:Network,public loadingCtrl: LoadingController,public toastCtrl:ToastController,public rest: ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
    if(this.network.type!="none"){
    this.UserData = JSON.parse(localStorage.getItem('userdata'));
    this.accessToken = this.UserData.access_token;
    this.userId = this.UserData.userId;
    let dataArr = [
      { "token": this.accessToken, "token_type": "this.token_type" }
    ]
    this.rest.getServiceList(dataArr).subscribe(data => {

      this.filterItems = data;
      console.log(this.filterItems)

    })
  }
  else{
    this.rest.showToastOffline();
  }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScarchproductPage');
  }

  scarech() {
    let data = "event"
    this.rest.scarchdata(data, this.accessToken).subscribe(ddata => {
      this.filterItems = ddata;
      console.log(this.filterItems)
    })
  }

  getComponent() {
    
    if(this.SearchValueCompontent){
    this.rest.scarchdata(this.SearchValueCompontent, this.accessToken).subscribe(data => {
      this.filterItems = data;
      console.log(this.filterItems)
    })
  }else{
    let toast = this.toastCtrl.create({
      message: 'No Keyword found',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  }

  comselect(ok) {
    this.productcatid = ok
    console.log(ok)
  }

  runTimeChange(ev) {
 
      if(this.network.type!="none"){
        
        if (ev._value.length == 0) {
          let dataArr = [
            { "token": this.accessToken, "token_type": "this.token_type" }
          ]
          this.rest.getServiceList(dataArr).subscribe(data => {
    
            this.filterItems = data;
              
    
          })
        }
        else{
        
        }
      }
      else{
       this.rest.showToastOffline();
      }
    
  

  }

  next(item){
    if(this.network.type!="none"){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    console.log(item)
     this.rest.patnerWiseProduct(item.id,this.accessToken).subscribe(Data=>{
       console.log(Data)
        if(Data.length==0){
          let toast = this.toastCtrl.create({
            message: 'No data found',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          loading.dismiss();
        }else{
          this.navCtrl.push(ListmainPage,{data:Data})
          loading.dismiss();
        }
     
     })
    }
    else{

    }
     
  }

}
