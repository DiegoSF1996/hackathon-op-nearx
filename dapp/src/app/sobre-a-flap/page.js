"use client";
import { useState, useEffect } from 'react';
import { login, checarUsuarioJaCadastrado, estaLogado } from '@/services/Web3Service'
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
export default function Home() {
  const [connectedAccount, setConnectedAccount] = useState('null');
  const [message, setMessage] = useState('null');
  const { push } = useRouter();



  function btnLogin() {

    login().then(account => {
      setConnectedAccount(account);
      checarUsuarioJaCadastrado().then(
        dados => {
          if (dados == true) {
            push('/projetos/buscar')
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

      <Navbar />
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <div class="bg-gray-100 font-sans leading-normal tracking-normal">
                <nav class="bg-gray-900 p-4">
                  <div class="container mx-auto">
                    <div class="flex items-center justify-center">
                      <div class="text-white text-lg font-semibold">FLAP - Fábrica de Lançamentos de Projetos Autônomos Descentralizados</div>
                    </div>
                  </div>
                </nav>
                <div class="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
                  <h2 class="text-3xl font-bold mb-2 text-gray-800">Sobre o FLAP</h2>
                  <p class="text-gray-700 mb-4">Bem-vindo ao <span class="font-bold">FLAP</span>, a incubadora de inovação que está revolucionando o apoio a projetos criativos no Brasil. Nossa missão é democratizar o acesso ao financiamento de ideias transformadoras, oferecendo uma plataforma descentralizada que opera na rede <span class="font-bold">Optimism</span>.</p>
                  <p class="text-gray-700 mb-4">O FLAP nasceu da crença de que a criatividade brasileira é um recurso inestimável, muitas vezes limitado pela falta de recursos financeiros. Aqui, nós nivelamos o campo de jogo. Qualquer pessoa com uma ideia brilhante pode apresentar seu projeto e, através do poder da comunidade, encontrar o suporte necessário para torná-lo realidade.</p>
                  <p class="text-gray-700 mb-4">Nossa plataforma utiliza a tecnologia <span class="font-bold">blockchain</span> para garantir transparência e segurança em todas as transações. Ao participar do FLAP, você não apenas contribui para o crescimento de projetos inovadores, mas também se torna parte de uma comunidade vibrante que valoriza a colaboração e o desenvolvimento coletivo.</p>
                  <p class="text-gray-700 mb-4">Junte-se a nós e seja parte dessa revolução criativa. No FLAP, suas ideias têm o espaço e o suporte para decolar e alcançar novos horizontes.</p>
                </div>
              </div>
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
