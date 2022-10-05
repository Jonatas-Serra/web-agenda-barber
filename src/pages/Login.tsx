import { GoogleLogo } from 'phosphor-react'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Form } from '@unform/web'
import { Link } from 'react-router-dom'
import { auth } from '../services/firebase'

import Input from '../components/Input'
import { Logo } from '../components/Logo'

export function Login() {
  function handleGloogleSingIn() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <main className="mx-auto">
      <div className="flex flex-row ">
        <div className="flex w-[0] sm:basis-3/4 bg-hero bg-cover bg-no-repeat min-h-screen" />
        <div className="flex-col w-[100%] sm:basis-2/4 md:basis-1/4 bg-gray-100">
          <div className="justify-center items-center">
            <div className="flex flex-col justify-center items-center py-6">
              <Link to="/">
                <Logo />
              </Link>
              <strong className="mt-8 text-2xl md:text-4xl text-orange-500 text-center">
                Login
              </strong>
            </div>
            <Form onSubmit={() => {}}>
              <div className="flex flex-col justify-center items-center gap-2 p-8 w-full">
                <Input
                  name="email"
                  type="email"
                  icon={FiMail}
                  placeholder="E-mail"
                />
                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
                />

                <button className="flex justify-center items-center w-full min-w-[250px] h-12 p-4 my-2 text-white-100 font-bold text-lg bg-orange-500 rounded-md shadow-sm ">
                  Login
                </button>
              </div>
            </Form>
            <div className="flex justify-center items-center py-6">
              <strong className="text-base text-orange-500 text-center">
                Entrar com:
              </strong>
            </div>
            <div className="flex justify-around items-center">
              <div>
                <button
                  className="text-center text-base font-extrabold bg-orange-500 p-2 rounded-lg mx-auto mr-1"
                  onClick={handleGloogleSingIn}
                >
                  <GoogleLogo size={30} />
                </button>
              </div>
            </div>
            <div className="flex justify-around items-center">
              <div className="flex justify-center items-center py-6">
                <div className="flex justify-center items-center">
                  <FiLogIn size={30} color="#F4972E" />
                  <Link
                    className="ml-2 text-base font-bold text-orange-500 text-center"
                    to="/SignUp"
                  >
                    Criar conta{' '}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
