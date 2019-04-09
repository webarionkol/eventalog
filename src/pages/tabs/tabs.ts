import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {NotificationPage} from "../notification/notification";
import {DomSanitizer} from "@angular/platform-browser";
import { MybookingPage } from '../mybooking/mybooking';
import { ChatPage } from '../chat/chat';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer,  public modalCtrl: ModalController) {
  }

  notification = NotificationPage;
  booking = MybookingPage;
  chat = ChatPage;
  profil = ProfilePage;


  feed_count = 0;
  dashboard_count = 8;
  messages_count = 12;
  notification_count = 38;

}
