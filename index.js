import express from 'express';
import cors from 'cors';
import "./Utils/Config.js"; // One time only
import ConnectDB from './Utils/DB.Config.js';
import UserRouter from './Routes/User.Route.js';

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'DELETE'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
ConnectDB();

const routes = [UserRouter];
routes.forEach((route) => app.use('/api', route));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
