import React from 'react'
import { Link } from 'react-router-dom'

interface CardServiceProps {
  _id: string
  name: string
  description: string
  duration: number
  price: number
  recurrence: number
  image: string
  handlemodalIsOpenDelete: (id: string) => void
  handleSelectService: (service: CardServiceProps) => void
}

const CardService: React.FC<CardServiceProps> = ({
  _id,
  image,
  name,
  price,
  handlemodalIsOpenDelete,
  handleSelectService,
}) => {
  return (
    <div className="w-full sm:max-w-[250px] lg:max-w-[250px] bg-white-100 rounded-lg shadow-md mr-6 mb-6">
      <div className="flex justify-center items-center w-full mx-auto">
        <a>
          <img
            className="p-2 rounded-[15px] max-h-48"
            alt="imagem do serviço"
            src={image}
          />
        </a>
      </div>
      <div className="px-5 pb-5">
        <Link to={`/${_id}`}>
          <h5 className="text-2xl text-center font-extrabold tracking-tight text-gray-900 mb-4">
            {name}
          </h5>
        </Link>

        <div className="flex-col justify-center items-center">
          <div className="flex justify-center mb-2">
            <span className="text-xl font-extrabold text-gray-900 ">
              R$ <strong className="text-3xl">{price}</strong>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <a
              href="#"
              className="text-white-100 bg-orange-500 font-bold rounded-lg text-md px-4 py-2.5 text-center "
            >
              Editar
            </a>
            <button
              onClick={() => {
                handlemodalIsOpenDelete(_id)
                handleSelectService({
                  _id,
                  image,
                  name,
                  price,
                  handlemodalIsOpenDelete,
                  handleSelectService,
                  description: '',
                  duration: 0,
                  recurrence: 0,
                })
              }}
              className="text-white-100 bg-red-600 font-bold rounded-lg text-md px-4 py-2.5 text-center ml-2"
            >
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardService
