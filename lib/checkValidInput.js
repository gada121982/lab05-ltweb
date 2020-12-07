function isValidGmail(gmail) {
  const regexGmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  regexGmail.lastIndex = 0;
  return regexGmail.test(gmail);
}

/**
 * 
 * @param {string} password password must over than 8 charactor
 */
function isValidPassword(password) {

  let isValid = password.length < 8 ? false : true
  return isValid
}

/**
 * 
 * @param {string} phone 
 */
function isValidPhone(phone) {
  let phone_charactor = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let isValid = true

  if (phone.length < 8) {
    return false
  }

  for (let i = 0; i < phone.length; i++) {
    isValid = phone_charactor.includes(phone[i])
    if (!isValid) {
      return isValid
    }
  }

  return isValid
}


module.exports = {
  isValidGmail,
  isValidPassword,
  isValidPhone
}