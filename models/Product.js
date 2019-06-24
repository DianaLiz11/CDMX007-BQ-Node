const mongoose = require('mongoose');



const ProductSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true,
    unique: 1
  },
  price:{
    type: Number,
    require: true
  },
  typeMenu:{
    type: String,
    require: true
  }
});



module.exports = mongoose.model('Product', ProductSchema, 'products');
