import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import customerRouter from './routes/customerRouter.js';
import invoiceRouter from './routes/invoiceRouter.js';
import itemRouter from './routes/itemRouter.js';

const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, (req,res) => {
    console.log(`Server running on port ${PORT}`);
});

app.use('/api',customerRouter); 
app.use('/api',invoiceRouter);
app.use('/api',itemRouter);




