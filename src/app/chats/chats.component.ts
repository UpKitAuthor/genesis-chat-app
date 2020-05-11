import { Component, OnInit } from '@angular/core';
import { ChatService } from './shared/chat.service';
import { Contact } from './shared/contact';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  constructor(
    public chatService: ChatService,
  ) { }

  contacts: Observable<Contact[]>;
  menuCollapsed = true;

  ngOnInit(): void {
    this.contacts = this.chatService.getContacts();
  }

  onToggleMenu() {
    this.menuCollapsed = this.menuCollapsed ? false : true;
  }
}
