const app = require('./app'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv');


dotenv.config();

// Establishing connection with database and test if connection is successful.
mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, 
    () => console.log('Connected to mongodb'));


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running at port ${port}`));
