export interface TockQuery {
  query?: String;
  payload?: String;
  userId: String;
  locale: String;
  ref?: String;
  connectorId?: String;
  returnsHistory?: Boolean;
  sourceWithContent?: Boolean;
}
