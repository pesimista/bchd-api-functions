const { default: axios } = require('axios')
const { url } = require('../config')

/** @param {string[]} token_ids  */
async function getTokenMetadata (tokenIds) {
  try {
    const endpoint = `${url}/v1/GetTokenMetadata`

    const res = await axios(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      data: { token_ids: tokenIds }
    })

    console.log(JSON.stringify(res.data, null, 2))
  } catch (error) {
    console.log('Error on getTokenMetadata():', error.response.data)
  }
}

module.exports = getTokenMetadata
