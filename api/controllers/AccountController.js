/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

    /**
     * 创建账户
     */
    createAccount: (req, res) => {
        let password = req.body.password;
        if (!password) return res.json(Message.errMessage('密码不能为空'));

        Web3.eth.personal.newAccount(password).then(data => {
            return res.json(Message.successMessage(null, data));
        })
    },

    /**
     * 查找账户信息（登陆）
     */
    getAccount: (req, res) => {
        // Web3.eth.getBalance("0x8D71125e3c26dbB597E7a1854b38c08B31181838").then(data => {
        //     console.log(data)
        // })
        // console.log(Web3.eth.accounts.create())
        console.log(Web3.eth.accounts.privateKeyToAccount('0x8D71125e3c26dbB597E7a1854b38c08B31181838'))
        Web3.eth.getAccounts().then(data => {
            let accounts = data
            return res.json(Message.successMessage(null, accounts));
        })
    },
    // getAccountInfo
    

};

