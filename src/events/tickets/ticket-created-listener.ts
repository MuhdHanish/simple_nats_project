import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects, Listener } from "../../base";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = "ticket-created-service";

    onMessage(data: TicketCreatedEvent["data"], msg: Message) {
        console.log(`#${msg.getSequence()} - Data:`, data);
        msg.ack();
    }
}