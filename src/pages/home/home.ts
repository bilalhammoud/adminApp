import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {TabsPage} from "../tabs/tabs";
//import {Firebase} from "@ionic-native/firebase";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email: string;
  password: string;

  constructor(public navCtrl: NavController,
              //public firebase: Firebase,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {

  }

  login() {
    //this.navCtrl.push(TabsPage);

    var that = this;

    var loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();


    /*this.usersService.loginUserService(this.email, this.password).then(authData => {
      //successful
      loader.dismiss();
      that.navCtrl.setRoot(TabsPage);

    }, error => {
      loader.dismiss();
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'top'
      });
      toast.present();

      that.password = ""//empty the password field

    });*/
  }

  goRegister() {
    this.navCtrl.push(RegisterPage);
  }
}
