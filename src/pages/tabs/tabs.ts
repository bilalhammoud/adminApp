import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {StartPage} from '../startPage/startPage';
import {AlertController, NavController, ToastController} from "ionic-angular";

import {AngularFireAuth} from 'angularfire2/auth'
import {HomePage} from "../home/home";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  user: any;

  tab1Root = StartPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private afAuth: AngularFireAuth,
              public toast: ToastController,
              public navCtrl: NavController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data.email && data.uid) {
        this.toast.create({
          message: 'Welcome to Admin App, ' + data.email,
          duration: 3000
        }).present();
      } else {
        this.alertCtrl.create({
          title: 'Authentication failed',
          subTitle: 'Could not find authentication details.',
          enableBackdropDismiss: false
        }).present();
      }
    });
    this.checkVerifiedEmail();
  }

  checkVerifiedEmail (){
    this.user = this.afAuth.auth.currentUser;

    if (this.user && !this.user.emailVerified) {
      this.alertCtrl.create({
        title: 'Verify Email',
        message: 'Please check the mailbox to verify your Email',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'I verified it',
            role: 'refresh',
            handler: () => {
              this.user.reload();
              this.user.getIdToken(true);
              this.checkVerifiedEmail();
            }
          },
          {
            text: 'Contact us',
            role: 'contact',
            handler: () => {
            }
          }
        ]
      }).present();
    }
  }
}
