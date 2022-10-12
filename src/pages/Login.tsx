import React, { useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/Auth'
import { useToast } from '../hooks/Toast'

import getValidationErrors from '../utils/getValidationErrors'

import { GoogleLogo } from 'phosphor-react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../services/firebase'

import Input from '../components/Input'
import { Logo } from '../components/Logo'

interface SignInFormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()

  const { signIn } = useAuth()
  const { addToast } = useToast()

  // Login with Google

  const handleGoogleLogin = useCallback(async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    console.log(result)
    if (result.user) {
      localStorage.setItem('@AgendaBarber:token', result.user.uid)
      localStorage.setItem('@AgendaBarber:user', JSON.stringify(result.user))

      console.log(result.user)

      navigate('/dash/resume')
    }
  }, [navigate])

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await signIn({
          email: data.email,
          password: data.password,
        })

        navigate('/dash/resume')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        })
      }
    },
    [addToast, navigate, signIn],
  )

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
            <Form ref={formRef} onSubmit={handleSubmit}>
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
                  onClick={handleGoogleLogin}
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

export default Login
