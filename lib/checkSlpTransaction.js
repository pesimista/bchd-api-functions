const { default: axios } = require('axios')
const { url } = require('../config')

/** @param {string} txhex  */
async function checkSlpTransaction (txhex) {
  try {
    const endpoint = `${url}/v1/CheckSlpTransaction`
    const hash = Buffer.from(txhex, 'hex').toString('base64')

    const res = await axios(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      data: { transaction: hash }
    })
    const { data } = res
    console.log(JSON.stringify(data, null, 2))

    return data
  } catch (error) {
    console.log('Error on checkSlpTransaction():', error)
  }
}

module.exports = checkSlpTransaction
