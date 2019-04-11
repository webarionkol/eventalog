import { Component } from '@angular/core';
import { Platform,Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { VendorServiceSelectionPage } from '../pages/vendor-service-selection/vendor-service-selection';
import { ApiProvider } from '../providers/api/api';
import { TabsPage } from '../pages/tabs/tabs';
import { SubcatagoryPage } from '../pages/subcatagory/subcatagory';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;
  UserData : any;

  constructor(public toastCtrl:ToastController,public events:Events,public rest: ApiProvider,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.UserData=JSON.parse(localStorage.getItem('userdata'));
     
      if(localStorage.getItem('userdata')){
           if(this.UserData.userType=='U'){
               this.rootPage=SubcatagoryPage;
           }
           else{
            this.rest.getUserByid(this.UserData.userId).subscribe(data=>{
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
        this.rootPage=WelcomePage;
      }
    statusBar.backgroundColorByHexString('#ffffff'); 
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

