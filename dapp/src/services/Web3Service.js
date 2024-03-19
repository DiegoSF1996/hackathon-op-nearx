import { Web3 } from 'web3';

export async function login(){
    if(!window.ethereum) throw new Error("MetaMask não encontrada");
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if(!accounts || ! accounts.length) throw new Error("MetaMask sem permissão");
    localStorage.setItem("wallet",accounts[0]);
    return accounts[0];
    
}