import { GoogleLogo, Lock, EnvelopeSimple } from 'phosphor-react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

export function Login() {
  function handleGloogleSingIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <main className="mx-auto">
      <div className="flex flex-row ">
        <div className="flex w-[0] sm:basis-3/4 bg-hero bg-cover bg-no-repeat min-h-screen" />
        <div className="flex-col w-[100%] sm:basis-2/4 md:basis-1/4 bg-gray-100">
          <div className="justify-center items-center">
            <div className="flex justify-center items-center py-6">
              <strong className="text-4xl md:text-6xl text-orange-500 text-center">Login</strong>
            </div>
            <form action="" className="flex flex-col gap-2 p-8 w-full">
              <label className="relative block mx-auto">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <EnvelopeSimple color="rgb(243, 244, 246)" size={22} />
                </span>
                <input
                  className="bg-zinc-900 placeholder:text-gray-100 w-64 sm:w-80 placeholder:text-center  rounded-lg px-5 h-12"
                  type="email"
                  placeholder="Digite seu e-mail"
                />
              </label>
              <label className="relative block mx-auto">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock color="rgb(243, 244, 246)" size={22} />
                </span>
                <input
                  className="bg-zinc-900 placeholder:text-gray-100 w-64 sm:w-80 placeholder:text-center rounded-lg px-5 h-12"
                  type="password"
                  placeholder="Digite sua senha"
                />
              </label>
              <button type="submit" className="text-center text-base font-extrabold bg-orange-400 p-2 rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-50 w-64 sm:w-80 mx-auto">
                Entrar
              </button>
              <a className="text-orange-500 font-bold text-center text-sm" href="forgot">Esqueci minha senha</a>
            </form>
            <div className="flex justify-center items-center py-6">
              <strong className="text-base text-orange-500 text-center">Entrar com:</strong>
            </div>
            <div className="flex justify-around items-center">
              <div>
                <button className="text-center text-base font-extrabold bg-orange-400 p-2 rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-50  mx-auto mr-1" onClick={handleGloogleSingIn}>
                  <GoogleLogo size={20} />
                </button>
              </div>
            </div>
            <div className="flex justify-around items-center">
              <div className="flex justify-center items-center py-6">
              <Link className="text-base text-orange-500 text-center" to="/SignIn" >Criar conta </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
