import React from 'react'
import { Link } from 'react-router-dom'

interface CardProductProps {
  _id: string
  image: string
  name: string
  price: number
  handlemodalIsOpenDelete: (id: string) => void
  handleSelectProduct: (product: CardProductProps) => void
}

const CardProduct: React.FC<CardProductProps> = ({
  _id,
  image,
  name,
  price,
  handlemodalIsOpenDelete,
  handleSelectProduct,
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
            <a
              href="#"
              className="text-white-100 bg-orange-500 font-bold rounded-lg text-md px-4 py-2.5 text-center "
            >
              Editar
            </a>
            <button
              onClick={() => {
                handlemodalIsOpenDelete(_id)
                handleSelectProduct({
                  _id,
                  image,
                  name,
                  price,
                  handlemodalIsOpenDelete,
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
