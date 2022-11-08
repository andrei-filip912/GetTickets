import { CustomError } from "./custom-error";


export class BadRequestError extends CustomError {
    protected _statusCode = 400;

    constructor(public message : string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    public get statusCode(): number {
        return this._statusCode;
    }
    public serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [
            { message: this.message }
        ]
    }
}