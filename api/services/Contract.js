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

}
module.exports = Contract;


