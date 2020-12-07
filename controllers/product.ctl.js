const Product = require('../model/product.model')

const addProduct = async (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'})        
  let chunkData = ''
  let body = {}

  req.on('error', (err)=> {
    console.log(err)

  }).on('data', (chunk) => {
    
    chunkData += chunk.toString()
  }).on('end', async () => {
    
    console.log('chunkData', chunkData)
    body = JSON.parse(chunkData)
 
    const {
      name,
      price,
      count,
      active,
      voucherId,
      describe,
      categoryId,
      discount,
      imageUrl
    } = body
    
    const currentPrice = discount ? price - (price * discount) / 100 : price

    const product = Object.assign({}, {
      name, price, count, active, imageUrl, voucherId, describe, categoryId, discount, currentPrice
    })

    const productSchema = new Product(product)

    try {
      const resSaveProduct = await productSchema.save()
      if (resSaveProduct) {
        
        res.write(JSON.stringify({status: true}))
        res.end()
      } else {
        res.write(JSON.stringify({status: false}))
        res.end()
      }
    } catch (error) {
      console.log('An error occur when save product', error)
      res.write(JSON.stringify({status: false}))
      res.end()
    }
  })
}


const updateProduct = async (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'})        
  let chunkData = ''
  let body = {}

  req.on('error', (err)=> {
    console.log(err)

  }).on('data', (chunk) => {
    
    chunkData += chunk.toString()
  }).on('end', async () => {
    body = JSON.parse(chunkData)

    console.log('this is body', body)
    let id = body.id
    delete body.id

    const productNeedUpdate = Object.assign({}, body)
    console.log(productNeedUpdate)

    try {
      const updateStatus = await Product.findOneAndUpdate({ _id: id }, productNeedUpdate)

      if (updateStatus) {
        console.log('updateStatus', updateStatus)
        res.write(JSON.stringify({status: true, message: 'update product success'}))
        res.end()
      }

    } catch (e) {
      console.log(e)
      res.write(JSON.stringify({status: false, message: 'update product fail'}))
      res.end()
    }
  })
}

const deleteProduct = async (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'})        
  let chunkData = ''
  let body = {}

  req.on('error', (err)=> {
    console.log(err)

  }).on('data', (chunk) => {
    
    chunkData += chunk.toString()
  }).on('end', async () => {
    body = JSON.parse(chunkData)
  
    // Typeof idproduct = array
    const { idproducts } = body
    
    try {
      await Product.deleteMany({ _id: { $in: idproducts } })
      res.write(JSON.stringify({ status: true }))
      res.end()
    } catch (e) {
      res.send(JSON.stringify({ status: false, message: ['Error when delete product'] }))
      res.end()
    }
  })
}

const getAllProduct = async (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'})        

  try {
    const products = await Product.find()
    res.write(JSON.stringify({status: true, products}))
    res.end()
  } catch (e) {
    res.send(JSON.stringify({status: false}))
    res.end()
  }
}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
}