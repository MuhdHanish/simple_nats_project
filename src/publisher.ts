import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { Publisher } from "./base";
import {TicketCreatedPublisher } from "./events";

console.clear();

const clientId = randomBytes(4).toString("hex");

// client - stan
const stan = nats.connect("ticketing", clientId, {
    url: "http://localhost:4222"
});

async function publishEvents(publishers: { publisher: Publisher<any>, data: any }[]): Promise<void> {
    try {
        await Promise.all(
            publishers.map(({ publisher, data }) => publisher.publish(data))
        );
        console.log("All events published successfully");
    } catch (error) {
        console.error("Failed to publish one or more events:", error);
    }
}

stan.on("connect", async () => {
    console.log(`Publisher ${clientId} connected to NATS`);

    await publishEvents([
        {
            publisher: new TicketCreatedPublisher(stan),
            data: {
                id: "123",
                title: "concert",
                price: 20
            }
        },
    ]);

    stan.on("close", () => {
        console.log("Publisher NATS connection closed!");
        process.exit();
    });
})

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());