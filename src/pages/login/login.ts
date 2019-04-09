import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { VendorServiceSelectionPage } from '../vendor-service-selection/vendor-service-selection';
import { ApiProvider } from '../../providers/api/api';
import { TabsPage } from '../tabs/tabs';
import { ResetPage } from '../reset/reset';
import { SubcatagoryPage } from '../subcatagory/subcatagory';

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
  constructor(public toastCtrl:ToastController,public loadingCtrl: LoadingController, public rest: ApiProvider, public navCtrl: NavController, public navParams: NavParams) {


  }
  forgot(){
    this.navCtrl.push(ResetPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {

    if(this.mobile && this.password){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
  
      loading.present();
      let data = [{ 'username': this.mobile, 'password': this.password }
  
      ]
  
  
      this.rest.token(data).subscribe(data => {
        console.log(data.userType)
        if(data.userType=="U"){
          loading.dismiss();
          localStorage.setItem("userdata", JSON.stringify(data))
    
          if(localStorage.getItem('userdata')){
            this.rest.getUserByid(data.userId).subscribe(data=>{
           
             
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
            this.rest.getUserByid(data.userId).subscribe(data=>{
             console.log(data.productCategoryId)
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
      alert("Empty 'MobileNo' and 'Password'.")
    }
    
}
}