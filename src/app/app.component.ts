import { Component } from '@angular/core';
import { Platform,Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { VendorServiceSelectionPage } from '../pages/vendor-service-selection/vendor-service-selection';
import { ApiProvider } from '../providers/api/api';
import { TabsPage } from '../pages/tabs/tabs';
import { SubcatagoryPage } from '../pages/subcatagory/subcatagory';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;
  UserData : any;
  accessToken: any;
  constructor(public toastCtrl:ToastController,public events:Events,public rest: ApiProvider,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
     
     
      if(localStorage.getItem('userdata')){
        this.UserData=JSON.parse(localStorage.getItem('userdata'));
        this.accessToken = this.UserData.access_token;
       
           if(this.UserData.userType=='U'){
               this.rootPage=SubcatagoryPage;
           }
           else{
            this.rest.getUserByid(this.UserData.userId,this.accessToken).subscribe(data=>{
              console.log(data.productCategoryId)
              if(data.productCategoryId>0){
                 this.rootPage=TabsPage; 
               }
               else{
                this.rootPage=VendorServiceSelectionPage;
               }    
               
             })
           }
       
       
      }
      else{
        this.rootPage=LoginPage;
      }
    statusBar.backgroundColorByHexString('#ffffff'); 
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

