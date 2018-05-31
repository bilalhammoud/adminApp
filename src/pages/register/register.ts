import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  email:string = '';
  password:string = '';
  repeatPassword:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  register() {
    if (0 === this.email.length || 0 === this.password.length || 0 === this.repeatPassword.length){

    }
  }
}
