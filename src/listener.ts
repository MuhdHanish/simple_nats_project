import { randomBytes } from "crypto";
import nats from "node-nats-streaming";
import { TicketCreatedListener } from "./events";

console.clear();

const clientId = randomBytes(4).toString("hex");

// client - stan
const stan = nats.connect("ticketing", clientId, {
    url: "http://localhost:4222"
});

stan.on("connect", () => {
    console.log(`Listener ${clientId} connected to NATS`);

    new TicketCreatedListener(stan).listen();

    stan.on("close", () => {
        console.log("Listener NATS connection closed!");
        process.exit();
    }); 
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());