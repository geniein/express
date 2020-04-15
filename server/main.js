import express from 'express';
import path from 'path';
import morgan from 'morgan'; //HTTP REQUEST LOGGER
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
/*setup routers & static directory */
import api from './routes';

const app = express();
const port = 3000;
const db = mongoose.connection;

app.use('/', express.static(path.join(__dirname, './../public')));
app.get('/hello', (req, res) => {
    return res.send('Hello GenieLab');    
});
app.listen(port, () => {
    console.log('Express is listening on port', port);
});

app.use(morgan('dev'));
app.use(bodyParser.json());

db.on('error', console.error);
db.once('open', () => {console.log('Connection to mongodb server'); });
mongoose.connect('mongodb://genielab:genielab@localhost:17017/genielab');

/*use session */
app.use(session({
    secret : 'GenieLab1234',
    reave : false,
    saveUninitalized: true    
}));

app.use('/api',api);

/* handle error */
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('SOMETHINg BROKEN!');
});