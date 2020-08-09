import { Request, Response, NextFunction } from 'express';

const requireKey = (req: Request, res: Response, next: NextFunction) => {
    if (req.header('apiKey') != process.env.API_KEY) {
        res.json({ error: 'you do not have authorization to use this api' });
        return;
    } else {
       next(); 
    }
}

export default requireKey;