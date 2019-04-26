import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { VendorServiceSelectionPage } from '../vendor-service-selection/vendor-service-selection';
import { ApiProvider } from '../../providers/api/api';
import { TabsPage } from '../tabs/tabs';
import { ResetPage } from '../reset/reset';
import { SubcatagoryPage } from '../subcatagory/subcatagory';
import { WelcomePage } from '../welcome/welcome';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  mobile: any;
  password: any;
  loginarr: any = [];
  constructor(public network:Network,public toastCtrl:ToastController,public loadingCtrl: LoadingController, public rest: ApiProvider, public navCtrl: NavController, public navParams: NavParams) {


  }
  forgot(){
    this.navCtrl.push(ResetPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    if(this.network.type!="none"){

    if(this.mobile && this.password){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
  
      loading.present();
      let data = [{ 'username': this.mobile, 'password': this.password }
  
      ]
  
  
      this.rest.token(data).subscribe(data => {
         console.log(data.access_token)
        if(data.userType=="U"){
          loading.dismiss();
          
          localStorage.setItem("userdata", JSON.stringify(data))
          if(localStorage.getItem('userdata')){
            this.rest.getUserByids(data.userId,data.access_token).subscribe(data=>{
             
             
               this.navCtrl.setRoot(SubcatagoryPage); 
              
              
            })
          
         }
    
         
         let toast = this.toastCtrl.create({
          message: 'Login Successfully',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        }
        else{
          loading.dismiss();
          localStorage.setItem("userdata", JSON.stringify(data))
    
          if(localStorage.getItem('userdata')){
            this.rest.getUserByids(data.userId,data.access_token).subscribe(data=>{
            
             if(data.productCategoryId>0){
               this.navCtrl.setRoot(TabsPage); 
              }
              else{
                this.navCtrl.push(VendorServiceSelectionPage);
              }    
              
            })
          
         }
    
         
         let toast = this.toastCtrl.create({
          message: 'Login Successfully',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        }
     
      }, error => {
        let toast = this.toastCtrl.create({
          message: 'Invalid Mobile or Password',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        loading.dismiss();
      },)
      // this.navCtrl.push(VendorServiceSelectionPage)
    
    }
    else{

      let toast = this.toastCtrl.create({
        message: "Empty MobileNo and Password",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    
    }
  }
  else{
    this.rest.showToastOffline();
  }
    
}
newacc(){
  this.navCtrl.push(WelcomePage)
}
}