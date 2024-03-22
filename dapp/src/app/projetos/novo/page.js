"use client";
import { useEffect, useState } from 'react';
import { cadastrarNovoProjeto, obterDadosDoUsuario } from '@/services/Web3Service'
import Image from 'next/image';
import { Navbar } from '@/components/navbar';


export default function Home() {
  const [dadosUsuario, setDadosUsuario] = useState('null');

  const [formulario, setFormulario] = useState({
    nome_projeto: '',
    meta_valor_arrecadacao: 0,
    valor_arrecadado: 0,
    descricao_projeto: '',
    imagem: '',
    site: '',
    finalizado: false,
    indice_tags: 0,
  });

  function salvar() {
    cadastrarNovoProjeto([
      formulario.nome_projeto,
      formulario.meta_valor_arrecadacao,
      formulario.valor_arrecadado,
      formulario.descricao_projeto,
      formulario.imagem,
      formulario.site,
      formulario.finalizado,
      formulario.indice_tags
   ],'carro, tesla').then(dados =>{ console.log(dados) }).catch(dados =>{ alert("Erro, verifique se os dados estão corretamente preenchidos."); console.log(dados)})

   setFormulario({
    nome_projeto: 'a',
    meta_valor_arrecadacao: 10,
    valor_arrecadado: 1,
    descricao_projeto: 'dd',
    imagem: 'dd',
    site: 'dd',
    finalizado: false,
    indice_tags: 0,
  });
    return false;
  }
  const handleChange = e => {
    const { name, value } = e.target;
    setFormulario(prevState => ({
      ...prevState,
      [name]: value
    }));

  };

  function obterUsuario() {
    obterDadosDoUsuario().then(dados => setDadosUsuario(dads))
  }

  useEffect(() => {
    obterDadosDoUsuario().then(dados => setDadosUsuario(dados))
  }, [])
  return (
    <main>
      <Navbar />
      {/* 






 */}
      <form  className="mx-auto mt-16" action={salvar}>
        <div  className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">

          <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
              <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">{dadosUsuario[0]} Thiss information will be displayed publicly so be careful what you share.</p>

              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">



              </div>
            </div>

            <div class="border-b border-gray-900/10 pb-12">
              <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-5">
                  <label for="nome_projeto" class="block text-sm font-medium leading-6 text-gray-900">Nome do projeto</label>
                  <div class="mt-2">
                    <input type="text"  value={formulario.nome_projeto} onChange={handleChange} name="nome_projeto" id="nome_projeto" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div class="sm:col-span-7">
                  <label for="meta_valor_arrecadacao" class="block text-sm font-medium leading-6 text-gray-900">Meta de arrecadação</label>
                  <div class="mt-2">
                    <input type="text" value={formulario.meta_valor_arrecadacao} onChange={handleChange} name="meta_valor_arrecadacao" id="meta_valor_arrecadacao" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div class="sm:col-span-12">
                  <label for="descricao_projeto" class="block text-sm font-medium leading-6 text-gray-900">Conte um pouco sobre seu projeto: *</label>
                  <div class="mt-2">
                    <textarea id="descricao_projeto" value={formulario.descricao_projeto} onChange={handleChange} name="descricao_projeto" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                  </div>
                  <p class="mt-3 text-sm leading-6 text-gray-600">Escreva poucas palavras.</p>
                </div>
                <div class="sm:col-span-3">
                  <label for="imagem" class="block text-sm font-medium leading-6 text-gray-900">Imagem</label>
                  <div class="mt-2">
                    <input id="imagem" value={formulario.imagem} onChange={handleChange} name="imagem" type="text" autocomplete="imagem" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <p class="mt-3 text-sm leading-6 text-gray-600">Utilize uma url curta ou um encurtador.</p>
                </div>

                <div class="sm:col-span-9">
                  <label for="site" class="block text-sm font-medium leading-6 text-gray-900">Site</label>
                  <div class="mt-2">
                    <input id="site" value={formulario.site} onChange={handleChange} name="site" type="text" autocomplete="imagem" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <p class="mt-3 text-sm leading-6 text-gray-600">Utilize uma url curta ou um encurtador.</p>
                </div>

                <div class="sm:col-span-2">
                  <label for="tags" class="block text-sm font-medium leading-6 text-gray-900">Tags</label>
                  <div class="mt-2">
                    <input id="tags" value={formulario.tags} onChange={handleChange} name="tags" type="text" autocomplete="imagem" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <p class="mt-3 text-sm leading-6 text-gray-600">Separe as palavras por virgula, não use acentuação</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
          </div>
        </div>
      </form>

    </main>

    // https://tailwindcss.com/docs/padding
    // https://tailwindui.com/components/preview
  );
}
