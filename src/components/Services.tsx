import React, { useEffect, useState } from 'react'

import CardService from './CardService'

import api from '../services/api'
import Pagination from './Pagination'

interface Service {
  map: any
  slice(indexOfFirstService: number, indexOfLastService: number): unknown
  length: number
  barber: string
  _id: string
  name: string
  description: string
  duration: number
  price: number
  recurrence: number
  image: string

  handlemodalIsOpenDelete: (id: string) => void
  handleSelectService: (service: Service) => void
}

export function Services() {
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<Service>([] as unknown as Service)
  const [currentPage, setCurrentPage] = useState(1)
  const [servicesPerPage, setServicesPerPage] = useState(2)
  const [width, setWidth] = useState(window.innerWidth)
  const token = localStorage.getItem('@AgendaBarber:token')

  const [selectedService, setSelectedService] = useState<Service>({} as Service)
  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Get services
  const getService = async () => {
    const response = await api.get('works', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setServices(response.data)
    setLoading(false)
  }

  // Delete service
  const handleDeleteService = async (_id: string) => {
    await api.delete(`/works/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setModalIsOpenDelete(false)
    setLoading(true)
    getService()
  }

  // Modify the number of services per page depending on the screen size
  const handleResize = () => {
    setWidth(window.innerWidth)
    if (width > 640) {
      setServicesPerPage(4)
    } else {
      setServicesPerPage(8)
    }
  }

  // Open the modal to delete a service
  const handlemodalIsOpenDelete = () => {
    setModalIsOpenDelete(true)
  }

  // Select a service to be deleted
  const handleSelectService = (service: Service) => {
    setSelectedService(service)
  }

  // Determine the index of the last service
  const indexOfLastService = currentPage * servicesPerPage
  const indexOfFirstService = indexOfLastService - servicesPerPage
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService,
  ) as unknown as Service

  // Inicialize the function to get the services and get window size
  useEffect(() => {
    getService()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize, width])

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-end">
          <button className="justify-center font-bold text-xl px-5 py-3 my-3 mr-3 text-white-100 bg-orange-500 rounded-lg shadow-md hover:bg-orange-400">
            Adicionar
          </button>
        </div>
        <div className="flex flex-wrap w-full mt-8 justify-center">
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
            currentServices.map((service: Service) => (
              <CardService
                key={service._id}
                name={service.name}
                description={service.description}
                duration={service.duration}
                price={service.price}
                recurrence={service.recurrence}
                image={service.image}
                handlemodalIsOpenDelete={handlemodalIsOpenDelete}
                handleSelectService={handleSelectService}
                _id={service._id}
              />
            ))
          )}
          {modalIsOpenDelete && (
            <div className="relative h-full w-[100px] md:w-full">
              <div className="overflow-y-auto overflow-x-hidden fixed top-[5%] md:top-[20%] md:left-[30%] z-50  w-full md:h-full">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                  <div className="relative rounded-lg shadow bg-zinc-700">
                    <button
                      type="button"
                      onClick={() => setModalIsOpenDelete(false)}
                      className="absolute top-3 right-2.5 text-zinc-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-red-500 hover:text-zinc-50"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 "
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
                    </button>
                    <div className="p-6 text-center">
                      <svg
                        aria-hidden="true"
                        className="mx-auto mb-4 w-14 h-14 text-red-500 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <h3 className="mb-5 text-lg font-normal text-zinc-50">
                        Você tem certeza que deseja deletar o produto{' '}
                        <strong className="font-bold text-lg text-red-500">
                          {selectedService.name}
                        </strong>
                        ?
                      </h3>
                      <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly items-center">
                        <button
                          onClick={() =>
                            handleDeleteService(selectedService._id)
                          }
                          className="mb-4 sm:mb-0 text-zinc-50 bg-red-500 hover:bg-red-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center sm:mr-2"
                        >
                          Sim, Deletar
                        </button>
                        <button
                          onClick={() => setModalIsOpenDelete(false)}
                          className="rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-zinc-50 focus:z-10 bg-zinc-800 text-zinc-50 border-gray-500 hover:bg-zinc-700"
                        >
                          Não, cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Pagination
          servicesPerPage={servicesPerPage}
          totalServices={services.length}
          setCurrentPage={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}
