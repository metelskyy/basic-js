const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
const alphabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
const tabulaRecta = [
  ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
  ["BCDEFGHIJKLMNOPQRSTUVWXYZA"],
  ["CDEFGHIJKLMNOPQRSTUVWXYZAB"],
  ["DEFGHIJKLMNOPQRSTUVWXYZABC"],
  ["EFGHIJKLMNOPQRSTUVWXYZABCD"],
  ["FGHIJKLMNOPQRSTUVWXYZABCDE"],
  ["GHIJKLMNOPQRSTUVWXYZABCDEF"],
  ["HIJKLMNOPQRSTUVWXYZABCDEFG"],
  ["IJKLMNOPQRSTUVWXYZABCDEFGH"],
  ["JKLMNOPQRSTUVWXYZABCDEFGHI"],
  ["KLMNOPQRSTUVWXYZABCDEFGHIJ"],
  ["LMNOPQRSTUVWXYZABCDEFGHIJK"],
  ["MNOPQRSTUVWXYZABCDEFGHIJKL"],
  ["NOPQRSTUVWXYZABCDEFGHIJKLM"],
  ["OPQRSTUVWXYZABCDEFGHIJKLMN"],
  ["PQRSTUVWXYZABCDEFGHIJKLMNO"],
  ["QRSTUVWXYZABCDEFGHIJKLMNOP"],
  ["RSTUVWXYZABCDEFGHIJKLMNOPQ"],
  ["STUVWXYZABCDEFGHIJKLMNOPQR"],
  ["TUVWXYZABCDEFGHIJKLMNOPQRS"],
  ["UVWXYZABCDEFGHIJKLMNOPQRST"],
  ["VWXYZABCDEFGHIJKLMNOPQRSTU"],
  ["WXYZABCDEFGHIJKLMNOPQRSTUV"],
  ["XYZABCDEFGHIJKLMNOPQRSTUVW"],
  ["YZABCDEFGHIJKLMNOPQRSTUVWX"],
  ["ZABCDEFGHIJKLMNOPQRSTUVWXY"],
];
const startPositionCharCode = 65;
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this._reverseFlag = !isDirect;
  }
  encrypt(message, key) {
    if (message === undefined || key === undefined)
      throw new Error("Incorrect arguments!");
    const tabulaRectaSplit = tabulaRecta.map((item) => {
      return item.join("").split("");
    });
    const keyUC = key.toUpperCase();
    const keyUCDried = keyUC.replace(/\s/g, "");
    const messageUC = message.toUpperCase();
    const messageUCDried = messageUC.trim();
    const res = [];
    const keyLength = keyUCDried.length;
    const msgLength = messageUCDried.length;

    for (let i = 0, n = 0; i < msgLength; i++, n++) {
      let messageChar = messageUCDried[i];
      if (!~alphabet.indexOf(messageChar)) {
        res.push(messageChar);
        n--;
        continue;
      }
      const messageCharCode = messageChar.charCodeAt(0);
      const rowIndex =
        keyUCDried.charCodeAt(n % keyLength) - startPositionCharCode;
      const charIndex = messageCharCode - startPositionCharCode;
      res.push(tabulaRectaSplit[rowIndex][charIndex]);
    }
    if (this._reverseFlag === true) return res.reverse().join("");
    return res.join("");
  }
  decrypt(encryptedMessage, key) {
    if (encryptedMessage === undefined || key === undefined)
      throw new Error("Incorrect arguments!");
    const tabulaRectaSplit = tabulaRecta.map((item) => {
      return item.join("").split("");
    });
    const keyUC = key.toUpperCase();
    const keyUCDried = keyUC.replace(/\s/g, "");
    const encryptedMessageUC = encryptedMessage.toUpperCase();
    const encryptedMessageUCDried = encryptedMessageUC.trim();
    const keyLength = keyUCDried.length;
    const msgLength = encryptedMessageUCDried.length;
    const res = [];

    for (let i = 0, n = 0; i < msgLength; i++, n++) {
      let encryptedMessageChar = encryptedMessageUCDried[i];
      const rowIndex =
        keyUCDried.charCodeAt(n % keyLength) - startPositionCharCode;
      const row = tabulaRectaSplit[rowIndex];
      if (!~alphabet.indexOf(encryptedMessageChar)) {
        res.push(encryptedMessageChar);
        n--;
        continue;
      }

      const targetIndex = row.indexOf(encryptedMessageChar);
      const unshiftedRow = tabulaRectaSplit[0];
      const trueChar = unshiftedRow[targetIndex];
      res.push(trueChar);
    }
    if (this._reverseFlag === true) return res.reverse().join("");
    return res.join("");
  }
}

module.exports = {
  VigenereCipheringMachine,
};
