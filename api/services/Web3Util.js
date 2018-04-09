const web3 = require('./Web3.js')
const abi = require('./Abi.js')

class Web3Util {

}

//address
Web3Util.ACCOUNT__ADDRESS_MAIN = '0x8fEBe8B23f0084edE1bC15608855F2659fFAfeE4'; //主账号地址
Web3Util.CONTRACT_ADDRESS_USER = '0xFBA551eB71A12131417Ca029EEbd0950cCC9A0b6'; //user合约地址


//contract
Web3Util.contractUser = new web3.eth.Contract(abi.user, Web3Util.CONTRACT_ADDRESS_USER)





module.exports = Web3Util;