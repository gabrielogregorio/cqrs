import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createUserCommand } from './commands/createUserCommand';
import { getUserQuery } from './queries/getUserQuery';
import { userCreatedEvent } from './events/userCreatedEvent';
import dataSource from './datasource';
import { EmailAlreadyExists } from './errors/emailAlreadyExists';
import { validateSchema } from './middlewares/validateSchema';
import { userSchema } from './schemas/user';
import { UserEvents } from './entity/userEvents.entity';
import { UserListService } from './query/usersList';
import { env } from './envs';

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);

mongoose
  .connect(env.READ_DB_URL_CONNECT, {})
  .then(() => {
    console.log('mongo ok ✅');
  })
  .catch((error) => {
    console.log(error);
  });

app.post('/user', validateSchema(userSchema), async (req: Request, res: Response) => {
  const user = req.body;

  createUserCommand(user)
    .then(() => {
      res.status(201).send('User created');
      userCreatedEvent(user);
    })
    .catch((error: unknown) => {
      if (error instanceof EmailAlreadyExists) {
        res.status(409).send({
          error: 'Conflict',
          message: 'The email address is already registered.',
        });
        return;
      }
      console.log(error);
      res.status(500).send('Failed to create user');
    });
});

app.get('/sync', async (req, res) => {
  const events = dataSource.getRepository(UserEvents);
  const eventsItems = await events.find();

  await eventsItems.forEach(async (item) => {
    if (item.Synchronized) {
      return;
    }

    const { name, email } = JSON.parse(item.Payload);

    UserListService.Create({ name, email, id: item.UserId });

    await events.update(item.EventId, { Synchronized: true });
  });

  res.send('sincronizando...');
});

app.get('/users', async (req: Request, res: Response) => {
  const users = await getUserQuery();

  res.status(200).json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
