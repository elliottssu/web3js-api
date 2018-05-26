# web3js-api
use web3.js by sails to build simple ethereum api

#### 项目配套文章地址

[http://ht.askingdata.com/article/5af91967ab8f0f686da0d11d](http://ht.askingdata.com/article/5af91967ab8f0f686da0d11d)

#### 项目运行
1. 开启以太坊节点：`geth  --rpc --rpccorsdomain "*" --rpcapi "personal,web3,eth,net"  console`
2. 启动挖矿： `miner.start()`
3. 安装包：`npm install`
4. 启动项目：`node app.js`


#### 以太坊入门必备基础

接下来将会从零开始搭建基于以太坊web3js项目，开始阅读之前，你需要熟练前端或后台JavaScript语法，熟悉区块链思想和原理，如果能了解solidity语法更好，因为接下来我们会用到它，和js很像的一门语言。

为了能够方便大家能够快速的了解，提供了下面几个资料供参考：

1. [《ethereum官网》](https://www.ethereum.org/)以太坊官网。
2. [《sails官方文档》](https://sailsjs.com/documentation/concepts)一款后台的nodejs框架。
3. [《 we3.js 文档1.0版本》](http://web3js.readthedocs.io/en/1.0/)以太坊上的前端框架，可实现与合约交互。
4. [《solidity 文档》](http://solidity-cn.readthedocs.io/zh/develop/introduction-to-smart-contracts.html#)以太坊的智能合约语言，熟悉常用语法，和JavaScript语法类似。

了解上面的知识之后，就可以开始DAPP搭建之旅了，将从下面的路线讲解：

1. 搭建以太坊环境。
2. 创建创世区块。
3. 简单的挖矿、创建账户。
4. 利用以太坊钱包查询账户信息。
5. 编写智能合约。
6. web3.js与合约交互。
7. 登录注册业务逻辑实现。
8. postman接口测试

项目代码可点击查看[https://github.com/Elliottssu/web3js-api](https://github.com/Elliottssu/web3js-api)

#### 一、以太坊环境搭建

如果已经有以太坊环境的同学可以跳过，接下来以mac系统为例介绍，windows也差不多。

通过Homebrew来安装go-ethereum

`brew tap ethereum/ethereum`

可以添加--devel以下命令来安装开发分支（建议用这个）：

`brew install ethereum --devel`

执行`geth version`查看版本号，如果正常的话即安装成功。

#### 二、新建创世区块

在比特币系统里，这个创世块是被写入源码，但对于以太坊而言，创世块可以是任何你喜欢的东西。你也可以把这个当成是系统的一个漏洞。但是共识算法确保其它人除非纳入你的创世块，否则是不会有效的。

创世区块的目的是搭建私有链，作为链上的第一个块，如果直接运行节点的话会同步公链的数据，数据量会非常大。如果想在同一个网络中获取数据，创世区块也必须要一样。

新建genesis.json文件内容如下：

```json
{
    "config": {},
    "nonce": "0x0000000000000042",
    "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "difficulty": "0x100",
    "alloc": {},
    "coinbase": "0x0000000000000000000000000000000000000000",
    "timestamp": "0x00",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "extraData": "0x00",
    "gasLimit": "0xffffffffffff"
}
```
上面定义了一些如挖矿难度、以太币数量、gas消耗限制等等信息。

在当前目录下执行`geth init genesis.json` 来初始化创世区块节点。

至此，环境配置方面已经完成。我们可以通过下面这个命令在8545端口来启动节点：

`geth  --rpc --rpccorsdomain "*" --rpcapi "personal,web3,eth,net"  console`

#### 三、创建账户以及挖矿

首先我们需要创建第一个账户密码是12345678，执行命令：

`personal.newAccount('12345678') `

![图例](http://htimg.askingdata.com/40fd094d-2433-455a-b49d-d57fcd0981ed.png)

创建账户之后就可以挖矿了，注意如果有多个帐户，挖到的以太币默认都会进入第一个账户的余额里。

`miner.start()`启动挖矿，`miner.stop()`停止挖矿

![图例](http://htimg.askingdata.com/3517c9b5-0584-49b4-bcec-20d84a8505eb.png)

#### 四、利用以太坊钱包查询账户信息

截止到现在，我们已经成功的启动以太坊节点，并可以通过命令来新建账户，执行挖矿来获取以太币操作。可是通过命令我们可能无法直观的感受在以太坊上账户和余额的变化。

现在通过以太坊官方提供的钱包，来管理账户和余额。下载地址[https://github.com/ethereum/mist/releases](https://github.com/ethereum/mist/releases)

注意：**推荐安装V0.8.10版本，可以删除已经部署的合约**，方便调试，最新版的移除掉了改功能。

如果有创世区块，是私有链的话，以太坊钱包会默认开启私有节点，否则默认同步公链上的数据。

![图例](http://htimg.askingdata.com/684f61be-2a3b-4e6e-9ab8-6984cc19bb4d.png)

自己可以尝试用主账号给其他账户转账，也可以新建账号和查询账户余额。

#### 五、Solidity编写智能合约

首先我们需要清楚一个问题，什么是智能合约？智能合约概念可以概括为: 一段代码 (智能合约)，运行在可复制、共享的账本上的计算机程序，可以处理信息，接收、储存和发送价值。通俗的来讲就是可以在区块链上执行的代码，因为以太坊以前的区块链只能存储比特币上的交易信息，无法做其他事情。而智能合约的出现，可以在链上执行简单的业务逻辑，这也是区块链应用落地的关键。

我们基础已经准备就绪，接下来就用solidity语言来写数据的增加和查询逻辑。

Solidity中合约的含义就是一组代码（它的 函数 )和数据（它的 状态 ），它们位于以太坊区块链的一个特定地址上。 代码行 `uint time`; 声明一个类型为 `uint` (256位无符号整数）的状态变量，叫做 time 。 你可以认为它是数据库里的一个位置，可以通过调用管理数据库代码的函数进行查询和变更。对于以太坊来说，上述的合约就是拥有合约（owning contract）。在这种情况下，函数 `set` 和 `get` 可以用来变更或取出变量的值。

**1. 定义数据结构和变量**

这里只做一个最简单的账户体系，定义个一个用户的数据结构包含用户名、用户地址和注册时间。

定义用户列表数据结构是为了存储一个用户名->用户地址的映射。


```javascript
//user.sol
//定义用户数据结构
struct UserStruct {
    address userAddress;
    string username;
    uint time;
    uint index;
}

//定义用户列表数据结构
struct UserListStruct {
    address userAddress;
    uint index;
}

address[] public userAddresses; //所有地址集合
string[] private usernames; //所有用户名集合
mapping(address => UserStruct) private userStruct; //账户个人信息

mapping(string => UserListStruct) private userListStruct; //用户名映射地址


```

`address[] private userAddresses;` 这一行声明了一个不可以被公开访问的 address 类型的状态变量。 address 类型是一个160位的值，且不允许任何算数操作。这种类型适合存储合约地址或外部人员的密钥对。如果是关键字 public 允许则你在这个合约之外访问这个状态变量的当前值。

`mapping(address => UserStruct) private userStruct;` mapping映射将地址映射到用户数据结构，这个可以初略理解为一个地址所对应的值有哪些。

**2. 判断用户名或地址是否存在**

```javascript
//user.sol
//判断用户地址是否存在
function isExitUserAddress(address _userAddress) public constant returns(bool isIndeed) {
    if (userAddresses.length == 0) return false;
    return (userAddresses[userStruct[_userAddress].index] == _userAddress);
}

//判断用户名是否存在
function isExitUsername(string _username) public constant returns(bool isIndeed) {
    if (usernames.length == 0) return false;
    return (keccak256(usernames[userListStruct[_username].index]) == keccak256(_username));
}
```

这里我们分别去判断用户名和地址是否存在，判断依据是看用户名或地址是否存在于所对应的数组。

需要注意的是，在JavaScript中判断一个值是否在数组中用到的`indexOf()`，但是在solidity是不支持该函数。有两种方案：**一种是循环集合来判断是否存在，第二种是创建的时候为每条数据加index索引**，只需按索引取值。

因为第一种需要遍历整个数组，当数据量非常大的时候效率不高，所以通过索引取值的方式更加快速。

**3. 新建数据和查询数据**

对于数据的插入和查询，其实就是往数组集合中添加和读取数据。

```javascript
//user.sol
//根据用户名查找对于的address
function findUserAddressByUsername(string _username) public constant returns (address userAddress) {
    require(isExitUsername(_username));
    return userListStruct[_username].userAddress;
}


//创建用户信息
function createUser(address _userAddress, string _username) public returns (uint index) {
    require(!isExitUserAddress(_userAddress)); //如果地址已存在则不允许再创建

    userAddresses.push(_userAddress); //地址集合push新地址
    userStruct[_userAddress] = UserStruct(_userAddress, _username, now, userAddresses.length - 1);

    usernames.push(_username); //用户名集合push新用户
    userListStruct[_username] = UserListStruct(_userAddress, usernames.length - 1); //用户所对应的地址集合

    return userAddresses.length - 1;
}


//获取用户个人信息
function findUser(address _userAddress) public constant returns (address userAddresses, string username, uint time, uint index) {
    require(isExitUserAddress(_userAddress));
    return (
        userStruct[_userAddress].userAddress,
        userStruct[_userAddress].username,
        userStruct[_userAddress].time,
        userStruct[_userAddress].index); 
}
```

当然，除了增加和查询之外，还可对相应的数组进行修改和删除。这里的修改和删除操作其实并不是真正的更改数据，因为区块链上的数据是无法篡改的。当然除非迫不得已的话，不建议直接在链上修改和删除数据。

#### 六、web3.js与合约交互

现在我们把智能合约已经写好了，可以通过js来读取和添加数据了，但在这之前需要我们部署刚才写的合约。部署合约有一种比较快捷方便的方法，就是在以太坊钱包里部署。


![图例](http://htimg.askingdata.com/30abb2e5-8781-42c7-be63-b651afb26fd8.png)
需要注意的是，**部署完成后，需要执行挖矿才能成功**，因为部署合约（包括写数据），需要节点通过挖矿来确认交易。

完了之后我们可以在合约列表中找到刚才部署的合约。

tips: **第一次合约部署完成，如果想要推出要执行一次`exit`，否则合约无法保存。**

这时候可以点进去，执行写入数据和读取数据操作了。那么怎样才能使用代码进行操作呢？

先提前看一下sails文件目录：

![图例](http://htimg.askingdata.com/cbf69b10-a07e-4e32-adc9-6f7dff195696.png)

**1. 安装truffle**

truffle可以将solidity语言的智能合约，编译成.json格式的配置文件，可以用它来和web3.js交互。

全局安装truffle，`npm install -g truffle`

编译solidity智能合约，`truffle compile`

执行之后会在build目录下输出编译后的结果。

**2. 拷贝编译后的文件中的abi的值**

我们编译的目的是为了拿到abi属性所对于的配置参数，手动拷贝到，nodejs的配置文件中。

ps: 这种做法虽然有些傻瓜，但是项目官方推荐的合约部署与读取要简单很多。

**3. web3.js读取与创建合约内容**

先看看web3.js上是如何调用合约的：

**读取**用`methods.myMethod.call`，将调用“constant”方法并在EVM中执行其智能合约方法，而不发送任何事务。注意调用不能改变智能合约状态；**修改**用`methods.myMethod. send `，将交易发送到智能合约并执行其方法。请注意，这可以改变智能合约状态。

那现在就根据以太坊的合约内容，封装一些web3.js调用智能合约的类。

```javascript
//Contract.js
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
            gas: 10000000 //最大的gas数值
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
```

上面的文件中在Web3Util.js定义了一些公共常量，如合约地址，账户地址等等。需要注意的是在使用`.send()`来创建合约内容的时候要给`gas`即小费，读取内容的时候不需要，这个是以太坊智能合约的必填项，关于gas是如何消耗的大家可以查阅相关资料了解。

#### 七、登录注册业务逻辑实现

截止到目前为止，我们已经成功的将js与solidity连接在一起并且实现互动，那接下来就是实现登录和注册。

登录其实就是看能否解锁用户，然后将用户的个人资料返回，注册就是调取智能合约来写入一条记录。

解锁账户（只有解锁才能执行合约）方法：

```javascript
//Web3Util.js
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
```

登录注册执行代码：
```javascript
//AccountController.js

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
            function (address, callback) {  //解锁主账户并合约注册信息
                Web3Util.unlockAccount(Web3Util.ACCOUNT_ADDRESS_MAIN, Web3Util.ACCOUNT__PASSWORD_MAIN, (err, result) => {
                    if (err) return res.json(Message.errMessage(err));
                    Contract.createUser(address, username, (err, result) => {
                        if (err) return res.json(Message.errMessage(err));
                        callback(err, result)
                    })
                })
            },
        ], (err, result) => {
            Message.handleResult(res, err, result)
        })
    },

};


```

#### 八、postman接口测试

我们已经在router中配置好了路由，接下来使用接口调试工具来测试一下，这里使用postman来测试：

注意，开始测试之前需要开启以太坊节点，保证8545端口开启：`geth  --rpc --rpccorsdomain "*" --rpcapi "personal,web3,eth,net"  console`

因为注册需要更改合约数据，需要挖矿来确定交易，所以为了方便调试，顺便开启挖矿：`miner.start()`

1.注册账号

![图例](http://htimg.askingdata.com/50a0bbbc-e36a-4685-973c-7a101d768b6e.png)

因为是执行合约交易，注册完了之后会返回本次交易详情如块、消耗的gas等等。如果本次交易失败，比如再注册重复的用户名，在solidity中做了拦截，本次交易会失败，失败的标志是返回的gas是自己设置的最大值。

这样我们就在链上创建了一个address，以及这个相对应的用户名和注册时间信息。

2.登录账号（账号同时支持address和用户名）

![图例](http://htimg.askingdata.com/062f49a9-789f-480a-892e-9c57f0b330cf.png)

#### 后续

现在以及能够通过接口与智能合约交互了，我们可以稍微加个前端页面，就可以当成一个正常app了，只是数据库是区块链，是不是很酷。

当然区块链上只能存储很少的数据，如果要存储视频或者图片，可以借助[IPFS](https://ipfs.io/)，（是永久的、去中心化保存和共享文件的方法，这是一种内容可寻址、版本化、点对点超媒体的分布式协议。）配合着区块链能够实现更加丰富的功能。

目前的缺点在于，读取和存储交易数据比较慢，这也是目前Dapp应用无法大规模的开展的一部分原因，但这个并不会阻碍区块链技术的发展，因为它解决的是生产关系，它的思想在于去中心化来防止中央组织的滥用。

在我构思这篇文章的时候，正好是Facebook创始人扎克伯格因数据泄漏丑闻在听证会被轮流质问，利用几百万用户数据来干涉总统大选。用户隐私数据一旦被攻破或滥用或商业分析推荐，后果也是非常可怕，这也是当今互联网全球化所带来的弊端。

所以，如果想要区块链解决这样的问题还需要多长的路要走？
