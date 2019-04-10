import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  constructor(public alertCtrl : AlertController,public rest: ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
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
        console.log(this.listService)

      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcatagoryPage');
  }
  next(item){
    console.log(item)
     this.rest.patnerWiseProduct(item.id).subscribe(Data=>{
       console.log(Data)
       this.navCtrl.push(ListmainPage,{data:Data})
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
