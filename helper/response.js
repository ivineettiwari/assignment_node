var CryptoJS = require("crypto-js");

function decryptData(data) {
    var bytes = CryptoJS.AES.decrypt(data, 'dfxgchfsdghsegrdh');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}

function encryptData(plaintext) {
    var ciphertext = CryptoJS.AES.encrypt(plaintext, 'dfxgchfsdghsegrdh');
    return ciphertext;
}

module.exports = {
    decryptData: decryptData,
    encryptData:encryptData
}