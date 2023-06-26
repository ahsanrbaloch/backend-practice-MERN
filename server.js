const express=require('express');
const app=express();
const path = require('path');
const {logger}=require('./middleware/logEvents');
const errorHandler=require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;
const cors=require('cors');
const corsOptions=require('./config/corsOptions')

//custom middleware logger
app.use(logger);

//cross origin resource sharing
app.use(cors());

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//serve static files
app.use('/',express.static(path.join(__dirname,'/public')));    

//routes
app.use('/', require('./routes/root'));
app.use('/employees',require('./routes/api/employees'));


app.all('*', (req,res)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));