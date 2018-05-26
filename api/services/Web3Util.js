const web3 = require('./Web3.js')
const abi = require('./Abi.js')

class Web3Util {

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
Web3Util.ACCOUNT_ADDRESS_MAIN = '0x8fEBe8B23f0084edE1bC15608855F2659fFAfeE4'; //主账号地址
Web3Util.ACCOUNT__PASSWORD_MAIN = '123456'; //主账号密码
Web3Util.CONTRACT_ADDRESS_USER = '0xbCc996D198F366b1792F2A0d5685DfbFa736BFDF'; //user合约地址


//contract
Web3Util.contractUser = new web3.eth.Contract(abi.user, Web3Util.CONTRACT_ADDRESS_USER)





module.exports = Web3Util;