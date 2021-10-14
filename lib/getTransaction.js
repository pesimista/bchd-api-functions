const { default: axios } = require('axios')
const { formatSLP, formatUTXO, hextoB64, b64toHex } = require('./helpers')
const { url } = require('../config')

/**
 * @param {string} txid sample: dfd17064ed34a31adfc818815edad76d231159d769138df2c7f947c2fcaad5fb
 */
async function getTransaction (txid) {
  try {
    const endpoint = `${url}/v1/GetTransaction`
    const hash = hextoB64(txid)

    const res = await axios(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      data: {
        hash,
        include_token_metadata: true
      }
    })
    const { data } = res
    const { transaction } = data

    transaction.hash = b64toHex(transaction.hash)
    transaction.inputs = transaction.inputs.map(item => formatUTXO(item))
    transaction.outputs = transaction.outputs.map(item => formatUTXO(item))
    transaction.slp_transaction_info = formatSLP(transaction.slp_transaction_info)
    transaction.block_hash = b64toHex(transaction.block_hash)

    console.log(JSON.stringify(transaction, null, 2))

    return transaction
  } catch (error) {
    console.log('Error on getTransaction():', error)
  }
}

module.exports = getTransaction
