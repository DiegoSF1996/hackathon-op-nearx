"use client";
import { useState, useEffect } from 'react';
import { login, checarUsuarioJaCadastrado, estaLogado } from '@/services/Web3Service'
import { useRouter } from 'next/navigation';

export default function Home() {
  const [connectedAccount, setConnectedAccount] = useState('null');
  const [message, setMessage] = useState('null');
  const { push } = useRouter();

  function checarLogado() {
    estaLogado()
    .then(() => {
      checarUsuarioJaCadastrado().then(
        dados => {
          push('/projetos/novo')
        }
      ).catch()
    })
    .catch();
  }


  function btnLogin() {
    
    login().then(account => {
      setConnectedAccount(account);
      checarUsuarioJaCadastrado().then(
        dados => {
          if(dados == true ){
            push('/projetos/novo')
          } else {
            push('/cadastro')
          }

        }
      ).catch()
    })
    .catch(err => {
      console.log(err);
      setMessage(err);
    })
  }

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          {/* <img className="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="" /> */}
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>O <b>Brasil é a terra da inovação</b>, a <b></b>criatividade está no sangue do brasileiro vamos <b>construir, inovar</b> e fazer nossa criatividade crescer ainda mais, conecte sua <b>metamask</b> para participar do futuro!</p>
            </blockquote>
            <figcaption className="mt-10">
              <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                <button onClick={() => btnLogin()} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Acesse com sua metamask
                  <img className="mx-auto h-10 w-10 rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="" />
                </button>
              </blockquote>

            </figcaption>
          </figure>
        </div>
      </section>
  
    </main>

    // https://tailwindcss.com/docs/padding
    // https://tailwindui.com/components/preview
  );
}
