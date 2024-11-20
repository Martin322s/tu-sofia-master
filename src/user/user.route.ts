import express, { Request, Response } from 'express';
import { db } from '../database';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, universityId, subjects } = req.body;
    const university = await db.models.University.findByPk(universityId); 

    if (!university) {
      res.status(404).json({ error: 'University not found' });
      return;
    }

    if (await db.models.User.findOne({ where: { email } })) {
      throw new Error("User already exists.")
    }
    
    const user = await db.models.User.create({ name, email, universityId });

    if (subjects && Array.isArray(subjects)) {
      const validSubjects = await db.models.Subject.findAll({
        where: { id: subjects },
      });
      await user.setSubjects(validSubjects);
    }

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/subjects', async (req: Request, res: Response) => {
  try {
    const { userId, subjects } = req.body;

    const user = await db.models.User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const validSubjects = await db.models.Subject.findAll({
      where: { id: subjects },
    });

    if (validSubjects.length === 0) {
      res.status(400).json({ error: 'No valid subjects provided.' });
      return;
    }

    const subjectIds = validSubjects.map((subject) => subject.id);

    await user.addSubject(subjectIds as any);

    res.status(200).json({ message: 'Subjects added successfully.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await db.models.User.findAll({
      include: [
      {
        model: db.models.University,
        as: 'university'
      },
      {
        model: db.models.Subject,
        as: 'subjects',
        through: { attributes: [] }
      },
    ]
    });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;