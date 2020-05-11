import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './chats/chats.component';
import { ChatComponent } from './chats/chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: 'chats', pathMatch: 'full' },
  {
    path: 'chats', component: ChatsComponent, children: [
      { path: ':botName', component: ChatComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
