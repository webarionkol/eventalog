import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, App } from 'ionic-angular';
import { ListmainPage } from '../listmain/listmain';
import { ApiProvider } from '../../providers/api/api';
import { WelcomePage } from '../welcome/welcome';
import { LoginPage } from '../login/login';

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

  constructor(public app:App,public toastCtrl:ToastController,public loadingCtrl: LoadingController,public alertCtrl : AlertController,public rest: ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    
    this.UserData=JSON.parse(localStorage.getItem('userdata'));
     this.accessToken=this.UserData.access_token;
     this.token_type=this.UserData.token_type;
     this.userId=this.UserData.userId;
 
     let dataArr=[
      { "token":this.accessToken,"token_type":this.token_type}
     ]
      this.rest.getServiceList(dataArr).subscribe(data=>{
      console.log(data)
       this.listService=data;
       this.filterItems=this.listService
        loading.dismiss();

      },error => {
              
        console.log(error)

     let toast = this.toastCtrl.create({
       message: error.error.message,
       duration: 3000,
       position: 'bottom'
     });
     toast.present();
       // alert("failed to upload");
     }
      )
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
     this.rest.patnerWiseProduct(item.id,this.accessToken).subscribe(Data=>{
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
            this.app.getRootNav().setRoot(LoginPage);
            localStorage.clear();
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
