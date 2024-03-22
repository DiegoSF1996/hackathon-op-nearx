"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { listarProjetosUsuario, estaLogado } from '@/services/Web3Service'


export default function Home() {
  const [message, setMessage] = useState('null');
  const [projetos, setProjetos] = useState([]);
  const [wallet, setWallet] = useState([]);
  const { push } = useRouter();

  useEffect(() => {

    estaLogado().then((_wallet) => { setWallet(_wallet) });

    listarProjetosUsuario().then(dados => { setProjetos(dados); console.log(dados) })
  }, [])
  return (
    <main>

      <Navbar />
      <section className="    lg:px-8">
        <div dir="rtl">
          <div class="relative h-32 w-32 ...">
            <div class="absolute h-14 w-14 top-0 start-0 ...">
              <button onClick={() => push('/projetos/novo')} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Novo
              </button>
            </div>
          </div>
        </div>
      </section >

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
                Situacao
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {projetos.map((projeto, index) =>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {projeto[0]}
                </th>
                <td className="px-6 py-4">
                  {parseFloat(parseInt(projeto[1])/10**18).toFixed(18)}

                </td>
                <td className="px-6 py-4">
                {parseFloat(parseInt(projeto[2])/10**18).toFixed(18)}
                </td>
                <td className="px-6 py-4">
                  {projeto[7] ? 'Finalizado' : 'Em adamento'}
                </td>
                <td className="px-6 py-4">
                <button type="button" onClick={() => {
                    push("/projetos/visualizar?address=" + wallet + "&indice=" + index);
                  }}
                  class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  Ver
                </button>
                </td>
              </tr>
            )}
            {/* /projetos/vizualizar',{address:'0x70997970C51812dc3A010C7d01b50e0d17dc79C8', indice:0} */}
          </tbody>
        </table>
      </div>

    </main>

    // https://tailwindcss.com/docs/padding
    // https://tailwindui.com/components/preview
  );
}
