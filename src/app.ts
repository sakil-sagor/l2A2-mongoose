import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

// default route
app.get('/', (req: Request, res: Response) => {
  res.send('success');
});

export default app;
