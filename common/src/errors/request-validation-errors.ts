import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    private _errors: ValidationError[];
    protected _statusCode = 400;

    constructor(errors: ValidationError[]) {
        super('Invalid request :(');
        this._errors = errors;

        // only has to be done when extending built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    
    public get errors() : ValidationError[] {
        return this._errors; 
    }

    public get statusCode() : number {
        return this._statusCode;
    }

    public serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        })
    }
}