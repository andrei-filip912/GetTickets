import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    _statusCode = 404;

    constructor() {
        super('Not found');
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
    public get statusCode() : number {
        return this._statusCode;
    }
    serializeErrors(): { message: string; field?: string; }[] {
        return [ { message: 'Not found' } ];
    }

    
}