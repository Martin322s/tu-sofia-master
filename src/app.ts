import express from 'express';
import userRouter from './user/user.route';
import universityRouter from './university/university.route';
import subjectRouter from './subjects/subject.route'
import { db } from './database';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/user', userRouter);
app.use('/university', universityRouter);
app.use('/subject', subjectRouter);


app.listen(PORT, async () => {
  /** Drops database on each restart. Disable if you want to keep the data */
  await db.sequelize.sync({ force: true })
  console.log(`Server is running on http://localhost:${PORT}`);
});