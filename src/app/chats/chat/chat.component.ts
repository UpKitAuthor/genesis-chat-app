import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { ChatService } from '../shared/chat.service';
import { ChatMessage } from '../shared/chat-message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(
    public chatService: ChatService,
    private route: ActivatedRoute,
  ) { }

  messages: Observable<ChatMessage[]>;

  newMessage = '';

  botNameSub: Subscription;

  botName: string;

  ngOnInit(): void {
    this.botNameSub = this.route.paramMap
      .pipe(
        pluck('params', 'botName'),
        map((botName: string) => {
          this.botName = botName;
          this.messages = this.chatService.getMessages(botName);
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.botNameSub) {
      this.botNameSub.unsubscribe();
    }
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.newMessage) {
      this.chatService.sendMessage(this.botName, this.newMessage);
      this.newMessage = null;
    }
  }
}
