const { default: axios } = require('axios')
const { formatSLP, formatUTXO } = require('./helpers')
const { url } = require('../config')

/** @param {string} address  */
async function getAddressUnspentOutputs (address) {
  try {
    const endpoint = `${url}/v1/GetAddressUnspentOutputs`

    const res = await axios(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      data: {
        address,
        include_mempool: true,
        include_token_metadata: true
      }
    })
    const { data } = res

    data.outputs = data.outputs.map(item => formatUTXO(item))
    data.token_metadata = data.token_metadata.map(item => formatSLP(item))

    console.log(JSON.stringify(data, null, 2))

    return data
  } catch (error) {
    console.log('Error on getAddressUnspentOutputs():', error)
  }
}

module.exports = getAddressUnspentOutputs
