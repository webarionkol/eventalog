import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,App } from 'ionic-angular';
import { IdentityVerificationPage } from '../identity-verification/identity-verification';
import { AdditionlServicePage } from '../additionl-service/additionl-service';
import { ServiceLocationPage } from '../service-location/service-location';
import { AboutPage } from '../about/about';
import { PastworkPage } from '../pastwork/pastwork';
import { ApiProvider } from '../../providers/api/api';
import { AddservicePage } from '../addservice/addservice';
import { ToastController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LoginPage } from '../login/login';
import { WelcomePage } from '../welcome/welcome';
import { NotificationPage } from '../notification/notification';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  UserData: any;
  accessToken: any;
  token_type: any;
  listService: any = [];
  id: any;
  userId: any;
  CatId: any;
  image: any;
  cover: any;
  name: any;
  buttontext: any;
  rejectedResone:any;
  rejectedOn: any;
  mobileNo: any;
  approveCheck : any;
  payAmmount: any="999";
  constructor(public app:App,public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, private http: HttpClient, public rest: ApiProvider, public navParams: NavParams) {
    this.UserData = JSON.parse(localStorage.getItem('userdata'));
    this.accessToken = this.UserData.access_token;
    this.token_type = this.UserData.token_type;
    this.userId = this.UserData.userId;

    this.rest.getUserByid(this.userId,this.accessToken).subscribe(data => {
      this.approveCheck=data.approvalStatusId
   
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

  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.rest.getUserByid(this.userId,this.accessToken).subscribe(res => {
      console.log(res)
      if (res.coverPicturePath) {
        this.cover = "http://" + res.coverPicturePath;
      }
      else {
        this.cover = ""
      }
      if (res.profilePicturePath) {
        this.image = "http://" + res.profilePicturePath;
      }
      else {
        this.image = "";
      }
      this.name = res.name;
      this.mobileNo=res.mobileNo
      console.log(this.name)
      loading.dismiss();
    })
  }
  identityVerification() {
    this.navCtrl.push(IdentityVerificationPage)
  }
  aboutinfo() {
    this.navCtrl.push(AddservicePage)
  }
  addServiceLocation() {
    this.navCtrl.push(ServiceLocationPage)
  }
  about() {
    this.navCtrl.push(AboutPage)
  }
  wordDetails() {
    this.navCtrl.push(PastworkPage)
  }

  payd() {

    console.log("pay")
    var options = {
      description: 'Credits towards consultation',
      image: 'https://s3.ap-south-1.amazonaws.com/boost-content-cdn/CustomPages/Images/1d76ef9a.png',
      currency: 'INR',
      // key: 'rzp_live_TiHLnwF3zf3vJs',    
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: this.payAmmount * 100,
      name: 'Eventalog',
      prefill: {
        email: 'demo@email.com',
        contact: '1234567890',
        name: 'My Name'
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function () {
          alert('dismissed')
        }
      }
    };

  


    var cancelCallback = function (error) {
      let toast = this.toastCtrl.create({
        message: 'Payment Error. Please try again later',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      // alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.on('payment.success', (success) =>{
      let toast = this.toastCtrl.create({
        message: 'Payment Successfully.Your payment id is ' + success.razorpay_payment_id,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();

      // alert('payment_id: ' + success.razorpay_payment_id)
      localStorage.setItem("paymentid",success.razorpay_payment_id)
      // al÷ert('payment_id: ' + success.razorpay_payment_id)
      var orderId = success.razorpay_order_id
      var signature = success.razorpay_signature
      this.apiCall()
    }
)
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(options);
  }

  apiCall() {

      let data = {
      "amount": 999,
      "serviceProvider": "Rozerpay",
      "paymentStatus": true,
      "userId": this.userId,
      "mobileNo":this.UserData.mobileNo,
      "transactionId": localStorage.getItem('paymentid')
    }

    console.log(JSON.stringify(data))

    this.rest.approv(JSON.stringify(data),this.accessToken).subscribe(data => {
        console.log(data)
     
      let toast = this.toastCtrl.create({
        message: 'Registration Successfull',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
       this.approvecheck();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Registration failed',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    
    
    
  })
}
approvecheck(){
 
  this.navCtrl.setRoot(this.navCtrl.getActive().component);

}


sendapp(){
  console.log(this.UserData.userId)
  let usr={
    "userId":this.UserData.userId
  }
  this.rest.checkApproval(this.UserData.userId,this.accessToken).subscribe(data => {
    console.log(data)
    if (data.status == true) {
      this.payd();
    }
  }, (err) => {

    const alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: err.error.message,
      buttons: ['OK']
    });
    alert.present();
  
 
  }
)
}
  send(item) {
    
    if(this.buttontext=="Waiting for approve"){
      
  
    }
    else if(this.buttontext=="Send for approval"){
      this.showConfirmAlert();

    }
    else if(this.buttontext=="Approve"){
      
    }
    else if(this.buttontext=="Resend for approval"){
  
      var usre={
        "userId":this.UserData.userId
      }
      this.rest.resendApprov(JSON.stringify(usre),this.accessToken).subscribe(data => {
        console.log(data)

        let toast = this.toastCtrl.create({
          message: 'Registration Successfull',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        // alert("Registration Successfull")
       
        this.approvecheck();
      }, (err) => {


        let toast = this.toastCtrl.create({
          message: JSON.stringify(err.error.message),
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
       
      })
    }

  }

  uploadcover(event) {
    
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    console.log(event)
    let formData: FormData = new FormData();
    formData.append("image", event.target.files[0]);

    formData.append('UserId', this.userId);

    let headers = new HttpHeaders({

      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userdata')).access_token}`
    });
    this.http.post('http://mobile.eventalog.com/api/UserProfile/UploadCoverPicture', formData, { headers })
      .subscribe(
        data => {
          this.cover = 'http://' + data['url']


          console.log(this.cover)
          loading.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Cover image was added successfully',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        },
        error => {
          loading.dismiss();


        let toast = this.toastCtrl.create({
          message: 'failed to upload',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
          // alert("failed to upload");
        }
      )
  }
  
  uploadFile(event) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    console.log(event)
    let formData: FormData = new FormData();
    formData.append("image", event.target.files[0]);

    formData.append('UserId', this.userId);

    let headers = new HttpHeaders({

      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userdata')).access_token}`
    });
    this.http.post('http://mobile.eventalog.com/api/PartnerProfile/UploadProfilePicture', formData, { headers })
      .subscribe(
        data => {
          this.image = 'http://' + data['url']
          localStorage.setItem("profileimage", this.image);

          console.log(this.image)
          loading.dismiss();
          let toast = this.toastCtrl.create({
            message: 'image was added successfully',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        },
        error => {
          loading.dismiss();


        let toast = this.toastCtrl.create({
          message: 'failed to upload',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
          // alert("failed to upload");
        }
      )
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
            // this.navCtrl.setRoot(WelcomePage);
            localStorage.clear();
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  showConfirmAlert() {
    const confirm = this.alertCtrl.create({
      title: 'Do you have any promo code?',
      
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.payAmmount="999"
            this.payd();
          }
        },
        {
          text: 'Yes',
          handler: () => {
           this.showConfirm();

            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
showConfirm() {
  const prompt = this.alertCtrl.create({
    title: 'Coupon Code',
    message: "Enter Code Below",
    inputs: [
      {
        name: 'Code',
        placeholder: 'Ex.AGB765'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          if(data.Code){
            console.log(data.Code)
            this.rest.coupun(data.Code,this.accessToken).subscribe(data=>{
              console.log(data)
            this.payAmmount=data.price;
              let toast = this.toastCtrl.create({
                message: data.message,
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
             
              this.sendapp();
              
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
           else{
            let toast = this.toastCtrl.create({
              message: "input not found",
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
           }
         
        }
      }
    ]
  });
  prompt.present();
  }
  noti(){
    this.navCtrl.push(NotificationPage)
  }
}
