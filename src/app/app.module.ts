import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SubcatagoryPage } from '../pages/subcatagory/subcatagory';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { UserRegPage } from '../pages/user-reg/user-reg';
import { PartnerRegPage } from '../pages/partner-reg/partner-reg';
import { LoginPage } from '../pages/login/login';
import { VendorServiceSelectionPage } from '../pages/vendor-service-selection/vendor-service-selection';
import { TabsPage } from '../pages/tabs/tabs';
import { NotificationPage } from '../pages/notification/notification';
import { ProfilePage } from '../pages/profile/profile';
import { ChatPage } from '../pages/chat/chat';
import { MybookingPage } from '../pages/mybooking/mybooking';
import { IdentityVerificationPage } from '../pages/identity-verification/identity-verification';
import { AdditionlServicePage } from '../pages/additionl-service/additionl-service';
import { ServiceLocationPage } from '../pages/service-location/service-location';
import { ListmainPage } from '../pages/listmain/listmain';
import { UserprofilePage } from '../pages/userprofile/userprofile';
import { AboutPage } from '../pages/about/about';
import { Geolocation } from '@ionic-native/geolocation';
import { OtpPage } from '../pages/otp/otp';

// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';
import { ApiProvider } from '../providers/api/api';
import { PastworkPage } from '../pages/pastwork/pastwork';
import { AddservicePage } from '../pages/addservice/addservice';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { ResetPage } from '../pages/reset/reset';
import { ResetnextPage } from '../pages/resetnext/resetnext';

import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    UserRegPage,
    PartnerRegPage,
    ListmainPage,
    UserprofilePage,
    AddservicePage,
    PastworkPage,
    LoginPage,
    SubcatagoryPage,
    VendorServiceSelectionPage,
    TabsPage,
    NotificationPage,
    ProfilePage,
    ChatPage,
    MybookingPage,
    IdentityVerificationPage,
    AdditionlServicePage,
    ServiceLocationPage,
    OtpPage,
    AboutPage,
    ResetPage,
    ResetnextPage
  ],
  imports: [
    BrowserModule,
    SelectSearchableModule,
    Ionic2RatingModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddservicePage,
    HomePage,
    WelcomePage,
    UserRegPage,
    PartnerRegPage,
    ListmainPage,
    UserprofilePage,
    PastworkPage,
    LoginPage,
    VendorServiceSelectionPage,
    TabsPage,
    SubcatagoryPage,
    NotificationPage,
    ProfilePage,
    ChatPage,
    MybookingPage,
    IdentityVerificationPage,
    AdditionlServicePage,
    ServiceLocationPage,
    OtpPage,
    AboutPage,
    ResetPage,
    ResetnextPage
  ],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    SocialSharing,
    ApiProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
