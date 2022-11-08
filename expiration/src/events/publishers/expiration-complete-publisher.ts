import { Subjects, Publisher, ExpirationCompleteEvent } from '@frst-ticket-app/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}