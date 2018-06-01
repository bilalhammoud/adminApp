import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {TabsPage} from "../tabs/tabs";
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";

//import {Firebase} from "@ionic-native/firebase";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {

  }

  async login(user: User) {

    if (!user.email || !user.password) {
      this.toastCtrl.create({
        message: 'Please fill all Fields!',
        duration: 4000,
        position: 'top'
      }).present();
    } else {

      var loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();

      try {
        const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(authData => {
          //successful
          loader.dismiss();
          this.navCtrl.setRoot(TabsPage);

        }, error => {
          loader.dismiss();
          // Unable to log in
          let toast = this.toastCtrl.create({
            message: error,
            duration: 4000,
            position: 'top'
          });
          toast.present();

          this.user.password = ""//empty the password field
        });
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  goRegister() {
    this.navCtrl.push(RegisterPage);
  }
}
