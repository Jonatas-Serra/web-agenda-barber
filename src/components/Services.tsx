/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import img from '../assets/services.jpg'

import CardService from './CardService'
import Pagination from './Pagination'

export function Services() {
  const [services] = useState([
    {
      id: 1,
      title: 'Service 1',
      price: 29,
      image: img,
    },
    {
      id: 2,
      title: 'Service 2',
      price: 29,
      image: img,
    },
    {
      id: 3,
      title: 'Service 3',
      price: 29,
      image: img,
    },
    {
      id: 4,
      title: 'Service 4',
      price: 29,
      image: img,
    },
    {
      id: 5,
      title: 'Service 5',
      price: 29,
      image: img,
    },
    {
      id: 6,
      title: 'Service 6',
      price: 29,
      image: img,
    },
    {
      id: 7,
      title: 'Service 7',
      price: 29,
      image: img,
    },
    {
      id: 8,
      title: 'Service 8',
      price: 29,
      image: img,
    },
    {
      id: 9,
      title: 'Service 9',
      price: 29,
      image: img,
    },
    {
      id: 10,
      title: 'Service 10',
      price: 29,
      image: img,
    },
    {
      id: 11,
      title: 'Service 11',
      price: 29,
      image: img,
    },
    {
      id: 12,
      title: 'Service 12',
      price: 29,
      image: img,
    },
    {
      id: 13,
      title: 'Service 13',

      price: 29,
      image: img,
    },
    {
      id: 14,
      title: 'Service 14',
      price: 29,
      image: img,
    },
    {
      id: 15,
      title: 'Service 15',
      price: 29,
      image: img,
    },
    {
      id: 16,
      title: 'Service 16',
      price: 29,
      image: img,
    },
    {
      id: 17,
      title: 'Service 17',
      price: 29,
      image: img,
    },
    {
      id: 18,
      title: 'Service 18',
      price: 29,
      image: img,
    },
    {
      id: 19,
      title: 'Service 19',
      price: 29,
      image: img,
    },
    {
      id: 20,
      title: 'Service 20',
      price: 29,
      image: img,
    },
  ])
  const [currentPage, setCurrentPage] = useState(1)
  const [servicesPerPage, setServicesPerPage] = useState(8)
  const [width, setWidth] = useState(window.innerWidth)

  const indexOfLastService = currentPage * servicesPerPage
  const indexOfFirstService = indexOfLastService - servicesPerPage
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService,
  )

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleResize = () => {
    setWidth(window.innerWidth)
    if (width > 640) {
      setServicesPerPage(4)
    } else {
      setServicesPerPage(8)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])

  return (
    <>
      <div className="flex flex-col w-full mx-4">
        <div className="w-full flex justify-end">
          <button className="justify-center font-bold text-xl px-5 py-3 my-3 mr-3 text-white-100 bg-orange-500 rounded-lg shadow-md hover:bg-orange-400">
            Adicionar
          </button>
        </div>
        <div className="flex flex-wrap w-full mt-8 justify-center">
          {currentServices.map((service) => (
            <CardService
              key={service.id}
              title={service.title}
              price={service.price}
              img={service.image}
            />
          ))}
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
