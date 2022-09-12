import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import api from '../services/api';

import getValidationErrors from '../utils/getValidationErrors';
import Input from '../components/Input';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export function SignIn() {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email valido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/barbers', data);

        navigate('/Login');

      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          console.log(errors);
          return;
        }
      }
    },
    [navigate],
  );

  return (
    <main className="mx-auto">
      <div className="flex flex-row ">
        <div className="flex-col w-[100%] max-w-[600px] sm:basis-2/4 md:basis-1/4 bg-gray-100">
          <div className="justify-center items-center">
            <div className="flex justify-center items-center py-6">
              <strong className="text-2xl md:text-4xl text-orange-500 text-center">Cadastre-se</strong>
            </div>
            <Form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center items-center gap-2 p-8 w-full">
                <Input name="name" type="name" icon={FiUser} placeholder="Nome" />
                <Input name="email" type="email" icon={FiMail} placeholder="E-mail" />
                <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                <button className="flex justify-center items-center w-full min-w-[250px] h-12 p-4 my-2 text-white-100 font-bold text-lg bg-orange-500 rounded-md shadow-sm ">
                  Cadastrar
                </button>
              </div>
            </Form>
            <div className="flex justify-center items-center py-6">
              <Link to="/Login">
                <div className='flex justify-center items-center'><FiArrowLeft size={20} color="#F4972E" />
                <strong className="ml-2 text-base text-orange-500 text-center">Já possui uma conta?</strong></div>
              </Link>
            </div>
            <div className="flex justify-around items-center">
            </div>
          </div>
        </div>
        <div className="flex w-[0] sm:basis-3/4 bg-hero bg-cover bg-no-repeat min-h-screen"/>
      </div>
    </main>
  );
}
