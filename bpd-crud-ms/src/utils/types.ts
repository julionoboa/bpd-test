import { Request } from 'express';

export interface JwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface CustomRequest extends Request {
  user?: JwtPayload;
}