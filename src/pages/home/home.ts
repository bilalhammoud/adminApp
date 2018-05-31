import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email:string;
  password:string;

  constructor(public navCtrl: NavController) {

  }

  login(){
    console.log("Email: " + this.email);

    console.log("Password: " + this.password);
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
