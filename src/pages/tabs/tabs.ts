import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { StartPage } from '../startPage/startPage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = StartPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
