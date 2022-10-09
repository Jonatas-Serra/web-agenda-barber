import React from 'react'

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
      <a>
        <img
          className="p-2 rounded-[15px]"
          alt="imagem do serviço"
          src={image}
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 mb-4">
            {name}
          </h5>
        </a>

        <div className="flex justify-between items-center">
          <span className="text-xl font-extrabold text-gray-900 ">
            R$ <strong className="text-3xl">{price}</strong>
          </span>
          <div>
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
