import React, { useState } from 'react'
import { FiMail, FiMapPin, FiPhone, FiEdit } from 'react-icons/fi'

import api from '../services/api'
import { useAuth } from '../hooks/Auth'
import { useToast } from '../hooks/Toast'
interface User {
  name: string
  email: string
  image_url: string
  address: {
    street: string
    number: string
    city: string
    state: string
    zip: string
    coutry: string
  }
  phone: string
}

interface UserAuth {
  _id: string
}

const Settings: React.FC = () => {
  const [barber, setBarber] = useState<User>({} as User)
  const [openChangeImage, setOpenChangeImage] = useState(false)
  const [openChangeInfo, setOpenChangeInfo] = useState(false)
  const [openChangerGallery, setOpenChangerGallery] = useState(false)

  const user = useAuth().user as UserAuth
  const token = localStorage.getItem('@AgendaBarber:token')
  const { addToast } = useToast()

  // Get infomatios of barber
  const getbarber = async () => {
    const response = await api.get(`barbers/${user._id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setBarber(response.data)
  }

  // Update barber photo
  const handleChangerImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const file = formData.get('image') as File
    const data = Object.fromEntries(formData)

    console.log('log 01', data)

    if (file) {
      const checkimage = file.name

      if (checkimage === '') {
        data.image = ''
      } else {
        const image = file as File
        const dataImage = new FormData()
        dataImage.append('file', image)

        const response = await api.post('barbers/upload', dataImage, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        data.image = response.data.url
        console.log('log 02', data.image)
      }
    }

    api
      .patch(`barbers/${user._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        addToast({
          type: 'success',
          title: `Imagem alterada com sucesso!`,
        })
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Erro ao alterar imagem, tente novamente!',
        })
      })
    console.log('log 03', data)
    setOpenChangeImage(false)
    getbarber()
  }

  // Update multiples files to barber Gallery
  const handleChangerGallery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const files = formData.getAll('images') as File[]
    const data = Object.fromEntries(formData)

    if (files) {
      const checkimage = files[0].name

      if (checkimage === '') {
        data.images = ''
      } else {
        const images = files as File[]
        const dataImages = new FormData()
        images.forEach((image) => {
          dataImages.append('files', image)
        })

        const response = await api.post('barbers/upload', dataImages, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        data.images = response.data
      }
    }

    api
      .patch(`barbers/${user._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        addToast({
          type: 'success',
          title: `Imagens alteradas com sucesso!`,
        })
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Erro ao alterar imagens, tente novamente!',
        })
      })
    setOpenChangerGallery(false)
    getbarber()
  }

  React.useEffect(() => {
    getbarber()
  }, [])

  return (
    <div className="flex flex-col px-4">
      <h1 className="text-3xl font-bold text-zinc-900 mt-2">
        Informações da barbearia
      </h1>
      <div className="flex justify-between p-4 mt-4 bg-[#FFF] rounded-lg">
        <div className="p-4">
          <img
            className="rounded-full"
            width={135}
            src={barber.image_url}
            alt="Foto da barbearia"
          />
          <button
            onClick={() => {
              setOpenChangeImage(true)
            }}
          >
            <svg
              className="w-9 h-9 text-zinc-50 cursor-pointer bg-orange-500 rounded-full p-1 relative -top-10 -right-24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col justify-center ">
          <h3 className="text-xl font-bold text-zinc-900 md:text-2xl">
            {barber.name}
          </h3>
          <div className="flex items-center pl-2">
            <FiMail size={20} className="text-orange-500 mr-2" />
            <p className="text-zinc-900 font-semibold">{barber.email}</p>
          </div>
          <div className="flex items-center pl-2">
            <FiPhone size={20} className="text-orange-500 mr-2" />
            <p className="text-zinc-900 font-semibold">{barber.phone}</p>
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex items-center">
              <h3 className="text-xl font-bold text-zinc-900">Endereço</h3>
            </div>
            <div className="flex items-center">
              <FiMapPin size={30} className="text-orange-500 mr-2" />
              <div>
                <p className="text-zinc-900 font-semibold text-sm">
                  {barber.address?.street}, {barber.address?.number}
                </p>
                <p className="text-zinc-900 font-semibold text-sm">
                  {barber.address?.city} - {barber.address?.state}
                </p>
                <p className="text-zinc-900 font-semibold text-sm">
                  {barber.address?.zip}
                </p>
                <p className="text-zinc-900 font-semibold text-sm">
                  {barber.address?.coutry}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="flex items-center text-orange-500 just underline">
            <FiEdit size={20} className="mr-2" />
            Editar
          </button>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-zinc-900 mt-2">Galeria</h1>
      <div className="flex justify-between py-4 mt-4 bg-[#FFF] rounded-lg">
        {/* Carrousel */}

        <div className="relative py-2 xl:flex-col xl:justify-center xl:items-center xl:w-full">
          <div className="px-4">
            <form onSubmit={handleChangerGallery}>
              <label className="block mb-2 text-sm font-medium text-zinc-900">
                Coloque suas melhores fotos aqui !
              </label>
              <label className="flex flex-col justify-center items-center w-full h-64  rounded-lg border-2 cursor-pointer  bg-zinc-900 border-zinc-600 hover:border-zinc-400 hover:bg-zinc-700">
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="mb-3 w-10 h-10 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold">Clique para Carregar</span>{' '}
                    ou arraste e solte
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
                <input
                  name="fotos"
                  type="file"
                  multiple={true}
                  className="text-center cursor-pointer"
                />
              </label>
            </form>
          </div>
          <div className="flex h-56 rounded-lg md:h-96">
            <div className="w-full p-4">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={
                  'https://cdn-dfcog.nitrocdn.com/jmTlbfZEAllUYTTwsPmshemsUKuSytFV/assets/static/optimized/rev-5dd0719/wp-content/uploads/2021/09/Design-sem-nome-50.png'
                }
                alt=""
              />
              <button className="cursor-pointer overflow-visible  relative -top-[102%] left-[95%]">
                <svg
                  className="w-7 h-7 p-2 bg-red-600 rounded-full  text-zinc-50 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="w-full p-4">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={
                  'https://cdn-dfcog.nitrocdn.com/jmTlbfZEAllUYTTwsPmshemsUKuSytFV/assets/static/optimized/rev-5dd0719/wp-content/uploads/2021/09/Design-sem-nome-50.png'
                }
                alt=""
              />
              <button className="cursor-pointer overflow-visible  relative -top-[102%] left-[95%]">
                <svg
                  className="w-7 h-7 p-2 bg-red-600 rounded-full  text-zinc-50 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="w-full p-4">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={
                  'https://cdn-dfcog.nitrocdn.com/jmTlbfZEAllUYTTwsPmshemsUKuSytFV/assets/static/optimized/rev-5dd0719/wp-content/uploads/2021/09/Design-sem-nome-50.png'
                }
                alt=""
              />
              <button className="cursor-pointer overflow-visible  relative -top-[102%] left-[95%]">
                <svg
                  className="w-7 h-7 p-2 bg-red-600 rounded-full  text-zinc-50 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {openChangeImage && (
        <div className="relative h-full w-[100px] md:w-full">
          <div className="overflow-y-auto overflow-x-hidden fixed top-[10%] left-[0%] md:top-[20%] md:left-[35%] z-50  w-full md:h-full">
            <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
              <div className="relative rounded-lg shadow bg-zinc-900">
                <div className="flex justify-between items-center p-5 rounded-t border-b border-zinc-700">
                  <h3 className="text-xl font-medium text-zinc-50">
                    Alterar imagem da barbearia
                  </h3>
                  <button
                    onClick={() => setOpenChangeImage(false)}
                    type="button"
                    className="text-zinc-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-red-500 hover:text-zinc-50"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form onSubmit={handleChangerImage}>
                  <div className="flex justify-center items-center w-full">
                    <div className="w-full px-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Upload multiple files
                      </label>
                      <input
                        className="block w-full text-base text-zinc-50 bg-zinc-900 rounded-lg border border-zinc-700 cursor-pointer placeholder-zinc-50 "
                        id="image"
                        name="image"
                        type="file"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-2 md:p-6 space-x-2 rounded-b border-t border-zinc-700">
                    <button
                      type="submit"
                      className="text-white bg-orange-400 hover:bg-orange-500 hover:transition-shadow text-zinc-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => setOpenChangeImage(false)}
                      className="text-white bg-red-500 hover:bg-red-600 text-zinc-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
