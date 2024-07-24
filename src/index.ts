import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sequelize from './config/database';
import postRoutes from './routes/PostRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', postRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;