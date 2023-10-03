const express = require('express');
const io = require('../io');
const Products = require('../models/products.models');
const HTTP_STATUS_CODE = require('../constants/error.constants');
const productsService = require('../services/productsService')
const cartsService = require('../services/cartsService')
const mongoose = require('mongoose');
const passport = require('passport');
const Usuarios = require('../models/Users.Model');
//const { authToken } = require('../utils/jwt');
const passportCall = require('../utils/passport.call');
const { authToken } = require('../utils/jwt');
const User = require('../models/user');
const router = express.Router();

router.get('/productos', authToken, async (req, res) => {
  try {
    
    const cookie = req.headers.authorization
    console.log('tiene user: ',cookie)
    const email = req.user
    if (email) {
      
  

     
      const user = await Usuarios.findOne({email});
      console.log('tiene user: ',user)
      if (!user) {
        console.error('Usuario no encontrado');
        return res.status(404).json({ status: 'Error', error: 'Usuario no encontrado' });
      }
      const usuario = {
        name: user.name,
        id: user.id

      };
      const cartId = user.cart[0].product.toString({});
      console.log('que tiene cartId: ', cartId)
      //const cartId = user.cart.find(id);

      if (!cartId) {
        console.error('El usuario no tiene un carrito válido');
        return res.status(400).json({ status: 'Error', error: 'Usuario sin carrito' });
      }

     
      const products = await productsService.getAllProducts({});

      res.render('products',  cartId, products, usuario );
    } else {
      res.status(401).json({ status: 'Error', error: 'No autorizado' });
    }
  } catch (err) {
    console.error('GET Products - Error:', err);
    res.status(401).json({ error: 'No autorizado' });
  }
});




/*router.get('/carritos/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    console.log(cid);
    const cart = await cartsService.getCartProducts(cid);
    console.log({ cart });
    if (cart) {
      res.render('carts', { cart });
      console.log('que tiene res: ', cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (err) {
    console.error('GET carts - Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/
router.get('/carritos/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartsService.getCartProducts(cid);
    cartRender = cart.products
    if (cart) {
      res.render('carts', { cartRender });
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (err) {
    console.error('GET carts - Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/logout', async(req,res)=>{
  res.clearCookie('connect.sid')
  console.log('desologuear al cliente: ',res.clearCookie('cookieDelProyecto'))
  res.redirect('/auth/login');

})

module.exports = router;
