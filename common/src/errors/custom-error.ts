export abstract class CustomError extends Error {
    protected abstract _statusCode : number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);        
    }
    abstract get statusCode() : number

    abstract serializeErrors() : {message: string, field?: string}[]
    
}