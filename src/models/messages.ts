export type Message = LoaderMessage | TextMessage | CardMessage | CarouselMessage | ImageMessage;

export enum MessageAuthor {
  bot = 'bot',
  user = 'user',
  app = 'app'
}

export enum MessageType {
  message = 'message',
  card = 'card',
  carousel = 'carousel',
  image = 'image',

  loader = 'loader'
}

interface MessageBase {
  type: MessageType;
  author: MessageAuthor;
  metadata?: Record<string, string>;
  footnotes?: MessageFootnote[];
  date: number;
}

export interface TextMessage extends MessageBase {
  type: MessageType.message;
  text: string;
  buttons?: Button[];
}

export interface CardMessage extends MessageBase {
  type: MessageType.card;
  title: string;
  subTitle?: string;
  buttons?: Button[];
  file: WebMediaFile;
}

export interface CarouselMessage extends MessageBase {
  type: MessageType.carousel;
  cards: CardMessage[];
}

export interface ImageMessage extends MessageBase {
  type: MessageType.image;
  url?: string;
  title: string;
  alternative?: string;
  file: WebMediaFile;
}

export interface LoaderMessage extends MessageBase {
  type: MessageType.loader;
  message?: string;
}

export interface MessageFootnote {
  identifier: string;
  title: string;
  url: string;
}

export interface WebMediaFile {
  url: string;
  name: string;
  type: string;
  description?: string;
  _loaded?: boolean;
}

export enum ButtonType {
  web_url = 'web_url',
  postback = 'postback',
  quick_reply = 'quick_reply'
}

export interface Button {
  type: ButtonType;
  title: string;
}
