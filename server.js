const express = require('express');
const db  = require('./config/db');
const path = require('path');

const app = express();

db();

app.use(express.json({extended:false}));


//Define Routesclear
app.use('/api/users',require('./routes/users'));
app.use('/api/contacts',require('./routes/contacts'));
app.use('/api/auth',require('./routes/auth'));

if(process.env.NODE_ENV=== 'production')
{
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'cliend','build','index.html')));
}
const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));