import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './src/routes/index.js';
import addDefaultCharacters from './src/functions/addDefaultCharacters.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', router)

const start = async () => {
    try {
        
        app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
        await mongoose.connect(process.env.MONGODB_URI);

    } 

    catch (error) {

        console.log(error);

    }
};

start();