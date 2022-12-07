import amqp from "amqplib";
import { SubmissionModel } from "../models/Submission";
import { Executor } from "./Executor";
import { db } from '../config/DbSetup';
const PORT = 5672
const executor = new Executor()

async function connect() {
    const queue = 'jobs';
    try {
        const conn = await amqp.connect(`amqp://localhost:${PORT}`);
        const channel = await conn.createChannel();
        const res = await channel.assertQueue(queue);
        console.log(" [*] Waiting for messages in %s.", queue);
        channel.consume(queue, consumeJob, { noAck: true });
        
    } catch (e: any) {
        console.error(e);
    }
}

async function consumeJob(msg: any) {
    console.log(" [x] Received %s", msg.content.toString());
    const jobId = msg.content.toString();
    const output = await executor.runJsCode(jobId);
    output['stdout'] = output['stdout'].trimEnd('\n')
    console.log(output);
    const filter = { '_id': jobId };
    const update = { output: output };
    let subm = await SubmissionModel.findOneAndUpdate(filter, update, { new: true });
    console.log(subm);
}

db.connect();

connect();

