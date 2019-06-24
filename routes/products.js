const Product  = require('../models/Product');
const {
  requireAuth,
  requireAdmin,
  isAuthenticated,
  isAdmin
} = require('../middleware/auth');


module.exports = (app, next) => {
  app.get('/products', (req, resp) => {

    Product.find({}, (err, products)=> {
      console.log("hola")
      if(err) return resp.status(400).send(err):
      resp.status(200).send(products)
    })
  });


  app.post('/products', requireAdmin, (req, resp) => {
    const product = new Product(req.body)

    product.save((err, doc) => {
      if(err) return resp.json({success: false, err})
        resp.status(200).json({
        success: true,
        product: doc
      })
    })

  });

  return next();

};
