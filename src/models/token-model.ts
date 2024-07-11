export enum TokenTypes {
  ACCESS = 'access',
  REFRESH = 'refresh'
}

export interface Payload {
  sub: string;
  iat: number;
  exp: number;
  type: string;
}