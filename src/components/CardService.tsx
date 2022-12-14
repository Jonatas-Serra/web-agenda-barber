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
  handleSelectService: (service: CardServiceProps) => void
  handlemodalIsOpenDelete: (id: string) => void
  handlemodalIsOpenEdit: (id: string) => void
}

const CardService: React.FC<CardServiceProps> = ({
  _id,
  image,
  name,
  price,
  duration,
  recurrence,
  description,
  handleSelectService,
  handlemodalIsOpenDelete,
  handlemodalIsOpenEdit,
}) => {
  return (
    <div className="w-full max-h-[24rem] sm:max-w-[14.75rem] lg:max-w-[14.75rem] bg-[#fff] rounded-lg shadow-md mr-6 mb-4">
      <div className="flex justify-center items-center w-full mx-auto">
        <a>
          <img
            width={183}
            height={132}
            className="p-2 rounded-[0.938rem] object-scale-down"
            alt="imagem do serviço"
            src={image}
          />
        </a>
      </div>
      <div className="px-5 pb-5">
        <Link to={`/${_id}`}>
          <h5 className="text-lg leading-5 h-11 overflow-hidden font-semibold tracking-tight text-gray-900 mb-4">
            {name}
          </h5>
        </Link>

        <div className="flex-col justify-center items-center">
          <div className="flex justify-center mb-1">
            <span className="text-xl font-extrabold text-gray-900 ">
              R$ <strong className="text-2xl">{price}</strong>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                handlemodalIsOpenEdit(_id)
                handleSelectService({
                  _id,
                  image,
                  name,
                  price,
                  description,
                  duration,
                  recurrence,
                  handlemodalIsOpenDelete,
                  handlemodalIsOpenEdit,
                  handleSelectService,
                })
              }}
              className="text-white-100 bg-orange-500 font-bold rounded-lg text-md px-4 py-2.5 text-center "
            >
              Editar
            </button>
            <button
              onClick={() => {
                handlemodalIsOpenDelete(_id)
                handleSelectService({
                  _id,
                  image,
                  name,
                  price,
                  description,
                  duration,
                  recurrence,
                  handlemodalIsOpenDelete,
                  handlemodalIsOpenEdit,
                  handleSelectService,
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
