import { Subjects } from './subjects';

export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        version: number;
        title: string;
        price: number;
        date: Date;
        location: string;
        description?: string;
        userId: string;
    };
}