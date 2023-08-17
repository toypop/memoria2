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
  const [message,setMessage]=useState('');
  const [dataCreazione,setDataCreazione]=useState('');


  const handleChange = event =>{
    setWriteData('');
    setMessage(event.target.value);
  }
    
  async function connectMetamask() {
    if (ethereum !== '') {
      const accounts= await ethereum.request({method: 'eth_requestAccounts'});
      setAccount(accounts[0]);
    //   connectContract();
    }
  }

  async function connectContract(){
    if (account.length===0) {
        connectMetamask();

        // const Address='0x4860d78a23998b5151a8F72001EF0bf1C0B594aA'; //memoria.sol sepolia
        const Address='0xac1FB6a1Cb5F798320643c9a4135c3041e849Ac4' //polygon mainnet
        const ABI=[
            {
                "inputs": [],
                "stateMutability": "payable",
                "type": "constructor"
            },
            {
                "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
                ],
                "name": "arr",
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
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
                ],
                "name": "arrM",
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
                "inputs": [],
                "name": "dataCreazione",
                "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                {
                    "internalType": "uint256",
                    "name": "i",
                    "type": "uint256"
                }
                ],
                "name": "get",
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
                "inputs": [],
                "name": "getArr",
                "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getArrM",
                "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBalance",
                "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                {
                    "internalType": "uint256",
                    "name": "i",
                    "type": "uint256"
                }
                ],
                "name": "getItem",
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
                    "internalType": "uint256",
                    "name": "i",
                    "type": "uint256"
                }
                ],
                "name": "getItemM",
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
                "inputs": [],
                "name": "getLast",
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
                "inputs": [],
                "name": "getLastM",
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
                "inputs": [],
                "name": "getLength",
                "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getLengthM",
                "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                {
                    "internalType": "uint256",
                    "name": "i",
                    "type": "uint256"
                }
                ],
                "name": "getM",
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
                "inputs": [],
                "name": "kill",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "pop",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "popM",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                {
                    "internalType": "string",
                    "name": "i",
                    "type": "string"
                }
                ],
                "name": "push",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                {
                    "internalType": "string",
                    "name": "i",
                    "type": "string"
                }
                ],
                "name": "pushM",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                {
                    "internalType": "uint256",
                    "name": "i",
                    "type": "uint256"
                }
                ],
                "name": "remove",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                {
                    "internalType": "uint256",
                    "name": "i",
                    "type": "uint256"
                }
                ],
                "name": "removeM",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "testCall",
                "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
                ],
                "stateMutability": "pure",
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
    // const l= await contract.getLength();
    // let appo=''
    // let i=0;
    // while(i<l){
    //     const item=await contract.getItem(i);
    //     appo=appo+item+'   ';
    //     i++;
    // }
    // connectMetamask();
 //   connectContract();

    // if (dataCreazione===''){
    //     const datacreazione = await contract.dataCreazione();
    //     let dataC=datacreazione._hex*1000;
    //     let dataCObj=new Date(dataC);
    //     let dataFinale=dataCObj.toLocaleString();
    //     setDataCreazione(dataFinale);      
    //}

    const Data = await contract.getArrM();
    // const Data=appo;
    setReadData(Data);
  }

  async function setData(){
    // const C=localStorage.getItem('contract')
    connectContract();
    const tx=await contract.pushM(message);
    setIsLoading(true);
    setMessage('');    
    const txR=await tx.wait();
    setIsLoading(false);
    console.log(txR);
    // setWriteData('Ok inserito frase: '+message);
    // setMessage('');
    setWriteData('Ok');
  }

  return (
    <div className='App'>
      {/* <label for='name'>data creazione contratto Memoria:  {dataCreazione}</label><br></br> */}
      {/* <button onClick={connectMetamask}>Connetti a Metamask</button>
        <br></br> */}
        {/* <p>{account}</p> */}
      <button onClick={connectContract}>Connettiti al contratto 'Mia memoria'</button>
        <br></br>
        {/* <p>{contract.address}</p> */}
        {contract!=='' ?
        (<button onClick={getData}>Leggi tutte le frasi</button>):
        (<p></p>)}
        <br></br>
        <p>{readData}</p>
      <label for='name'>Frase sul diario:</label><br></br>
      <textarea type='text' id='message' name='message' cols='100' rows='20' placeholder='Inserisci la frase da ricordare'  onChange={handleChange} value={message}/><br></br>
      {message!=='' && contract!=='' ? (
      <button onClick={setData}>Salva su blockchain</button>
      ):(
        <label for='name'></label>
      )}
        <br></br>      
        {isLoading ? (
          <p>Sto scrivendo sulla blockchain...</p>
        ):(
          <p>{writeData}</p>        
        )}
    </div>
  )
}

export default App;
