export type Message = LoaderMessage | ErrorMessage | TextMessage | CardMessage | CarouselMessage | ImageMessage;
export declare enum MessageAuthor {
    bot = "bot",
    user = "user",
    app = "app"
}
export declare enum MessageType {
    message = "message",
    card = "card",
    carousel = "carousel",
    image = "image",
    loader = "loader",
    error = "error"
}
interface MessageBase {
    type: MessageType;
    author: MessageAuthor;
    metadata?: Record<string, string>;
    footnotes?: MessageFootnote[];
    date: number;
}
export interface TextMessage extends Partial<MessageBase> {
    type: MessageType.message;
    text: string;
    buttons?: Button[];
}
export interface CardMessage extends Partial<MessageBase> {
    type: MessageType.card;
    title: string;
    subTitle?: string;
    buttons?: Button[];
    file: WebMediaFile;
}
export interface CarouselMessage extends Partial<MessageBase> {
    type: MessageType.carousel;
    cards: CardMessage[];
}
export interface ImageMessage extends Partial<MessageBase> {
    type: MessageType.image;
    url?: string;
    title: string;
    alternative?: string;
    file: WebMediaFile;
}
export interface LoaderMessage extends Partial<MessageBase> {
    type: MessageType.loader;
    message?: string;
}
export interface ErrorMessage extends Partial<MessageBase> {
    type: MessageType.error;
    message?: string;
    text: string;
}
export interface MessageFootnote {
    identifier: string;
    title: string;
    url: string;
    content?: string;
}
export interface WebMediaFile {
    url: string;
    name: string;
    type: string;
    description?: string;
    _loaded?: boolean;
}
export declare enum ButtonType {
    web_url = "web_url",
    postback = "postback",
    quick_reply = "quick_reply"
}
export interface Button {
    type: ButtonType;
    title: string;
    url?: string;
    target?: string;
    windowFeatures?: string;
}
export {};
