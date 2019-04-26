import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ResetnextPage } from '../resetnext/resetnext';
import { ApiProvider } from '../../providers/api/api';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {
  mobile : any;

  constructor(public network:Network,public loadingCtrl:LoadingController,public toastCtrl:ToastController,public rest: ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }
  reset (){
    if(this.network.type!="none"){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    let data={
      "mobileNo": this.mobile
   }
   console.log(data)
    this.rest.resetCheck(JSON.stringify(data)).subscribe(data=>{
      this.navCtrl.push(ResetnextPage,{"mobile":this.mobile})
      console.log(data)
      loading.dismiss();
    }, error => {
      let toast = this.toastCtrl.create({
        message: 'Mobile No does not exist',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      loading.dismiss();
    },)
    // this.navCtrl.push(ResetnextPage)
  }
  else{

  }
  }
}
