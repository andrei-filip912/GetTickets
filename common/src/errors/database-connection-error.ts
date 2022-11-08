import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = 'Error connecting to database';
    protected _statusCode = 500;

    constructor() {
        super('Error connecting to database');
        
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    
    public get statusCode() : number {
        return this._statusCode;
    }
    
    public serializeErrors() {
        return [
            { message: this.reason }
        ]
    }
}