"use client";
import Image from "next/image";
import { useState } from 'react';
import {login} from '@/services/Web3Service'

export default function Home() {
  const [connectedAccount, setConnectedAccount] = useState('null');
  const [message, setMessage] = useState('null');
  
  function btnLogin (){
    login().then(account => setMessage(account)).catch(err => { 
      console.log(err);
      setMessage(err);
    })
  }
  async function connectMetamask() {
    //check metamask is installed
    if (window.ethereum) {
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      //get the connected accounts
      const accounts = await web3.eth.getAccounts();
      //show the first connected account in the react page
      setConnectedAccount(accounts[0]);
    } else {
      alert('Please download metamask');
    }
  }
  return (
    <main>
       <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png' alt="Logo" />
      <button onClick={() => btnLogin()}>Conectar</button>
    </main>
  );
}
