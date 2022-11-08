import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError{
    protected _statusCode = 401;

    constructor() {
        super('Not authorized');
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
    
    public get statusCode() {
        return this._statusCode;
    }

    public serializeErrors(): {message: string, field?: string}[] {
        return [{ message: 'Not authorized' }];
    }
}
