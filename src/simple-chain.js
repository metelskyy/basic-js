const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  getLength() {
    return this.chain.split("~~").length;
  },
  addLink(value = "") {
    if (this.chain === "") {
      this.chain += `( ${value} )`;
    } else {
      this.chain += `~~( ${value} )`;
    }
    return this;
  },
  removeLink(position = "") {
    if (
      position > this.getLength() ||
      position < 1 ||
      !Number.isInteger(position)
    ) {
      this.chain = "";
      throw new Error("You can't remove incorrect link!");
    }

    this.chain = this.chain
      .split("~~")
      .filter((item, index) => index + 1 !== position)
      .join("~~");
    return this;
  },
  reverseChain() {
    this.chain = this.chain.split("~~").reverse().join("~~");
    return this;
  },
  finishChain() {
    const chain = this.chain;
    this.chain = "";
    return chain;
  },
  chain: "",
};

module.exports = {
  chainMaker,
};
