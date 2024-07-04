import type { Message } from './messages';

export interface mainState {
  userId: string;
  messages: Message[];
}
