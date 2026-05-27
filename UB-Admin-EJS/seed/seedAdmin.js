// require('dotenv').config();
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI);

(async () => {
  const hashed = await bcrypt.hash('1234567', 10);
  await Admin.create({            
    email: 'admin@gmail.com', 
    password: hashed
  }); 
  console.log('Admin Created'); 
  process.exit();
})();