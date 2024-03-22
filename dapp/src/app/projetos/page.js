"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { listarProjetosUsuario } from '@/services/Web3Service'


export default function Home() {
  const [message, setMessage] = useState('null');
  const [projetos, setProjetos] = useState([]);

  const { push } = useRouter();

  useEffect(() => {
    listarProjetosUsuario().then(dados => { setProjetos(dados); console.log(dados) })
  }, [])
  return (
    <main>

      <Navbar />
      <div className='container'>
        <button onClick={() => push('/projetos/novo')} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Novo
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome do Projeto
              </th>
              <th scope="col" className="px-6 py-3">
                Meta arrecadação
              </th>
              <th scope="col" className="px-6 py-3">
                Valor Arrecadado
              </th>
              <th scope="col" className="px-6 py-3">
                Descricão Projeto
              </th>
              <th scope="col" className="px-6 py-3">
                imagem
              </th>
              <th scope="col" className="px-6 py-3">
                Site
              </th>
              <th scope="col" className="px-6 py-3">
                Situacao
              </th>
              <th scope="col" className="px-6 py-3">
                Tags
              </th>
            </tr>
          </thead>
          <tbody>
            {projetos.map(projeto =>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {projeto[0]}
                </th>
                <td className="px-6 py-4">
                  {projeto[1]}

                </td>
                <td className="px-6 py-4">
                  {projeto[2]}

                </td>
                <td className="px-6 py-4">
                  {projeto[3]}
                </td>
                <td className="px-6 py-4">
                  {projeto[4]}
                </td>
                <td className="px-6 py-4">
                  {projeto[5]}
                </td>
                <td className="px-6 py-4">
                  {projeto[6]}
                </td>
                <td className="px-6 py-4">
                  {projeto[7]? 'Finalizado' : 'Em adamento' }
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

    </main>

    // https://tailwindcss.com/docs/padding
    // https://tailwindui.com/components/preview
  );
}
