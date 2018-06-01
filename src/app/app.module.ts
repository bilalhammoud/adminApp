import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {RegisterPage} from "../pages/register/register";

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { StartPage } from '../pages/startPage/startPage';
import {TabsPage} from "../pages/tabs/tabs";

import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";

import {FIREBASE_CONFIG} from "./app.firebase.config";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    AboutPage,
    ContactPage,
    StartPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    AboutPage,
    ContactPage,
    StartPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
