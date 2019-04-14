import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatuserPage } from './chatuser';

@NgModule({
  declarations: [
    ChatuserPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatuserPage),
  ],
})
export class ChatuserPageModule {}
