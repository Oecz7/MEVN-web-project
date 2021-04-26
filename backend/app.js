import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
//access to the actual directory
import path from 'path';

const app = express();

//database connection
import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://user_udla:udla2021@petshop.sdd7l.mongodb.net/projectdb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// const uri = 'mongodb://localhost:27017/projectdb';
// const options = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// }

// mongoose.connect(uri, options).then(
//     () => {console.log('Connected to MongoDB'); },
//     err => { err }
// );

const db = mongoose.connection;

if(!db){
    console.log('Error connenctig MongoDB');
}else{
    console.log('Mongo Db connection successfuly');
};
//Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
/*
app.get('/', (req, res)=>{
    res.send('My app');
});
*/
app.use('/api', require('./routes/index'));
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/stock'));
app.use('/api/login', require('./routes/login'));

///Middleware for Vuejs router history mode
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

//Automatic Ports asignation
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => {
    console.log('Listening to port'+ ' ' + app.get('port'));
});


