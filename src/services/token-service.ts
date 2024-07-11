import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../configs/config';
import { User } from '@prisma/client';
import { Payload, TokenTypes } from '../models/token-model';

export const generateToken = async (userId: string, expires: moment.Moment, type: string, secret = config.jwt.secret!) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  };
  return jwt.sign(payload, secret);
}

export const generateAuthToken = async (user: User) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = await generateToken(user.id, accessTokenExpires, TokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = await generateToken(user.id, refreshTokenExpires, TokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  }
}

export const verifyToken = async (token: string): Promise<Payload> => {
  return jwt.verify(token, config.jwt.secret!) as Payload;
}