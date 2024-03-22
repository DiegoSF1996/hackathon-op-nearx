"use client";
import { useState, useEffect } from 'react';
import { obterTodosProjetos } from '@/services/Web3Service'
import { Navbar } from '@/components/navbar';

export default function Home() {

  const [projetos, setProjetos] = useState([]);
  const [projetosBackup, setProjetosBackup] = useState([]);
  const [pesquisa, setPesquisa] = useState([]);


  const handleChange = e => {
    const { name, value } = e.target;
    setPesquisa(prevState => ({
      ...prevState,
      [name]: value
    }));

  };

  useEffect(() => {
    obterTodosProjetos().then(dados => { setProjetos(dados); setProjetosBackup(dados); console.log(dados) })
  }, []);
  function pesquisar() {
    setProjetos(projetosBackup.filter(function (valor, index) {
      if ((valor.nome_projeto + valor.tags).toLowerCase().indexOf(pesquisa.search.toLowerCase()) != -1) {
        return true
      }
      return false;

    }))
  }
  return (
    <main>

      <Navbar />

      <br />
      <hr />

      <div class="bg-white">

        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

          <form action={pesquisar}>
            <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" name='search' onChange={handleChange} id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
              <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>

          <br />
          <hr />
          <br />

          <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {projetos.map((projeto, index) =>
              <a href={"/projetos/visualizar?address=" + projeto.endereco_dono_projeto + "&indice=" + projeto.indice_array_projeto} class="group">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img src={projeto.imagem} class="h-full w-full object-cover object-center group-hover:opacity-75" alt={projeto.tags} />
                </div>
                <h3 class="mt-4 text-sm text-gray-700">{projeto.nome_projeto} - {projeto.finalizado ? 'Finalizado' : 'Em Andamento'}</h3>
                {/* <p class="mt-1 text-lg font-medium text-gray-900">$48</p> */}
              </a>
            )}
          </div>
        </div>

      </div>
      <hr />
      <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div class="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt class="text-base leading-7 text-gray-600">Transactions every 24 hours</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">44 million</dd>
            </div>
            <div class="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt class="text-base leading-7 text-gray-600">Assets under holding</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$119 trillion</dd>
            </div>
            <div class="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt class="text-base leading-7 text-gray-600">New users annually</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">46,000</dd>
            </div>
          </dl>
        </div>
      </div>

    </main>

    // https://tailwindcss.com/docs/padding
    // https://tailwindui.com/components/preview
  );
}
