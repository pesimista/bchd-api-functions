const jspb = require('google-protobuf') // used for encoding and decoding the txids

function b64toHex (value, reverse = true) {
  let bytes = jspb.Message.bytesAsU8(value)
  if (reverse) {
    bytes = bytes.reverse()
  }
  return Buffer.from(bytes).toString('hex')
}

function formatSLP (token) {
  token.token_id = b64toHex(token.token_id)

  const { type1 } = token
  if (token.token_type === 1 && type1.token_name) {
    type1.token_name = Buffer.from(type1.token_name, 'base64').toString()
  }

  if (token.token_type === 1 && type1.token_ticker) {
    type1.token_ticker = Buffer.from(type1.token_ticker, 'base64').toString()
  }

  if (token.token_type === 1 && type1.token_document_url) {
    type1.token_document_url = Buffer.from(type1.token_document_url, 'base64').toString()
  }

  if (token.token_type === 1 && type1.mint_baton_txid) {
    type1.mint_baton_txid = b64toHex(type1.mint_baton_txid)
  }

  return token
}

function formatUTXO (utxo) {
  if (utxo.pubkey_script) {
    utxo.pubkey_script = b64toHex(utxo.pubkey_script)
  }
  if (utxo.slp_token) {
    utxo.slp_token.token_id = b64toHex(utxo.slp_token.token_id)
  }
  if (utxo.outpoint) {
    utxo.outpoint.hash = b64toHex(utxo.outpoint.hash)
  }
  if (utxo.signature_script) {
    utxo.signature_script = b64toHex(utxo.signature_script)
  }
  if (utxo.previous_script) {
    utxo.previous_script = b64toHex(utxo.previous_script)
  }
  return utxo
}

function hextoB64 (hex) {
  const value = new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))
  return jspb.Message.bytesAsB64(value.reverse())
}

module.exports = {
  b64toHex,
  formatSLP,
  formatUTXO,
  hextoB64
}
