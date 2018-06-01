import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {StartPage} from '../startPage/startPage';
import {AlertController, ToastController} from "ionic-angular";

import {AngularFireAuth} from 'angularfire2/auth'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = StartPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private afAuth: AngularFireAuth,
              public toast: ToastController,
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
  }
}
