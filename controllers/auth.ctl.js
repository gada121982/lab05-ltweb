const User  = require('../model/user.model')
const { isValidGmail, isValidPassword} = require('../lib/checkValidInput')
const jwt = require('jsonwebtoken')


const SECRET_KEY = 'se-doc-file-env-tuy-nhien-de-don-gian-thoi-nhe-thay'

/**
 * @param {Array} result 
 */

const login = (req, res) => {

  let chunkData = ''
  let body = {}
  responseData = { status: false, message: 'invalid input'}
  
  res.writeHead(200, {'Content-Type': 'application/json'})        

  req.on('error', (err)=> {
    console.log(err)

  }).on('data', (chunk) => {
    
    chunkData += chunk.toString()
  }).on('end', async () => {
      
    body = JSON.parse(chunkData)
    const { username, password } = body   
    
    if (isValidGmail(username) === false || isValidPassword(password) === false) {
      res.write(JSON.stringify(responseData))
      res.end()
      return
    }
          
    let result = await User.find({ gmail: username })

    if (result.length === 0) {
      res.write(JSON.stringify(responseData))
      res.end()
      return
    }
        
    let { _id, password: password_result } = result[0]
    let isValidAccount = password === password_result ? true : false

    if (!isValidAccount) {
      res.write(JSON.stringify(responseData))
      res.end()
      return
    }

    const token = jwt.sign({ userid: _id }, SECRET_KEY)
    console.log(token)
    res.write(JSON.stringify({
      status: true,
      token
    }))
    res.end()
  })
}

module.exports = {
  login,
}