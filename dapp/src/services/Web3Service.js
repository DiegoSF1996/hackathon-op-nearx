import { Web3 } from 'web3';
import ABI from "./ABI.json"

const CONTRACT_ADDRESS = "";

export async function login() {
    if (!window.ethereum) throw new Error("MetaMask não encontrada");
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) throw new Error("MetaMask sem permissão");
    localStorage.setItem("wallet", accounts[0]);
    return accounts[0];

}

export async function estaLogado() {
    const wallet = localStorage.getItem("wallet");
    if (!wallet) throw new Error("Não autorizado");
    return wallet;
}

async function obterContrato() {
    const wallet = localStorage.getItem("wallet");
    if (!wallet) throw new Error("Não autorizado");

    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: wallet });
}

export async function cadastrar(dados) {
    const wallet = localStorage.getItem("wallet");
    if (!wallet) throw new Error("Não autorizado");

    const web3 = new Web3(window.ethereum);
    const contract = await obterContrato();
    return contract.methods.cadastrar().call();
}