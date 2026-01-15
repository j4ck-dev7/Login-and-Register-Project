import dotenv from 'dotenv'
import app from './src/app.js'

dotenv.config();

import { connect } from './src/config/db.js'

const PORT = process.env.PORT;

app.listen(PORT, () => { 
    connect(); 
    console.log(`Server is running on port ${PORT}`);
});