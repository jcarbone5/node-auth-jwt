import express from 'express';
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'

//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

//Routes
app.get('/', (req, res) => {
    res.json({ "version": "1.0.0" });
});

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

//Export
export default app;