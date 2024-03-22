import { Web3 } from 'web3';
import ABI from "./ABI.json"
const CONTRACT_ADDRESS = ABI.address;

export async function login() {
    if (!window.ethereum) throw new Error("MetaMask não encontrada");
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) throw new Error("MetaMask sem permissão");
    localStorage.setItem("wallet", accounts[0]);
    return accounts[0];

}

export async function cadastrarNovoUsuario(dados) {
    const wallet = localStorage.getItem("wallet");
    if (!wallet) throw new Error("Não autorizado");

    const contract = await obterContrato();
    return contract.methods.cadastrarNovoUsuario(dados).send();
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
    const abi = ABI.abi;
    return new web3.eth.Contract(abi, CONTRACT_ADDRESS, { from: wallet, gas: 3000000 });
}

export async function checarUsuarioJaCadastrado() {
    const wallet = localStorage.getItem("wallet");
    if (!wallet) throw new Error("Não autorizado");

    const contract = await obterContrato();
    return contract.methods.checarUsuarioExiste().call();
}


export async function obterDadosDoUsuario() {
    const wallet = localStorage.getItem("wallet");
    if (!wallet) throw new Error("Não autorizado");

    const contract = await obterContrato();
    return contract.methods.logar().call();
}

export async function cadastrarNovoProjeto(dados,tgs) {
    const wallet = localStorage.getItem("wallet");
    if (!wallet) throw new Error("Não autorizado");
    const contract = await obterContrato();
    return contract.methods.cadastrarNovoProjeto(dados,tgs).send();
}

export async function  obterTodosProjetos(){
    const wallet = localStorage.getItem("wallet");
    if (!wallet) throw new Error("Não autorizado");
    const contract = await obterContrato();
    return contract.methods.obterTodosProjetos().call();
}

export async function  listarProjetosUsuario(){
    const wallet = localStorage.getItem("wallet");
    if (!wallet) throw new Error("Não autorizado");
    const contract = await obterContrato();
    return contract.methods.listarProjetosUsuario().call();
}
