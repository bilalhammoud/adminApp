import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {User} from "../../models/user";

import {AngularFireAuth} from 'angularfire2/auth';
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  repeatPassword: string;

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
  }

  async register(user: User) {

    if (!user.email || !user.password || !this.repeatPassword) {
      this.toastCtrl.create({
        message: 'Please fill all Fields!',
        duration: 4000,
        position: 'top'
      }).present();
    } else if (user.password != this.repeatPassword) {
      this.repeatPassword = '';
      this.toastCtrl.create({
        message: 'Re-Password should match your Password!',
        duration: 4000,
        position: 'top'
      }).present();
    } else {

      var loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();

      try {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(authData => {
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
}
