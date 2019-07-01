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

      if(err) return resp.status(400).send(err);
      resp.status(200).send(products)
    })
  });

  app.get('/products/:id', (req, resp) => {

    Product.findById(req.params.id, (err, products) => {
      if (err) return resp.status(400).send(err)
      resp.status(200).send(products)
    });
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

  app.put('/products/:id', requireAdmin, (req, resp) => {
    // Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
    //     if (err) return next(err);
    //     resp.send(product);
    // });
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, products) => {
        if (err) return resp.status(500).send(err);
        return resp.send(products);
    })
  })
  // app.put("/products/:id", requireAdmin, (req, res) => {
  //   Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
  //     new: true})
  //   .then(function() {
  //     Product.findOne({ _id: req.params.id })
  //       .then(function(products) {
  //       res.send(products);
  //     });
  //   });
  // });

  app.delete('/products/:id', requireAuth, requireAdmin, (req, resp) => {
    // Product.findByIdAndRemove(req.params.id, function (err) {
    //     if (err) return next(err);
    //     resp.send('Deleted successfully!');
    // })
    Product.findByIdAndRemove(req.params.id, (err, products) => {
    if (err) return resp.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "Todo successfully deleted",
        id: products._id
    };
    return resp.status(200).send(response);
});
  })
  // app.delete("/products/:id", requireAdmin, (req, res, next) => {
  //   Product.deleteOne({ _id: req.params.id })
  //     .then(() => {
  //       return Product.find();
  //     })
  //     .then(doc => res.json(doc))
  //     .catch(next);
  // });

  return next();

};
