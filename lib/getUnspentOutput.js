const { default: axios } = require('axios')
const { b64toHex, hextoB64 } = require('./helpers')
const { url } = require('../config')

/**
 * @param {string} txid sample: dfd17064ed34a31adfc818815edad76d231159d769138df2c7f947c2fcaad5fb
 * @param {number} index sample: 2
 */
async function getUnspentOutput (txid, index) {
  try {
    const endpoint = `${url}/v1/GetUnspentOutput`
    const hash = hextoB64(txid)

    const res = await axios(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      data: {
        hash,
        index,
        include_mempool: true,
        include_token_metadata: true
      }
    })
    const { data } = res

    data.outpoint.hash = b64toHex(data.outpoint.hash)
    data.pubkey_script = b64toHex(data.pubkey_script)

    console.log(JSON.stringify(data, null, 2))

    return data
  } catch (error) {
    console.log('Error on getUnspentOutput():', error)
  }
}

module.exports = getUnspentOutput
