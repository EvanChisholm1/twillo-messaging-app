import express, { Application, Request, Response } from 'express';
import Twilio from 'twilio';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(express.json());

const client = Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTHTOKEN);

app.post('/', async (req: Request, res: Response) => {
    try {
        const twilioRes = await client.messages
            .create({
                body: 'hello from twilio',
                to: '+17056060865',
                from: '+12564726312',
            });

        res.json(twilioRes);
    } catch(err) {
        res.json({ message: err });     
    }
})

app.post('/:number', async (req: Request, res: Response) => {
    console.log(req.params.number)
    try {
        const twilioRes = await client.messages
            .create({
                body: req.body.message,
                to: req.params.number,
                from: '+12564726312',
            });
            
        res.json(twilioRes)
    } catch (err) {
        res.json({ message: err })
    }
})

app.listen(5000, () => console.log('listening on port 5000'))
