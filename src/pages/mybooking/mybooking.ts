import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AdditionlServicePage } from '../additionl-service/additionl-service';
import { ApiProvider } from '../../providers/api/api';
import { SubcatagoryPage } from '../subcatagory/subcatagory';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the MybookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-mybooking',
  templateUrl: 'mybooking.html',
})
export class MybookingPage {
  hire : any;
  sp: any;
  dateget : any;
  place : any;
  UserData: any;
  accessToken : any;
  token_type : any;
  userId : any;
  idget:any;
  id : any;
  approveCheck : any;
  buttontext : any;
  rejectedResone: any;
  check:boolean=false;
  constructor(public toastCtrl :ToastController,public network:Network,public loadingCtrl: LoadingController,public rest: ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.UserData = JSON.parse(localStorage.getItem('userdata'));
    this.accessToken = this.UserData.access_token;
    this.token_type = this.UserData.token_type;
    this.userId = this.UserData.userId;
     this.idget=this.navParams.get('id');

     if(this.idget){
       this.hire=this.idget.hiredBy;
       this.sp=this.idget.servicePurpose;
       this.place=this.idget.place;
       this.dateget=this.idget.bookingDate;
       var dd=this.dateget.slice(0 , 2 );
       var mm= this.dateget.slice(3,5);
       var yyy=this.dateget.slice(6,10)
       this.id=this.idget.id
       this.dateget=yyy+'-'+mm+'-'+dd;
      //  2019-04-03
       console.log(this.dateget)
     }
  
  }
  reset (){
    if(this.network.type!="none"){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    let data={
      "hiredBy": this.hire,
      "servicePurpose": this.sp,
      "bookingDate": this.dateget,
      "place": this.place,
      "userId": this.userId
   }

   if(this.hire && this.sp && this.dateget && this.place){
    this.rest.dairyInsert(JSON.stringify(data),this.accessToken).subscribe(data=>{
      let toast = this.toastCtrl.create({
        message: 'Data saved successfully',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      // alert("Data saved successfully")
       this.sp="",
      this.dateget="",
      this.place="",
      this.userId="",
      this.hire=""
     loader.dismiss();
    } ,(err) => {
      let toast = this.toastCtrl.create({
        message: JSON.stringify(err.error.message),
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      // alert(JSON.stringify(err.error.message))
      loader.dismiss();
  })
   }
    else{
      let toast = this.toastCtrl.create({
        message: "all are mandatory fields",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      // alert("all are mandatory fields")
    }
  }
  else{
    this.rest.showToastOffline();
  }
  }
  ionViewDidLoad() {

if(this.network.type!="none"){
    this.UserData = JSON.parse(localStorage.getItem('userdata'));
    this.accessToken = this.UserData.access_token;
    this.token_type = this.UserData.token_type;
    this.userId = this.UserData.userId;

    this.rest.getUserByid(this.userId,this.accessToken).subscribe(data => {
      this.approveCheck=data.approvalStatusId;
   
      if(data.approvalStatusId=="1"){
        this.buttontext="Waiting for approve";
    }
    else if(data.approvalStatusId=="0"){
      this.buttontext="Send for approval";
    }
    else if(data.approvalStatusId=="2"){

      this.buttontext="Approve";
    }
    else if(data.approvalStatusId=="3"){
      this.buttontext="Resend for approval";
      this.rejectedResone=data.rejectedResone;
    }
    else{
      this.buttontext="Suspend";
   
      this.rejectedResone=data.rejectedResone;
    }
      
    })
    console.log('ionViewDidLoad MybookingPage');
  }
  else{
    this.rest.showToastOffline();
  }
  }
  list(){

    this.navCtrl.push(AdditionlServicePage)
  }
  update(){
    if(this.network.type!="none"){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    let data={
      "id":this.id,
      "hiredBy": this.hire,
      "servicePurpose": this.sp,
      "bookingDate": this.dateget,
      "place": this.place,
      "userId": this.userId
   }

   if(this.hire && this.sp && this.dateget && this.place){
    this.rest.dairyUpdate(JSON.stringify(data),this.accessToken).subscribe(data=>{
      let toast = this.toastCtrl.create({
        message: "Data saved successfully",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      // alert("Data saved successfully");
      this.idget='';
       this.sp="",
      this.dateget="",
      this.place="",
      this.userId="",
      this.hire=""

     loader.dismiss();
    } ,(err) => {
      let toast = this.toastCtrl.create({
        message: JSON.stringify(err.error.message),
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      // alert(JSON.stringify(err.error.message))
      loader.dismiss();
  })
   }
    else{
      
      let toast = this.toastCtrl.create({
        message: "all are mandatory fields",
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
  SCARCH(){
    if(this.network.type!="none"){
    this.navCtrl.push(SubcatagoryPage)
    }
    else{
      this.rest.showToastOffline();
    }
  }
}
