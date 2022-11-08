import mongoose from 'mongoose'
import { Password } from '../services/password';

// interface used to set the user's property types
interface UserAttributes {
    email: string,
    password: string
}

// interface that describes the properties that
// a User Model has
interface UserModel extends mongoose.Model<UserDocument> {
    build(attributes: UserAttributes) : UserDocument;
}

// an interface that describes the properties  a
// User Document has
interface UserDocument extends mongoose.Document {
    email: string,
    password: string;
}

// the types are for Mongoose not Typescript
const userSchema = new mongoose.Schema({
    email: {
        type: String,   // using the String interface not the string type.
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {    // override the toJSON function using an object
        // not the best practice to store the view of a JSON response here
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;    // plain js delete keyword which removes a prop from an obj
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes);
}
const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };