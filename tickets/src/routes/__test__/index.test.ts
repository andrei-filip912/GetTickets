import request from 'supertest';
import { create } from 'ts-node';
import { app } from '../../app';

const createTicket = () => {
    const date = new Date("2028-12-30");

    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'asdfa',
            price: 42,
            date: date,
            location: 'somewhere',
            description: 'ffff',
        });
}

test('should fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);

    expect(response.body.length).toEqual(3);
})