const web3 = require('./Web3.js')
const abi = require('./Abi.js')

class Web3Util {
    // 

    /**
     * 解锁账户
     * @param account 账户名
     * @param password 密码
     */
    static unlockAccount(account, password, cb) {
        Web3.eth.personal.unlockAccount(account, password, 600)
            .then(result => {
                cb(null, result)
            })
            .catch(err => {
                cb(err.message)
            });
    }

}

//address
Web3Util.ACCOUNT__ADDRESS_MAIN = '0x8fEBe8B23f0084edE1bC15608855F2659fFAfeE4'; //主账号地址
Web3Util.CONTRACT_ADDRESS_USER = '0xD8094b90EE931D9d681DA367D7137ebBd5033f6F'; //user合约地址


//contract
Web3Util.contractUser = new web3.eth.Contract(abi.user, Web3Util.CONTRACT_ADDRESS_USER)





module.exports = Web3Util;