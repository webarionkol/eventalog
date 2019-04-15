import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the AddservicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-addservice',
  templateUrl: 'addservice.html',
})
export class AddservicePage {
  cname: any = '';
  cdesc: any = '';
  cwebsite: any ='';
  ctime: any = '';
  cloc: any = '';
  UserData: any;
  accessToken: any;
  token_type: any;
  id: any;
  userId: any;
  statearr: any;
  cityarr: any;
  cityid: any;
  stateid: any
  stateidapiget : any;
  state : any;
  cityidapiget :any;
  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public rest: ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.UserData = JSON.parse(localStorage.getItem('userdata'));
    this.accessToken = this.UserData.access_token;
    this.token_type = this.UserData.token_type;
    this.userId = this.UserData.userId;


    this.rest.getUserByid(this.userId,this.accessToken).subscribe(data => {
      this.cname = data.name;
      this.cdesc = data.description;
      this.cwebsite = data.website;
      this.ctime = data.serviceTime;
      this.cloc = data.servicePin;
      this.stateidapiget=data.stateId;   
      this.state=data.state;
      this.cityidapiget=data.cityId;
    
      console.log(this.state)
    })
   
      this.rest.StateGet(this.accessToken).subscribe(data => {
        this.statearr = data;
         this.stateid=this.statearr[this.stateidapiget-1]
         this.city(this.stateid.id)
      })


  }
 city(data){
  this.rest.city(data,this.accessToken).subscribe(data => {

        this.cityarr = data;
        for(let f=0;f<this.cityarr.length;f++){
          if(this.cityidapiget==this.cityarr[f].id){
            this.cityid=this.cityarr[f];
          }
        }
      })
 }
  ionViewDidLoad() {
 
    console.log('ionViewDidLoad AddservicePage');
  }
  update(){
    if(this.stateid.id){
      this.stateid=this.stateid.id;
    }
    let data = {
      "name": this.cname,
      "description": this.cdesc,
      "website": this.cwebsite,
      "servicePin": this.cloc,
      "serviceTime": this.ctime,
      "userId": this.userId,
      "cityid": this.cityid.id,
      "stateid": this.stateid,
    }

  
    this.rest.adddetiels(data,this.accessToken).subscribe(data => {
      console.log(data)

    
      let toast = this.toastCtrl.create({
        message: 'Save Successfully',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.pop()
    })
  }
  send() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    console.log(this.stateid)
    let data = {
      "name": this.cname,
      "description": this.cdesc,
      "website": this.cwebsite,
      "servicePin": this.cloc,
      "serviceTime": this.ctime,
      "userId": this.userId,
      "cityid": this.cityid.id,
      "stateid": this.stateid,
    }
    console.log(this.cityid.id)
    this.rest.adddetiels(data,this.accessToken).subscribe(data => {
      console.log(data)

      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Save Successfully',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.pop()
    })
  }
  stateSelete(event) {
    // this.stateid = event.value.id;
    this.cityarr=[];
    this.cityid="";
    console.log(this.stateid)
    this.rest.city(event.value.id,this.accessToken).subscribe(data => {
      this.cityarr = data;
      console.log(data)
    })
  }
}
