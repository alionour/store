import express, { Request, Response } from 'express';
import morgan from 'morgan';
import router from './routes';
const app: express.Application = express();
const address: string = '0.0.0.0:3000';


// Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// for logging
app.use(morgan('short'));

app.use(router);
app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
