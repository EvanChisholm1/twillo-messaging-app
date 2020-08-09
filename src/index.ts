import express, { Application, Request, Response } from 'express';
import Twilio from 'twilio';
import * as dotenv from 'dotenv';
import requireKey from './requireKey';
import cors from 'cors';

dotenv.config();

const app: Application = express();

app.use(cors())
app.use(express.json());
app.use(requireKey)

const client = Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTHTOKEN);

app.post('/', async (req: Request, res: Response) => {
    try {
        const twilioRes = await client.messages
            .create({
                body: 'hello from twilio',
                to: '+17056060865',
                from: '+16474962202',
            });

        res.json(twilioRes);
    } catch(err) {
        res.json({ message: err });     
    }
})

app.post('/:number', async (req: Request, res: Response) => {
    try {
        const twilioRes = await client.messages
            .create({
                body: req.body.message,
                to: req.params.number,
                from: '+16474962202',
            });
            
        res.json(twilioRes)
    } catch (err) {
        res.json({ message: err })
    }
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`listening on port ${port}`))
