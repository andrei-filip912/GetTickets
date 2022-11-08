import { Subjects } from "./subjects";

export interface TicketUpdatedEvent {
    subject: Subjects.TicketUpdated;
    data: {
        id: string;
        version: number;
        title: string;
        price: number;
        date: Date;
        location: string;
        description?: string;
        userId: string;
        orderId?: string;
    }
}