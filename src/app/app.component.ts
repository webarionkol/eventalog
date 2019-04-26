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
import { Network } from '@ionic-native/network';


import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../common/is-cordova-available';
import { oneSignalAppId, sender_id } from '../config';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;
  UserData : any;
  accessToken: any;
  constructor(private oneSignal: OneSignal,public network: Network,public toastCtrl:ToastController,public events:Events,public rest: ApiProvider,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
     
      this.rest.initializeNetworkEvents();

      // Offline event
      this.events.subscribe('network:offline', () => {
        const toast = this.toastCtrl.create({
          message: 'You are offline',
          duration: 3000
        });
        toast.present();
        //  alert('network:offline ==> '+this.network.type);    
      });

      // Online event
      this.events.subscribe('network:online', () => {
        // const toast = this.toastCtrl.create({
        //   message: 'You are online via ' + this.network.type,
        //   duration: 3000
        // });
        // toast.present();

      });
     
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

      if (isCordovaAvailable()){
        this.oneSignal.startInit(oneSignalAppId, sender_id);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
        this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
        this.oneSignal.endInit();
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  private onPushReceived(payload: OSNotificationPayload) {
    alert('Push recevied:' + payload.body);
  }
  
  private onPushOpened(payload: OSNotificationPayload) {
    alert('Push opened: ' + payload.body);
  }
}

