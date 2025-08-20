export type CardColor = 'red' | 'green' | 'yellow' | 'blue';

export type CardValue =
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | 'reverse'
    | 'skip'
    | 'plus1'
    | 'plus2'
    | 'plus4';

export type UnoCard =
    | {
          id: string;
          isWild: true;
          color?: never;
          value?: CardValue;
      }
    | {
          id: string;
          isWild: false;
          color: CardColor;
          value: CardValue;
      };
