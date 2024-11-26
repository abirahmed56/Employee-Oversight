import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js'
import connectToDatabase from './db/db.js';
import morgan from 'morgan';
import path from 'path';

connectToDatabase();

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public', 'uploads')));

app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter)

const notFound = (req, res, next) => {
  res.status(404).json({ error: 'Invalid API route' });
};
app.use(notFound);

const errorHandler = (err, req, res, next) => {
  console.error('Error: ', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ error: message });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
