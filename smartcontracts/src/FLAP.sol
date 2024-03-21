// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract FLAP is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    struct struct_usuario {
        string primeiro_nome;
        string sobrenome;
        string tipo_pessoa_organizacao;
        string nome_organizacao;
        string email;
    }

    struct struct_projeto {
            string nome_projeto;
            uint256 meta_valor_arrecadacao;
            uint256 valor_arrecadado;
            string descricao_projeto;
            string imagem;
            string site;
            bool finalizado;
            uint256 indice_tags;
        }

    struct struct_tags_projeto {
        address endereco_dono_projeto;
        uint256 indice_array_projeto;
        string nome_projeto;
        string imagem;
        string tags;
        bool finalizado;
    }
    mapping(address => struct_projeto[]) private projeto;

    mapping(address => struct_usuario) private usuario;

    struct_tags_projeto[] public projetos_lista;

    constructor() 
    ERC20("Fabrica-de-Lancamentos-de-Projetos-Autonomos-Descentralizados","$FLAP") 
    Ownable(msg.sender) 
    ERC20Permit("Fabrica-de-Lancamentos-de-Projetos-Autonomos-Descentralizados")
    {
        _mint(msg.sender, 21000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    //regras de négocio

    function validarUsuario() internal view {
        require(bytes(usuario[msg.sender].primeiro_nome).length != 0,"Usuario nao existe");
    }
    //cadastrar novo usuário
    function cadastrarNovoUsuario(struct_usuario memory _usuario) external returns (struct_usuario memory)
    {
        require(bytes(_usuario.email).length != 0, "Email e obrigatorio");
        require(bytes(_usuario.primeiro_nome).length != 0, "O campo primeiro_nome e obrigatorio");
        require(bytes(_usuario.sobrenome).length != 0, "O campo sobrenome e obrigatorio");
        require(bytes(_usuario.tipo_pessoa_organizacao).length != 0,"O campo tipo_pessoa_organizacao e obrigatorio");
        require(bytes(usuario[msg.sender].primeiro_nome).length == 0,"Usuario Ja existe");
        usuario[msg.sender] = _usuario;
        return usuario[msg.sender] ;
    }

    //login
    function logar() external view returns (struct_usuario memory){
        return usuario[msg.sender];
    }

    
    //cadastrar novo projeto
    function cadastrarNovoProjeto(struct_projeto memory _projeto, string memory _tags ) external  returns (struct_projeto memory ){
        validarUsuario();
        require(bytes(_projeto.nome_projeto).length != 0, "O campo Nome e obrigatorio");
        require(bytes(_projeto.descricao_projeto).length != 0,"O campo descricao e obrigatorio");
        require(bytes(_projeto.imagem).length != 0,"O campo imagem e obrigatorio");
        require(bytes(_projeto.site).length != 0,"O campo site e obrigatorio");
        projeto[msg.sender].push(_projeto);
        uint256 ultima_posicao  = projeto[msg.sender].length -1;

        struct_tags_projeto memory _tags_projeto;
        _tags_projeto.endereco_dono_projeto = msg.sender;
        _tags_projeto.indice_array_projeto = ultima_posicao;
        _tags_projeto.nome_projeto = _projeto.nome_projeto;
        _tags_projeto.imagem = _projeto.imagem;
        _tags_projeto.tags = _tags;
        _tags_projeto.finalizado = false;

        projetos_lista.push(_tags_projeto);

        projeto[msg.sender][0].indice_tags =projetos_lista.length-1;

        return projeto[msg.sender][ultima_posicao] ;
    }

    //listar projetos usuario

    function listarProjetosUsuario() external view returns(struct_projeto[] memory){
        return projeto[msg.sender];
    }

    function obterTodosProjetos() public view returns (struct_tags_projeto[] memory ){

       return projetos_lista;
    }
    
    //doar

    function doar (address _endereco_recebedor, uint256 _indice_projeto, uint256 _valor_doacao) external payable {
        validarUsuario();
        struct_projeto memory _projeto = projeto[_endereco_recebedor][_indice_projeto];
        //se enviar um valor e já tiver e a meta ja tiver atingida
        require(_projeto.valor_arrecadado < _projeto.meta_valor_arrecadacao, "Meta de arrecadao ja atingida!");
        uint256 valor_que_resta_a_arrecadar = _projeto.meta_valor_arrecadacao - _projeto.valor_arrecadado;

        if(_valor_doacao > valor_que_resta_a_arrecadar){
            _valor_doacao -= valor_que_resta_a_arrecadar;
        }

        projeto[_endereco_recebedor][_indice_projeto].valor_arrecadado += _valor_doacao;
        _burn(msg.sender, _valor_doacao);
    }

    // transferir doacoes para proprietario do projeto

    function transferirDoacoesParaProprietarioDoProjeto(uint256 _indice_projeto) external {
        validarUsuario();
        struct_projeto memory _projeto = projeto[msg.sender][_indice_projeto];
        require(_projeto.meta_valor_arrecadacao > _projeto.valor_arrecadado , "Meta de arrecadao nao atingida!");
        require(_projeto.finalizado != true , "Projeto encerrado");
        _mint(msg.sender, _projeto.valor_arrecadado );

        projeto[msg.sender][_indice_projeto].finalizado = true;
        
        projetos_lista[_projeto.indice_tags].finalizado = true;

    }
    //buscar

}
