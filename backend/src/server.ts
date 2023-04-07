import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import configs from './configs';
import { Server } from 'socket.io';
import router from './routes';

const app: Application = express();
const port: number = configs.port || 80;
const corsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods'
  ],
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: true,
  origin: '*'
};

app.use(helmet());
app.use(morgan('common'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.listen(port, () => {
  console.log(`Backend host ${configs.backend_host}:${port}`);
  console.log(`Frontend host is ${configs.frontend_host}`);
  console.log('press CTRL+C to stop the server.');
});

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

export { app, port, io };
