import React, { useState } from 'react'
import { FiMail, FiMapPin, FiPhone, FiEdit } from 'react-icons/fi'

import api from '../services/api'
import { useAuth } from '../hooks/Auth'
import { useToast } from '../hooks/Toast'

interface User {
  _id: string
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
  photos: string[]
  photos_url: {
    [x: string]: any
    0: string
    1: string
    2: string
    3: string
    4: string
  }
  phone: string
}

interface UserAuth {
  _id: string
}

const Settings: React.FC = () => {
  const [barber, setBarber] = useState<User>({} as User)
  const [loading, setLoading] = useState(true)
  const [openChangeImage, setOpenChangeImage] = useState(false)
  const [openChangeInfo, setOpenChangeInfo] = useState(false)

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
    setLoading(false)
  }

  // Change info of barber
  const handleChangeInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    // Don't change if the field is empty
    const checkData = Object.keys(data).filter((key) => data[key] === '')

    if (checkData.length > 0) {
      // Delete fields empty
      checkData.forEach((key) => delete data[key])
    }

    try {
      await api.patch(`barbers/${user._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      addToast({
        type: 'success',
        title: 'Informações alteradas com sucesso',
      })
      setOpenChangeInfo(false)
      getbarber()
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao alterar informações',
      })
    }
  }

  // Update barber photo
  const handleChangerImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const file = formData.get('image') as File
    const data = Object.fromEntries(formData)

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
    setOpenChangeImage(false)
    getbarber()
  }

  // Update multiples files to barber Gallery [## TERMINAR E TESTAR ESSE CARA ##]
  const handleChangerGallery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const files = formData.getAll('photos') as File[]
    const data = Object.fromEntries(formData)

    // check if barber don't have photos
    if (barber.photos) {
      if (barber.photos.length === 0) {
        console.log('não tem fotos')
      } else {
        if (barber.photos[4]) {
          addToast({
            type: 'error',
            title:
              'Você já tem 5 fotos na galeria remova uma para adicionar outra',
          })
          return
        } else {
          // check if barber already have 4 photos
          if (barber.photos[3]) {
            // check if user send 5 photos
            if (files.length > 1) {
              addToast({
                type: 'error',
                title:
                  'Você tem 4 fotos na galeria você só pode adicionar mais 1',
              })
              return
            }
          } else {
            // check if barber already have 3 photos
            if (barber.photos[2]) {
              // check if user send 4 photos
              if (files.length > 2) {
                addToast({
                  type: 'error',
                  title:
                    'Você tem 3 fotos na galeria você só pode adicionar mais 2',
                })
                return
              }
            } else {
              // check if barber already have 2 photos
              if (barber.photos[1]) {
                // check if user send 3 photos
                if (files.length > 3) {
                  addToast({
                    type: 'error',
                    title:
                      'Você tem 2 fotos na galeria você só pode adicionar mais 3',
                  })
                  return
                }
              } else {
                // check if barber already have 1 photos
                if (barber.photos[0]) {
                  // check if user send 2 photos
                  if (files.length > 4) {
                    addToast({
                      type: 'error',
                      title:
                        'Você tem 1 foto na galeria você só pode adicionar mais 4',
                    })
                    return
                  }
                }
              }
            }
          }
        }
      }
    }
    // check if barber already have 5 photos

    if (files) {
      const checkimage = files[0].name

      if (checkimage === '') {
        data.photos = ''
      } else {
        const dataPhotos = new FormData()
        files.map((file) => dataPhotos.append('files', file))

        const response = await api.post('barbers/gallery', dataPhotos, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        data.photos = response.data
      }
    }

    const photos = data.photos[0].photos

    const allPhotos = [{ photos: barber.photos?.concat(photos) }]

    api
      .patch(
        `barbers/${user._id}`,
        barber.photos ? allPhotos[0] : data.photos[0],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
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
    setTimeout(() => {
      getbarber()
    }, 3000)
  }

  // Delete barber photo
  const handleDeleteImage = async (photo: string) => {
    const data = [photo]

    await api
      .patch(`barbers/gallery/${user._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        addToast({
          type: 'success',
          title: `Imagem deletada com sucesso!`,
        })
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Erro ao deletar imagem, tente novamente!',
        })
      })
    setTimeout(() => {
      getbarber()
    }, 1000)
  }

  React.useEffect(() => {
    getbarber()
  }, [])

  return (
    <div className="flex flex-col px-4 ">
      <section className="flex flex-col xl:flex-row w-full justify-around">
        {/* Informaçoes da Barbearia */}
        <div className="flex flex-col w-full mr-2">
          <h1 className="text-3xl font-bold text-zinc-900 mt-2">
            Informações da barbearia
          </h1>
          <div className="flex flex-col justify-center xl:flex-row xl:justify-between p-4 mt-4 bg-[#FFF] rounded-lg">
            <div className="p-4 m-auto xl:m-0">
              <img
                className="w-[220px] sm:w-[135px] rounded-full"
                src={barber.image_url}
                alt="Foto da barbearia"
              />
              <button
                onClick={() => {
                  setOpenChangeImage(true)
                }}
              >
                <svg
                  className="w-9 h-9 text-zinc-50 cursor-pointer bg-orange-500 rounded-full p-1 relative -top-5 sm:-top-10 -right-16 sm:-right-24"
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
            <div className="flex flex-col justify-center m-auto xl:m-0">
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
            <div className="flex justify-end md:m-0 md:items-start">
              <button
                onClick={() => {
                  setOpenChangeInfo(true)
                }}
                className="flex items-center text-orange-500 just underline"
              >
                <FiEdit size={20} className="mr-2" />
                Editar
              </button>
            </div>
          </div>
        </div>
        {/* Horario de funcionamento */}
        <div className="flex flex-col w-full ml-2">
          <h1 className="text-3xl font-bold text-zinc-900 mt-2">
            Horario de funcionamento
          </h1>
          <div className="flex flex-col justify-center md:flex-row md:justify-between p-4 mt-4 bg-[#FFF] rounded-lg  overflow-x-auto">
            {/* Horarios */}
            <div className="flex-col m-auto">
              <div className="flex items-center mb-4">
                <div className="flex items-center h-full w-[5.313rem]">
                  <input
                    type="checkbox"
                    value="0"
                    className="w-4 h-4 rounded border-orange-500 focus:ring-orange-500"
                  />
                  <label className="ml-2 text-sm font-bold text-gray-900">
                    Domingo
                  </label>
                </div>
                <div className="flex items-center ml-4">
                  <div className="flex">
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center h-full w-[5.313rem]">
                  <input
                    type="checkbox"
                    value="0"
                    className="w-4 h-4 rounded border-orange-500 focus:ring-orange-500"
                  />
                  <label className="ml-2 text-sm font-bold text-gray-900">
                    Segunda
                  </label>
                </div>
                <div className="flex items-center ml-4">
                  <div className="flex">
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center h-full w-[5.313rem]">
                  <input
                    type="checkbox"
                    value="0"
                    className="w-4 h-4 rounded border-orange-500 focus:ring-orange-500"
                  />
                  <label className="ml-2 text-sm font-bold text-gray-900">
                    Terça
                  </label>
                </div>
                <div className="flex items-center ml-4">
                  <div className="flex">
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center h-full w-[5.313rem]">
                  <input
                    type="checkbox"
                    value="0"
                    className="w-4 h-4 rounded border-orange-500 focus:ring-orange-500"
                  />
                  <label className="ml-2 text-sm font-bold text-gray-900">
                    Quarta
                  </label>
                </div>
                <div className="flex items-center ml-4">
                  <div className="flex">
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center h-full w-[5.313rem]">
                  <input
                    type="checkbox"
                    value="0"
                    className="w-4 h-4 rounded border-orange-500 focus:ring-orange-500"
                  />
                  <label className="ml-2 text-sm font-bold text-gray-900">
                    Quinta
                  </label>
                </div>
                <div className="flex items-center ml-4">
                  <div className="flex">
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center h-full w-[5.313rem]">
                  <input
                    type="checkbox"
                    value="0"
                    className="w-4 h-4 rounded border-orange-500 focus:ring-orange-500"
                  />
                  <label className="ml-2 text-sm font-bold text-gray-900">
                    Sexta
                  </label>
                </div>
                <div className="flex items-center ml-4">
                  <div className="flex">
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center h-full w-[5.313rem]">
                  <input
                    type="checkbox"
                    value="0"
                    className="w-4 h-4 rounded border-orange-500 focus:ring-orange-500"
                  />
                  <label className="ml-2 text-sm font-bold text-gray-900">
                    Sábado
                  </label>
                </div>
                <div className="flex items-center ml-4">
                  <div className="flex">
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                    <input
                      type="time"
                      className="rounded-lg border text-orange-500 bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500 focus:ring-opacity-50 focus:ring-1 px-4 py-2  text-sm ml-2"
                      placeholder="00:00"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Horarios */}
          </div>
        </div>
      </section>
      <h1 className="text-3xl font-bold text-zinc-900 mt-2">Galeria</h1>
      {/* Carrousel */}
      <div className="flex justify-between py-4 mt-4 bg-[#FFF] rounded-lg">
        <div className="relative py-2 xl:flex-col xl:justify-center xl:items-center w-full">
          <div className="w-full xl:w-[75%] xl:mx-auto px-4">
            <form onSubmit={handleChangerGallery}>
              <label className="block text-center mb-2 text-base font-extrabold text-zinc-900">
                Coloque suas melhores fotos aqui !
              </label>
              <label className="flex flex-col justify-center items-center w-full h-64  rounded-lg border-2 bg-zinc-900 border-zinc-600 hover:border-zinc-400 hover:bg-zinc-700">
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
                  name="photos"
                  type="file"
                  multiple={true}
                  className="text-center cursor-pointer mb-8"
                />
              </label>
              <button className="flex justify-center items-center w-[50%] min-w-[250px] h-12 p-4 my-2 text-white-100 font-bold text-lg bg-orange-500 rounded-md shadow-sm mx-auto ">
                Enviar Fotos
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center xl:flex-row md:justify-between p-4 mt-4 mb-6 bg-[#FFF] rounded-lg overflow-x-auto">
        {barber.photos === undefined || barber.photos.length <= 0 ? (
          <div className="flex flex-col justify-center items-center w-full h-64">
            <svg
              className="w-24 h-24 text-zinc-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <h1 className="text-2xl font-bold text-zinc-900">
              Nenhuma foto cadastrada
            </h1>
          </div>
        ) : (
          <></>
        )}
        {loading ? (
          <div className="flex flex-1 justify-center items-center">
            <svg
              aria-hidden="true"
              className="mr-2 w-16 h-16 animate-spin text-gray-600 fill-orange-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          Object.keys(barber.photos_url).map((photo, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center w-64 h-64 rounded-lg mb-4 mr-4"
            >
              <img
                src={barber.photos_url[photo]}
                alt="Foto do barbeiro"
                className="w-full h-full max-h-52 object-cover rounded-t-lg"
              />
              <button
                onClick={() => handleDeleteImage(barber.photos[photo])}
                className="flex justify-center items-center w-full h-10 text-sm font-bold text-zinc-50 bg-red-600 hover:bg-red-500"
              >
                Excluir
              </button>
            </div>
          ))
        )}
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
      {openChangeInfo && (
        <div className="relative h-full w-[100px] md:w-full">
          <div className="overflow-y-auto overflow-x-hidden fixed top-[10%] left-[0%] md:top-[20%] md:left-[35%] z-50  w-full md:h-full">
            <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
              <div className="relative rounded-lg shadow bg-zinc-900">
                <div className="flex justify-between items-center p-5 rounded-t border-b border-zinc-700">
                  <h3 className="text-xl font-medium text-zinc-50">
                    Alterar informações da barbearia
                  </h3>
                  <button
                    onClick={() => setOpenChangeInfo(false)}
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
                <form onSubmit={handleChangeInfo}>
                  <div className="grid gap-6 mb-0 md:mb-6 md:grid-cols-4 p-4">
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-zinc-50">
                        Nome da barbearia
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="border text-sm font-medium rounded-lg  block w-full p-3 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-zinc-50"
                        placeholder="Nome da barbearia"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-zinc-300">
                        Telefone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        className="border text-sm font-medium rounded-lg  block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-zinc-50"
                        placeholder="Telefone"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block  mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-300">
                        Endereço
                      </label>
                      <input
                        type="text"
                        name="address.street"
                        className="border text-sm font-medium rounded-lg  block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-zinc-50"
                        placeholder="Rua"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block  mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-300">
                        Número
                      </label>
                      <input
                        type="text"
                        name="address.number"
                        className="border text-sm font-medium rounded-lg  block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-zinc-50"
                        placeholder="Número"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        name="address.city"
                        className="border text-sm font-medium rounded-lg  block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-zinc-50 mb-6"
                        placeholder="Cidade"
                      />
                      <input
                        type="text"
                        name="address.state"
                        className="border text-sm font-medium rounded-lg  block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-zinc-50"
                        placeholder="Estado"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        name="address.zipcode"
                        className="border text-sm font-medium rounded-lg  block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-zinc-50 mb-6"
                        placeholder="CEP"
                      />
                      <input
                        type="text"
                        name="address.coutry"
                        className="border text-sm font-medium rounded-lg  block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-zinc-50"
                        placeholder="País"
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
                      onClick={() => setOpenChangeInfo(false)}
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
