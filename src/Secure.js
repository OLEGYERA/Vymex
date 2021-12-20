import SecureLS from "secure-ls";

let password = null;

let security = new SecureLS({encodingType: 'AES', encryptionSecret: password,  isCompression: false});

try {
  security.get('vymex_session')
} catch (e){
  throw 'Err'
}

// console.log(security.get('vymex_session'))


export default security;