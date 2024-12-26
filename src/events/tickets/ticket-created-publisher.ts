import { Publisher, Subjects } from "../../base";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}