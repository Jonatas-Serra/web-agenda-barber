import React from 'react'
import { Link } from 'react-router-dom'

interface CardProductProps {
  _id: string
  image: string
  name: string
  description: string
  price: number
  handleSelectProduct: (product: CardProductProps) => void
  handlemodalIsOpenDelete: (id: string) => void
  handlemodalIsOpenEdit: (id: string) => void
}

const CardProduct: React.FC<CardProductProps> = ({
  _id,
  image,
  name,
  description,
  price,
  handleSelectProduct,
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
            className="p-2 rounded-[0.938rem] object-fill"
            alt="imagem do produto"
            src={image}
          />
        </a>
      </div>
      <div className="px-5 pb-3">
        <div>
          <h5 className="text-lg leading-5 h-10 overflow-hidden font-semibold tracking-tight text-gray-900 mb-4">
            {name}
          </h5>
        </div>

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
                handleSelectProduct({
                  _id,
                  image,
                  name,
                  price,
                  description,
                  handlemodalIsOpenDelete,
                  handlemodalIsOpenEdit,
                  handleSelectProduct,
                })
              }}
              className="text-white-100 bg-orange-500 font-bold rounded-lg text-md px-4 py-2.5 text-center "
            >
              Editar
            </button>
            <button
              onClick={() => {
                handlemodalIsOpenDelete(_id)
                handleSelectProduct({
                  _id,
                  image,
                  name,
                  price,
                  description,
                  handlemodalIsOpenDelete,
                  handlemodalIsOpenEdit,
                  handleSelectProduct,
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

export default CardProduct
