import amqp from "amqplib";
const PORT = 5672
const QUEUE = 'jobs'

export class Publisher {
    private channel: amqp.Channel
    async init() {
        try {
            const conn = await amqp.connect(`amqp://localhost:${PORT}`);
            this.channel = await conn.createChannel();
            await this.channel.assertQueue(QUEUE);
        } catch (e: any) {
            console.error(e);
        }
    }

    processSubmission(jobId: string) {
        this.channel.sendToQueue('jobs', Buffer.from(jobId));
        console.log(`Job ${jobId} sent successfully `);
    }
}




