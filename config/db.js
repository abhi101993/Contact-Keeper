const mongoose = require('mongoose');
const config  = require('config');

const db = config.get('mongoURI');

const connect = async () =>
{

  try {

    await mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true});

    console.log('MongoDB Connected...');
    
  } catch (error) {
    
    console.error(error);

    process.exit(1);
  }

  


}


module.exports = connect;