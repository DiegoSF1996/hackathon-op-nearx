"use client";
import { useEffect, useState } from 'react';
import { obterProjetoEspecifico, obterDadosDoUsuario, doarParaProjeto } from '@/services/Web3Service'
import { Navbar } from '@/components/navbar';
import { useRouter } from 'next/navigation';

export default function visualizar({ searchParams } = props) {

  const [dadosUsuario, setDadosUsuario] = useState('null');

  const [formulario, setFormulario] = useState({
    descricao_projeto: "",
    finalizado: false,
    imagem: "",
    indice_tags: 0,
    meta_valor_arrecadacao: 0,
    nome_projeto: "",
    site: "",
    valor_arrecadado: 0,
    valor_doacao: 0
  });
  const { router } = useRouter();


  function salvar() {
    console.log(searchParams.address, searchParams.indice, parseInt(formulario.valor_doacao) * 10**18);
    doarParaProjeto(searchParams.address, searchParams.indice, parseInt(formulario.valor_doacao) * 10**18).then((data) => console.log(data))
    return false;
  }
  const handleChange = e => {
    const { name, value } = e.target;
    setFormulario(prevState => ({
      ...prevState,
      [name]: value
    }));

  };



  useEffect(() => {
    obterProjetoEspecifico(searchParams.address, searchParams.indice).then(dados => { setFormulario(dados); console.log(dados) }).catch(() => { alert('Projeto não encontrado'); push('/projetos') });
    obterDadosDoUsuario().then(dados => setDadosUsuario(dados))
  }, [])
  return (
    <main>
      <Navbar />

      <form className="mx-auto mt-16" action={salvar}>
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">

          <div className="space-y-12">
            {/* <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600"> Thiss information will be displayed publicly so be careful what you share.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">



              </div>
            </div> */}

            <div className="border-b border-gray-900/10 pb-12">
              {/* <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-12">
                  <label htmlFor="nome_projeto" className="block text-sm font-medium leading-6 text-gray-900">Nome do projeto</label>
                  <div className="mt-2">
                    <input disabled type="text" value={formulario.nome_projeto} onChange={handleChange} name="nome_projeto" id="nome_projeto" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div className="sm:col-span-5">
                  <label htmlFor="meta_valor_arrecadacao" className="block text-sm font-medium leading-6 text-gray-900">Meta de arrecadação</label>
                  <div className="mt-2">
                    <input disabled type="number" value={parseFloat(parseInt(formulario.meta_valor_arrecadacao)/10**18).toFixed(18)} onChange={handleChange} name="meta_valor_arrecadacao" id="meta_valor_arrecadacao" autoComplete="meta_valor_arrecadacao" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="sm:col-span-5">
                  <label htmlFor="valor_arrecadado" className="block text-sm font-medium leading-6 text-gray-900">Valor Arrecadado</label>
                  <div className="mt-2">
                    <input disabled type="number" value={parseFloat(parseInt(formulario.valor_arrecadado)/10**18).toFixed(18)} onChange={handleChange} name="valor_arrecadado" id="valor_arrecadado" autoComplete="valor_arrecadado" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="sm:col-span-12">
                  <label htmlFor="descricao_projeto" className="block text-sm font-medium leading-6 text-gray-900">Conte um pouco sobre seu projeto: *</label>
                  <div className="mt-2">
                    <textarea disabled id="descricao_projeto" value={formulario.descricao_projeto} onChange={handleChange} name="descricao_projeto" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Escreva poucas palavras.</p>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="imagem" className="block text-sm font-medium leading-6 text-gray-900">Imagem</label>
                  <div className="mt-2">
                    <input disabled id="imagem" value={formulario.imagem} onChange={handleChange} name="imagem" type="text" autoComplete="imagem" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Utilize uma url curta ou um encurtador.</p>
                </div>

                <div className="sm:col-span-9">
                  <label htmlFor="site" className="block text-sm font-medium leading-6 text-gray-900">Site</label>
                  <div className="mt-2">
                    <input disabled id="site" value={formulario.site} onChange={handleChange} name="site" type="text" autoComplete="imagem" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Utilize uma url curta ou um encurtador.</p>
                </div>

                {/* <div className="sm:col-span-2">
                  <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">Tags</label>
                  <div className="mt-2">
                    <input disabled id="tags" value={formulario.tags} onChange={handleChange} name="tags" type="text" autoComplete="imagem" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Separe as palavras por virgula, não use acentuação</p>
                </div> */}
                <div className="sm:col-span-2">
                  <label htmlFor="valor_doacao" className="block text-sm font-medium leading-6 text-gray-900">Valor que deseja doar:</label>
                  <div className="mt-2">
                    <input id="valor_doacao" value={parseInt(formulario.valor_doacao)} onChange={handleChange} name="valor_doacao" type="number" autoComplete="imagem" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Doar</button>
          </div>
        </div>
      </form>

    </main>

  );
}
