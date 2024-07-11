  const mongoose = require('mongoose');

  // Define the connection string (URI)
  const uri = 'mongodb://127.0.0.1:27017/mydatabase';
  
  // Connect to the MongoDB database
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
  });
  
