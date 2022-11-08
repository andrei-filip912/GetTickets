import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

// augmenting type definition 
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser =  (
    req : Request,
    res: Response,
    next: NextFunction
) => {
  if(!req.session?.jwt) {
      return next();    // skips to the next function in the middleware
  }

  try {
    const payLoad = jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payLoad;
  } catch (err) { }
  finally {
    next();
  }
};