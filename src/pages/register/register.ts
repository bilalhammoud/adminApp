import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {User} from "../../models/user";

import {AngularFireAuth} from 'angularfire2/auth';
import {TabsPage} from "../tabs/tabs";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  repeatPassword: string;
  DSGVOAgreed: boolean = false;

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    if (false === this.DSGVOAgreed) {
      this.alertCtrl.create({
        title: 'EU-DSGVO',
        message: 'Do you agree?',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Disagree',
            role: 'cancel',
            handler: () => {
              this.navCtrl.setRoot(HomePage);
            }
          },
          {
            text: 'Agree',
            role: 'confirm',
            handler: () => {
              this.DSGVOAgreed = true;
            }
          }
        ]
      }).present();
    }
  }

  sendEmailVerification(){
    this.afAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          this.toastCtrl.create({
            message: 'Email verification sent.',
            duration: 3000,
            position: 'top'
          }).present();
        })
    });
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
          this.sendEmailVerification();

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
