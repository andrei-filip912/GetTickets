import express, { Request, Response } from 'express';
import { NotFoundError, BadRequestError, requireAuth, validateRequest, OrderStatus} from '@frst-ticket-app/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const secondsInMinute = 60;

router.post('/api/orders',
    requireAuth,
    [
        body('ticketId')
            .not()
            .isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('Ticket must be provided')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {ticketId} = req.body;

        // Find the requested ticket
        const ticket = await Ticket.findById(ticketId);
        if(!ticket) {
            throw new NotFoundError();
        }
        
        // Make sure the ticket is not already reserved
        const isReserved = await ticket.isReserved();
        if(isReserved) {
            throw new BadRequestError('Ticket already reserved');
        }

        // Set expiration date
        const expiration = new Date();
        
        // const EXPIRATION_WINDOW_SECONDS = Number(process.env!.ORDER_EXPIRE_SECONDS) * secondsInMinute;
        const EXPIRATION_WINDOW_SECONDS = 1 * secondsInMinute;  // dev
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
        
        // Build order
        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            ticket,
        });
        await order.save();

        // Publish order:created event
        new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            status: order.status,
            userId: order.userId,
            expiresAt: order.expiresAt.toISOString(),
            ticket: {
                id: ticket.id,
                price: ticket.price,
            },
            version: order.version
        });
        
        res.status(201).send(order);
    });

export { router as newOrderRouter };