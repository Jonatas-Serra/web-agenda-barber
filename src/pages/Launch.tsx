import { GooglePlayLogo, AppStoreLogo } from 'phosphor-react';
import { Header } from '../components/Header';
import Img01 from '../assets/01.png';
import Img02 from '../assets/02.png';
import Img03 from '../assets/03.png';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';
import logo4 from '../assets/logo4.png';

export function Launch() {
  return (
    <main className="mx-auto px-8 lg:px-36">
      <Header />
      <section className="flex flex-col md:flex-row justify-around">
        <div className="flex basis-1/4 my-auto">
          <div className="flex-col">
            <h1 className="font-bold text-xl xl:text-7xl md:text-4xl mb-5 ">
              Buscando um barbeiro?
            </h1>
            <p className="text-gray-400 text-sm  md:text-base xl:text-xl">
              Para um corte de cabelo de qualidade e um atendimento impecável, venha com a BarberApp. Iremos te mostrar os melhores serviços de barbearia para homens de todas as idades. Não deixe de agendar um horário hoje mesmo!
            </p>
            <div className="flex md:flex mx-auto justify-around">
              <button className="mr-5 bg-orange-400 mt-8 text-base md:mr-11 flex justify-around  md:text-xl xl:text-2xl sm:w-32 md:w-48 xl:w-52 p-4 rounded-lg hover:bg-orange-500 transition-colors duration-300 disabled:opacity-50 items-center">
                Google Play
                <GooglePlayLogo size={30} />
              </button>
              <button className="bg-orange-400 mt-8 text-base md:mr-11 flex justify-around  md:text-xl xl:text-2xl sm:w-32 md:w-48 xl:w-52 p-4 rounded-lg hover:bg-orange-500 transition-colors duration-300 disabled:opacity-50 items-center">
                App Store
                <AppStoreLogo size={30} />
              </button>
            </div>
          </div>

        </div>
        <div className="flex basis-3/4">
          <img className="mx-auto  md:ml-auto mt-8 md:mt-0 lg:mr-8 rounded-l-full " src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb" alt="image host" />
        </div>
      </section>
      {/* Serviços das Barbearias */}
      <section className="justify-center items-center my-24 ">
        <div className=" flex-1 text-center mb-24">
          <h4 className="text-lg md:text-2xl mb-12">Como funciona</h4>
          <h2 className="text-4xl md:text-4xl">
            Como funciona o
            <strong className="text-orange-400"> Barber Booking</strong>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 leading-relaxed ">
          <div className="flex-col justify-center items-center">
            <img className="w-[120px] h-[120px] mx-auto mb-6" src={Img01} alt="" />
            <h4 className="text-lg font-bold md:text-3xl text-center">Ache um barbeiro</h4>
            <p className="text-sm text-center mt-4 text-gray-300">
              Em nosso app você encontrará as melhores barbearias, são especialistas e oferecem um serviço de qualidade para deixar você bonito e bem cuidado.
            </p>
          </div>
          <div className="flex-col justify-center items-center">
            <img className="w-[120px] h-[120px] mx-auto mb-6" src={Img02} alt="" />
            <h4 className="text-lg font-bold md:text-3xl text-center">Faça um agendamento</h4>
            <p className="text-sm text-center mt-4 text-gray-300">Agende um dia e horário de sua preferência.</p>
          </div>
          <div className="flex-col justify-center items-center">
            <img className="w-[120px] h-[120px] mx-auto mb-6" src={Img03} alt="" />
            <h4 className="text-lg font-bold md:text-3xl text-center">Produtos</h4>
            <p className="text-sm text-center mt-4 text-gray-300">Também oferecemos uma variedade de produtos para manter sua barba limpa, hidratada e saudável.</p>
          </div>
        </div>
      </section>
      {/* Sessao de Parceiros */}
      <section className="justify-center items-center my-8">
        <div className="flex justify-center items-center mb-10">
          <h2 className="text-5xl font-bold text-orange-400">Nossos parceiros</h2>
        </div>
        <div className="flex overflow-x-auto lg:overflow-hidden justify-center py-32">
          <div className="flex flex-col snap-center items-center justify-center rounded-3xl  w-[250px] h-[250px] mx-8 mb-8 md:mb-0">
            <img className="flex rounded-[50%] mb-6" src={logo} alt="logomarca" />
            <h3 className="flex items-end pb-6 md:text-base text-2xl font-black text-gray-100">Black Barber</h3>
          </div>
          <div className="flex flex-col snap-center items-center justify-center rounded-3xl  w-[250px] h-[250px] mx-8 mb-8 md:mb-0">
            <img className="flex rounded-[50%] mb-6" src={logo2} alt="logomarca" />
            <h3 className="flex items-end pb-6 md:text-base text-2xl font-black text-gray-100">The Gentleman</h3>
          </div>
          <div className="flex flex-col snap-center items-center justify-center rounded-3xl  w-[250px] h-[250px] mx-8 mb-8 md:mb-0">
            <img className="flex rounded-[50%] mb-6" src={logo3} alt="logomarca" />
            <h3 className="flex items-end pb-6 md:text-base text-2xl font-black text-gray-100">Barber Shop</h3>
          </div>
          <div className="flex flex-col snap-center items-center justify-center rounded-3xl  w-[250px] h-[250px] mx-8 mb-8 md:mb-0">
            <img className="flex rounded-[50%] mb-6" src={logo4} alt="logomarca" />
            <h3 className="flex items-end pb-6 md:text-base text-2xl font-black text-gray-100">R&A Barbearia</h3>
          </div>
        </div>
      </section>
    </main>
  );
}
