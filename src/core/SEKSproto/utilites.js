import * as encUtils from 'enc-utils';
import {bufferToArray, hexToArray, utf8ToArray, concatArrays, arrayToBuffer, arrayToHex, numberToArray, arrayToUtf8, arrayToNumber, getType} from 'enc-utils';

import * as ecies25519 from "ecies-25519";
import CryptoJS from 'crypto-js';
import * as ed25519 from 'noble-ed25519';


function getListSize(data) {
  let count = arrayLenBytesToIntLen(encUtils.trimLeft(data, 1)),
    listSize = [];

  for (let i = count; i >= 1; --i) {
    let leftPart = encUtils.trimLeft(data, 4 * i + 1);
    let clearSizeBytes = encUtils.trimRight(leftPart, 4);
    listSize.push(arrayLenBytesToIntLen(clearSizeBytes))
  }

  return listSize;
}
/**
 * Преобразование данных в Uint8Array.
 *
 * @param el
 * @returns {Uint8Array|*}
 */
function prepareType(el){
  switch (encUtils.getType(el)){
    case "typed-array":
      return el;
    case "number":
      return encUtils.numberToArray(el);
    case "string":
      return utf8ToArray(el);
    case "buffer":
      return bufferToArray(el);
    case "object":
      return this.objectToArray(el);
    default:
      throw new Error('Unsupported data type \n' + el);
  }
}

function arrayLenBytesToIntLen(arr){
  return arrayToNumber(arr);
}

/**
 *
 * @param data
 * @returns {*}
 */
function prepareData(data){
  for (let i = 0; i < data.length; i++){
    data[i] = prepareType(data[i])
  }

  return data;
}

/**
 * Собрать данные в кучу.
 *
 * @param data
 * @returns {Uint8Array}
 */


/**
 * Собрать данные в кучу.
 *
 * @param data
 * @returns {Uint8Array}
 */
function serialize (...data) {
  if(data.length > 255) throw new Error('The number of elements is greater than 255 \n');

  data = prepareData(data);
  let lengths = [];

  data.forEach(arg => (lengths = lengths.concat(Array.from(padLeft(arg.length)))));
  return concatUint8Arrays(...data, lengths, [data.length]);
}

function concatUint8Arrays(...args){
  let length = 0;
  args.forEach(arg => (length+=arg.length));
  let result = new Uint8Array(length);

  let count = 0;
  args.forEach(arg => {
    result.set(arg, count);
    count+=arg.length;
  });

  return result;
}


/**
 * Распарсить данные.
 *
 * @param data
 * @returns {}
 */
function getPackage(data) {
  let pac = deserialize(data);

  return {
    component: encUtils.arrayToUtf8(pac[0]),
    method: encUtils.arrayToUtf8(pac[1]),
    data: pac.slice(2),
  }
}

/**
 * Распарсить данные.
 *
 * @param data
 * @returns {[]}
 */
function deserialize(data) {
  let listSize = getListSize(data);
  let shuffle = 0;
  let result = [];

  for(let t = 0; t < listSize.length; t++){
    let item = encUtils.trimRight(data, listSize[t] + shuffle);
    result.push(encUtils.trimLeft(item, listSize[t]));
    shuffle += listSize[t];
  }

  return result;
}

/**
 * Проверить подпись пакета.
 *
 * @param socket
 * @param IV128
 * @param mac
 * @param cipher
 *
 * @returns {[]}
 */
async function checkHMACVerify(MAC256Key, IV128, mac, cipher) {
  const macData = concatArrays(
    bufferToArray(IV128),
    bufferToArray(cipher)
  );

  return  await ecies25519.hmacSha256Verify(
    MAC256Key,
    macData,
    bufferToArray(mac)
  );
}


  async function generateCipherData(storage, data){
    let IV128 = ecies25519.randomBytes(16);
    let cipher = await ecies25519.aesCbcEncrypt(IV128, storage.AES256Key, data);
    let macData = concatArrays(IV128, cipher);
    let mac = await ecies25519.hmacSha256Sign(storage.MAC256Key, macData);

    return Array(IV128, mac, cipher)
  }

/**
 * Зашифровать данные.
 *
 * @param storage
 * @param component
 * @param method
 * @param data
 *
 * @returns Buffer
 */
async function encrypt(storage, component, method, data = null) {
  let fullPack;
  console.log('in Encrypt')
  if(data){
    let cipherData = await generateCipherData(storage, data)
    console.log('after cipher')
    fullPack = serialize(component, method, ...cipherData);
  }else{
    fullPack = serialize(component, method);
  }

  return arrayToBuffer(fullPack)
}

async function encryptFile(storage, component, method, data, addData) {
  let fullPack, cipherData = await generateCipherData(storage, data)

  if(addData){
    fullPack = serialize(component, method, ...cipherData, addData);
  }else{
    fullPack = serialize(component, method, ...cipherData);
  }

  return arrayToBuffer(fullPack)
}

/**
 * Расшифровать данные.
 *
 * @param IV128
 * @param AES256Key
 * @param cipher
 *
 * @returns Uint8Array
 */
async function decrypt(IV128, AES256Key, cipher) {
  return  await ecies25519.aesCbcDecrypt(IV128, AES256Key, cipher);
}

/**
 *
 * @param u8Array
 * @returns {{words: *[], sigBytes: number}}
 */
function arrayToWordArray(u8Array) {
  var words = [], i = 0, len = u8Array.length;

  while (i < len) {
    words.push(
      (u8Array[i++] << 24) |
      (u8Array[i++] << 16) |
      (u8Array[i++] << 8)  |
      (u8Array[i++])
    );
  }

  return {
    sigBytes: words.length * 4,
    words: words
  };
}

function padLeft(number, length = 4) {
  return padString(number, length, true);
}

function padRight(number, length = 4) {
  return padString(number, length, false);
}

function padString(number, length, left, padding = 0) {
  let arr = Array.from(encUtils.numberToArray(number));
  const diff = length - arr.length;
  if (diff > 0) {
    for(let i = 0; i < diff; i ++){
      left ? arr.unshift(padding) : arr.push(padding);
    }
  }

  return arr;
}

/**
 * Объект в Utf8Array.
 *
 * @param data
 * @returns {}
 */
function objectToArray(data) {
  data = JSON.stringify(data)

  return utf8ToArray(data)
}

/**
 * Utf8Array в объект.
 *
 * @param data
 */
function arrayToObject(data) {
  let presumablyJson = arrayToUtf8(data);
  return (presumablyJson && (presumablyJson = isCorrectJsonString(presumablyJson))) ? presumablyJson : arrayToUtf8(data);
}

function isCorrectJsonString(presumablyJsonString){
  try{
    return JSON.parse(presumablyJsonString)
  } catch (e){
    return false;
  }
}


export {
  encUtils, //bufferToArray, hexToArray, utf8ToArray, concatArrays, arrayToHex, arrayToUtf8, arrayToNumber
  bufferToArray,
  hexToArray,
  utf8ToArray,
  arrayToHex,
  numberToArray,
  concatArrays,
  concatUint8Arrays,
  arrayToUtf8,
  arrayToNumber,

  ecies25519,
  CryptoJS,
  ed25519,
  serialize,
  getPackage,
  deserialize,
  checkHMACVerify,
  encrypt,
  encryptFile,
  decrypt,
  arrayToWordArray,
  padLeft,
  padRight,
  padString,
  objectToArray,
  arrayToObject,
  getType
}