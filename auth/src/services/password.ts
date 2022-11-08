import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// convert the callback implementation to promise implementation
const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string){
        const salt = randomBytes(8).toString('hex');
         // as Buffer is used to covert to buffer type since it is lost when converting to promise implementation
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;  

        return `${buffer.toString('hex')}.${salt}`
    }

    static async compare(storedPassword: string, suppliedPassword: string){
        const [hashedPassword, salt] = storedPassword.split('.');
        const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

        return buffer.toString('hex') === hashedPassword;
    }
}