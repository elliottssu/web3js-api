module.exports = {
  user: [
    {
      "constant": true,
      "inputs": [
        {
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "isExitUserAddress",
      "outputs": [
        {
          "name": "isIndeed",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_username",
          "type": "string"
        }
      ],
      "name": "isExitUsername",
      "outputs": [
        {
          "name": "isIndeed",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_userAddress",
          "type": "address"
        },
        {
          "name": "_username",
          "type": "string"
        }
      ],
      "name": "createUser",
      "outputs": [
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "findUser",
      "outputs": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "time",
          "type": "uint256"
        },
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_username",
          "type": "string"
        }
      ],
      "name": "findUserAddressByUsername",
      "outputs": [
        {
          "name": "userAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
};
