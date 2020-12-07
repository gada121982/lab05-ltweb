const { login } = require('../controllers/auth.ctl')
const { addProduct, getAllProduct, deleteProduct, updateProduct } = require('../controllers/product.ctl')
function mainRoute(req, res, uri){

  console.log(uri)
  if(uri === '/auth/login') {
    login(req, res)
    return
  }

  if(uri === '/product/add' && req.method === 'POST') {
    addProduct(req, res)
    return
  }

  if(uri === '/product/delete') {
    deleteProduct(req, res)
    return
  }

  if(uri === '/product' && req.method === 'PUT') {
    updateProduct(req, res)
    return
  }

  if(uri === '/product/all' && req.method === 'GET') {
    getAllProduct(req, res)
    return
  }

  res.writeHead(404, {'Content-Type': 'application/json'})        
  res.write(JSON.stringify({status: false, message: 'Nothing route matching'}))
  res.end()
}

module.exports = {
  mainRoute
}

