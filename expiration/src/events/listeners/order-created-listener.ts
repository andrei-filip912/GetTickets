import { Listener, OrderCreatedEvent, Subjects } from "@frst-ticket-app/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    onMessage = async (data: OrderCreatedEvent['data'], msg: Message) => {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log(`waiting ${delay} ms`);

        await expirationQueue.add({
            orderId: data.id
        }, 
        {
            delay,
        }
        );

        await msg.ack();
    }
}