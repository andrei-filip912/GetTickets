import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

declare global {
    var getAuthCookie: () => Promise<string[]>;
}
let mongo: MongoMemoryServer;


beforeEach(async () => {
    process.env.JWT_KEY = 'FDSSFA'; // quick and dirty fix
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(uri);
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterEach(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.getAuthCookie = async () => {
    const email = 'abc@abc.com';
    const password = 'password';

    const res = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201);

    const cookie = res.get('Set-Cookie');

    return cookie;
};