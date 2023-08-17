import React, { useState,createContext,useContext } from 'react';
import { ethers } from 'ethers';
const Usercontext = createContext();
import './App.css';

function App(){
  const {ethereum} = window;
  const [contract,setContract]=useState('');
  const [account,setAccount]=useState('');
  const [readData,setReadData]=useState('');
  const [writeData,setWriteData]=useState('');
  const [isLoading,setIsLoading]=useState(false);


    
  async function connectMetamask() {
    if (ethereum !== '') {
      const accounts= await ethereum.request({method: 'eth_requestAccounts'});
      setAccount(accounts[0]);
    }
  }

  async function connectContract(){
    if (account.length===0) {
      connectMetamask();
    }
    else {
      const Address='0xb658D9eF1d06c6dB2eE2d709E8d2687573F5FF7f';
      const ABI=[
        {
          "inputs": [],
          "name": "hardWriteContract",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "myFlower",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_word",
              "type": "string"
            }
          ],
          "name": "writeContract",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
      const provider=new ethers.providers.Web3Provider(window.ethereum)
      // await provider.send("eth_requestAccounts", []);
      const signer=provider.getSigner();
      
      const Contract=new ethers.Contract(Address,ABI,signer);
      // const Data = await Contract.myFlower();
      // Contract.writeContract('Margherita');
      // const Data = await Contract.myFlower();
      // localStorage.setItem('contract',Contract);
      console.log(provider,signer,Contract);
      setContract(Contract);
    }
  }

  async function getData(){
    // const C=localStorage.getItem('contract')
    const Data = await contract.myFlower();
    setReadData(Data);
  }

  async function setData(){
    // const C=localStorage.getItem('contract')
    const tx=await contract.writeContract('Margherita');
    setIsLoading(true);
    const txR=await tx.wait();
    setIsLoading(false);
    console.log(txR);
    setWriteData('Margherita');
  }

  return (
    <div className='App'>
      <button onClick={connectMetamask}>Connect to Metamask</button>
        <br></br>
        <p>{account}</p>
      <button onClick={connectContract}>Connect to Contract</button>
        <br></br>
        <p>{contract.address}</p>
      <button onClick={getData}>Get current data</button>
        <br></br>
        <p>{readData}</p>
      <button onClick={setData}>Set current data</button>
        <br></br>
        {isLoading ? (
          <p>Writing to blockchain...</p>
        ):(
          <p>{writeData}</p>        
        )}
    </div>
  )
}

export default App;
