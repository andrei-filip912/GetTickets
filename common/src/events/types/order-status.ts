export enum OrderStatus {
    // order was created but ticket has not been reserved yet
    Created = 'created',

    // ticket has already been reserved, or user cancelled the order, or order expires
    Cancelled = 'cancelled',

    // reserved ticket
    AwaitingPayment = 'awaiting:payment',

    //reserved ticket + successfully paid
    Complete = 'complete'
}