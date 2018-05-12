const web3Util = require('./Web3Util.js')

class Contract {

    constructor() {
    }

    //user 合约

    /**
     * 判断用户名是否存在
     */

    static isExitUsername(username, cb) {
        web3Util.contractUser.methods.isExitUsername(username).call()
            .then(result => {
                cb(null, result)
            })
            .catch(err => {
                cb(err.message)
            });
    }

    /**
     * 根据用户名查找对于的地址
     */
    static findUserAddressByUsername(username, cb) {
        web3Util.contractUser.methods.findUserAddressByUsername(username).call()
            .then(result => {
                cb(null, result)
            })
            .catch(err => {
                cb(err.message)
            });
    }

    /**
     * 查找用户信息
     */
    static findUser(userAddress, cb) {
        web3Util.contractUser.methods.findUser(userAddress).call()
            .then(result => {
                cb(null, result)
            })
            .catch(err => {
                cb(err.message)
            });
    }

    /**
     * 创建用户信息 (发送合约需要先解锁)
     */
    static createUser(userAddress, username, cb) {
        let options = {
            from: Web3Util.ACCOUNT_ADDRESS_MAIN, //创建账户用主账号
        }
        web3Util.contractUser.methods.createUser(userAddress, username).send(options)
            .then(result => {
                cb(null, result)
            })
            .catch(err => {
                cb(err.message)
            });
    }

}
module.exports = Contract;


