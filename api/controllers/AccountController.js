/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    //判断用户名是否存在
    isExitUsername: (req, res) => {
        let username = req.query.username;
        if (!username) return res.json(Message.errMessage('用户名不能为空'));
        Contract.isExitUsername(username, (err, result) => {
            Message.handleResult(res, err, result)
        })
    },

    //登录（用户名或地址登录）
    login: (req, res) => {
        let account = req.body.account
        let password = req.body.password;
        if (!account || !password) return res.json(Message.errMessage('用户名或密码不能为空'));

        if (Web3.utils.isAddress(account)) { //account is address

            Web3Util.unlockAccount(account, password, (err, result) => {
                if (err) return res.json(Message.errMessage('用户名或密码错误'));
                Contract.findUser(account, (err, result) => {
                    Message.handleResult(res, err, result)
                })
            })
        } else { //account is username

            Contract.findUserAddressByUsername(account, (err, address) => {
                if (err) return res.json(Message.errMessage('用户名或密码错误'));
                Web3Util.unlockAccount(address, password, (err, result) => {
                    if (err) return res.json(Message.errMessage('用户名或密码错误'));
                    Contract.findUser(address, (err, result) => {
                        Message.handleResult(res, err, result)
                    })
                })
            })

        }
    },

    /**
     * 注册账户,在以太坊生成address，用户名会写在合约中
     */
    register: (req, res) => {
        let username = req.body.username
        let password = req.body.password;
        if (!username || !password) return res.json(Message.errMessage('用户名或密码不能为空'));

        async.waterfall([
            function (callback) { //检查用户名是否存在
                Contract.isExitUsername(username, (err, result) => {
                    if (result) return res.json(Message.errMessage('用户名已存在'));
                    callback(null, result)
                })
            },
            function (result, callback) {  //创建用户 > 生成地址
                Web3.eth.personal.newAccount(password).then(address => {
                   callback(null, address)
                })
            },
            function (result, callback) {  //合约注册信息
              
            },
        ], (err, result) => {
            Message.handleResult(res, err, result)
        })


        // var myContract = new Web3.eth.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
        //     from: '0x1234567890123456789012345678901234567891', // default from address
        //     gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
        // });
        // let contractUser = Web3.eth.contract(Abi.user).at('0xFBA551eB71A12131417Ca029EEbd0950cCC9A0b6')
        // let contractUser = new Web3.eth.Contract(Abi.user, '0xFBA551eB71A12131417Ca029EEbd0950cCC9A0b6')

        // contractUser.methods.findUser('0x8fEBe8B23f0084edE1bC15608855F2659fFAfeE4').call({})
        //     .then(result => {
        //         return res.json(Message.successMessage(null, result));
        //         // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        //     });
        // let userInfo = contractUser.getUser.call('0x8fEBe8B23f0084edE1bC15608855F2659fFAfeE4') //get







    },

};

