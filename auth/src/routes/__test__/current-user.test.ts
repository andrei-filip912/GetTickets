import request from "supertest";
import { app } from '../../app';

test('responds with user details', async () => {
    // sign up
    const cookie = await getAuthCookie();

    // sign up
    const res = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);
    expect(res.body.currentUser.email).toEqual('abc@abc.com');
});

test('responds with null when not authenticated', async () => {
    const res = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);
    expect(res.body.currentUser).toEqual(null);
});
