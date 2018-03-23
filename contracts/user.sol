pragma solidity ^0.4.16;


contract User {

    //定义用户数据结构
    struct UserStruct {
        string username;
        uint time;
        uint index;
    }

    address[] private userAddresses; //所有地址集合
    mapping(address => UserStruct) private userStruct; //账户个人信息

    event LogNewUser (address _userAddress, string _username, uint _time, uint _index);


    //判断用户地址是否存在
    function isExitUser(address _userAddress) public constant returns(bool isIndeed) {
        if (userAddresses.length == 0) return false;
        return (userAddresses[userStruct[_userAddress].index] == _userAddress);
    }

 
    //创建用户信息
    function insertUser(address _userAddress, string _username) public returns (uint index) {
        require(!isExitUser(_userAddress)); //如果地址已存在则不允许再创建
        userAddresses.push(_userAddress); //地址集合push新地址
        userStruct[_userAddress] = UserStruct( _username, now, userAddresses.length - 1);
        return userAddresses.length - 1;
    }


    //获取用户个人信息
    function getUser(address _userAddress) public constant returns (string username, uint time, uint index) {
        require(isExitUser(_userAddress));
        return (
            userStruct[_userAddress].username,
            userStruct[_userAddress].time,
            userStruct[_userAddress].index); 
    }

}
