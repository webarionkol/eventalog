import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { ListmainPage } from '../listmain/listmain';
import { ApiProvider } from '../../providers/api/api';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the SubcatagoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-subcatagory',
  templateUrl: 'subcatagory.html',
})
export class SubcatagoryPage {

  UserData : any;
  accessToken: any;
  token_type : any;
  listService: any=[];
  id : any;
  userId : any;
  filterItems : any;
  searchTerm : any;
  constructor(public toastCtrl:ToastController,public loadingCtrl: LoadingController,public alertCtrl : AlertController,public rest: ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    
    this.UserData=JSON.parse(localStorage.getItem('userdata'));
     this.accessToken="8jY7s7vCvH_IepMsBJRhAXZ8ZkmJdCmxB1iB3h8kKFYtz7TGNLiQMwtAn37BfaTuZm6vQpJDS1ohWSSWXEA15yltWXEcJfvZoGTu_9IuaDsV6UVfylIGAcuWdZyEF5Lb6rpPwP3yo5R85XsC0TN1qS17kjDe8";
     this.token_type="this.UserData.token_type";
     this.userId="2";
     console.log(this.UserData)
     let dataArr=[
      { "token":this.accessToken,"token_type":this.token_type}
     ]
      this.rest.getServiceList(dataArr).subscribe(data=>{
     
       this.listService=data;
       this.filterItems=this.listService
        loading.dismiss();

      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcatagoryPage');
  }
  next(item){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    console.log(item)
     this.rest.patnerWiseProduct(item.id).subscribe(Data=>{
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

  filterItems1() {
    this.filterItems = this.listService.filter(item => (item.category).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
  }
  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Alert',
      message: "Do you want to logout?",

      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.navCtrl.setRoot(WelcomePage);
            localStorage.clear();
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
