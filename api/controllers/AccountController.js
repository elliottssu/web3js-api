/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

    /**
     * 注册账户,在以太坊生成address，用户名会写在合约中
     */
    register: (req, res) => {
        let username = req.body.username
        let password = req.body.password;
        if (!username||!password) return res.json(Message.errMessage('用户名或密码不能为空'));


        





        // Web3.eth.personal.newAccount(password).then(data => {
        //     return res.json(Message.successMessage(null, data));
        // })
    },

    /**
     * 登录，用户自定义的用户名
     */
    login: (req, res) => {
        let username = req.body.username
        let password = req.body.password;
        if (!username||!password) return res.json(Message.errMessage('用户名或密码不能为空'));

        
    },


    /**
     * 查找账户信息（登陆）
     */
    getAccount: (req, res) => {
        Web3.eth.getBalance("0x36ccF4f3A15F20c820ffff98d2a566aad3571151").then(data => {
            console.log(data)
        })
        // console.log(Web3.eth.accounts.create())
        // console.log(Web3.eth.accounts.privateKeyToAccount('0x8D71125e3c26dbB597E7a1854b38c08B31181838'))
        Web3.eth.getAccounts().then(data => {
            let accounts = data
            return res.json(Message.successMessage(null, accounts));
        })
    },
    // getAccountInfo
    

};

