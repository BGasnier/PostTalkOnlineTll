const { Web3 } = require("web3");
const ABI = require("./abi.json");
const BYTECODE = require("./bytecode.json");

//initialize a provider
const web3 = new Web3("https://ethereum-sepolia-rpc.publicnode.com");

async function getCounter() {
  const myContract = new web3.eth.Contract(ABI, "0x89a143F5C866598B1d9a2872C503E0f75a16C70E");

  const response = await myContract.methods.getCounter().call();
  console.log("Current counter:", response);
}

 async function deploy() {
  //initialize a wallet
  const wallet = web3.eth.wallet.add("putYouPrivateEthAdressHere");

  //initialize the contract
  const myContract = new web3.eth.Contract(ABI);

  //initialzie a contract deployer
  const deployer = myContract.deploy({
    data: BYTECODE,
    arguments: [77],
  });

  //send transaction
  const txReceipt = await deployer.send({ from: wallet[0].address });

  console.log("contract deployed to:", txReceipt.options.address);
}

 // await deploy();
 getCounter();


