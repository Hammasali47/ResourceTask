import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../modules/db';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method==="GET"){
        try {
            const tasks = await prisma.task.findMany();
            res.status(200).json(tasks);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    }
    else if (req.method === 'POST') {
        const { content } = req.body;
    
        try {
          const task = await prisma.task.create({
            data: { content },
          });
          res.status(201).json(task);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
       else {
        res.status(405).json({ error: 'Method Not Allowed' });
      }
}