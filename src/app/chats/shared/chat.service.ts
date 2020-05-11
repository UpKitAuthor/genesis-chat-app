import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contact } from './contact';
import { ChatMessage } from './chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getContacts(): Observable<Contact[]> {
    return this.afs.collection('bots').get()
      .pipe(
        map((collection: any) => {
          return collection.docs.map(doc => doc.data());
        }),
      );
  }

  getMessages(botName: string): Observable<ChatMessage[]> {
    return this.afs.collection('chats').doc(botName).collection('messages', ref => ref.orderBy('createdAt', 'desc'))
      .snapshotChanges()
      .pipe(
        map((items: any) => {
          const messages = items.map(i => i.payload.doc.data());
          return messages;
        }),
      );
  }

  async sendMessage(botName, content) {
    const username = 'joe';

    const data = {
      author: username,
      content,
      createdAt: Date.now()
    };

    const ref = this.afs.collection('chats').doc(botName).collection('messages');
    return ref.add(data);
  }
}
