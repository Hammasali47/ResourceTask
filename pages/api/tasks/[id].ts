import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../modules/db';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const taskId = req.query.id as string;
    if(req.method==="GET"){
  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
    }
    if (req.method === 'PUT') {
        const { content } = req.body;
    
        try {
          const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: { content },
          });
    
          res.status(200).json(updatedTask);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      if (req.method === 'DELETE') {
        try {
          const deletedTask = await prisma.task.delete({
            where: { id: taskId },
          });
    
          res.status(200).json(deletedTask);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
       else {
        res.status(405).json({ error: 'Method Not Allowed' });
      }
}