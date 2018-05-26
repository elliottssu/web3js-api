pragma solidity ^0.4.11;


contract User {

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



}
