import { GooglePlayLogo, AppStoreLogo } from 'phosphor-react'
import { Header } from '../components/Header'
import Img01 from '../assets/01.png'
import Img02 from '../assets/02.png'
import Img03 from '../assets/03.png'
import logo from '../assets/logo.png'
import logo2 from '../assets/logo2.png'
import logo3 from '../assets/logo3.png'
import logo4 from '../assets/logo4.png'
import phones from '../assets/phones.png'
import phones2 from '../assets/phones2.png'
import Blackbarber from '../assets/Blackbarber.jpg'
import { Link } from 'react-router-dom'

export function Launch() {
  return (
    <>
      <main className="mx-auto px-3 sm:px-6 md:px-8 lg:px-28">
        <Header />
        <section
          id="Home"
          className="flex flex-col md:flex-row justify-around mt-4"
        >
          <div className="flex basis-1/4 my-auto">
            <div className="flex-col animate-slideleft">
              <h1 className="font-bold text-center text-3xl xl:text-5xl md:text-4xl mb-5 ">
                Buscando um barbeiro?
              </h1>
              <p className="text-center text-white-100 text-sm  md:text-base xl:text-xl">
                Para um corte de cabelo de qualidade e um atendimento impecável,
                venha com a BarberApp. Iremos te mostrar os melhores prestadores
                de serviços de barbearia para homens de todas as idades. Não
                deixe de agendar um horário hoje mesmo!
              </p>
              <div className="flex mx-auto justify-around">
                <button className="sm:mr-5 bg-orange-500 mt-8 p-2 text-base md:mr-11 flex justify-around  md:text-xl xl:text-2xl sm:w-40 md:w-48 xl:w-52 sm:p-4 rounded-lg items-center">
                  App Store
                  <AppStoreLogo size={30} />
                </button>
                <button className="sm:mr-5 bg-orange-500 mt-8 p-2 text-base md:mr-11 flex justify-around  md:text-xl xl:text-2xl sm:w-40 md:w-48 xl:w-52 sm:p-4 rounded-lg items-center">
                  Google Play
                  <GooglePlayLogo size={30} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex p-8 sm:p-0 my-auto sm:ml-10 mt-8 xl:ml-0 md:mt-0">
            <img
              className="mx-auto h-1/2 animate-slidebottom"
              src={phones}
              alt="image host"
            />
          </div>
        </section>
        {/* Serviços das Barbearias */}
        <section id="howtowork" className="justify-center items-center my-24 ">
          <div className=" flex-1 text-center mb-24">
            <h2 className="text-4xl md:text-4xl">
              Como funciona o
              <strong className="text-orange-500"> Barber Booking</strong>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 leading-relaxed ">
            <div className="flex-col justify-center items-center">
              <img
                className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] mx-auto mb-6"
                src={Img01}
                alt=""
              />
              <h4 className="text-lg font-bold md:text-3xl text-center">
                1º Ache um barbeiro
              </h4>
              <p className="text-md text-center mt-4 text-gray-300">
                Em nosso app você encontrará as melhores barbearias, são
                especialistas e oferecem um serviço de qualidade para deixar
                você bonito e bem cuidado.
              </p>
            </div>
            <div className="flex-col justify-center items-center">
              <img
                className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] mx-auto mb-6"
                src={Img02}
                alt=""
              />
              <h4 className="text-lg font-bold md:text-3xl text-center">
                2º Faça um agendamento
              </h4>
              <p className="text-md text-center mt-4 text-gray-300">
                Agende um dia e horário de sua preferência.
              </p>
            </div>
            <div className="flex-col justify-center items-center">
              <img
                className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] mx-auto mb-6"
                src={Img03}
                alt=""
              />
              <h4 className="text-lg font-bold md:text-3xl text-center">
                3º Receba o melhor atendimento
              </h4>
              <p className="text-md text-center mt-4 text-gray-300">
                Profissionais selecionados para uma experiência completa.
              </p>
            </div>
          </div>
        </section>
        {/* Sessao Sobre */}
        <section id="about" className="mb-14 ">
          <div className="flex flex-col justify-center items-center my-16">
            <div className="flex justify-center items-center">
              <h2 className="text-center text-4xl md:text-4xl">
                Sobre o
                <strong className="text-orange-500"> Agenda Barber</strong>
              </h2>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-around">
            <div className="flex my-auto basis-2/4">
              <div className="flex-col">
                <p className="text-center text-white-100 text-sm  md:text-base xl:text-xl mb-6">
                  Agenda Barber é um aplicativo que conecta barbeiros e
                  clientes, facilitando o agendamento de serviços de barbearia.
                  O aplicativo é gratuito e está disponível para Android e iOS.
                </p>
                <p className="text-center text-white-100 text-sm  md:text-base xl:text-xl">
                  Se você está cansado de esperar por horas por um atendimento
                  de barbearia? Então o Agenda Barber foi feito para você, aqui
                  você pode agendar seu horário para um serviço de barbearia e
                  garantir um atendimento rápido e eficiente.
                </p>
              </div>
            </div>
            <div className="flex my-auto basis-3/4">
              <img
                className="mx-auto max-w-[70%]"
                src={phones2}
                alt="image host"
              />
            </div>
          </div>
        </section>
        {/* Sessao Barbeiros */}
        <section id="partner" className="mb-14 ">
          <div className="flex flex-col justify-center items-center my-16">
            <div className="flex justify-center items-center">
              <h2 className="text-4xl md:text-4xl">
                Seja um
                <strong className="text-orange-500"> Parceiro</strong>
              </h2>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-around">
            <div className="flex my-auto basis-3/4">
              <img
                className="mx-auto max-w-[80%] rounded-3xl"
                src={Blackbarber}
                alt="image host"
              />
            </div>
            <div className="flex  my-auto basis-2/4">
              <div className="flex flex-col justify-center">
                <h2 className="text-center font-bold text-orange-500 text-2xl xl:text-4xl mb-6">
                  Coloque sua barbearia em foco!
                </h2>
                <p className="text-center text-white-100 text-sm  md:text-base xl:text-xl mb-4">
                  Quanto mais barbearias utilizam o aplicativo, mais eficiente e
                  atrativo ele fica para os clientes. Aumente o número de
                  clientes, a satisfação deles e consequentemente o faturamento
                  da sua barbearia.
                </p>
                <div className="flex w-full items-center justify-center ">
                  <Link
                    className="text-center text-sm py-3 px-4 xl:text-base font-extrabold bg-orange-500 sm:py-3 sm:px-4 rounded-lg"
                    to="/SignUp"
                  >
                    Se tornar parceiro
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Sessao de Parceiros */}
        <section className="w-full justify-center items-center my-8">
          <div className="flex justify-center items-center mb-10">
            <h2 className="font-bold text-center text-4xl md:text-4xl text-orange-500">
              Nossos parceiros
            </h2>
          </div>
          <div className="flex overflow-x-auto lg:overflow-x-hidden py-8 px-4">
            <div className="flex-col items-center justify-center mx-8 mb-8 md:mb-0 min-w-[150px] max-w-[160px]">
              <img className="rounded-[50%] mb-6 " src={logo} alt="logomarca" />
              <h3 className="text-center items-end pb-6 text-sm sm:text-md font-black text-gray-100">
                Black Barber
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center mx-8 mb-8 md:mb-0 min-w-[150px] max-w-[160px]">
              <img
                className="rounded-[50%] mb-6 "
                src={logo2}
                alt="logomarca"
              />
              <h3 className="text-center items-end pb-6 text-sm sm:text-md font-black text-gray-100">
                The Gentleman
              </h3>
            </div>
            <div className="flex-col items-center justify-center mx-8 mb-8 md:mb-0 min-w-[150px] max-w-[160px]">
              <img
                className="rounded-[50%] mb-6 "
                src={logo3}
                alt="logomarca"
              />
              <h3 className="text-center items-end pb-6 text-sm sm:text-md font-black text-gray-100">
                Barber Shop
              </h3>
            </div>
            <div className="flex-col items-center justify-center mx-8 mb-8 md:mb-0 min-w-[150px] max-w-[160px]">
              <img
                className="rounded-[50%] mb-6 "
                src={logo4}
                alt="logomarca"
              />
              <h3 className="text-center items-end pb-6 text-sm sm:text-md font-black text-gray-100">
                R&A Barbearia
              </h3>
            </div>
          </div>
        </section>
      </main>
      <footer className="bottom-0 left-0 z-20 p-4 w-full border-t border-zinc-700 shadow md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{' '}
          <a href="https://tijosolutions.com/" className="hover:underline">
            TIJO - Solutions
          </a>
          . Todos direitos reservados.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#about" className="mr-4 hover:underline md:mr-6 ">
              Sobre
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Política Privacidade
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licença
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Contato
            </a>
          </li>
        </ul>
      </footer>
    </>
  )
}
