import logo from "./logo.svg";
import "./App.css";
import { Web3 } from "web3";
import { useState } from "react";
import ABI from "./abi.json";

function App() {
  const [wallet, setWallet] = useState("0x");
  const [counter, setCounter] = useState("0");
  let web3, contract, accounts;

  async function connect() {
    //initialize injecteed provider
    web3 = new Web3(window.ethereum);

    //request accounts
    accounts = await web3.eth.requestAccounts();

    //update front end
    setWallet(String(accounts[0]));

    //initialzie contract
    contract = new web3.eth.Contract(ABI, "0x89a143F5C866598B1d9a2872C503E0f75a16C70E");
  }

  async function getCounter() {
    await connect();

    const response = await contract.methods.getCounter().call();

    //update front end
    setCounter(String(response));
  }

  async function increaseCounter() {
    await connect();

    await contract.methods.increaseCounter().send({ from: accounts[0] });

    await getCounter();
  }

  return (
<div class="App"> 
        <header class="App-header"> 
            <div class="log-in"> 
                <p>Connected account: {wallet}</p> 
            </div> 
            <img src={logo} class="App-logo" alt="logo" /> 
            <div> 
                <button class="button" onclick="connect()">Connect</button> 
                <button class="button" onclick="increaseCounter()"> Increase Counter</button> 
                <button class="button" onclick="getCounter()">Get Counter</button> 
            </div> 
            <div class="counter"> 
                <div class="circle-text"/> 
                <p>{wallet}</p> 
            </div> 
        </header> 
    </div>
    

    
  );
}

export default App;
