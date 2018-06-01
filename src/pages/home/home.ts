import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController, AlertController} from 'ionic-angular';
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
              public alertCtrl: AlertController,
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

  resetPassword() {
    this.alertCtrl.create({
      title: 'Reset Password',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Send',
          handler: data => {
            this.sendPassword(data.email);
          }
        }
      ]
    }).present();
  }

  sendPassword(email) {
    //todo adding a condition to check if the email is not empty.

    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => {
        this.alertCtrl.create({
          title: 'Done',
          subTitle: 'We sent you an email to reset your password.',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        }).present();
      })
  };
}
