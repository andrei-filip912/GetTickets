import request from "supertest";
import { app } from '../../app';

test('returns a 201 on successful signup',async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'abc@abc.com',
            password: 'abcdefes'
        })
        .expect(201);
});

test('returns 400 when invalid email is provided', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: '213',
        password: 'abcdefes'
    })
    .expect(400);
});

test('returns 400 when invalid password is provided', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'abc@abc.com',
        password: 's'
    })
    .expect(400);
});

test('returns 400 when no email and password are provided', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'abc@abc.com'
    })
    .expect(400);

    await request(app)
    .post('/api/users/signup')
    .send({
        password: 'abcdefes'
    })
    .expect(400);
});

test('does not allow using the same email twice', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'abc@abc.com',
        password: 'abcdefes'
    })
    .expect(201);

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'abc@abc.com',
        password: 'abcdefes'
    })
    .expect(400);
});

test('sets cookie after successful signup', async () => {
    const res = await request(app)
    .post('/api/users/signup')
    .send({
        email: 'abc@abcd.com',
        password: 'password'
    })
    .expect(201);
    expect(res.get('Set-Cookie')).toBeDefined();
})