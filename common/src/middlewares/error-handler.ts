import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/custom-error";

// response structure: { errors: { message: string, field?: string}[] }

export const errorHandler = (
    err: Error, // this parameter is only present on request validator middlewares
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    
    if(err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors:  err.serializeErrors() });
    }

    console.error(err);
    res.status(400).send({
        errors: [{ message: 'Something went wrong'}]
    });
    
};