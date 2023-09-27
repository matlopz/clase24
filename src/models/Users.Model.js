const mongoose = require('mongoose')

const userCollection = 'usuario'

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  age:Number,
  
  password: String,
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
  role:{Stringdefault:'user'},
})

const Usuarios = mongoose.model(userCollection, userSchema)

module.exports = Usuarios