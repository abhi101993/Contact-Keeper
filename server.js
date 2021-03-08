const express = require('express');
const db  = require('./config/db');

const app = express();

db();

app.use(express.json({extended:false}));

app.get('/',(req,res)=>res.json({msg:'Welcome to the ContactKeeper API...'}));

//Define Routesclear
app.use('/api/users',require('./routes/users'));
app.use('/api/contacts',require('./routes/contacts'));
app.use('/api/auth',require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));